import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Form, Input, Button, Checkbox, Select,Card,Row,Col } from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;

import { userLogin } from '../../redux/modules/user'
import ActionStatus from '../../constants/ActionStatus'
import { History } from 'react-router';
import * as logactions from '../../redux/modules/user'

class Login extends Component {
  constructor() {
    super()
    //this.handleLogin = this.handleLogin.bind(this)

  }
  /*componentWillMount = ()=>{
    let {user}=this.props,
      input = React.findDOMNode(this.refs.username);
    console.log(input);
    console.log(this.refs.username);
    input.value = user.username;
    if(user.username){
      this.username = user.username;
    }
    else {
    }
  }*/

  handleLogin = ()=>{
    this.props.userlogin('zhangsan', '002', '2')
  }

  handleSubmit = (e)=>{
    console.log('123');
    //const { getFieldProps } = this.props.form;
    e.preventDefault();
    let {logactions}=this.props;
    //console.log('收到表单值：', this.props.form.getFieldsValue());
    logactions.userLogin('zhangsan', '002', '2');
  }

  handleUserChange = (e)=>{
    this.setState({
      value: e.target.value,
    });
  }

  handleUserBlur = (e)=>{
    //console.log(e);//e.target.value
    //console.log(e.target);
    //console.log(e.target.value);
    let {logactions}=this.props;
    logactions.SetUserName(e.target.value);
    this.setState({
      focus: e.target === document.activeElement,
    });
  };

  handleUserFocus = (e)=>{
    this.setState({
      focus: e.target === document.activeElement,
    });
  };

  handlePasswordChange = (e)=>{
    this.setState({
      value: e.target.value,
    });
  };

  handlePasswordFocus = (e)=>{
    this.setState({
      focus: e.target === document.activeElement,
    });
  };

  handlePasswordBlur = (e)=>{
    let {logactions,user}=this.props;
    logactions.SetPassWord(user.UserName,e.target.value);
    this.setState({
      focus: e.target === document.activeElement,
    });
  };

  handleSelectChange = (value)=>{
    console.log(`selected ${value}`);
  };

  shouldComponentUpdate = (nextProps, nextState)=>{
    //let {user}=this.props;
    console.log('this.props.id:'+this.props.user.id+'nextProps.id:'+nextProps.user.id);
    console.log(nextProps.user.id !== this.props.user.id);
    return nextProps.user.id !== this.props.user.id;
  };

  render() {

    let optionList = [];
    const { user } = this.props;
    //const { getFieldProps } = this.props.form;

    if (user.loginStatus === ActionStatus.SUCCEED) {
      setTimeout(()=>{
        //window.location.href = '/saleorders'
        this.props.history.pushState(null, '/')
      }, 300)
    }/*{...getFieldProps('userName')}  {...getFieldProps('password')}  {...getFieldProps('agreement')}*/
    console.log('user.account');
    if(user.account){
      console.log(user.account);
      user.account.forEach((ele)=>{
        optionList.push(<Option value={ele.code}>{ele.accountname}</Option>);
      })
    }

    return (
      <div className="login-nav">
        <div className="login-nav">
          <span className="logintext m-l-5">账号登录</span>
        </div>
        <Row>
          <Col offset={12}>
            <Form horizontal onSubmit={this.handleSubmit}>
              <Card style={{width: 300}}>
                <FormItem>
                  <p>{user.errorMsg}</p>
                </FormItem>
                <FormItem
                  label="账户"
                >
                  <Input placeholder="请输入:账号/手机/邮箱"
                         onChange={this.handleUserChange}
                         onFocus={this.handleUserFocus}
                         onBlur={this.handleUserBlur}
                  />
                </FormItem>
                <FormItem
                  label="密码"
                >
                  <Input type="password" placeholder="请输入密码"
                         onChange={this.handlePasswordChange}
                         onFocus={this.handlePasswordFocus}
                         onBlur={this.handlePasswordBlur}
                  />
                </FormItem>
                <FormItem>
                  <Checkbox >记住我</Checkbox>
                </FormItem>
                <FormItem>
                  <Select showSearch
                          style={{ width: 200 }}
                          placeholder="请选择账套"
                          optionFilterProp="children"
                          notFoundContent="无法找到"
                          onChange={this.handleSelectChange}
                  >
                    {optionList}
                  </Select>
                </FormItem>
                <Button type="primary" htmlType="submit">登录</Button>
              </Card>
            </Form>
          </Col>
        </Row>
      </div>
    )
  }
}
/**/
const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user.toJS()
  }
}
function mapDispatchToProps(dispatch) {
  return {
    userlogin: bindActionCreators(userLogin, dispatch),
    logactions : bindActionCreators( logactions , dispatch )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)
