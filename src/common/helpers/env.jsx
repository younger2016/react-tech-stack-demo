const env = {
  // 静态文件根路径
  HTTP_SCRIPT_BASEURL: 'http://localhost:8082/static',

  // 关于用户的ajax接口
  HTTP_USER_LOGIN: gen('/login/authorize.do?terminaltype=PC'),
  HTTP_USER_COR_ACC: gen('/login/getCorpAccounts.do'),

  // 查询方案
  HTTP_FETCH_QUERYSCHEMES: gen('/filterDesign/getSolutionList.do?'),
  HTTP_FETCH_QUERYSCHEMES_COMMON: gen('/filterDesign/getSolutionCommonList.do?'),
  HTTP_UPDATE_QUERYSCHEME: gen('/filterDesign/updateSolution.do?'),
  HTTP_UPDATE_QUERYSCHEME_COMMON: gen('/filterDesign/updateSolutionCommon.do?'),
  HTTP_DELETE_QUERYSCHEME: gen('/filterDesign/delSolution.do?'),
  HTTP_CREATE_QUERYSCHEME: gen('/filterDesign/addSolution.do?'),

  // 预警
  HTTP_FETCH_TASKS: gen('/task/getAllTask.do?'),
  HTTP_FETCH_TASK_BYKEY: gen('/task/getTaskByKey.do?'),
  HTTP_FETCH_TASKCONFIGS: gen('/task/getAllTaskConfig.do?'),
  HTTP_FETCH_TASKCONFIG_BYNAME: gen('/task/getTaskConfigByName.do?'),
  HTTP_FETCH_TASKCONFIG_BYKEY: gen('/task/getTaskConfigByKey.do?'),
  HTTP_INSERT_TASKCONFIG: gen('/task/insertTaskConfig.do?'),
  HTTP_UPDATE_TASKCONFIG: gen('/task/updateTaskConfig.do?'),
  HTTP_DELETE_TASKCONFIG: gen('/task/deleteTaskConfig.do?'),
}

if (process.env.NODE_ENV === 'production') {
  Object.assign(env, {
    HTTP_SCRIPT_BASEURL: '',
  })
}

export default env

export function combine(baseurl, pathname) {
  const separator = (/\/$/.test(baseurl) === false && /^\//.test(pathname) === false) ? '/' : ''
  return Array.prototype.slice.call(arguments, 0).join(separator)
}

function gen(url) {
  return combine('/api-unsure', url)
}
