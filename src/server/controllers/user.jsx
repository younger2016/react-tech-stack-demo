import React from 'react'

import * as actions from '../../common/redux/modules/user'

export default function (router) {

  router.get('/login', function (ctx) {
    const pageInfo = {
      title: '用户登录',
      keyword: '',
      description: '',
    }

    // TODO: 调用 dispatch，store 会得到数据
    // ctx.store.dispatch({type: U8_USER_GET_LIST})

    ctx.render(pageInfo)
  })
  router.get('/user/login', function (ctx) {
    const pageInfo = {
      title: '用户登录',
      keyword: '',
      description: '',
    }

    // TODO: 调用 dispatch，store 会得到数据
    // ctx.store.dispatch({type: U8_USER_GET_LIST})

    ctx.render(pageInfo)
  })

  router.get('/user/:userId', function (ctx) {
    let userId = ctx.params.userId

  })

  router.get('/users', async function (ctx) {
    const pageInfo = {
      title: '用户列表',
      keyword: '',
      description: '',
    }

    await queryUserByFromServices().then(json => {
      ctx.store.dispatch({
        type: actions.PLATFORM_DATA_USER_GETLIST_SUCCEED,
        payload: json
      })
      ctx.render(pageInfo)
    })
  })

  router.get('/users.do', async function (ctx) {
    await queryUserByFromServices().then(json => {
      ctx.body = json
    })
  })

  return router
}

function queryUserByFromServices() {
  return fetch('http://xxx/mockjs/1/user/getlist.do')//预留
    .then(function (response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server")
      }
      return response.json()
    })
    .then(response => {
      return require('../../__mock__/users')
    })
}
