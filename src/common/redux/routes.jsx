import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'

import * as Pages from '../containers'

const requireAuthentication = (nextState, replace, callback) => {
  // loadUserInfo(store)
  //   .then((user) => {
  //     if (!user) replace('/login')
  //     callback()
  //   })
  //   .catch(err) {
  //   callback(err)
  // }
  callback()
}

export default (
  <Route path="/" >
    <IndexRoute component={Pages.DefaultPage}/>
    <Route path="login" component={Pages.LoginPage}>
    </Route>
    <Route path="test" component={Pages.TestPage}>
    </Route>
    <Route path="saleorders" component={Pages.SaleOrdersPage}>
    </Route>
    <Route path="warningcenter" component={Pages.WarningCenterPage}>
    </Route>
    <Route path="meta" component={Pages.TestDefaultPage}>
      <Route path=":type/:key" component={Pages.MetaIndexPage} />
    </Route>
    <Route path="user">
      <Route path="login" component={Pages.UserLoginPage} />
      <Route path=":id" component={Pages.UserInfoPage} />
    </Route>
    <Route path="users" component={Pages.UserListPage} onEnter={requireAuthentication} />
    <Route path="*" component={Pages.ErrorNotFoundPage} />
  </Route>
)
