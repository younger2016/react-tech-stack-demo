import common_env, { combine } from '../../common/helpers/env'

const HTTP_SERVICE_BASEURL = process.env.NODE_ENV === 'production' ?
  'http://10.10.12.93:8080/ucloud' :
  'http://10.10.12.93:8080/ucloud'

const env = {
  // java 服务根路径
  HTTP_SCRIPT_BASEURL: common_env.HTTP_SCRIPT_BASEURL,

  HTTP_SCRIPT_SUFFIX: '',

  // nodejs 服务端口
  HTTP_SERVER_PORT: 8081,

  // 静态文件根路径
  HTTP_SERVICE_BASEURL,

  // 关于用户的ajax接口
  HTTP_USER_FETCH_METABYMENU: combine(HTTP_SERVICE_BASEURL, '/billmeta/getbill.do'),
  HTTP_USER_FETCH_METABYBILLNO: combine(HTTP_SERVICE_BASEURL, '/menu/getMetaByMenu.do'),
  HTTP_USER_FETCH_TREE: combine(HTTP_SERVICE_BASEURL, '/menu/getMenuTree.do'),
  HTTP_USER_FETCH_TREE_NODE: combine(HTTP_SERVICE_BASEURL, '/menu/getMetaByMenu.do'),

  HTTP_INIT_QUERYSCHEME: combine(HTTP_SERVICE_BASEURL, '/filter/getcommonfilters.do'),
}

if (process.env.NODE_ENV === 'production') {
  Object.assign(env, {
    HTTP_SCRIPT_SUFFIX: '.min'
  })
}

export default env
export { combine }
