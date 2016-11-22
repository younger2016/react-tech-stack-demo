import Koa from 'koa'
import serve from 'koa-static'
import path from 'path'
import bodyParser from 'koa-bodyparser'
import viewhook from './middlewares/viewhook'
import matchRoute from './middlewares/matchRoute'
import router from './controllers'
import routes from '../common/redux/routes'
import env from './env'

new Koa()
  .use(bodyParser())
  .use(viewhook())
  .use(matchRoute(routes))
  .use(router.routes())
  .use(router.allowedMethods())
  .use(serve(path.join(process.cwd(), 'static')))
  .listen(env.HTTP_SERVER_PORT)

console.log(`listening on port ${env.HTTP_SERVER_PORT} -- ${process.env.NODE_ENV}`)
