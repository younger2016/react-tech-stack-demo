/*
参数              说明                                          类型                  可选值                         默认值
type            【必须】声明 input 类型                     string                                              'text'
id              id                                          number 或 string
value           value 值                                     any
defaultValue    设置初始默认值                             any
size            控件大小                                        string              {'large','default','small'}     'default'
disabled        是否禁用状态，默认为 false                    bool                                                false
addonBefore     带标签的 input，设置前置标签                   node
addonAfter      带标签的 input，设置后置标签                   node
onPressEnter    按下回车的回调 function(e)
autosize        自适应内容高度，只对 type="textarea" 有效       bool or object  true or { minRows: 2, maxRows: 6 }  false
 */
import React from 'react';
import { Input, Row, Col } from 'antd';
import label from './label';


export default class InputControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue, type: 'defalut', size: 'default', disabled: false, addonBefore: '', addonAfter: '',
      placeholder: '', autosize: false
    };
    this.onPressEnter = this.onPressEnter.bind(this);
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
  //render前
  componentWillUpdate(nextProps, nextState) {
  }
  //render后
  componentDidUpdate(prevProps, prevState) {
  }
  // 监听外部props的变化, 如果变化了需要更新组件的state
  componentWillReceiveProps(nextProps) {
  }
  handleInputChange(e) {
    // if (this.props.model) {
    // 		this.props.model.setData('value', e.target.value);
    // } else {
    this.setState({
      value: e.target.value
    });
    // }
  }
  handleInputBlur(e) {
    if (this.props.model)
      this.props.model.setValue({mode:'blur',data:e.target.value});

  }
  onPressEnter(e) {
    if (this.props.model)
      this.props.model.setValue({mode:'enter',data:e.target.value});
  }
  baseControl() {
    return this.state.readOnly ? <label> {this.state.value} </label> :
      <Input ref='input' autosize={this.props.autosize} placeholder={this.props.placeholder} type={this.props.type} size={this.props.size} disabled={this.props.disabled} addonBefore={this.props.addonBefore} addonAfter={this.props.addonAfter} onPressEnter={this.onPressEnter} value={this.state.value} onBlur={e => this.handleInputBlur(e) }  onChange={e => this.handleInputChange(e) }/>
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
