/*
成员				说明						类型				默认值
min				最小值					Number			-Infinity
max				最大值					Number			Infinity
value			当前值					Number	
step			每次改变步数，可以为小数	Number or String	1
defaultValue	初始值					Number		
disabled		禁用						Boolean			false
size			输入框大小				String			无
 */
import React from 'react';
import { InputNumber } from 'antd';

export default class InputNumberControl extends React.Component{
	constructor(props) {
    	super(props);
    	this.state = {value:'',min:-999999999,max:999999999,step:1,disabled:false,size:'default'};
  	}
    componentDidMount () {
    	if (this.props.model)
    		this.props.model.addListener(this);
    }
    componentWillUnmount () {
      if (this.props.model)
        this.props.model.removeListener(this);
    }
    onChange (value) {
    	if(this.props.model)
        	this.props.model.setData('value', value);
    }
    render () {
        return (
            <InputNumber min={this.state.min} max={this.state.max} step={this.state.step} disabled={this.state.disabled} size={this.state.size} value={this.state.value} onChange={e => this.onChange(e)} />
        );
    }
}
