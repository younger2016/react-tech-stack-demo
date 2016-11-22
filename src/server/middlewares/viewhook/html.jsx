import invariant from 'invariant'
import env from '../../env'

const baseUrl = env.HTTP_SCRIPT_BASEURL
const suffix = env.HTTP_SCRIPT_SUFFIX

export default function html(pageInfo, content, state) {
  invariant(
    typeof pageInfo === 'object',
    `ctx.render函数的参数格式为：${JSON.stringify({
      title: 'html>head>title的值',
      keyword: 'html>head>keyword的值',
      description: 'html>head>description的值',
      baseUrl: '静态资源的根路径，如：http://localhost:3004/static/',
      content: 'ReactDOMServer.renderToString|renderToStaticMarkup输出的字符串',
      state: 'ctx.store.getState()',
    })}，可传入空对象。`
  )

  return `<!DOCTYPE html>
<html>
  <head>
    <meta charSet="utf-8"/>
    <title>${pageInfo.title}</title>
    <meta name="description" content=${pageInfo.description}/>
    <meta name="keyword" content=${pageInfo.keyword}/>
    <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <link href="${baseUrl}/styles/default/index.css" rel="stylesheet" type="text/css" />
    <link href="${baseUrl}/styles/antd/1.6.4/antd.min.css" rel="stylesheet" type="text/css" />
    <link href="${baseUrl}/styles/fixed-data-table/0.6.2/fixed-data-table.min.css" rel="stylesheet" type="text/css" />
    <link href="${baseUrl}/styles/base.css" rel="stylesheet" type="text/css" />
  </head>
  <body>
    <div id="container">${content}</div>
    <script>
      window.__INITIAL_STATE__ = ${JSON.stringify(state)}
    </script>
    <script src="${baseUrl}/scripts/common/vendor${suffix}.js"></script>
    <script src="${baseUrl}/scripts/index${suffix}.js"></script>
    <script src="${baseUrl}/scripts/business-index${suffix}.js"></script>
  </body>
</html>`
}
