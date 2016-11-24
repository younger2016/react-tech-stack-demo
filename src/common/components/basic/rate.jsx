/*
属性				说明					类型			默认值
count			star总数				Number		5
value			当前数，受控值		Number		-
defaultValue	默认值				Number		0
allowHalf		是否允许半选			Boolean		false
disabled		只读，无法进行交互	Boolean		false
 */
import React from 'react';
import { Rate } from 'antd';

export default class RateControl extends React.Component{
	constructor(props) {
    	super(props);
    	this.state = {value:0,allowHalf:true,disabled:false,count:10,showcount:false};
  	}
    componentDidMount () {
    	if (this.props.model)
    		this.props.model.addListener(this);
    }
    componentWillUnmount () {
      if (this.props.model)
        this.props.model.removeListener(this);
    }
    handleChange (number) {
        if (this.props.model)
            this.props.model.setData('value', number);
    }
    render () {
		const data=this.state.showcount?<span className="ant-rate-text">{this.state.value} 星</span>:'';
        return (
        	<span>
	            <Rate allowHalf={this.state.allowHalf} disabled={this.state.disable} count={this.state.count} value={this.state.value} onChange={e => this.handleChange(e)} />
	            {data}
	        </span>
        );
    }
}
