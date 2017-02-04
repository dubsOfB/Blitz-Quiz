import React, {Component} from 'react';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-root/dist/styles/ag-grid.css';
import 'ag-grid-root/dist/styles/theme-fresh.css';
let selectRow;
let currRows;

const columns = [{
                    headerName: "Student Database", 
                    children: [
                      { headerName: 'Student Id', field: 'id', width: 100 }, 
                      { headerName: 'First Name', field: 'firstName', width: 350 },
                      { headerName: 'Last Name', field: 'lastName', width: 350 }
                   ]
                  }]

const styles = {
    height: 350,
    width: 800
}



class AvailableStudents extends Component {
  constructor(props){
    super(props);

  }

  onGridReady(params) {
    this.api = params.api;
    this.columnApi = params.columnApi;
  }

  onSelectionChanged (row) {
    currRows = this.props.data
    // console.log(currRows)
    selectRow = this.api.getSelectedRows();
    // console.log("currently ", selectRow, " selected")
  }

  onRowDoubleClicked(row) {
    let selectedRows = this.api.getSelectedRows();
    let temp;
    selectedRows.forEach( function(selectedRow, index) {
        temp = row.indexOf(selectedRows[0])
    });
    this.props.addStudents(temp, selectedRows[0])
    // console.log("to splice and push: ", selectedRows[0])
    this.api.setRowData(this.props.data)
  }

  render() { 
      return (
        <div id="myGrid" className="ag-fresh" style={styles}>
          <AgGridReact              
              onGridReady = {this.onGridReady.bind(this)}
              onSelectionChanged={this.onSelectionChanged.bind(this, this.props.data)}
              onRowDoubleClicked={this.onRowDoubleClicked.bind(this, this.props.data)}
              columnDefs={columns}
              rowData={this.props.data}
              rowSelection="single"
              enableSorting="true"
              enableFilter="true"
              enableColResize ="true"
              debug = "true"
              rowHeight="22"
          />
        </div>
    )
  }
}

export default AvailableStudents;