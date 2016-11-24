import React from 'react';
import { Row, Col, Input, Modal, Popover } from 'antd';
import classNames from 'classnames';
import label from './label';
import Tree from './tree';
import Button from './button';
import FixedDataTable from './table';
import SearchBox from './searchbox';
const InputGroup = Input.Group;
const ButtonGroup = Button.Group;

class TopToolBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vm: this.props.vm
    };
  }
  render() {
    const popContent = (
      <div>
        <p><a>升序排列</a></p>
        <p><a>降序排列</a></p>
      </div>
    );
    return (<Row>
      <Col span={8}>
        <SearchBox placeholder='请输入' model={this.props.vm.get('searchBox') }/>
      </Col>
      <Col span={6} offset={10}>
        <Popover content={popContent} title="标题" placement="bottom" trigger="hover">
          <Button type="ghost" icon="filter" shape='circle-outline' />
        </Popover>
        <Button type="ghost" icon="reload" shape='circle-outline' model={this.props.vm.get('reload') }/>
        <Button type="ghost" icon="setting" shape='circle-outline' model={this.props.vm.get('setting') }/>
      </Col>
    </Row>);
  }
};
class ReferModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      title: this.props.title,
      visible: this.props.visible
    };
  }
  componentWillReceiveProps(nextProps) {
    //nextProps.vm.get('table').addListener(this.refs.table);
    //nextProps.vm.get('tree').addListener(this.refs.tree);
    this.setState({
      visible: nextProps.visible
    });
  }
  handleCancel() {
    this.props.close();
    // this.setState({
    // 	visible:false
    // });
  }
  handleOk() {
    this.props.close();
    if (this.props.vm)
      this.props.vm.okClick();
  }
  render() {
    const referType = this.props.referType;
    let treeContent = '';
    let cardContent = '';
    if (referType == 'Tree') {
      treeContent = (<Col span={20} offset={2}>
        <Row>
          <Col>
            <TopToolBar vm={this.props.vm} />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Tree model={this.props.vm.get('tree') }/>
          </Col>
        </Row>
      </Col>);
    }
    else if (referType == 'TreeTable') {
      treeContent = (<Col span={6}>
        <Tree model={this.props.vm.get('tree') }/>
      </Col>);
      cardContent = (<Col span={18}>
        <TopToolBar vm={this.props.vm} />
        <Row>
          <Col>
            <FixedDataTable ref='table' model={this.props.vm.get('table') } width={600}/>
          </Col>
        </Row>
      </Col>);
    }
    else if (referType == 'Table') {
      cardContent = (<Col span={22} offset={1}>
        <Row>
          <TopToolBar vm={this.props.vm} />
        </Row>
        <Row>
          <FixedDataTable ref='table' model={this.props.vm.get('table') } width={800}/>
        </Row>
      </Col>);
    }

    let modalContent = (
      <Modal title={this.props.title} visible={this.state.visible} onOk={e => this.handleOk() } onCancel={e => this.handleCancel() } okText="确定" cancelText="取消" width={this.props.width}>
        <Row>
          {treeContent}
          {cardContent}
        </Row>
      </Modal>
    );
    let emptyContent = (<div></div>);
    return ((this.props.vm && this.props.referType) ? modalContent : emptyContent);
  }
}
export default class ReferControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focus: false,
      modalVisible: false,
      value: '',
      referType: '',
      width: 600,
      title: '参照'
    };
    this.onClick = this.onClick.bind(this);
    this.close = this.close.bind(this);
    this.handleBodyClick = this.handleBodyClick.bind(this);
  }
  componentDidMount() {
    if (this.props.model)
      this.props.model.addListener(this);
    if (this.props.focus)
      this.refs.input.refs.input.focus();
  }
  componentWillUnmount() {
    if (this.props.model)
      this.props.model.removeListener(this);
  }
  handleInputChange(e) {
    this.setState({
      value: e.target.value
    });
  }
  handleBodyClick(e){
    let input = this.refs.input.refs.input;
    let button= this.refs.div.children[0];
    let icon = button.children[0];
    if (e.target === input) return;
    document.body.removeEventListener('click', this.handleBodyClick);
    if (e.target === button || e.target === icon) return;
    if (this.props.model)
      this.props.model.execute('blur');
  }
  handleFocusBlur(e) {
    document.body.addEventListener('click', this.handleBodyClick);
 	}
  open(e) {
    let width = 820;
    if (e.referType == 'Tree') {
      width = 620;
    }
    this.setState({
      referType: e.referType,
      width: width,
      vm: e.vm,
      modalVisible: true
    });
  }
  close() {
    if (this.props.focus)
      this.refs.input.refs.input.focus();
    this.setState({ modalVisible: false });
  }
  setValue(value) {
    document.body.removeEventListener('click', this.handleBodyClick);
    this.setState({
      value: value
    });
  }
  onClick() {
    if (this.props.model)
      this.props.model.browse();
  }
  handleOnPressEnter(e) {
    if (this.props.model)
      this.props.model.fireEvent('pressEnter', this.state.value);
  }
  baseControl() {
    let baseControl;
    if (this.state.readOnly) {
      baseControl = <label>{this.state.value}</label>
    }
    else {
      const { style, size, placeholder } = this.props;
      let referTitle = '';
      if (this.props.title) {
        referTitle = <Col span={6}>{this.props.title}</Col>;
      }

      const btnCls = classNames({
        'ant-search-btn': true,
        //'ant-search-btn-noempty': !!this.state.value.trim(),
      });

      const searchCls = classNames({
        'ant-search-input': true,
        'ant-search-input-focus': this.state.focus,
      });
      //{this.props.cShowCaptionaa ? <Col span={6}>{this.props.cShowCaptionaa}</Col> : null}
      baseControl = (
        <Row>
          <Col span={24}>
          <div className="ant-search-input-wrapper" style={style}>
            <InputGroup className={searchCls}>
              <Input ref="input" placeholder={placeholder} value={this.state.value} onFocus={e => this.handleFocusBlur(e) } onChange={e => this.handleInputChange(e) } onPressEnter={e => this.handleOnPressEnter(e) }/>
              <div ref="div" className="ant-input-group-wrap">
                <Button icon="search" className={btnCls} size={size} onClick={this.onClick}/>
                <ReferModal visible={this.state.modalVisible} close={this.close} title={this.props.title ? this.props.title : '参照'} vm={this.state.vm} referType={this.state.referType} width={this.state.width}/>
              </div>
            </InputGroup>
          </div>
          </Col>
        </Row>
      )
    }
    return baseControl;
  }
  getControl() {
    let control = (this.props.cShowCaption ? label(this.baseControl(), this.props.cShowCaption) : this.baseControl());
    return control;
  }
  render() {
    const control = this.getControl();
    return (
      <div>
        {control}
      </div>
    );
  }
}
