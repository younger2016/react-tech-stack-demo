//进度条
import React from 'react';
import { Progress } from 'antd';

export default class ProgressControl extends React.Component{
	constructor(props) {
    	super(props);
    	this.state = {type:'line',percent:0,status:'active',showInfo:true,strokeWidth:10,width:132};
  	}
    componentDidMount () {
    	if (this.props.model)
    		this.props.model.addListener(this);
    }
    componentWillUnmount () {
      if (this.props.model)
        this.props.model.removeListener(this);
    }
    format (percent){
    	return percent+'%';
    }
    render () {
        return (
            <Progress type={this.state.type} percent={this.state.percent} format={this.format} status={this.state.status} showInfo={this.state.showInfo} strokeWidth={this.state.strokeWidth} width={this.state.width}      />
        );
    }
}
