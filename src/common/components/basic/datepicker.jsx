/*
参数        	       		说明					类型				默认值
value	              	日期					string or Date	无
defaultValue			默认日期				string or Date	无
format					展示的日期格式		string			"yyyy-MM-dd"
disabledDate			不可选择的日期		function	无
disabled				禁用	bool			false
style					自定义输入框样式		object	{}
popupStyle				格外的弹出日历样式	object	{}
size					输入框大小，large 高度为 32px，small 为 22px，默认是 28px	string	无
locale					国际化配置								object	默认配置
onOk					点击确定按钮的回调						function(Date value)	无
toggleOpen				弹出日历和关闭日历的回调					function(status)	无
getCalendarContainer	定义浮层的容器，默认为 body 上新建 div		function(trigger)	无
showTime				增加时间选择功能							Object or Boolean	TimePicker Options
*/
import React from 'react';
import { DatePicker } from 'antd';
import label from './label';
export default class DatePickerControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: new Date(), format: 'yyyy-MM-dd', disabled: false, style: {}, size: 'default', locale: '', showTime: '' };
    Date.prototype.format = function (format) {
      var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "h+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
      }

      if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
      }

      for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
          format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
      }
      return format;
    }
  }
  dateFormat(value, format) {
    if (this.state.value instanceof Date) {
      return value.format(format)
    } else {
      return value;
    }
  }
  componentDidMount() {
    if (this.props.model) {
    		this.props.model.addListener(this);
    }
  }
  componentWillUnmount() {
    if (this.props.model)
      this.props.model.removeListener(this);
  }
  onChange(value) {
    if (this.props.model) {
      value = !!value && value.format('yyyy-MM-dd');
      this.props.model.setData('value', value);
    }

  }
  onOk(Date, value) {

  }
  toggleOpen(status) {
    if (this.props.model) {
      this.props.model.fireEvent('toggleOpen');
    }
  }
  baseControl() {
    let baseControl;
    if (this.state.readOnly) {
      let value = this.dateFormat(this.state.value, this.state.format);
      baseControl = <label> {value} </label>
    } else {
      baseControl = (
        <DatePicker toggleOpen={e => this.toggleOpen(e) } onOk={this.onOk} showTime={this.state.showTime} locale={this.state.locale} size={this.state.size} style={this.state.style} disabled={this.state.disabled} format={this.state.format} value={this.state.value} onChange={e => this.onChange(e) }/>
      );
    }

    return baseControl;
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
