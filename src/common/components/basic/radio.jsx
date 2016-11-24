/*
参数				说明									类型			默认值
checked			指定当前是否选中						Boolean		false
defaultChecked	初始是否选中							Boolean		false
value			根据 value 进行比较，判断是否选中		String		无
 */
import React from 'react';
import { Radio } from 'antd';

export default class RadioControl extends React.Component{
	constructor(props) {
    	super(props);
    	this.state = {value:'这是一个radio...',checked:''};
  	}
    componentDidMount () {
    	if (this.props.model)
    		this.props.model.addListener(this);
    }
    componentWillUnmount () {
      if (this.props.model)
        this.props.model.removeListener(this);
    }
    handleInputChange (e){
        if (this.props.model)
    	   this.props.model.setData('checked', e.target.checked);
    }
    render () {
        return (
            <Radio onChange={e => this.handleInputChange(e)}>{this.state.value}</Radio>
        );
    }
}
