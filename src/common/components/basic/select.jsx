import React from 'react';
import { Select, Icon } from 'antd';
import label from './label';

export default class SelectControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valueField: 'value',
      textField: 'text',
      text: '',
      options: [],
      value: undefined, //指定当前选中的条目 String/Array/{key: String, label: React.Node}/Array<{key, label}>
      defaultValue: [], //指定默认选中的条目 String/Array/{key: String, label: React.Node}/Array<{key, label}>
      multiple: false, //支持多选 boolean
      combobox: false, //输入框自动提示模式 boolean
      allowClear: false, //支持清除, 单选模式有效 boolean
      filterOption: true, //是否根据输入项进行筛选。当其为一个函数时，会接收 inputValue option 两个参数，当 option 符合筛选条件时，应返回 true，反之则返回 false。  boolean or function(inputValue, option) true
      tags: false, // 可以把随意输入的条目作为 tag，输入项不需要与下拉选项匹配  boolean
      placeholder: null, //选择框默认文字  string
      notFoundContent: '未找到', //当下拉列表为空时显示的内容 string
      dropdownMatchSelectWidth: true, //下拉菜单和选择器同宽  boolean
      optionFilterProp: 'children', //搜索时过滤对应的 option 属性，如设置为 children 表示对内嵌内容进行搜索  string  value
      size: 'default', //输入框大小，可选 large default small
      disabled: false
    };
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    if (this.props.model)
      this.props.model.addListener(this);
  }
  componentWillUnmount() {
    if (this.props.model)
      this.props.model.removeListener(this);
  }
  setData(data){
    var states = {};
    for(var attr in data){
      if(attr==='dataSource'){
        states['options'] = data[attr]
      }else{
        states[attr]=data[attr]
      }
    }
    this.setState(states);
  }
  setValue(value) {
    let valueField = this.state.valueField;
    let textField = this.state.textField;
    let states = {};
    let keys = [];
    let texts = [];
    value.forEach(function (item) {
      if (!item) return;
      keys.push(item[valueField]);
      texts.push(item[textField]);
    });
    states['value'] = keys;
    states['text'] = texts.join(',');
    this.setState(states);
  }
  onSelect(value, option) { }
  onDeselect(value) { }
  onSearch(value) { }
  onChange(value) {
    if (this.props.model)
      this.props.model.select(value);
  }
  getOptions() {
    let valueField = this.state.valueField;
    let textField = this.state.textField;
    return this.state.options.map((item, index) => {
      if (item.optGroup) {
        return <Select.OptGroup key={index} label = {item.optGroup.label}>
          {
            item.optGroup.options.map((opt) => {
              return <Select.Option key={opt.value} text={opt.text}>{opt.text}</Select.Option>
            })
          }
        </Select.OptGroup>
      } else {
        return <Select.Option key={item[valueField]} text={item[textField]}>{item[textField]}</Select.Option>
      }
    });
  }
  baseControl() {
    if (this.state.readOnly)
    return (<label>{this.state.text}</label>);
    let cProps = {
      value: this.state.value,
      defaultValue: this.state.defaultValue,
      multiple: this.state.multiple,
      combobox: this.state.combobox,
      allowClear: this.state.allowClear,
      tags: this.state.tags,
      placeholder: this.state.placeholder,
      notFoundContent: this.state.notFoundContent,
      dropdownMatchSelectWidth: this.state.dropdownMatchSelectWidth,
      size: this.state.size,
      onChange: this.onChange,
      onSelect: this.onSelect,
      onDeselect: this.onDeselect,
      onSearch: this.onSearch,
      optionFilterProp: this.state.optionFilterProp,
      optionLabelProp: this.state.optionLabelProp,
      disabled: this.state.disabled
    };
    let options = this.getOptions();
    return (
      <Select {...cProps} >
        {options}
      </Select>
    );
  }
  getControl() {
    let control = (this.props.cShowCaption ? label(this.baseControl(), this.props.cShowCaption) : this.baseControl());
    return control;
  }
  render() {
    const control = this.getControl();
    return (
      <div>
        {control}
      </div>
    );
  }
}
