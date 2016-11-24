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
  //Select
  //Table
} from 'antd'
const Option = Select.Option

import Alert from './alert'
//import Cascader from "./cascader";
import CheckboxGroup from "./checkboxgroup";
import Menu1 from "./menu";
import Button from "./button";
import DatePicker from "./datepicker";
//import Icon from './icon'
import Label from './label'
//import Menu from "./menu";
//import Message from "./message";
//import Notification from "./notification";
//import NumberBox from "./numberbox";
import Progress from "./progress";
import Radio from "./radio";
//import RadioButtonGroup from "./radiobuttongroup";
import RadioGroup from "./radiogroup";
//import RangePicker from "./rangepicker";
import Rate from "./rate";
import Refer from "./refer";
import Steps from "./steps";
import Switch from "./switch";
import Table from "./table";
//import "./test";
//import Input from "./textarea";./basic
import Input from './input';
import Select from './select';
//import Tip from "./tip";
import Tooltip from "./tooltip";
import Transfer from "./transfer";
import Tree from "./tree";
import ConvenientQuery from "./convenientquery"
//import TreeData from "./treedata";
//import Upload from "./upload";
const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;
const MenuItemGroup = Menu.ItemGroup;

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
//import * as metaaction from '../../redux/modules/meta'
import * as tabsactions from '../../redux/modules/tabs'
//import { MetaViewModel } from '../index'

const TabPane = Tabs.TabPane;
//import '../../../../demo/node_modules/antd/dist/antd.css';
// import Parser from 'xml2js';//parseString
//import cb from '../cube'
/*
 * json*/

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
    console.log(this.props.id);
  }

  componentDidMount(){
    if(this.props.vm){
      this.props.vm.addListener(this);
      let timestamp=new Date().getTime();
      console.log('timestamp-end'+timestamp);
    }
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

  comAlign = (list,coms,callback)=>{
    let comArray = [],
      topComs = [],
      bottomComs = [],
      leftComs = [],
      otherComs = [],
      left = -1;

    list.forEach((ele,i)=>{
      //console.log('container-i:'+i);
      if(ele.cAlign){
        //console.log(ele.cAlign);
        switch (ele.cAlign.toLowerCase()){
          case 'top':
            topComs.push(coms[i]);
            //topComs.push(<p>------------------------------------{'top'}-{i}--------------------------------------</p>);
            break;
          case 'left':
            left = i;
            leftComs.push(coms[i]);
            break;
          case 'bottom':
            bottomComs.push(coms[i]);
            //bottomComs.push(<p>------------------------------------{'bottom'}-{i}--------------------------------------</p>);
            break;
          default:
            otherComs.push(coms[i]);
            //otherComs.push(<p>-------------------------------------{i}--------------------------------------</p>);
            break;
        }
      }
      else {
        otherComs.push(coms[i]);
        //otherComs.push(<p>-------------------------------------{i}--------------------------------------</p>);
      }
    });

    if(left!==-1){
      let rightComs = [];
      topComs.forEach((ele)=>{
        rightComs.push(ele);
      });
      otherComs.forEach((ele)=>{
        rightComs.push(ele);
      });
      bottomComs.forEach((ele)=>{
        rightComs.push(ele);
      });
      let com = (
        <Row ref="TreeTable">
          <Col span={4}>{leftComs}</Col>
          <Col span={20}>{rightComs}</Col>
        </Row>
      );
      comArray.push(com);
    }
    else {
      topComs.forEach((ele)=>{
        comArray.push(ele);
      })
      otherComs.forEach((ele)=>{
        comArray.push(ele);
      })
      bottomComs.forEach((ele)=>{
        comArray.push(ele);
      })
    }
    callback(comArray);
  };

  parseControlrMeta = (meta,callback)=>{
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
      case 'menu':
        component = (
          <Col xs={2} sm={2} md={2} lg={2}>
            <Menu1
              value={cCaption}
              model = {this.props.vm.get(meta.cItemName)}
              {...meta}
            />
          </Col>
        );
        break;
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
        break;
      case 'select':
        component = (
          <Col xs={8}>
            <Select
              model = {this.props.vm.get(meta.cItemName)}
              {...meta}/>
          </Col>
        );
        break;
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
        /*style={{
         float: 'left',
         width : '4px',
         //height: '100%',
         'border-left' : '1px solid #101010',
         color: '#333',
         backgroundColor: '#ccc'
         }}*/
        component = (
          <Col style={{
            float : 'left',
            width : '6px',
            height : '26px',
            'border-left' : '1px dashed #bcbcbc',
            'margin-left' : -9
            }}/>
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

  parseContainerMeta = (meta,width,com,callback)=>{
    let component;
    if(!meta){
      return;
    }
    let cCaption = meta.cCaption,
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
        component = (<Table width={width} model = {this.props.vm.get(meta.childrenField || meta.cDataSourceName)}/>);
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
        component = (
          <Row>
            {com}
          </Row>
        );
        /*if(com) {
        }*/
        break;
      case 'menu':
        component = (
          <Select>
            {com}
          </Select>
        );
        if(com) {

        }
        break;
      case 'submenu':
        component = (
          <Row>
            {com}
          </Row>
        );
        if(com) {

        }
        break;
      case 'tree':
        component = (<Tree model = {this.props.vm.get(meta.cDataSourceName)}/>);
        break;
      case 'radiogroup':
        component = (
          <Row>
            {com}
          </Row>
        );
        if(com) {

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

  parseColumn = (column,callback)=>{
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

  parseControl = (control,callback)=>{
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

  parseContainer = (containers,width,callback)=>{
    let componentArr = [];
    let i=1,
      j=1;
    //show('parseContainer ok')
    let con;
    let flag = false;
    //show(ele)
    //show('container');
    //show(ele.container);

    if(containers){
      let comWidth = width;
      containers.forEach((containerele)=>{
        if(containerele.cAlign) {
          flag = true;
          if(containerele.cAlign==='left'){
            comWidth = parseInt((width*5)/6);
            //console.log('this.width');
            //console.log(this.width);
          }
        }
        show('Container-'+i);
        //this.parseContainerMeta(containerele);
        if(containerele.containers){
          this.parseContainer(containerele.containers,width,(com)=>{
            con = com;
          });
        }
        else {
          if(containerele.controls){
            this.parseControl(containerele.controls,(com)=>{
              con = com;
            });
          }
          /*else {
            con = null;
          }*/
          //show(con);
        }
        show(con);
        show('parseContainerMeta');
        this.parseContainerMeta(containerele,comWidth,con,(com)=>{
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
      if(flag){
        console.log('cAlign');
        //console.log(ele[0]);
        this.comAlign(containers,componentArr,(comArray)=>{
          componentArr = comArray;
        })
      }
      //<MetaView {...viewmeta} key="MetaView" />
      //componentArr.push(<MetaViewModel vm={vm} key="MetaViewModel" />);
      //componentArr.push(com);

    }
    if(callback) {
      callback(componentArr);
    }
  };

  parseView = (viewArray,callback)=>{
    let com = [],
      componentArr = [],
      { meta } = this.props,
      { vm } = meta;
    show(viewArray);
    if(viewArray){
      let containerArray = viewArray.containers;
      if(containerArray){
        //this.width = ;
        //console.log('this.width');
        //console.log(this.width);
        /*let aliIndex = containerArray.indexOf('cAlign');
         if(-1 !== aliIndex){
         if('left' === containerArray[aliIndex]){
         this.width = parseInt((this.props.width*5)/6);
         }
         }*/
        /*containerArray.forEach((e)=>{
          if(e.cAlign){
            if(e.cAlign==='left'){
              this.width = parseInt((this.props.width*5)/6);
              //console.log('this.width');
              //console.log(this.width);
            }
          }
        })*/
        this.parseContainer(containerArray,this.props.width,(component)=>{
          componentArr = component;
        });
      }
      /*if(-1!==ele.indexOf('cAlign')){
       console.log('cAlign ok');
       flag = true;
       }*/
    }
    if(callback) {
      callback(componentArr);
    }
  };

  render(){
    let array = [],
      { metaData }=this.props,
      jsonData;
    if(metaData){
      show('jsonData--');
      show(metaData);//viewApplication['data']['viewApplication']
      switch (metaData.cBillType){
        case 'VoucherList':
          array.push(<ConvenientQuery model={this.props.vm}/>);
          break;
        default:
          break;
      }
      let viewarray = metaData['view'];//[0]['container']['data']['viewApplication']['view']
      this.parseView(viewarray,(componentArr)=>{
        array.push(componentArr);
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
  };

}

function mapStateToProps(state) {
  return {
    //modal: state.modal.toJS(),
    //tree : state.tree.toJS(),
    meta : state.meta.toJS(),
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
