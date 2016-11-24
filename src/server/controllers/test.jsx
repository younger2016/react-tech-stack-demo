import React from 'react'

import * as actions from '../../common/redux/modules/user'

export default function (router) {
  router.get('/test', function (ctx) {
    const pageInfo = {
      title: '测试一下',
      keyword: '',
      description: '',
    }

    // TODO: 调用 dispatch，store 会得到数据
    // ctx.store.dispatch({type: U8_USER_GET_LIST})

    ctx.render(pageInfo)
  })
}
