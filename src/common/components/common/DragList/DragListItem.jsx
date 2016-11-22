import React, { Component, PropTypes } from 'react'

export default class DragListItem extends Component {
  render() {
    const { children } = this.props

    return (
      <div className="draglist-item">
        {children}
      </div>
    )
  }
}
