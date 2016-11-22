/**
 * Created by wxk on 2016/7/25.
 */
import Immutable from 'immutable'
import { isFunction, findIndex } from 'lodash'

const $$initialState = Immutable.fromJS({
  newTabIndex : 0,
  panes : [],
  id : 0,
  tabflag : true
});

export function tabs($$state = $$initialState, action) {
  //const panes = [];
  let newTabIndex = $$state.getIn(['newTabIndex']);
  switch (action.type) {
    case 'PLATFORM_UI_TAB_ADD':
      let key = `newTab${newTabIndex}`,
        newTabItem = {...action.value, key: key};//title: title, index: index, content: content
      return $$state
        .update('panes',panes => {
          const _panes = Immutable.Iterable.prototype.isPrototypeOf(panes) ? panes.toJS() : panes;
          //console.log('panes push');
          let index = findIndex(_panes, ['index', newTabItem.index]);
          if (index === -1) {
            _panes.push(newTabItem);
            newTabIndex++;
          }
          else {
            key = _panes[index].key;
          }
          return _panes
        })
        .merge({activeKey : key,newTabIndex : newTabIndex,tabflag : true});
      break;

    case 'PLATFORM_UI_TAB_CHANGE':
      let timestamp=new Date().getTime();
      console.log('timestamp'+timestamp);
      return $$state
        //.update('activeKey',action.activeKey);
        .merge({activeKey: action.activeKey});
      break;
    case 'PLATFORM_UI_TAB_RERANDER':
      return $$state
      //.update('activeKey',action.activeKey);
        .update('panes',panes => {
          const _panes = Immutable.Iterable.prototype.isPrototypeOf(panes) ? panes.toJS() : panes;
          _panes.forEach((ele)=>{
            if(ele.key === action.activeKey){
              ele.indexopen = action.indexopen;
            }
          })
          return _panes
        })
        .merge({activeKey: action.activeKey,tabflag : true});

      break;

    case 'PLATFORM_UI_TAB_DEL':
      //console.log('TabRemove');
      let activeKey = $$state.getIn(['activeKey']);
      let lastIndex;
      return $$state
        .update('panes',(panes) => {
          let list =panes.filter((pane,i) => {
            //console.log('pane.key:'+pane.key+'action.targetKey:'+action.targetKey);
            if(pane.key === action.targetKey){
              //console.log('TabRemove suc');
              lastIndex = i - 1;
              if (lastIndex >= 0 && activeKey === pane.key) {
                activeKey = panes[lastIndex].key;
              }
              return false;
            }
            //newTabIndex--;
            return true;
          });
          console.log(list);
          return list
        })
        .merge({activeKey: activeKey,tabflag : true});//newTabIndex : newTabIndex,
      break;
    case 'PLATFORM_UI_TAB_RENDER_DISABLE':
      return $$state.merge({tabflag : false});
      break;
    default :
      return $$state;
  }
}

export function TabDel(value) {
  return ((dispatch)=> {
    dispatch({
      type: 'PLATFORM_UI_TAB_DEL',
      targetKey: value
    })
  })
}

export function TabAdd(value) {//value
  return ((dispatch)=> {
    dispatch({
      type: 'PLATFORM_UI_TAB_ADD',
      value: value
    })
  })
}

export function onTreeChange(activeKey){
  return ((dispatch)=> {
    dispatch({
      type: 'PLATFORM_UI_TAB_CHANGE',
      activeKey: activeKey
    })
  })
}

export function onRerander(activeKey,indexopen){
  return ((dispatch)=> {
    dispatch({
      type: 'PLATFORM_UI_TAB_RERANDER',
      activeKey: activeKey,
      indexopen :indexopen
    })
  })
}

export function disableTabflag(){
  return ((dispatch)=> {
    dispatch({
      type: 'PLATFORM_UI_TAB_RENDER_DISABLE'
    })
  })
}

