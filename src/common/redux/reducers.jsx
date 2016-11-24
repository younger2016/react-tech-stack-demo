import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import user from './modules/user'
//import meta from './modules/meta'
import modal from './modules/modal'
import { tree } from './modules/tree'
import { tabs } from './modules/tabs'

export default combineReducers({
  user,
  modal,
  tree,
  tabs,
  routing,
})
