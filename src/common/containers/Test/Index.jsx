import React, { Component } from 'react'
import { render } from 'react-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Router } from 'react-router';


import {
  Row,
  Col,
  Modal,
  Button,
  Select,
  Menu,
  Icon,
  Tabs,
  // Tree,
} from 'antd';


export class TestPage extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <Button>123</Button>
    )
  }
}
