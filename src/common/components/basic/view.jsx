/**
 * Created by wxk on 2016/7/6.
 */
import React , { Component } from 'react'
import {
  Tabs,
  Row,
  Col,
  Form,
  Menu,
  Select
  //Table
} from 'antd'
const Option = Select.Option

import Alert from './alert.jsx'
//import Cascader from "./cascader.jsx";
import CheckboxGroup from "./checkboxgroup.jsx";
import Button from "./button.jsx";
import DatePicker from "./datepicker.jsx";
//import Icon from './icon.jsx'
import Label from './label.jsx'
//import Menu from "./menu.jsx";
//import Message from "./message.jsx";
//import Notification from "./notification.jsx";
//import NumberBox from "./numberbox.jsx";
import Progress from "./progress.jsx";
import Radio from "./radio.jsx";
//import RadioButtonGroup from "./radiobuttongroup.jsx";
import RadioGroup from "./radiogroup.jsx";
//import RangePicker from "./rangepicker.jsx";
import Rate from "./rate.jsx";
import Refer from "./refer.jsx";
import Steps from "./steps.jsx";
import Switch from "./switch.jsx";
import Table from "./table.jsx";
//import "./test.jsx";
//import Input from "./textarea.jsx";./basic
import Input from './input.jsx'
//import Tip from "./tip.jsx";
import Tooltip from "./tooltip.jsx";
import Transfer from "./transfer.jsx";
import Tree from "./tree.jsx";
//import TreeData from "./treedata.jsx";
//import Upload from "./upload.jsx";
const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;
const MenuItemGroup = Menu.ItemGroup;

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
//import * as metaaction from '../../redux/modules/meta.jsx'
import * as tabsactions from '../../redux/modules/tabs.jsx'
//import { MetaViewModel } from '../index.jsx'

const TabPane = Tabs.TabPane;
//import '../../../../demo/node_modules/antd/dist/antd.css';
// import Parser from 'xml2js';//parseString
//import cb from '../cube'
/*
 * json*/
const data = {
  "code": 200,
  "message": "操作成功",
  "data": {
    "viewApplication": {
      "view": {
        "containers": [
          {
            "controls": [
              {
                "cFieldName": "cMemo",
                "cItemName": "cMemo",
                "cCaption": "备注",
                "cShowCaption": "备注",
                "iMaxLength": 255,
                "iFieldType": 1,
                "bMustSelect": false,
                "bHidden": false,
                "bCanModify": true,
                "iMaxShowLen": 255,
                "iColWidth": 200,
                "iAlign": 2,
                "bShowIt": true,
                "bIsNull": true,
                "cControlType": "Input",
                "iOrder": 9999,
                "bMain": true,
                "id": 1,
                "iParentId": 1
              },
              {
                "cFieldName": "ccuscode",
                "cItemName": "ccuscode",
                "cCaption": "客户编码",
                "cShowCaption": "客户编码",
                "iMaxLength": 255,
                "iFieldType": 1,
                "bMustSelect": false,
                "bHidden": false,
                "bCanModify": true,
                "iColWidth": 200,
                "iAlign": 2,
                "bShowIt": true,
                "bIsNull": false,
                "cControlType": "Input",
                "cRefType": "5",
                "iOrder": 9999,
                "bMain": true,
                "id": 3,
                "iParentId": 1
              }
            ],
            "cTplGroupName": "销售订单表头",
            "iOrder": 9999,
            "bMain": true,
            "cGroupControlType": "TabPage",
            "id": 1,
            "iParentId": 1
          },
          {
            "controls": [
              {
                "cFieldName": "cMemo",
                "cItemName": "cMemo",
                "cCaption": "备注",
                "cShowCaption": "备注",
                "iMaxLength": 255,
                "iFieldType": 1,
                "bMustSelect": false,
                "bHidden": false,
                "bCanModify": true,
                "iMaxShowLen": 255,
                "iColWidth": 200,
                "iAlign": 2,
                "bShowIt": true,
                "bIsNull": true,
                "cControlType": "Column",
                "iOrder": 9999,
                "bMain": false,
                "id": 2,
                "iParentId": 2
              },
              {
                "cFieldName": "cinvcode",
                "cItemName": "cinvcode",
                "cCaption": "存货编码",
                "cShowCaption": "存货编码",
                "iMaxLength": 255,
                "iFieldType": 1,
                "bMustSelect": true,
                "bHidden": false,
                "bCanModify": true,
                "iMaxShowLen": 255,
                "iColWidth": 100,
                "iAlign": 2,
                "bShowIt": true,
                "bIsNull": false,
                "cRefType": "1",
                "cRefId": "AA_Inventory",
                "cRefRetId": "cInvCode",
                "iOrder": 9999,
                "bMain": false,
                "id": 4,
                "iParentId": 2
              }
            ],
            "cTplGroupName": "销售订单表体",
            "iOrder": 9999,
            "bMain": false,
            "cGroupControlType": "Table",
            "id": 2,
            "iParentId": 1
          }
        ],
        "cTemplateName": "销售订单显示模版1",
        "iTplMode": 1,
        "iWidth": 10000,
        "cTemplateTitle": "销售订单",
        "id": 1,
        "iParentId": 1
      },
      "cBillName": "销售订单",
      "id": 1
    },
    "viewmodelApplication": {
      "viewmodel": {
        "iTplId": 1,
        "cTemplateName": "销售订单显示模版1",
        "iTplMode": 1,
        "entities": [
          {
            "cEntityName": "销售订单主表",
            "cDataSourceName": "SO_SOMain",
            "cPrimaryKey": "id",
            "iBillEntityId": 1,
            "bMain": true,
            "fields": [
              {
                "cFieldName": "cMemo",
                "cItemName": "cMemo",
                "cCaption": "备注",
                "cShowCaption": "备注",
                "iBillEntityId": 1,
                "iBillTplGroupId": 1,
                "iTplId": 1,
                "iMaxLength": 255,
                "iFieldType": 1,
                "bMustSelect": false,
                "bHidden": false,
                "bCanModify": true,
                "iMaxShowLen": 255,
                "bShowIt": true,
                "bIsNull": true,
                "cTplGroupName": "销售订单表头",
                "bMain": true,
                "cDataSourceName": "SO_SOMain",
                "id": 1,
                "iParentId": 1
              },
              {
                "cFieldName": "ccuscode",
                "cItemName": "ccuscode",
                "cCaption": "客户编码",
                "cShowCaption": "客户编码",
                "iBillEntityId": 1,
                "iBillTplGroupId": 1,
                "iTplId": 1,
                "iMaxLength": 255,
                "iFieldType": 1,
                "bMustSelect": false,
                "bHidden": false,
                "cRefType": "5",
                "bCanModify": true,
                "bShowIt": true,
                "bIsNull": false,
                "cTplGroupName": "销售订单表头",
                "bMain": true,
                "cDataSourceName": "SO_SOMain",
                "id": 3,
                "iParentId": 1
              }
            ],
            "id": 1,
            "iParentId": 1
          },
          {
            "cEntityName": "销售订单子表",
            "cDataSourceName": "SO_SODetails",
            "cPrimaryKey": "AutoId",
            "cForeignKey": "cSOCode",
            "iBillEntityId": 2,
            "bMain": false,
            "fields": [
              {
                "cFieldName": "cMemo",
                "cItemName": "cMemo",
                "cCaption": "备注",
                "cShowCaption": "备注",
                "iBillEntityId": 2,
                "iBillTplGroupId": 2,
                "iTplId": 1,
                "iMaxLength": 255,
                "iFieldType": 1,
                "bMustSelect": false,
                "bHidden": false,
                "bCanModify": true,
                "iMaxShowLen": 255,
                "bShowIt": true,
                "bIsNull": true,
                "cTplGroupName": "销售订单表体",
                "bMain": false,
                "cDataSourceName": "SO_SODetails",
                "id": 2,
                "iParentId": 2
              },
              {
                "cFieldName": "cinvcode",
                "cItemName": "cinvcode",
                "cCaption": "存货编码",
                "cShowCaption": "存货编码",
                "iBillEntityId": 2,
                "iBillTplGroupId": 2,
                "iTplId": 1,
                "iMaxLength": 255,
                "iFieldType": 1,
                "bMustSelect": true,
                "bHidden": false,
                "cRefType": "1",
                "cRefId": "AA_Inventory",
                "cRefRetId": "cInvCode",
                "bCanModify": true,
                "iMaxShowLen": 255,
                "bShowIt": true,
                "bIsNull": false,
                "cTplGroupName": "销售订单表体",
                "bMain": false,
                "cDataSourceName": "SO_SODetails",
                "id": 4,
                "iParentId": 2
              }
            ],
            "id": 2,
            "iParentId": 1
          }
        ],
        "id": 1,
        "iParentId": 1
      },
      "iBillId": 1,
      "cBillName": "销售订单",
      "cBillNo": "17",
      "iSystem": 1,
      "id": 1
    }
  }
}
//JSON.parse
const spanv={
  "1" : "col-xs-1",
  "2" : "col-xs-2",
  "3" : "col-xs-3",
  "4" : "col-xs-4",
  "5" : "col-xs-5",
  "6" : "col-xs-6",
  "7" : "col-xs-7",
  "8" : "col-xs-8",
  "9" : "col-xs-9",
  "10" : "col-xs-10",
  "11" : "col-xs-11",
  "12" : "col-xs-12",
  "13" : "col-xs-13",
  "14" : "col-xs-14",
  "15" : "col-xs-15",
  "16" : "col-xs-16",
  "17" : "col-xs-17",
  "18" : "col-xs-18",
  "19" : "col-xs-19",
  "20" : "col-xs-20",
  "21" : "col-xs-21",
  "22" : "col-xs-22",
  "23" : "col-xs-23",
  "24" : "col-xs-24"
};

var controlKey = 0;
function show(content){
  if(false){
    console.log(content);
  }
}

class Meta extends Component {
  constructor(props){
    super(props);
  }

  componentWillMount(){
    let timestamp=new Date().getTime();
    console.log('timestamp-begin'+timestamp);
  }

  componentDidMount(){
    this.props.vm.addListener(this);
    let timestamp=new Date().getTime();
    console.log('timestamp-end'+timestamp);
  }

  communication(action){
    // action.type, action.payload
    let {tabsactions} = this.props;
    let timestamp = new Date().getTime();
    tabsactions.TabAdd({
      title: action.payload.menuName,
      index: timestamp,
      content: {
        vm:action.payload.vm,
        metaData:action.payload.metaData
      }
    });
  }

  shouldComponentUpdate = (nextProps, nextState)=>{
    console.log('this.props.id:'+this.props.id+'nextProps.id:'+nextProps.id);
    console.log(nextProps.id !== this.props.id);
    return nextProps.id !== this.props.id;
  };

  comAlign(list,coms,callback){
    let comArray = [];
    let top = [],
      bottom = [],
      left = -1;
    list.forEach((ele,i)=>{
      if(ele.cAlign){
        console.log(ele.cAlign);
        switch (ele.cAlign.toLowerCase()){
          case 'top':
            console.log('push top');
            console.log(ele);
            top.push(i);
            comArray.push(coms[i]);
            comArray.push(<p>------------------------------------{'top'}-{i}--------------------------------------</p>);
            break;
          case 'left':
            left = i;
            comArray.push(<div style="float: left;width: 25%">{coms[i]}</div>);
            break;
          case 'bottom':
            console.log('push bottom');
            console.log(ele);
            bottom.push(i);
            break;
          default:
            break;
        }
      }
    });
    //comArray
    if(top.length>0){
      coms.forEach((ele,i)=>{
        if(-1===top.indexOf(i)){
          if(-1===bottom.indexOf(i)){
            comArray.push(ele);
            comArray.push(<p>-------------------------------------{i}--------------------------------------</p>);
          }
        }
      })
      bottom.forEach((ele)=>{
        console.log('push bottom');
        console.log(ele);
        comArray.push(coms[ele]);
        comArray.push(<p>------------------------------------{'bottom'}-{ele}--------------------------------------</p>);
      })
    }
    else {
      if(left!==-1){
        let comsTemp = [];
        coms.forEach((ele,i)=>{
          if(i!==left){
            comsTemp.push(ele);
          }
        });
        comArray.push(<div style="float: left;width: 75%">{comsTemp}</div>);
      }
    }
    callback(comArray);
  }

  parseControlrMeta(meta,callback){
    if(!meta){
      return;
    }
    let
      component,
      cCaption = meta.cShowCaption,
      cControlType = meta.cControlType;
    if(!cControlType){
      return;
    }
    show('cCaption');
    show(cCaption);
    show('cControlType');
    show(cControlType.toLowerCase());
    //cCaption = cControlType;
    switch (cControlType.toLowerCase()){
      case 'button':
        component = (
          <Col xs={2} sm={2} md={2} lg={2}>
            <Button
              value={cCaption}
              model = {this.props.vm.get(meta.cItemName)}
              {...meta}
            />
          </Col>
        );
        break;
      case 'checkbox':
        component = (
          <Col xs={24} sm={24} md={6} lg={4}>
            <Button
              model = {this.props.vm.get(meta.cItemName)}
              {...meta}>{cCaption}</Button>
          </Col>
        );
        break;
      case 'cascader':
        component = (
          <Col xs={24} sm={24} md={6} lg={4}>
            <Cascader
              model = {this.props.vm.get(meta.cItemName)}
              {...meta}/>
          </Col>
        );
        break;
      case 'checkboxGroup':
        component = (
          <Col xs={24} sm={24} md={6} lg={4}>
            <CheckboxGroup
              model = {this.props.vm.get(meta.cItemName)}
              {...meta}/>
          </Col>
        );
        break;
      case 'datepicker':
        //model={this.state.vm.get(meta.field)}
        component = (
          <Col xs={8}>
            <DatePicker
              model = {this.props.vm.get(meta.cItemName)}
              {...meta}/>
          </Col>
        );
        break;
      case 'icon':
        component = (
          <Col xs={24} sm={24} md={6} lg={4}>
            <Icon
              model = {this.props.vm.get(meta.cItemName)}
              {...meta}/>
          </Col>
        );
        break;
      case 'input':
        component = (
          <Col xs={8}>
            <Input
              model = {this.props.vm.get(meta.cItemName)}
              {...meta}/>
          </Col>
        );
        break
      case 'message':
        component = (
          <Col xs={24} sm={24} md={6} lg={4}>
            <Message
              model = {this.props.vm.get(meta.cItemName)}
              {...meta}/>
          </Col>
        );
        break;
      case 'menuitem':
        //<Col xs={24} sm={24} md={6} lg={4}>
        component = (
          <Button
            value={cCaption}>
            {cCaption}
          </Button>
        );
        break;
      case 'notification':
        component = (
          <Col xs={24} sm={24} md={6} lg={4}>
            <Notification
              model = {this.props.vm.get(meta.cItemName)}
              {...meta} />
          </Col>
        );
        break;
      case 'numberBox':
        component = (
          <Col xs={24} sm={24} md={6} lg={4}>
            <NumberBox
              model = {this.props.vm.get(meta.cItemName)}
              {...meta}/>
          </Col>
        );
        break;
      case 'progress':
        component = (
          <Col xs={24} sm={24} md={6} lg={4}>
            <Progress
              model = {this.props.vm.get(meta.cItemName)}
              {...meta}/>
          </Col>
        );
        break;
      case 'radio':
        component = (
          <Col xs={24} sm={24} md={6} lg={4}>
            <Radio
              model = {this.props.vm.get(meta.cItemName)}
              {...meta}/>
          </Col>
        );
        break;
      case 'rate':
        component = (
          <Col xs={24} sm={24} md={6} lg={4}>
            <Rate
              model = {this.props.vm.get(meta.cItemName)}
              {...meta}/>
          </Col>
        );
        break;
      case 'refer':
        component = (
          <Col xs={24} sm={24} md={12} lg={8}>
            <Refer
              value={cCaption}
              model = {this.props.vm.get(meta.cItemName)}
              {...meta}
            />
          </Col>
        );
        break;
      case 'steps':
        component = (
          <Col xs={24} sm={24} md={6} lg={4}>
            <Steps
              model = {this.props.vm.get(meta.cItemName)}
              {...meta}
            />
          </Col>
        );
        break;
      case 'spliter':
        component = (
          <Col xs={1} sm={1} md={1} lg={1}>
            <p>spliter</p>
          </Col>
        );
        break;
      case 'switch':
        component = (
          <Col xs={24} sm={24} md={6} lg={4}>
            <Switch
              model = {this.props.vm.get(meta.cItemName)}
              {...meta}
            />
          </Col>
        );
        break;
      case 'textbox':
        component = (
          <Col xs={2} sm={2} md={2} lg={2}>
            <p>{cCaption}</p>
          </Col>
        );
        break;
      case 'tip':
        component = (
          <Col xs={24} sm={24} md={6} lg={4}>
            <Tip  />
          </Col>
        );
        break
      case 'tooltip':
        component = (
          <Col xs={24} sm={24} md={6} lg={4}>
            <Tooltip  />
          </Col>
        );
        break
      case 'transfer':
        component = (
          <Col xs={24} sm={24} md={6} lg={4}>
            <Transfer  />
          </Col>
        );
        break
      case 'treeData':
        component = (
          <Col xs={24} sm={24} md={6} lg={4}>
            <TreeData  />
          </Col>
        );
        break
      case 'upload':
        component = (
          <Col xs={24} sm={24} md={6} lg={4}>
            <Upload  />
          </Col>
        );
        break//       TreeData Upload
      default :
        component = (<div>{cCaption}</div>);
        break;
    }
    if(callback) {
      callback(component);
    }
  };

  parseContainerMeta(meta,com,callback){
    let component;

    if(!meta){
      return;
    }
    let cCaption = meta.cCaption;
    let
      cTplGroupName = meta.cTplGroupName,
      cControlType = meta.cControlType,
      cName = meta.cName;
    if(!cControlType){
      return;
    }
    show('Con-cControlType');
    show(cControlType);
    show(cControlType.toLowerCase());
    switch (cControlType.toLowerCase()){
      case 'toolbar':
        //show(meta.iCols);
        show(cName);
        show(cCaption);
        //show(spanv[meta.colspan])
        if(com) {
          component = (
            <Row>
              <Col xs={24} sm={24} md={18} lg={20}>
                {com}
              </Col>
            </Row>
          );
        }
        break;
      case 'group':
        //TabPane tab={cCaption} key={controlKey}
        show('controlKey');
        show(controlKey);
        if(com){
          show(com);
          show(cCaption);
          component = (
            <TabPane tab={cName} key={controlKey.toString()}>
              {com}
            </TabPane>
          );
          controlKey++;
        }
        break;

      case 'tabpage':
       //Tabs
       controlKey = 1;
       show('controlKey');
       show(controlKey);
       if(com) {
       show(com);
       component = (
       <Row>
       <Tabs>
       {com}
       </Tabs>
       </Row >
       );
       }
       break;
      case 'header':
      case 'footer':
        //TabPane tab={cCaption} key={controlKey}
        show('controlKey');
        show(controlKey);
        if(com){
          show(com);
          show(cCaption);
          component = (
            <Form horizontal className="ant-advanced-search-form">
              <Row gutter={16}>
                {com}
              </Row>
            </Form>
          );
          controlKey++;
        }
        break;
      case 'table':
        //TabPane tab={cCaption} key={controlKey}
        show('controlKey');
        show(controlKey);
        if(com){
          show(com);
          show(cCaption);
          const columns = com.map((item, i) => {
            return {
              title: item.cShowCaption,
              dataIndex: item.cItemName,
              key: `${item.cShowCaption}-${i}`,
            }
          })
          const dataSource = [{
            key: '1',
            name: '胡彦斌',
            age: 32,
            address: '西湖区湖底公园1号'
          }, {
            key: '2',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号'
          }]
          //dataSource={dataSource} columns={columns}
          component = (<Table model = {this.props.vm.get(meta.childrenField || meta.cDataSourceName)}/>)
        }
        break;
      /*case 'TabPage':
        //Tabs
        controlKey = 1;
        show('controlKey');
        show(controlKey);
        if(com) {
          show(com);
          component = (
            <div>
              {com}
            </div>
          );
        }
        break;*/
      case 'grid':
        if(com) {
          component = (
            <Row>
              {com}
            </Row>
          );
        }
        break;
      case 'menu':
        if(com) {
          component = (
            <Select>
              {com}
            </Select>
          );
        }
        break;
      case 'submenu':
        if(com) {
          component = (
            <Row>
              {com}
            </Row>
          );
        }
        break;
      case 'tree':
        if(com) {
          component = (
            <Row>
              {com}
            </Row>
          );
        }
        break;
      case 'radiogroup':
        if(com) {
          component = (
            <Row>
              {com}
            </Row>
          );
        }
        break;//Menu
      case 'datagrid':
        component = (
          <Row>
            {com}
          </Row>
        );
        break;
      default :
        component = (<Row>{com}</Row>);
        break;
    }
    if(callback){
      callback(component);
    }
  };

  parseColumn(column,callback){
    let con,
      componentArr = [];
    let i=1;
    show('column');
    column.forEach((ele)=>{
      show('column-'+i);
      show(ele);
      this.parseControlrMeta(ele,(com)=>{
        con = com;
      });
      show(con);
      componentArr.push(con);
      i++;
    });
    if(callback) {
      callback(componentArr);
    }
  };

  parseControl(control,callback){
    let con,
      componentArr = [];
    let i=1;
    show('control');
    control.forEach((ele)=>{
      show('Control-'+i);
      show(ele.$);
      if(ele.column){
        //show(containerele.control);
        this.parseColumn(ele.column,(com)=>{
          con = com;
        });
        this.parseContainerMeta(ele,con,(com)=>{
          con = com;
        });
      }
      else {
        //if(ele.control){
        if(ele.controls){
          show('eleControl');
          show(ele);
        }
        this.parseControlrMeta(ele,(com)=>{
          con = com;
        });
        //show(con);
      }

      show(con);
      componentArr.push(con);
      i++;
    });
    if(callback) {
      callback(componentArr);
    }
  };

  parseContainer(ele,callback){
    let componentArr = [];
    let i=1,
      j=1;
    //show('parseContainer ok')
    let con;
    //show(ele)
    //show('container');
    //show(ele.container);
    if(ele){
      ele.forEach((containerele)=>{
        show('Container-'+i);
        this.parseContainerMeta(containerele);
        if(containerele.containers){
          this.parseContainer(containerele.containers,(com)=>{
            con = com;
          });
        }
        else {
          if(containerele.controls){
            this.parseControl(containerele.controls,(com)=>{
              con = com;
            });
          }
          //show(con);
        }
        show(con);
        show('parseContainerMeta');
        this.parseContainerMeta(containerele,con,(com)=>{
          con = com;
        });
        show('component-'+j);
        //show(con);
        show('push');
        show(con);
        componentArr.push(con);
        j++;
      });
      i++;
      let flag = false;
      /*if(-1!==ele.indexOf('cAlign')){
        console.log('cAlign ok');
        flag = true;
      }*/
      ele.forEach((e)=>{
        if(e.cAlign){
          flag = true;
        }
      })
      if(flag){
        console.log('cAlign');
        //console.log(ele[0]);
        this.comAlign(ele,componentArr,(comArray)=>{
          componentArr = comArray;
        })
      }
    }
    if(callback) {
      callback(componentArr);
    }
  };

  parseView(viewArray,callback){
    let com,
      componentArr = [],
      { meta } = this.props,
      { vm } = meta;
    show(viewArray);
    if(viewArray){
      let containerArray = viewArray.containers;
      if(containerArray){
        this.parseContainer(containerArray,(component)=>{
          com = component;
        });
      }

      //<MetaView {...viewmeta} key="MetaView" />
      //componentArr.push(<MetaViewModel vm={vm} key="MetaViewModel" />);
      componentArr.push(com);
      if(callback) {
        callback(componentArr);
      }
    }
  };

  render(){
    let array = [],
      { metaData }=this.props,
      jsonData;
    if(metaData){
      show('jsonData--');
      show(metaData);//viewApplication['data']['viewApplication']
      let viewarray = metaData['view'];//[0]['container']['data']['viewApplication']['view']
      this.parseView(viewarray,(componentArr)=>{
        array = componentArr;
      });
      show(array)
      let timestamp=new Date().getTime();
      console.log('meta-timestamp'+timestamp);
    }
    return(
      <div>
        {array}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    //modal: state.modal.toJS(),
    //tree : state.tree.toJS(),
    //meta : state.meta.toJS(),
    tabs : state.tabs.toJS()
  }
}

function mapDispatchToProps(dispatch) {
  return {
    //metaaction : bindActionCreators(metaaction, dispatch),
    //modalactions: bindActionCreators(modalactions, dispatch),
    //treeactions : bindActionCreators(treeactions , dispatch)//['view']
    tabsactions : bindActionCreators( tabsactions , dispatch )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Meta);
