/*
参数					说明							类型					默认值
dataSource			数据源						Array				[]
render				每行数据渲染函数				Function(record)	
targetKeys			显示在右侧框数据的key集合		Array				[]
onChange			变化时回调函数				Function(targetKeys, direction, moveKeys)	
listStyle			两个穿梭框的自定义样式		Object	
className			自定义类						String	
titles				标题集合,顺序从左至右			Array				['源列表', '目的列表']
operations			操作文案集合,顺序从上至下		Array				[]
showSearch			是否显示搜索框				Boolean				false
searchPlaceholder	搜索框的默认值				String				'请输入搜索内容'
notFoundContent		当列表为空时显示的内容		React.node			'列表为空'
footer				底部渲染函数					Function(props)	
 */
import React from 'react';
import { Transfer } from 'antd';

export default class TransferControl extends React.Component{
	constructor(props) {
    	super(props);
    	this.state = {mockData:[],targetKeys:[],operations:[],titles:[],notFoundContent:'列表为空',searchPlaceholder:'请输入搜索内容'};
  	}
    componentDidMount () {
    	if (this.props.model)
    		this.props.model.addListener(this);
    }
    componentWillUnmount () {
      if (this.props.model)
        this.props.model.removeListener(this);
    }
    handleChange (targetKeys, direction, moveKeys) {
        this.props.model.setData('targetKeys', targetKeys);
    }
    render () {
        return (
            <Transfer operations={this.state.operations} titles={this.state.titles} showSearch notFoundContent={this.state.notFoundContent} searchPlaceholder={this.state.searchPlaceholder} dataSource={this.state.mockData} targetKeys={this.state.targetKeys} onChange={e => this.handleChange(e)} render={item => item.title} />
        );
    }
}
