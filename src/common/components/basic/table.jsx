import React from 'react';
import {Table, Column, Cell} from 'fixed-data-table';
import { Checkbox, Pagination } from 'antd';
import Input from './input'
import Refer from './refer'

export default class FixedDataTableControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: [],
      columns: {},
      editable: [],
      selectable: {},
      pagination: { total: 0, current: 0, pageSize: 0 },
      selectIndex: -1,
      readOnly: true,
      showAggregates: true,
      scrollRow: 0,
      scrollCol: 0,
      isPagination: true,
      keyNumber: {}
    };
    this._onColumnResizeEndCallback = this._onColumnResizeEndCallback.bind(this);//列宽改变回调
    this.rowClassNameGetter = this.rowClassNameGetter.bind(this);//行className改变
    this._onRowClick = this._onRowClick.bind(this);//行单击事件
    this._onRowDoubleClick = this._onRowDoubleClick.bind(this);//行双击事件
    this.onCellClick = this.onCellClick.bind(this);//单元格单击事件
    this.onCellblur = this.onCellblur.bind(this);//单元格丢失焦点事件
    this._PaginChange = this._PaginChange.bind(this);//分页改变事件
    this._setFooter = this._setFooter.bind(this);//设置footer事件
    this.onKeyPress = this.onKeyPress.bind(this);
  }
  rowClassNameGetter(index) {
  	let selectIndex = this.state.selectIndex;
    if (index === selectIndex)
      return 'public_fixedDataTableRow_selected'
  }
  componentDidMount() {
    if (this.props.model)
      this.props.model.addListener(this);
  }
  componentWillUnmount() {
    if (this.props.model)
      this.props.model.removeListener(this);
  }
  //设置grid中columns，datasource等属性
  setGridProps(params) {
    let KeyToNumber = {};
    let number = 0;
    let pageinfo = this.state.pagination;

    //栏目key与index对照
    for (var attr in params.columns) {
      if (number === 0) {
        KeyToNumber[attr] = 0;
      } else {
        KeyToNumber[attr] = number;
      }
      number = number + 1;
    }
    this.setState({
        showCheckBox: params.showCheckBox,
        showRowNo: params.showRowNo,
        readOnly: params.readOnly,
        dataList: params.rows,
    		columns: params.columns,
    		showAggregates: params.showAggregates,
    		isRadio: !params.multiple,
    		isPagination: params.pagination,
    		keyNumber: KeyToNumber
    });
    if (params.rows !== undefined && !params.readOnly) {
	    	//设置初始单元格编辑状态 及 行选择初始状态
		    let temp_editable = [];
		    let temp_selectable = {};
		    let length = params.rows.length;
		    for (let i = 0; i < length; i++) {
        temp_editable[i] = {};
        temp_selectable[i] = false;
        for (var attr in params.columns) {
          if (attr === 'CheckBox' || 'GridRowNo') {
            temp_editable[i][attr] = true;
          } else {
            temp_editable[i][attr] = false;
          }
        }
		    }
		    temp_selectable[-1] = false;
      this.setState({
        editable: temp_editable,
        selectable: temp_selectable
      });
    }
  }
  //接受来自model的column信息
  setColumns(columndata) {
    let dataList = this.state.dataList;
    this.setState({
    		columns: columndata
    });
  }
  //接收来自model的data信息
  setDataSource(data) {
    let col = this.state.columns;
    //设置初始单元格编辑状态 及 行选择初始状态
    let temp_editable = [];
    let temp_selectable = {};
    let length = data.length;
    for (let i = 0; i < length; i++) {
      temp_editable[i] = {};
      temp_selectable[i] = false;
	    	for (var attr in col) {
        if (attr === 'CheckBox' || attr === 'GridRowNo') {
          temp_editable[i][attr] = true;
        } else {
          temp_editable[i][attr] = false;
        }
	    	}
    }
    temp_selectable[-1] = false;
    this.setState({
      editable: temp_editable,
      selectable: temp_selectable,
      dataList: data
    });
  }
  //组织column结构
  RemodelingColumn(dataList, columnState) {
    var ret = [];
    if (this.state.showCheckBox && !columnState.CheckBox)
      columnState.CheckBox = { 'iFieldType': 2, 'width': 50 }
    if (this.state.showRowNo && !columnState.GridRowNo)
      columnState.GridRowNo = { 'iFieldType': 1, 'width': 50 }
    var column;
    for (var attr in columnState) {
      column = this.setColumn(attr, columnState, dataList);
      ret.push(column);
    }
    return ret
  }
  //设置column
  setColumn(attr, columnState, dataList) {
    let type = columnState[attr].iFieldType;
    let controlType = columnState[attr].cControlType;
    let width = columnState[attr].width || 150;
    let name = columnState[attr].cShowCaption;
    let isResizable = true;
    //		let isResizable = columnState[attr].isResizable;
    let headerCell = (<Cell>{name}</Cell>);
    let fiexd = false;
    let align = 'left';
    if (type === 2) {
   			if (!this.state.isRadio)
        headerCell = this.RemodelingEditControl(type, controlType, '', -1);
   			fiexd = true;
   			align = 'center';
    }
    if (attr === 'GridRowNo') {
   			headerCell = (<Cell>行号</Cell>);
   			fiexd = true;
   			align = 'center';
    }
    return (<Column
      allowCellsRecycling
      columnKey={attr}
      isResizable={isResizable}
      header={headerCell}
      cell={(rowIndex, type, bCanModify) => this.setCell(rowIndex, columnState[attr].iFieldType, controlType, columnState[attr].bCanModify) }
      width={width}
      align={align}
      fixed={fiexd}
      footer={this._setFooter}
      />);
  }
  //设置cell
  setCell(rowIndex, type, controlType, bCanModify) {
    let index = rowIndex.rowIndex;
    let data = this.state.dataList;
    let columnKey = rowIndex.columnKey;
    if (data[index]) {
    		if (bCanModify || type === 2 || columnKey === 'GridRowNo') {
        let Cell = this.RemodelingCell(rowIndex, type, controlType, bCanModify);
        return Cell
    		} else {
        return (
          <Cell width={rowIndex.width} height={rowIndex.height}>
            {data[index][columnKey]}
          </Cell>
        );
    		}
    }
  }
  RemodelingCell(rowIndex, type, controlType, bCanModify) {
    let index = rowIndex.rowIndex;
    let columnKey = rowIndex.columnKey;
    let data = this.state.dataList;
    let editable = false
    let readOnly = this.state.readOnly;
    if (this.state.editable[index]) {
    		editable = this.state.editable[index][columnKey]
    }
    //let editControls = this.RemodelingEditControl(type,controlType, data[index][columnKey], index);
    //let formatControls = this.RemodelingFormatControl(data[index][columnKey]);
    if (type === 2) {
    		return (
        <Cell width={rowIndex.width} height={rowIndex.height}>
          {this.RemodelingEditControl(type, controlType, data[index][columnKey], index, columnKey) }
        </Cell>
    		);
    }
    if (columnKey === 'GridRowNo') {
    		return (
        <Cell width={rowIndex.width} height={rowIndex.height}>
          {index}
        </Cell>
    		);
    }
    if (!bCanModify || readOnly) {
    		return (
        <Cell width={rowIndex.width} height={rowIndex.height}>
          {this.RemodelingFormatControl(data[index][columnKey]) }
        </Cell>
      );
    }
    return (
	    	editable ?
        <Cell width={rowIndex.width} height={rowIndex.height}>
          <div className={'public_fixedDataTableCell_empty'}>
            {this.RemodelingEditControl(type, controlType, data[index][columnKey], index, columnKey) }
          </div>
        </Cell>
        :
        <Cell width={rowIndex.width} height={rowIndex.height}>
          <div className={'public_fixedDataTableCell_empty'} onClick={(e) => this.onCellClick(e, index, columnKey) }>
            {this.RemodelingFormatControl(data[index][columnKey]) }
          </div>
        </Cell>

    );
  }
  //构建editControls结构
  RemodelingEditControl(ctype, controlType, text, index, columnKey) {
    var editRowModel = this.props.model.getEditRowModel();
    switch (controlType) {
      case 'Refer':
        return <Refer focus model={editRowModel.get(columnKey)} />
    }
    switch (ctype) {
      case 1:
        return <Input  focus   defaultValue={text} model={editRowModel.get(columnKey)} />
      case 2:
        return <Checkbox checked={this.state.selectable[index]} onChange={(e, i) => this.SelectChange(e, index) }></Checkbox>
      default:
        return <Input  autofocus='true'   defaultValue={text} />
    }
  }
  //构建formatControls结构
  RemodelingFormatControl(text) {
    if (text === '')
      return ''
    return text
  }
  //监听选择
  SelectChange(e, index) {
    let temp_selectable = this.state.selectable;
    if (this.state.isRadio) {
      if (e.target.checked) {
        for (var attr in temp_selectable) {
          if (temp_selectable[attr]) {
            temp_selectable[attr] = false;
          }
        }
        temp_selectable[index] = e.target.checked;
        let indexes = [];
        indexes.push(index);
        this.props.model.select(indexes);
      } else {
        this.props.model.unselect(index);
      }
    } else {
      if (index === -1) {
        let selectAll = temp_selectable[-1];
        if (selectAll) {
          for (var attr in temp_selectable) {
            temp_selectable[attr] = false;
          }
          this.props.model.unselectAll();
        } else {
          for (var attr in temp_selectable) {
            temp_selectable[attr] = true;
          }
          this.props.model.selectAll();
        }
      } else {
        temp_selectable[index] = e.target.checked;
        let indexes = [];
        for (var attr in temp_selectable) {
          if (temp_selectable[attr] && attr !== '-1') {
            indexes.push(attr);
          }
        }
        if (e.target.checked) {
          this.props.model.select(indexes);
        } else {
          this.props.model.unselect(index);
        }
      }
    }

    this.setState({
      selectable: temp_selectable
    });
  }
  //列宽改变拖动函数
  _onColumnResizeEndCallback(newColumnWidth, columnKey) {
    let column = this.state.columns;
    column[columnKey].width = newColumnWidth;
    this.setState({
      columns: column
    });
  }
  //行单击事件
  _onRowClick(e, index) {
    if(!this.state.showCheckBox)
      this.props.model.select(index);
  }
  //
  select(indexes) {
    var selectable = this.state.selectable;
    for (var attr in indexes) {
      selectable[indexes[attr]] = true;
    }
    this.setState({
      selectIndex: indexes[0],
      scrollRow:indexes[0],
      selectable:selectable
    });
  }
  //单元格单击事件
  onCellClick(e, index, columnKey) {
    let editable = this.state.editable;
    let keyNumber = this.state.keyNumber;
    let keyindex = keyNumber[columnKey];
    if (editable[index] !== undefined) {
      editable[index][columnKey] = true;
      this.setState({ editable: editable, scrollCol: keyindex + 2 });
    }

  }
  //单元格丢失焦点事件
  onCellblur(index, columnKey, value) {
    // 更新数据
    if (this.props.model)
      this.props.model.setCellValue(index, columnKey, value);
    let state = this.state.editable;
    state[index][columnKey] = false;
    this.setState({
      editable: state
    });
  }
  onKeyPress(e, index, columnKey) {
    if (arguments[0].key === 'Enter') {
      let editable = this.state.editable;
      let keyNumber = this.state.keyNumber;
      let keyIndex = keyNumber[columnKey];
      let column = this.state.columns;
      editable[index][columnKey] = false;
      let i = 1;
      for (var attr in keyNumber) {
        if (keyNumber[attr] === keyIndex + i) {
          if (column[attr].bCanModify) {
            editable[index][attr] = true;
          } else {
            i = i + 1;
          }
        }
      }
      this.setState({
        scrollCol: keyIndex + i + 2,
        editable: editable
      });
    }
  }
  //单元格数据改变事件
  setCellValue(data) {
    let dataList = [...this.state.dataList];
    dataList[data.rowIndex][data.cellName] = data.value;
    let state = this.state.editable;
    state[data.rowIndex][data.cellName] = false;
    this.setState({
      dataList,
      editable: state
    });
    if (data.mode === 'enter')
    this.onKeyPress({key:'Enter'}, data.rowIndex, data.cellName);
  }
  setCellBlur(data){
    let state = this.state.editable;
    state[data.rowIndex][data.cellName] = false;
    this.setState({
      editable: state
    });
  }
  //增行
  insertRow(data) {
    let dataList = this.state.dataList;
    dataList.splice(data.index, 0, data.row);
    //设置新增行单元格初始状态
    let state = this.state.editable;
    let newstate = {};
    for (var field in state[0]) {
      if (field === 'CheckBox') {
        newstate[field] = true;
      } else {
        newstate[field] = false;
      }
    }
    state.push(newstate);
    this.setState({
      scrollRow: dataList.length - 1,
      editable: state,
      dataList
    });
    this.props.model.select(data.index);
  }
  //删行
  deleteRows(indexes) {
    let dataArry = this.state.dataList;
    let paginationData = this.state.pagination;
    indexes.forEach(function (index) {
      dataArry.splice(index, 1);
      paginationData.total = paginationData.total - 1;
    }, this);
    this.setState({
      pagination: paginationData,
      dataList: dataArry,
      selectIndex:-1
    });
  }

  //设置分页
  setPageInfo(paginationlist) {
    let page = this.state.pagination;
    page.total = paginationlist.recordCount
    page.current = paginationlist.pageIndex;
    page.pageSize = paginationlist.pageSize;
    this.setState({
      pagination: page
    });
  }
  //分页改变事件
  _PaginChange(page) {
    if (this.props.model)
      this.props.model.setPageIndex(page);
  }
  _setFooter(cellProps) {
    let keyNumber = this.state.keyNumber;
    let column = this.state.columns;
    let showAggregates = this.state.showAggregates;
    if (showAggregates) {
      if (column['CheckBox'] === undefined) {
        if (column['GridRowNo'] === undefined) {
          if (keyNumber[cellProps.columnKey] === 0) {
            return (
              <div>
                <div className='public_fixedDataTableCell_cellContent'> 小计</div>
                <div className='public_fixedDataTableCell_cellContent'> 合计</div>
              </div>
            )
          }
        } else {
          if (cellProps.columnKey === 'GridRowNo') {
            return (
              <div>
                <div className='public_fixedDataTableCell_cellContent'> 小计</div>
                <div className='public_fixedDataTableCell_cellContent'> 合计</div>
              </div>
            )
          }
        }
      } else {
        if (cellProps.columnKey === 'CheckBox') {
          return (
            <div>
              <div className='public_fixedDataTableCell_cellContent'> 小计</div>
              <div className='public_fixedDataTableCell_cellContent'> 合计</div>
            </div>
          )
        }
      }
      if (column[cellProps.columnKey].bNeedSum) {
        let data = this.state.dataList;
        let sum = 0;
        if (data.length > 0) {
          for (let i = 0; i < data.length; i++) {
            sum = sum + data[i][cellProps.columnKey];
          }
        }
        return (
          <div>
            <div className='public_fixedDataTableCell_cellContent'> {sum}</div>
            <div className='public_fixedDataTableCell_cellContent'> 999999</div>
          </div>
        )
      }
    }
  }
  //双击事件
  _onRowDoubleClick(e, index) {
    let dataArry = this.state.dataList;
    let rowData = dataArry[index];
    this.props.model.fireEvent('dblClick', rowData);
  }
  setPage(pagination, isPage) {
    if (isPage && pagination.total !== 0) {
      return (
        <Pagination
          total={pagination.total}
          current={pagination.current}
          pageSize={pagination.pageSize}
          onChange={this._PaginChange}
          showQuickJumper={true}
          showTotal={total => `共 ${pagination.total} 条`}
          />
      );
    }
  }
  render() {
    let dataList = this.state.dataList;
    let columnState = this.state.columns;
    let column = this.RemodelingColumn(dataList, columnState);
    let pagination = this.setPage(this.state.pagination, this.state.isPagination);
    let footerHeight = 0;
    if (this.state.showAggregates) {
    		footerHeight = this.props.footerHeigh || 60;
    }
    return (
	    	<div>
        <Table
          rowHeight={this.props.rowHeight || 50}
          headerHeight={this.props.headerHeight || 30}
          footerHeight={footerHeight}
          rowsCount={dataList.length}
          width={this.props.width || 1100}
          height={this.props.height || 400}
          onColumnResizeEndCallback={this._onColumnResizeEndCallback}
          isColumnResizing={false}
          onRowClick = {this._onRowClick}
          onRowDoubleClick={this._onRowDoubleClick}
          rowClassNameGetter = {this.rowClassNameGetter}
          scrollToRow={this.state.scrollRow}
          scrollToColumn={this.state.scrollCol}
          {...this.props}>
          {column}
        </Table>
        {pagination}
      </div>

    );
  }
}
