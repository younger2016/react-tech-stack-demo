/*
按钮单选框
参数				说明						类型					可选值				默认值
onChange		选项变化时的回调函数		Function(e:Event)	无					无
value			用于设置当前选中的值		String				无					无
defaultValue	默认选中的值				String				无					无
size			大小，只对按钮样式生效	String				large default small	default
 */
import React from 'react';
import { Radio } from 'antd';
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

export default class RadioGroupControl extends React.Component{
	constructor(props) {
    	super(props);
    	this.state = {type:'button',value:'beijing',size:'default',data:[{key:1,value:'beijing',name:'北京',disabled:false,},{key:2,value:'shanghai',name:'上海',disabled:false,}]};
  	}
    componentDidMount  () {
    	if (this.props.model)
    		this.props.model.addListener(this);
    }
    componentWillUnmount () {
      if (this.props.model)
        this.props.model.removeListener(this);
    }
    handleInputChange (e){
        if (this.props.model)
    	   this.props.model.setData('value', e.target.value);
    }
    render () {
//  	const data = this.state.data.map(item => <Radio key={item.key} value={item.value}>{item.name}</Radio>);
		let data = this.state.data.map(function (item) {
			let type = this.state.type;
			
			if(type=='button'){
				return	<RadioButton key={item.key} disabled={item.disabled} value={item.value}>{item.name}</RadioButton>
			}else{
				return	<Radio key={item.key} disabled={item.disabled} value={item.value}>{item.name}</Radio>
			}
			
		}.bind(this));
        return (
            <RadioGroup value={this.state.value} size={this.state.size} onChange={e => this.handleInputChange(e)} >
			{data}
            </RadioGroup>
        );
    }
}
