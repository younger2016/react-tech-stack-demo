/*
参数	                      说明	               类型	默认值
defaultValue	默认选中的选项	array		[]
value	              指定选中的选项	array		[]
options	              指定可选项	    array		[]
onChange	       变化时回调函数	Function(checkedValue)	
*/
import React from 'react';
import { Checkbox } from 'antd';
const CheckGroup = Checkbox.Group;

export default class CheckboxGroup extends React.Component{
	constructor(props) {
    	super(props);
    	this.state = {value:[],options:[{ label: '苹果', value: 'Apple' },{ label: '梨', value: 'Pear' },{ label: '橘', value: 'Orange',disabled: true  },]};
  	}
    componentDidMount () {
    	if (this.props.model)
    		this.props.model.addListener(this);
    }
    componentWillUnmount () {
        if (this.props.model)
            this.props.model.removeListener(this);
    }
    handleChange (e){
        if (this.props.model)
    	   this.props.model.setData('value', e);
    }
    render  () {
        return (
            <CheckGroup  value={this.state.value} options={this.state.options} onChange={e => this.handleChange(e)}/>
        );
    }
}
