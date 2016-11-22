import React from 'react';
import { Steps } from 'antd';
const Step = Steps.Step;

export default class StepsControl extends React.Component{
	constructor(props){
		super(props);
		this.state= {
			direction:'',
			current:1,
			size:'default',
			data:[{status: 'finish',title: '已完成'}, {status: 'process', title: '进行中'}, {status: 'wait', title: '待运行'}, {status: 'wait', title: '待运行',}]
		};
	}
	componentDidMount(){
		if(this.props.model)
			this.props.model.addListener(this);
	}
	componentWillUnmount () {
      if (this.props.model)
        this.props.model.removeListener(this);
    }
	render(){
		const steps=this.state.data.map(function(item,index){
			if(item.icon)
				return <Step key={index} title={item.title} description={item.description} icon={item.icon}/>;
			else
				return <Step key={index} title={item.title} description={item.description} />;
		});
		
		return (
			<Steps direction={this.state.direction} current={this.state.current} size={this.state.size} status={this.state.status}>
			{steps}
			</Steps>
		)
	}
};
