/*
属性			说明													类型		默认值
type		设置按钮类型，可选值为 primary ghost 或者不设			string	-
htmlType	设置 button 原生的 type 值							string	button
icon		设置按钮的图标类型									string	-
shape		设置按钮形状，可选值为 circle circle-outline 或者不设	string	-
size		设置按钮大小，可选值为 small large 或者不设			string	default
loading		设置按钮载入状态	boolean	false
onClick		click 事件的 handler	function	-
*/
import React from 'react';
import { Button } from 'antd';

export default class ButtonControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = { disabled: this.props.disabled, value: this.props.value, type: this.props.type, size: 'default', icon: this.props.icon, shape: this.props.shape };
  }
  componentDidMount() {
    //console.log('button model')
    //console.log(this.props.model)
    if (this.props.model)
    		this.props.model.addListener(this);
  }
  componentWillUnmount() {
    if (this.props.model)
      this.props.model.removeListener(this);
  }
  onClick() {
    if (this.props.model)
      this.props.model.fireEvent('click');
  }
  componentWillReceiveProps(nextProps) {

  }
  render() {
    if (this.props.model) {
      return (
        <Button disabled={this.state.disabled} icon={this.state.icon} type={this.state.type} shape={this.state.shape} size={this.state.size} onClick={e => this.onClick(e) }>{this.props.value}</Button>
      );
    } else {
      return <Button {...this.props}></Button>
    }
  }
}
