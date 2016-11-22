import React from 'react';
import { Input, Button } from 'antd';
import classNames from 'classnames';
import label from './label';

const InputGroup = Input.Group;

export default class SearchBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            focus: false,
            value: ''
        };
    }
    componentDidMount() {
        if (this.props.model)
            this.props.model.addListener(this);
    }
    handleInputChange(e) {
        this.setState({
            value: e.target.value
        });
    }
    handleFocusBlur(e) {
        this.setState({
            focus: e.target === document.activeElement,
        });
    }
    handleOnClick(e) {
        console.log('click');
    }
    render() {
        const referType = this.props.referType;
        const { style, size, placeholder } = this.props;

        const btnCls = classNames({
            'ant-search-btn': true,
            'ant-search-btn-noempty': !!(this.state.value && this.state.value.trim()),
        });
        const searchCls = classNames({
            'ant-search-input': true,
            'ant-search-input-focus': this.state.focus,
        });
        return (
            <div className="ant-search-input-wrapper" style={style}>
                <InputGroup className={searchCls}>
                    <Input placeholder={placeholder} value={this.state.value} onFocus={e => this.handleFocusBlur(e) } onChange={e => this.handleInputChange(e) }/>
                    <div className="ant-input-group-wrap">
                        <Button icon="search" className={btnCls} size={size} onClick={(e) => this.handleOnClick(e) } />
                    </div>
                </InputGroup>
            </div>
        )
    }
}
