/**
 * Created by wxk on 2016/7/28.
 */
import React, { Component } from 'react'
import { render } from 'react-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import  Meta  from "../../components/basic/view";

import {
  Row,
  Col,
  Modal,
  Table,
  Button,
  Pagination,
  Slider,
  Tree,
  Menu,
  Icon,
  Tabs,
  Upload,
  Tooltip
  // Tree,
} from 'antd';
import  Refer  from "./refer";
import * as tabsactions from '../../redux/modules/tabs'
import * as modalactions from '../../redux/modules/modal'


const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const AppMenu = React.createClass({
  getInitialState() {
    return {
      current: 'mail',
    };
  },
  handleClick(e) {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  },
  render() {
    return (
      <Menu onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
      >
        <Menu.Item key="mail">
          <Icon type="mail" />Navigation One
        </Menu.Item>
        <Menu.Item key="app" disabled>
          <Icon type="appstore" />Navigation Two
        </Menu.Item>
        <SubMenu title={<span><Icon type="setting" />Navigation Three - Submenu</span>}>
          <MenuItemGroup title="Item 1">
            <Menu.Item key="setting:1">Option 1</Menu.Item>
            <Menu.Item key="setting:2">Option 2</Menu.Item>
          </MenuItemGroup>
          <MenuItemGroup title="Item 2">
            <Menu.Item key="setting:3">Option 3</Menu.Item>
            <Menu.Item key="setting:4">Option 4</Menu.Item>
          </MenuItemGroup>
        </SubMenu>
        <Menu.Item key="alipay">
          <a href="https://ant.design" target="_blank" rel="noopener noreferrer">Navigation Four - Link</a>
        </Menu.Item>
      </Menu>
    );
  },
});

const TreeNode = Tree.TreeNode;
const Demo = React.createClass({
  getDefaultProps() {
    return {
      keys: ['0-0-0', '0-0-1'],
    };
  },
  getInitialState() {
    const keys = this.props.keys;
    return {
      defaultExpandedKeys: keys,
      defaultSelectedKeys: keys,
      defaultCheckedKeys: keys,
    };
  },
  onSelect(info) {
    console.log('selected', info);
  },
  onCheck(info) {
    console.log('onCheck', info);
  },
  render() {
    return (
      <Tree className="myCls" showLine checkable
        defaultExpandedKeys={this.state.defaultExpandedKeys}
        defaultSelectedKeys={this.state.defaultSelectedKeys}
        defaultCheckedKeys={this.state.defaultCheckedKeys}
        onSelect={this.onSelect} onCheck={this.onCheck}
      >
        <TreeNode title="parent 1" key="0-0">
          <TreeNode title="parent 1-0" key="0-0-0" disabled>
            <TreeNode title="leaf" key="0-0-0-0" disableCheckbox />
            <TreeNode title="leaf" key="0-0-0-1" />
          </TreeNode>
          <TreeNode title="parent 1-1" key="0-0-1">
            <TreeNode title={<span style={{ color: '#08c' }}>sss</span>} key="0-0-1-0" />
          </TreeNode>
        </TreeNode>
      </Tree>
    );
  },
});

const TabPane = Tabs.TabPane;
const columns = [{
  title: '表格姓名',
  dataIndex: 'name',
}, {
  title: '表格年龄',
  dataIndex: 'age',
}, {
  title: '表格地址',
  dataIndex: 'address',
}];

const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `这里是用户的名字 ${i}`,
    age: '${i}',
    address: `这就是一个测试而已. ${i}`,
  });
}

const App = React.createClass({
  getInitialState() {
    return {
      selectedRowKeys: [],  // Check here to configure the default column
      loading: false,
    };
  },
  start() {
    this.setState({ loading: true });
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  },
  onSelectChange(selectedRowKeys) {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  },
  render() {
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          <Button type="primary" onClick={this.start}
            disabled={!hasSelected} loading={loading}
          >Reload</Button>
          <span style={{ marginLeft: 8 }}>{hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}</span>
        </div>
        <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
      </div>
    );
  },
});

class TabList extends Component {
  constructor(props){
    super(props);
    this.list = [];//渲染队列
    this.keylist =[];//维护渲染队列时候便于比对key值
    this.newmetaid = 0;
  }

  onTreeChange = (activeKey)=>{//tabs切换
    let {tabsactions,modal,tabs} = this.props,
      pane = tabs.panes.filter((item)=>{
        return item.key === activeKey;
      });
    if(pane.indexopen === modal.indexopen){
      tabsactions.onTreeChange(activeKey);
      //let timestamp=new Date().getTime();
      //console.log('timestamp'+timestamp);
      this.tabflag = true;
    }
    else {
      tabsactions.onRerander(activeKey,modal.indexopen);
    }
  };

  onTreeEdit = (targetKey, action)=>{//删除tab时候调用this.remove
    this[action](targetKey)
  };

  remove = (targetKey)=>{
    let {tabsactions} = this.props;
    tabsactions.TabDel(targetKey);
    this.tabflag = true;
  };

  /*shouldComponentUpdate = (nextProps, nextState)=>{
    console.log('this.props.id:'+this.props.id+'nextProps.id:'+nextProps.id);
    return nextProps.id !== this.props.id;
  };*/

  render(){



// benSky 新加的上传
    const props = {
      name: 'file',
      action: '/upload.do',
      headers: {
        authorization: 'authorization-text',
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };
// benSky 新加的上传

    let { tabs,tabsactions } = this.props;
    if(tabs.tabflag){//只有更新时候进入此分支
      let length = tabs.panes.length,//this.keylist.length>?this.keylist.length:tabs.panes.length;
        i=0,
        width = 0;
      if(this.refs.container){
        width = this.refs.container.clientWidth;
      }
      for(;i<length;i++){//遍历panes数组，更新tabs渲染队列
        let pane = tabs.panes[i];
        if(this.list[i]){
          if(pane.key!==this.keylist[i]){//如果遍历到的渲染队列的元素跟panes的对不上，则认为是已经删除，就把其从渲染队列中删除
            this.list.splice(i,1);
            this.keylist.splice(i,1);
          }
          else {
            if(tabs.activeKey===pane.key){
              if(pane.content!=='index') {
                if (pane.content.vm) {
                  this.list[i] = (<TabPane tab={pane.title} key={pane.key}>
                    <Meta width={width} vm={pane.content.vm} metaData={pane.content.metaData}
                          id={`meta${this.newmetaid++}`}/>
                  </TabPane>);
                }
              }
              /*else {//如果vm为空则认为是首页
                this.list[i] =(
                  <TabPane tab={pane.title} key={pane.key}>
                    <p/>这是首页桌面
                  </TabPane>);
                this.keylist.push(pane.key);
              }*/
            }
          }
        }
        else {//如果渲染队列比panes短，则将长出的元素放入渲染队列
          if(pane.content.vm){
            //const width = parseInt(this.refs.container.clientWidth / 100) * 100;
            this.list.push(<TabPane tab={pane.title} key={pane.key}>
              <Meta width={width} vm={pane.content.vm} metaData={pane.content.metaData} id={`meta${this.newmetaid++}`}/>
            </TabPane>);
            /*timestamp=new Date().getTime();
            console.log('timestamp2'+timestamp);*/
            this.keylist.push(pane.key);
          }
          else {//如果vm为空则认为是首页
            this.list.push(

              <TabPane tab={pane.title} key={pane.key}>

                  <Row className="bg">
                    <Col span={24} style={{border:'1px solid red'}}>
                        <Tooltip title="搞个提示试试">
                          <span>通栏布局</span>
                        </Tooltip> 
                    </Col>
                  </Row>

                  <Row>
                    <Col span={12} className="bg1">两列相等布局</Col>
                    <Col span={12} className="bg2">两列相等布局</Col>
                  </Row>

                  <Row>
                    <Col span={8} className="bg2">三列相等布局</Col>
                    <Col span={8} className="bg3">三列相等布局</Col>
                    <Col span={8} className="bg4">三列相等布局</Col>
                  </Row>

                  <Row gutter={16}>
                    <Col className="gutter-row" span={12}>
                      <div className="gutter-box">带间隔的布局</div>
                    </Col>
                    <Col className="gutter-row" span={12}>
                      <div className="gutter-box">带间隔的布局</div>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={4} className="bg5">这个不动</Col>
                    <Col span={4} className="bg" offset={4}><Tooltip placement="topLeft" title="左边提示 "><a href="#">这个右移4</a></Tooltip></Col>
                    <Col span={4} className="bg" offset={8}><Tooltip placement="topRight" title="右边提示"><a href="#">这个右移8</a></Tooltip></Col>
                  </Row>

                <Row>
                  <Col span={12} style={{border:'1px solid red'}}>
                    <h2>bensky_练习布局的使用</h2>
                    <Upload {...props}>
                      <Button type="ghost">
                        <Icon type="upload" /> 点击这里上传
                      </Button>
                    </Upload>
                    <Pagination showQuickJumper defaultCurrent={2} total={500} />
                    <Demo />
                    <Slider defaultValue={30} />
                    <Slider range defaultValue={[20, 50]} />
                    <Slider range defaultValue={[20, 50]} disabled />
                    <AppMenu />
                  </Col>
                  <Col span={12} style={{border:'1px solid red', background:'#fff', padding:30}}>
                    <App />
                  </Col>
                </Row>

              </TabPane>);

            this.keylist.push(pane.key);
          }
        }
      }
      if(this.list[i]){//如果遍历完成后list内容比panes多，则删除多余的pane
        this.list.splice(i,1);
        this.keylist.splice(i,1)
      }
      tabsactions.disableTabflag();
    }

    console.log(this.list);
    return(
      <div ref="container">
      <Tabs
        hideAdd
        onChange={this.onTreeChange}
        activeKey={tabs.activeKey}
        type="editable-card"
        onEdit={this.onTreeEdit}
      >
        {this.list}
      </Tabs>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    tabs : state.tabs.toJS(),
    modal: state.modal.toJS(),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    tabsactions : bindActionCreators( tabsactions , dispatch ),
    modalactions: bindActionCreators(modalactions, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabList);
