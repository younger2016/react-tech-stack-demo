import React from 'react'
import Router from 'koa-router'
import env, { combine } from '../env'

const router = Router()
export default router


import user from './user'
user(router)

// TODO: 增加其他模块的路由，如：
// import xxx from './xxx'
// xxx(router)


router.get('/', function (ctx) {
  const pageInfo = {
    title: 'portal',
    keyword: '',
    description: '',
  }

  // TODO: 调用 dispatch，store 会得到数据
  // store.dispatch({type: U8_USER_GET_LIST})

  const mockTree = require('../../__mock__/tree')

  ctx.store.dispatch({
    type: 'U8_INIT_TREE',
    payload: {
      showModal: mockTree,
      content: mockTree,
      treejson: mockTree.data,
    }
  })

  ctx.render(pageInfo)
})


// 取文件
const FILE_ROUTE = '/files/*'

router.get(FILE_ROUTE, async function getFile(ctx) {
  const { req, res, request, response } = ctx
  const serviceUrl = combine(env.HTTP_SERVICE_BASEURL, req.url.substr(FILE_ROUTE.length - 1))
  const CONTENT_TYPE = 'application/pdf'
  const headers = {
    'content-type': CONTENT_TYPE,
    origin: 'koa2 server',
    cookie: req.headers.cookie
  }
  const options = {
    method: req.method,
    headers,
    credentials: 'include',
  }
  await fetch(serviceUrl, options).then(response => {
    switch (response.status) {
      case 200:
        ctx.body = response.body
        ctx.type = CONTENT_TYPE
        break

      default:
        ctx.body = '文件打开出错'
        break
    }
  }, e => {
    ctx.body = '文件打开出错'
  })
})


// JAVA服务的路由放在Database里，所以只做透传
const UNSURE_ROUTE = '/api-unsure/*'

router.all(UNSURE_ROUTE, async function doUnsureHttpRequest(ctx) {
  const { req, res, request, response } = ctx
  const CONTENT_TYPE = 'application/json'
  const serviceUrl = combine(env.HTTP_SERVICE_BASEURL, req.url.substr(UNSURE_ROUTE.length - 1))
  const headers = {
    'content-type': CONTENT_TYPE,
    origin: 'koa2 server',
    cookie: req.headers.cookie
  }
  const options = {
    method: req.method,
    headers,
    body: JSON.stringify(request.body),
    credentials: 'include',
  }

  await fetch(serviceUrl, options).then(function (response) {
    // TODO: 未完成：完善合理的接口返回
    switch (response.status) {
      case 200:
        ctx.body = response.body
        ctx.type = CONTENT_TYPE
        break

      case 404:
        ctx.body = { code: 404 }
        break

      default:
        ctx.body = { code: 500 }
        break
    }
  }, function (e) {
    ctx.body = {
      code: 500,
      error: e.message
    }
  })
})
