import React, { Component } from 'react'
import { render } from 'react-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Router } from 'react-router';
//ReactRouter.Link
import  Meta  from "../../components/basic/view";
import  Refer  from "../../components/basic/refer";
import  Tree  from "../../components/basic/tree"
import  TabList  from "../../components/basic/tabs"
//import  MySelect from "../../components/basic/divbox" //添加一个组建页面做个测试
//import TitleSetting from '../TitleSetting'
import {
  Row,
  Col,
  Modal,
  Button,
  Select,
  Menu,
  Icon,
  Tabs,
  // Tree,
} from 'antd';
import * as modalactions from '../../redux/modules/modal'
import * as treeactions from '../../redux/modules/tree'
import * as tabsactions from '../../redux/modules/tabs'
import * as logactions from '../../redux/modules/user'
import ActionStatus from '../../constants/ActionStatus'
//import cb from '../../..'
import mockTree from '../../../__mock__/tree'
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const TabPane = Tabs.TabPane;
const Link = Router.Link;

class Page extends Component {
  constructor(props){
    super(props);
    let { user,logactions } = this.props;
    let jsonData = null;//cb.rest.AppContext.viewmeta;
    /*if(!user.token){
      if (user.loginStatus !== ActionStatus.SUCCEED) {
        logactions.logout();
        this.props.history.pushState(null, '/login')
        //setTimeout(()=>{}, 300)
      }
    }*/
    const panes = [
      { title: '我的桌面', content: <Refer value="123" />, key: '1' },
    ];

    this.state = {
      visible : false,
      //activeKey: panes[0].key,
      //panes,
    }
    console.log('treeactions')
    let {treeactions,tabsactions,modal} = this.props;
    treeactions.treeload();
    console.log('TabAdd desktop')
    tabsactions.TabAdd({ indexopen:modal.indexopen, title: '我的桌面', index : 0,content: 'index' });//{ title: '我的桌面', index : 0,content: <Refer value="123" /> }
//className={ant-col-xs:24,ant-col-sm-24 ant-col-md-6 ant-col-lg-4}
    this.list = [];
    this.tabflag = true;

  }



  /*defineCubeMethods = ()=>{
    if (cb.route) return;
    cb.route = {};
    let { logactions } = this.props;
    cb.route.redirectLoginPage = ()=> {
      logactions.logout();
      this.props.history.pushState(null, '/login')
    };
  }*/

  onClick = (selectedKeys, e)=>{
    //this.defineCubeMethods();
    var self = this;
    let {tabsactions,tabs,modal} = this.props;
    const panes = tabs.panes;
    let flag = true;
    console.log('Click');
    console.log(e);
    if(selectedKeys[0]){
      panes.forEach((pane)=>{
        //console.log(pane.title);
        if(pane.index == selectedKeys[0]){
          flag = false;
          //this.setState({ activeKey : pane.key });
          tabsactions.onTreeChange(pane.key)
        }
      });
      if(flag){
        let selectedNode = e.node.props.data;
        const panes = self.state.panes;
        const activeKey = `newTab${self.newTabIndex++}`;
          //tabsactions.TabAdd({ title: '我的桌面',index : selectedKeys[0], content: null });
          tabsactions.TabAdd({
            indexopen:modal.indexopen,
            title: selectedNode.menu_name,
            index:selectedKeys[0],
            content: {vm:/*vm*/null, metaData:/*viewmeta*/null}
          });
        /*cb.loader.fromMenu(selectedNode, function (vm, viewmeta) {
        });*/
        this.tabflag = true;
      }
    }
  };

  onTreeChange = (activeKey)=>{
  };

  onTreeEdit = (targetKey, action)=>{
    console.log('targetKey:'+targetKey+' action:'+action);
    //let {tabsactions,tabs} = this.props;
    //tabsactions.onTreeEdit(targetKey, action);
    this[action](targetKey)
  };

/*  add = (value,callback)=>{
/!*    let { tree } = this.props,
      TreeNode = tree.TreeNode.viewmeta;
    if(TreeNode){*!/
      //console.log('TreeNode');
      //console.log(TreeNode);
      const panes = this.state.panes;
      const activeKey = `newTab${this.newTabIndex++}`;
      panes.push({ title: value, content: <Meta metaData = {TreeNode}/>, key: activeKey });//["viewApplication"]
      this.setState({ panes, activeKey });
      //Voucher.loadPageByMenu(value);
    //}
    callback(value);
  };*/

  remove = (targetKey)=>{
    let {tabsactions} = this.props;
    tabsactions.TabDel(targetKey);
    this.tabflag = true;
  };

  handleClick=(item)=>{
    let { logactions,modalactions,modal,tabsactions,tabs } = this.props;
    switch (item.key){
      case 'indextree':
        let indexopen = !modal.indexopen;
        modalactions.indexOpenClose(modal.indexopen);
        let pane = tabs.panes.filter((item)=>{
          return item.key === tabs.activeKey;
        })

        if(pane[0].indexopen === indexopen){
          tabsactions.onTreeChange(tabs.activeKey);
        }
        else {
          tabsactions.onRerander(tabs.activeKey,indexopen);
        }
        break;
      case 'logout':
        logactions.logout();
        this.props.history.pushState(null, '/login');
        break;
      case 'setting':
        modalactions.modalopen();
        break;
      default:
        break;
    }
  };

  componentWillMount(){
    let { user,logactions } = this.props;
    //if(!user.token){
      //if (user.loginStatus !== ActionStatus.SUCCEED) {
        //logactions.logout();
        //this.props.history.pushState(null, '/login')
        //setTimeout(()=>{}, 300)
      //}
    //}
  }

  render(){
    let { modal,tree,user } = this.props;
    let modalflag = modal['showModal'],
      //content = modal['content'],
      //modalWidth=modal.modalWidth,
      //modaltitle = modal['modaltitle'],
      TreeData = tree.TreeData;
      console.log(mockTree);
      TreeData = mockTree.data;
    /*if(!user.token) {
      if (user.loginStatus !== ActionStatus.SUCCEED) {
        this.props.history.pushState(null, '/login');
        //setTimeout(()=>{}, 300)
      }
    }*/
    return(
      <Row>
        <Col className="numtopleft">
          <Menu onClick={this.handleClick} mode="horizontal" theme="dark" >
            <Menu.Item key="indextree">
              <Icon type="bars" />
            </Menu.Item>
            <SubMenu title={<span><Icon type="user" />我的</span>}>
              <Menu.Item key="setting:1">个人中心</Menu.Item>
              <Menu.Item key="setting:2">我的设置</Menu.Item>
              <MenuItemGroup title="分组2">
                <Menu.Item key="setting:3">选项3</Menu.Item>
                <Menu.Item key="setting:4">选项4</Menu.Item>
              </MenuItemGroup>
            </SubMenu>
            <Menu.Item key="dyn" >
              <Icon type="star-o" />动态
            </Menu.Item>
            <Menu.Item key="app" >
              <Icon type="appstore" />应用
            </Menu.Item>
            <Menu.Item key="setting">
              <Icon type="setting" />设置
            </Menu.Item>
            <Menu.Item key="alipay">
              <a href="http://www.baidu.com/" target="_blank">导航四 - 链接</a>
            </Menu.Item>
            <Menu.Item key="logout">退出</Menu.Item>
            <Menu.Item >搜索</Menu.Item>
          </Menu>
        </Col>
      
        <Col span={4} className="treebg" xs={modal.lxs} sm={modal.lsm} md={modal.lmd} lg={modal.llg}>
          <Tree titleField='menu_name' keyField='menu_code'
            expendall={true}
            treeData={TreeData}
            onSelect={this.onClick}
          />
        </Col>
        <Col span={20} className="mainbg" xs={modal.rxs} sm={modal.rsm} md={modal.rmd} lg={modal.rlg}>
          <TabList/>
        </Col>
      </Row>

    )
  }
}
/*<Tabs
 hideAdd
 onChange={this.onTreeChange}
 activeKey={tabs.activeKey}
 type="editable-card"
 onEdit={this.onTreeEdit}
 >
 {this.list}
 </Tabs>*/
function mapStateToProps(state) {
  return {
    modal: state.modal.toJS(),
    tree : state.tree.toJS(),
    //meta : state.meta.toJS(),
    tabs : state.tabs.toJS(),
    user : state.user.toJS()
  }
}

function mapDispatchToProps(dispatch) {
  return {
    modalactions: bindActionCreators(modalactions, dispatch),
    treeactions : bindActionCreators( treeactions , dispatch ),
    tabsactions : bindActionCreators( tabsactions , dispatch ),
    logactions : bindActionCreators( logactions , dispatch )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Page);
