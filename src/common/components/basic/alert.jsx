import React from 'react';
import { Alert } from 'antd';

export default class AlertControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: false,
      type: 'info',
      closable: false,
      closeText: null,
      title: '',
      description: null,
      showIcon: false,
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
  onClose() {
    if (this.state.onClose)
      this.state.onClose();
  }
  render() {
    return (
      <Alert message={this.state.title} description = {this.state.description}
      closable = {this.state.closable} onClose = {e=>this.onClose(e)} showIcon = {this.state.showIcon}
      type={this.state.type} closeText={this.state.closeText} />
      );
  }
}
