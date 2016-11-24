import React from 'react';
import { Row, Col, Menu, Icon,Modal } from 'antd';
import FixedDataTable from './table'
import Meta from './view.js';
const SubMenu = Menu.SubMenu;
const MenuItem=Menu.Item;
const MenuItemGroup = Menu.ItemGroup;


export default class BillMakerModal extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			value:'',
			title:this.props.title,
			visible:this.props.visible
		};
	}
	componentWillReceiveProps(nextProps){
		this.setState({
			visible:nextProps.visible
		});
	}
	handleCancel(){
		this.props.close();
	}
	handleOk(){
	    this.props.close();
		if(this.props.data.vm){
			this.props.data.vm.okClick();
		}
	}
	render(){
		var width = document.body.clientWidth;
		var height = document.body.clientHeight;
		let modalContent= (
			 <Modal style={{ top: 0 ,height:height }} maskClosable={false} title={this.props.title} visible onOk={e=>this.handleOk()} onCancel={e=>this.handleCancel()} okText="确定" cancelText="取消" width={width}>
				<Row>
					<Meta width={width-50} vm={this.props.data.vm} metaData={this.props.data.viewmeta}/>
				</Row>
			</Modal>
		);
		return (modalContent);
	}
}
