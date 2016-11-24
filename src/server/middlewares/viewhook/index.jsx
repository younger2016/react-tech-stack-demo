import React from 'react'
import ReactDOMServer from 'react-dom/server'
import beautify from 'js-beautify'

import html from './html'
import nonIsomorphicHtml from './nonIsomorphicHtml'
import Isomorph from '../../../common/helpers/Isomorph'

export default function viewhook(_options = { beautify: true, internals: true }) {
  const options = Object.assign({}, _options)

  return async function (ctx, next) {
    ctx.store = Isomorph.createStore()
    ctx.history = Isomorph.createHistory(ctx.store, ctx.path)

    ctx.render = function (pageInfo, internals = options.internals || true) {
      const render = internals
        ? ReactDOMServer.renderToString
        : ReactDOMServer.renderToStaticMarkup

      let markup = render(<Isomorph store={ctx.store} history={ctx.history}/>)

      if (options.beautify) {
        markup = beautify.html(markup)
      }

      ctx.type = 'html';
      ctx.body = html(pageInfo, markup, ctx.store.getState())
    }

    ctx.renderNonIsomorphic = function (pageInfo, component, initialState = {}) {
      ctx.type = 'html';
      ctx.body = nonIsomorphicHtml(pageInfo, ReactDOMServer.renderToString(component), initialState)
    }

    await next()
  }
}
