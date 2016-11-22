import React from 'react';
import { Row, Col, Modal, Dropdown, Tabs, Icon, Menu } from 'antd';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from './button';
import Input from './input';
import SearchBox from './searchbox';
//import QuerySchemeManager from '../QuerySchemeManager';

const TabPane = Tabs.TabPane;

class QueryItemContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            modalVisible: false,
            metaData: this.props.metaData,
        };
        this.handleClick = this.handleClick.bind(this);
    }
    componentWillReceiveProps(props) {
        this.setState({
            modalVisible: props.modalVisible
        });
    }
    handleMoreClick() {
        this.setState({
            modalVisible: true
        });
    }
    handleClick(e) {
        let params = this.props.metaData.vm.getData({});
        params.solutionid = this.props.metaData.tabKey;

        if (this.props.metaData.vm)
            this.props.metaData.vm.searchEvent(params);
    }
    render() {
        let self = this;
        let rowArray = new Array();
        const qvlength = this.props.metaData.QuickView && this.props.metaData.QuickView.Controls.length;
        let getCtrlModel = function (fieldName) {
            let ctrlModel = null;
            ctrlModel = self.props.metaData.CommonModel.length && self.props.metaData.CommonModel.filter(function (item) {
                return item.ItemName == fieldName;
            });
            return (ctrlModel && ctrlModel.length ? ctrlModel[0] : null);
        };
        this.props.metaData.QuickView && this.props.metaData.QuickView.Controls.forEach(function (item, index) {
            let ctrlModel = getCtrlModel(item.itemName);
            if (index < 6 && ctrlModel) {
                let rowItem = (<Col span={8}>
                    <Input cShowCaption={ctrlModel.cShowCaption} title={item.itemTitle} model={self.props.metaData.vm.get(item.itemName) }/>
                </Col>);
                rowArray.push(rowItem);
            }
        });
        return (<Row className={this.props.visible ? 'hide' : 'show'}>
            <Col span={18}>
                <Row>
                    {rowArray}
                </Row>
            </Col>
            <Col span={6}>
                {qvlength > 4 ? <Row /> : null}
                <Row>
                    <Col span={6}>
                        <Button type="primary" onClick={e => this.handleClick(e) } className='no-border-radius'>确定</Button>
                    </Col>
                    <Col span={12}>
                        <Button type="ghost" onClick={e => this.handleMoreClick(e) } className='no-border'>更多查询条件</Button>
                        <QueryModal modalVisible={this.state.modalVisible} title="方案详情" metaData={this.props.metaData}/>
                    </Col>
                </Row>
            </Col>
        </Row>)
    }
};

class QueryModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            visible: false,
            isShowMore: false
        };
    }
    componentWillReceiveProps(props) {
        this.setState({
            visible: props.modalVisible
        });
    }
    handleOk() {
        this.setState({
            visible: false,
        });
        let params = this.props.metaData.vm.getData({});
        params.solutionid = this.props.metaData.tabKey;

        if (this.props.metaData.vm)
            this.props.metaData.vm.searchEvent(params);
    }
    handleCancel() {
        this.setState({
            visible: false,
        });
    }
    handleMoreClick(e) {
        this.setState({
            isShowMore: true
        });
    }
    render() {
        let self = this;
        let fieldsArray = new Array();
        let getCtrlModel = function (fieldName) {
            let ctrlModel = null;
            ctrlModel = self.props.metaData.CommonModel.length && self.props.metaData.CommonModel.filter(function (item) {
                return item.ItemName == fieldName;
            });
            return (ctrlModel && ctrlModel.length ? ctrlModel[0] : null);
        };
        if (this.props.metaData.CommonView) {
            for (let i = 0; i < this.props.metaData.CommonView.Controls.length; i++) {
                if (!this.state.isShowMore && i > 8) {
                    let rowItem = (<Col span={20}>
                        <Button type="ghost" value='展开更多查询条件' onClick={e => this.handleMoreClick(e) }>展开更多查询条件</Button>
                    </Col>);
                    fieldsArray.push(rowItem);
                    break;
                }
                let item = this.props.metaData.CommonView.Controls[i];
                let ctrlModel = getCtrlModel(item.itemName);
                let rowItem = (<Col span={20}>
                    <Input cShowCaption={ctrlModel.cShowCaption} title={item.itemTitle} model={self.props.metaData.vm.get(item.itemName) }/>
                </Col>);
                fieldsArray.push(rowItem);
            }
        }

        return (
            <Modal title={this.state.title} visible={this.state.visible} onOk={e => this.handleOk() } onCancel={e => this.handleCancel() } okText="确定" cancelText="取消">
                <Row type="flex" justify="center">
                    {fieldsArray}
                </Row>
            </Modal>
        );
    }
};

export default class ConvenientQuery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true,
            metaData: {},
            menuData: []
        };
    }
    handleAreaClick() {
        this.setState({
            visible: !this.state.visible
        });
    }
    componentDidMount() {
        let self = this;
        let proxy = cb.rest.DynamicProxy.create({
            getSolutionList: {
                url: 'filterDesign/getSolutionList.do',
                method: 'POST',
                options: {
                    token: true
                }
            }
        });
        proxy.getSolutionList({ filterId: self.props.model.getParams().filterId }, function (err, data) {
            if (err) {
                console.error(err.message);
                return;
            }
            self.setState({ menuData: data });
            if (data.length)
                self.handleMenuClick(data[0].id);
        });
    }
    handleMenuClick(key) {
        if (typeof key == 'object')
            key = key.key;
        if (key == 'manage') {
            const filterId = this.props.model.getParams().filterId;
            this.refs.querySchemeManager.mergedProps.fetchQuerySchemes(filterId);
        }
        let self = this;
        let proxy = cb.rest.DynamicProxy.create({
            getCommonFilters: {
                url: 'filter/getcommonfilters.do',
                method: 'GET',
                options: {
                    unsure: false
                }
            }
        });
        proxy.getCommonFilters({ solutionid: key }, function (err, data) {
            if (err) {
                console.error(err.message);
                return;
            }
            let newvmFunc = new Function(data.vm);
            newvmFunc();
            data.vm = new cb.viewmodels[data.vmName]();
            data.tabKey = key;
            self.setState({ metaData: data });
        });
    }
    render() {
        let tabItem = new Array();
        let menuItem = new Array();

        if (this.state.menuData.length) {
            this.state.menuData.map(function (item, index) {
                if (index < 5)
                    tabItem.push(<TabPane tab={item.solutionName} key={item.id}></TabPane>);
                else
                    menuItem.push(<Menu.Item key={item.id}>{item.solutionName}</Menu.Item>);
            });
        }
        let menu = (
            <Menu onClick={e => this.handleMenuClick(e) }>
                {menuItem}
                <Menu.Divider />
                <Menu.Item key="manage">管理方案</Menu.Item>
            </Menu>
        );
        return (
            <div>
                <Row className='common-query-row'>
                    <Col span={15}>
                        <Tabs defaultActiveKey={this.state.menuData.length ? this.state.menuData[0].id : '0'} onChange={e => this.handleMenuClick(e) }>
                            {tabItem}
                        </Tabs>
                    </Col>
                    <Col span={2}>
                        <Dropdown overlay={menu}>
                            <Button type="ghost" shape="circle" icon="ellipsis" className='no-border' />
                        </Dropdown>
                        <Button type="ghost" shape="circle" icon="plus" className='no-border' />
                    </Col>
                    <Col span={4}>
                        <SearchBox placeholder='单号/客户/联系人/物料'/>
                    </Col>
                    <Col span={2}>
                        <Button type="ghost" className='no-border' onClick={e => this.handleAreaClick() }>展开查询条件<Icon type={this.state.visible ? 'down' : 'up'} /></Button>
                    </Col>
                </Row>
                <QueryItemContent visible={this.state.visible} metaData={this.state.metaData}/>
                <QuerySchemeManager ref="querySchemeManager"/>
            </div>
        );
    }
}
