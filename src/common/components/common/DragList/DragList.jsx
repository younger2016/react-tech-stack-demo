import React, { Component, PropTypes } from 'react'

if (process.env.__CLIENT__ === true) {
  require('./DragList.less')
}
import DragListItem from './DragListItem';

export default class DragList extends Component {
  render() {
    return (
      <div className="draglist">
        {this.props.children}
      </div>
    )
  }
}
