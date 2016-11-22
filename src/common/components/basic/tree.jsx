//import cb from '../cube.js';
import React from 'react';
import { Tree } from 'antd';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const TreeNode = Tree.TreeNode;

export class TreeControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expendall: this.props.expendall,
      multiple: this.props.multiple,
      checkable: this.props.checkable,
      defaultExpandAll: this.props.defaultExpandAll,
      keyField: this.props.keyField || 'key',
      titleField: this.props.titleField || 'title',
      dataSource: []
    };
    this.onSelect = this.onSelect.bind(this);
  }
  componentDidMount() {
    if (this.props.model)
      this.props.model.addListener(this);
  }
  componentWillUnmount() {
    if (this.props.model)
      this.props.model.removeListener(this);
  }
  onSelect(selectedKeys, e) {
    if (this.props.model)
      this.props.model.select(selectedKeys);
  }
  //function(selectedKeys, e:{selected: bool, selectedNodes, node, event})

  render() {
    const loop = data => data.map((item) => {
      if (item.children) {
        expandedKeys.push(item[keyField]);
        return <TreeNode data={item} title={item[titleField]} key={item[keyField]}>{loop(item.children) }</TreeNode>;
      }//item.key||item.menu_code
      expandedKeys.push(item[keyField]);
      return <TreeNode data={item} title={item[titleField]} key={item[keyField]} isLeaf={item.isLeaf} disabled={item.disabled} />;//onClick={}
    });
    let treeData, titleField, keyField;
    if (this.props.treeData) {
      treeData = this.props.treeData;
      titleField = this.props.titleField;
      keyField = this.props.keyField;
      /*console.log('tree props');
      console.log(treeData)*/
    }
    else {
      treeData = this.state.dataSource;
      titleField = this.state.titleField;
      keyField = this.state.keyField;
      /*console.log('tree state');
      console.log(treeData)*/
    }
    const expandedKeys = [];
    const treeNodes = loop(treeData);
    let treeProps = {
      multiple: this.state.multiple,
      checkable: this.state.checkable,
      // expandedKeys:expandedKeys,
      defaultExpandAll: this.state.defaultExpandAll
    };
    if (this.state.expendall) {
      treeProps.expandedKeys = expandedKeys;
    }
    return (
      <Tree onSelect={this.props.onSelect || this.onSelect} {...treeProps}>
        {treeNodes}
      </Tree>
    )
  }
};
export default TreeControl
/*function mapStateToProps(state){
	return {
		$$modal : state.modal
	}
}

function mapDispatchToProps(dispatch){
	return {
		modalactions : bindActionCreators( modalactions , dispatch )
	}
}

export default connect(
	mapStateToProps ,
	mapDispatchToProps
)();*/
