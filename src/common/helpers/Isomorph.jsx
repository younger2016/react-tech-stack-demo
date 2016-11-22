import React, {PropTypes} from 'react'
import { Router, IndexRoute, createMemoryHistory, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'

import configureStore from '../redux/configureStore'
import routes from '../redux/routes'

export default class Isomorph extends React.Component {
  static propTyps = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  }

  static createStore = initialState => configureStore(initialState);

  static createHistory = (store, path) => path === undefined ?
    syncHistoryWithStore(browserHistory, store) :
    createMemoryHistory(path)

  render() {
    const {
      store,
      history,
    } = this.props

    return (
      <Provider store={store}>
        <Router history={history} routes={routes}/>
      </Provider>
    )
  }
}
