import React from 'react';
import { Switch } from 'antd';

export default class SwitchControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: false,
      checkedChildren: '开',
      unCheckedChildren: '关',
      defaultChecked: false,
      size: 'default',
      disabled: false,
      style: {}
    }
  }
  componentDidMount() {
    if (this.props.model)
      this.props.model.addListener(this);
  }
  componentWillUnmount () {
      if (this.props.model)
        this.props.model.removeListener(this);
    }
  onChange(value) {
    if (this.props.model)
      this.props.model.setData('value', value);
  }
  render() {
    return (
      <Switch checked = {this.state.value} size={this.state.size} style={this.state.style}
      disabled={this.state.disabled} onChange={e=>this.onChange(e)}  checkedChildren={this.state.checkedChildren}
      unCheckedChildren={this.state.unCheckedChildren} />
      );
  }
}
