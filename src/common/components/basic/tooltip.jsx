import React from 'react';
import { Tooltip } from 'antd';

export default class TooltipControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'hehe1',
      html: '<span></span>',
      placement: 'top'
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
  getTooltipContainer() {}
  render() {
    return (
      <Tooltip placement="topLeft" title={this.state.title}>
        <span>{this.state.html}</span>
      </Tooltip>
    )
  }
}
