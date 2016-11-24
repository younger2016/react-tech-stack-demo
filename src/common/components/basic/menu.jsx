import React from 'react';
import { Menu, Icon } from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;
const MenuItemGroup = Menu.ItemGroup;

export default class MenuControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    		theme: 'light',
    		mode: 'horizontal',
    		data: [
        {
          key: 'add', name: '新建', children: [
            { key: 'btnAdd', name: '新建空白单据' },
            { key: 'btnAddFromOrder', name: '从采购订单创建' }
          ]
        }
      ]
    };
    this.handleOnClick = this.handleOnClick.bind(this);
    this.close = this.close.bind(this);
  }
  componentDidMount() {
    if (this.props.model) {
      //this.props.model.addListener(this);
      this.recursive(this.state.data, function (key) {
        var model = this.props.model.getParent().get(key);
        if (model)
          model.addListener(this);
      });
    }
  }
  componentWillUnmount() {
    if (this.props.model) {
      //this.props.model.removeListener(this);
      this.recursive(this.state.data, function (key) {
        var model = this.props.model.getParent().get(key);
        if (model)
          model.removeListener(this);
      });
    }
  }
  recursive(data, callback) {
    data.forEach(function (item) {
      callback.call(this, item.key);
      if (item.children)
        this.recursive(item.children, callback);
    }, this);
  }
  handleOnClick(e) {
    if (this.props.model) {
      //this.props.model.fireEvent('click', e.key);
      var model = this.props.model.getParent().get(e.key);
      if (model)
        model.fireEvent('click');
    }
  }
  handleOnSelect(e) {
    console.log(e);
  }
  handleOnOpen(e) {
    console.log(e);
  }
  handleOnClose(e) {
    console.log(e);
  }
  communication(data) {
    this.setState({ external: data });
  }
  close() {
    this.setState({ external: null });
  }
  render() {
    var tProps = {
      theme: this.state.theme,
      mode: this.state.mode,
      onClick: this.handleOnClick
    };
    const loop = data => data.map((item) => {
      if (item.children) {
        return <SubMenu key={item.key} title={item.name}>{loop(item.children) }</SubMenu>;
      }
      return <MenuItem key={item.key}>{item.name}</MenuItem>;
    });
    var menuContent = (
      <Menu {...tProps}>
        {loop(this.state.data) }
    		</Menu>
    );
    if (this.state.external) {
      var com = require(this.state.external.com);
      if (com && com.default) {
        var array = [menuContent];
        array.push(<com.default data={this.state.external.data} close={this.close} width={820} />);
        return (<div>{array}</div>);
      }
    }
    return menuContent;
  }
};
