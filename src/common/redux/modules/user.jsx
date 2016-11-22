import Immutable from 'immutable'
import fetch from 'isomorphic-fetch'
import Cookies from 'cookies-js'

import ActionStatus from '../../constants/ActionStatus'
import env from '../../helpers/env'
import { toJSON, genAction, genFetchOptions } from '../../helpers/util'


export const PLATFORM_UI_USER_INIT = 'PLATFORM_UI_USER_INIT'

// 用户登陆
export const PLATFORM_DATA_USER_LOGIN = 'PLATFORM_DATA_USER_LOGIN'
export const PLATFORM_DATA_USER_LOGIN_SUCCEED = 'PLATFORM_DATA_USER_LOGIN_SUCCEED'
export const PLATFORM_DATA_USER_LOGIN_FAILURE = 'PLATFORM_DATA_USER_LOGIN_FAILURE'

export const PLATFORM_DATA_USER_GETLIST = 'PLATFORM_DATA_USER_GETLIST'
export const PLATFORM_DATA_USER_GETLIST_SUCCEED = 'PLATFORM_DATA_USER_GETLIST_SUCCEED'
export const PLATFORM_DATA_USER_GETLIST_FAILURE = 'PLATFORM_DATA_USER_GETLIST_FAILURE'


const user = {
  id: null,
  username: null,
  password: null,
  corp_id: null,
  pubuts: null,
  bActivate: null,
  bEmailValid: null,
  bMobileValid: null,
  mobile: null,
  salt: null,
  iDeleted: null,
  bCorpRegister: null,
  dataSourceName: null,
  alias: null,
  token: null,
}

const $$initialState = Immutable.fromJS({
  // 用户属性
  ...user,

  // 登陆状态
  loginStatus: ActionStatus.READY,

  list: [],
  dataSource: [],
  columns: [],
  id : `log${new Date().getTime()}`,
  errorMsg :'直接点击登录即可登录，无需输入用户名密码',
});


export default (state = $$initialState, action) => {
  let timestamp=new Date().getTime(),
    loginid = `log${timestamp}`;
  console.log('timestamp'+timestamp);
  switch (action.type) {

    case PLATFORM_DATA_USER_GETLIST_SUCCEED:
      return state.merge(action.payload)

    case PLATFORM_UI_USER_INIT:
      if (process.env.__CLIENT__ === true) {
        const userCooke = Cookies.get('user')
        if (userCooke) {
          Object.assign(user, JSON.parse(decodeURIComponent(userCooke)))
        }
      }
      return state.merge(user)

    case PLATFORM_DATA_USER_LOGIN:
      return state
        .set('loginStatus', ActionStatus.ING)

    case PLATFORM_DATA_USER_LOGIN_SUCCEED:
      console.log('PLATFORM_DATA_USER_LOGIN_SUCCEED')
      return state
        .set('loginStatus', ActionStatus.SUCCEED)
        .merge(action.payload)
        .merge({id : loginid});

    case PLATFORM_DATA_USER_LOGIN_FAILURE:
      return state
        .set('loginStatus', ActionStatus.FAILURE)

    case 'PLATFORM_DATA_LOGIN_USERNAME':
      return state
        .merge({
          UserName: action.username,
          errorMsg: action.errorMsg,
          id : loginid
        });

    case 'PLATFORM_DATA_LOGIN_PASSWORD':
/*      let username = $$state.getIn(['username']),
        errorMsg = "";*/
      return state
        .merge({errorMsg : action.errorMsg,
          id : loginid});

    case 'PLATFORM_DATA_LOGIN_GET_ACCOUT_SUC':
      return state
        .merge({account : action.account,
          id : loginid});

    case 'PLATFORM_DATA_LOGIN_GET_ACCOUT_FAI':
      return state
        .merge({account : action.account,
          id : loginid});
    case 'PLATFORM_DATA_LOGIN_OUT':
      return state
        .merge({...user,loginStatus: ActionStatus.READY});
    default:
      return state
  }
}


export function SetUserName(value) {
  //emptyAccountUL();
  console.log(value);
  let username = value,
    errorMsg = '';
  if (!username || username == "") {
    errorMsg = "登录账号不能为空，请输入";
    //hiddenTitle();
    //return;
    console.log(errorMsg);
  }
  return (dispatch) => {
    dispatch({
      type: 'PLATFORM_DATA_LOGIN_USERNAME',
      username: value,
      errorMsg: errorMsg
    })
  };
}


export function SetPassWord(name,word){
  //emptyAccountUL();
  console.log(name+'-'+word);
  let password = word,
    username = name,
    errorMsg = '';
  if(!username || username == ""){
    if(!password||password == ""){
      errorMsg = "登录账号和密码不能为空，请输入";
    }
    else {
      errorMsg = "登录账号不能为空，请输入";
    }
  }
  else {
    if(!password||password == ""){
      errorMsg = "密码不能为空，请输入";
    }
  }
  console.log(errorMsg);
  /*if (!password || password == "") {
    errorMsg = "密码不能空，请输入";
    //hiddenTitle();
    //return;

  }*/
  return (dispatch)=>{
    //getAccount(username,password);
    dispatch({
      type : 'PLATFORM_DATA_LOGIN_PASSWORD',
      errorMsg : errorMsg
    })
    let options = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'username' : username,
        'password' : password,
      })
    }

    fetch(env.HTTP_USER_COR_ACC, options)
      .then(function (response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server")
        }
        //let temp = response.json()
        //console.log(temp);
        return response.json()
      })
      .then(function (json) {
        if (json.code === 200) {
          //console.log(json.data);
          dispatch({
            type : 'PLATFORM_DATA_LOGIN_GET_ACCOUT_SUC',
            account : json.data,
          });

          /*if (process.env.__CLIENT__ === true) {
           const cookie = encodeURIComponent(JSON.stringify(json.data))
           document.cookie = `user=${cookie}`
           }*/
        } else {
          //console.log(json.data);
          dispatch({
            type : 'PLATFORM_DATA_LOGIN_GET_ACCOUT_FAI',
            errorMsg : json.data
          })
        }
      })
  };
}
export const userlogin = (username, code, corp_id) => {
  return (dispatch, getState) => {
    // 登陆中，做禁用登陆 Button 等操作
    dispatch(genAction(PLATFORM_DATA_USER_LOGIN));

    const options = genFetchOptions('post', {
      username,
      code,
      corp_id
    })

    fetch(env.HTTP_USER_COR_ACC, options)
      .then(function (response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server")
        }
        //let temp = response.json()
        //console.log(temp);
        return response.json()
      })
      .then(function (json) {
        if (json.code === 200) {
          //console.log(json.data);
          dispatch(genAction(PLATFORM_DATA_USER_LOGIN_SUCCEED, json.data));

          if (process.env.__CLIENT__ === true) {
            cb.rest.AppContext.token = json.data.token;
            console.log('token');
            console.log(json.data);
            const cookie = encodeURIComponent(JSON.stringify(json.data))
            const expires = new Date(Date.now() + 2 * 3600 * 1000).toUTCString()

            document.cookie = `user=${cookie};domain=localhost;path=/;expires=${expires}`
          }
        } else {
          dispatch(genAction(PLATFORM_DATA_USER_LOGIN_FAILURE, json.data))
        }
          /*if (process.env.__CLIENT__ === true) {
           const cookie = encodeURIComponent(JSON.stringify(json.data))
           document.cookie = `user=${cookie}`
           }*/
        /*} else {
          //console.log(json.data);
          dispatch({
            type : 'GET_ACCOUT_FAI',
            errorMsg : json.data
          })
        }*/
      })
    /*fetch(env.HTTP_USER_LOGIN, options).then(toJSON).then(function (json) {
      if (json.code === 200) {
        dispatch(genAction(PLATFORM_DATA_USER_LOGIN_SUCCEED, json.data))

        if (process.env.__CLIENT__ === true) {
          cb.rest.AppContext.token = json.data.token;
          console.log(json.data);
          const cookie = encodeURIComponent(JSON.stringify(json.data))
          const expires = new Date(Date.now() + 2 * 3600 * 1000).toUTCString()

          document.cookie = `user=${cookie};domain=localhost;path=/;expires=${expires}`
        }
      } else {
        dispatch(genAction(PLATFORM_DATA_USER_LOGIN_FAILURE, json.data))
      }
    })*/
  }
}
export function logout(){
  return(dispatch)=>{
    dispatch({
      type : 'PLATFORM_DATA_LOGIN_OUT',
    })
  }
}

export const userLogin = (username, code, corp_id) => {
  return (dispatch, getState) => {
    // 登陆中，做禁用登陆 Button 等操作
    dispatch(genAction(PLATFORM_DATA_USER_LOGIN));

    const options = genFetchOptions('post', {
      username,
      code,
      corp_id
    })

    fetch(env.HTTP_USER_LOGIN, options).then(toJSON).then(function (json) {
      if (json.code === 200) {
        dispatch(genAction(PLATFORM_DATA_USER_LOGIN_SUCCEED, json.data))

        if (process.env.__CLIENT__ === true) {
          cb.rest.AppContext.token = json.data.token;
          console.log(json.data);
          const cookie = encodeURIComponent(JSON.stringify(json.data))
          const expires = new Date(Date.now() + 2 * 3600 * 1000).toUTCString()

          document.cookie = `user=${cookie};domain=localhost;path=/;expires=${expires}`
        }
      } else {
        dispatch(genAction(PLATFORM_DATA_USER_LOGIN_FAILURE, json.data))
      }
    })
  }
}
//HTTP_USER_COR_ACC
export function getAccount(username, code){
  return (dispatch) => {
    // 登陆中，做禁用登陆 Button 等操作
    //dispatch(userLoginAction(U8_USER_LOGIN));
    let options = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        code,
      })
    }

    fetch(env.HTTP_USER_COR_ACC, options)
      .then(function (response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server")
        }
        return response.json()
      })
      .then(function (json) {
        if (json.code === 200) {
          dispatch({
            type : 'GET_ACCOUT_SUC',
            account : json.data,
          });

          /*if (process.env.__CLIENT__ === true) {
            const cookie = encodeURIComponent(JSON.stringify(json.data))
            document.cookie = `user=${cookie}`
          }*/
        } else {
          dispatch({
            type : 'GET_ACCOUT_FAI',
            errorMsg : json.data
          })
        }
      })
  }
}
// 获取用户列表
export function queryUserBy() {
  return (dispatch, getState) => {
    // 请求服务器接口
    fetch('/users.do').then(toJSON).then(function (json) {
      dispatch({
        type: PLATFORM_DATA_USER_GETLIST_SUCCEED,
        payload: json
      })
    })
  }
}
//PLATFORM_DATA_LOGIN_
