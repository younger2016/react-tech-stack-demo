/**
 * 将fetch函数的response转化为json格式
 */
export const toJSON = response => {
  const condition = response.status === 200
  // warning(condition, ``, 1)

  return condition === true ? response.json() : {
    code: response.status,
  }
}

/**
 * 提供fetch函数的第二个参数
 */
export const genFetchOptions = (method, paramsObj) => {
  return {
    method,
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(paramsObj)
  }
}

/**
 * 生成一个redux可用的action对象
 */
export const genAction = (type, payload) => {
  return {
    type,
    payload
  }
}
