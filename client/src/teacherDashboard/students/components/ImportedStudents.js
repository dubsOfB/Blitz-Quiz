import React, {Component} from 'react';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-root/dist/styles/ag-grid.css';
import 'ag-grid-root/dist/styles/theme-fresh.css';
let selectRow;
let currRows;

const columns = [{
                    headerName: "Classroom Students", 
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

//Currently both tables only refresh if you trigger events on the Available Students componenet. There are some hurdles to prevent the other way to work as well. May have to explore redux
class ImportedStudents extends Component {

  componentWillReceiveProps(props) {    
    this.api.setRowData(this.props.data)
  }
  
  onGridReady(params) {
    currRows = this.props.data
    this.api = params.api;
    this.columnApi = params.columnApi;
  }

  onSelectionChanged (row) {
    selectRow = this.api.getSelectedRows();
    // // console.log("currently ", selectRow, " selected")
    // this.props.changePhoto(selectRow[0].photo)
  }

  onRowDoubleClicked(row) {
    // console.log("doubleclicking working")
    let selectedRows = this.api.getSelectedRows();
    let temp;
    selectedRows.forEach( function(selectedRow, index) {
        temp = row.indexOf(selectedRows[0])
    });
    this.props.removeStudents(temp, selectedRows[0])
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

export default ImportedStudents;