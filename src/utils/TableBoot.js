import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
// import "bootstrap/dist/css/bootstrap.min.css";

class TableBoot extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.data);
    return (
      <BootstrapTable data={this.props.data} striped hover>
        <TableHeaderColumn isKey dataField="id">
          ${this.props.data.id}
        </TableHeaderColumn>
        <TableHeaderColumn dataField="name">Product Name</TableHeaderColumn>
        <TableHeaderColumn dataField="price">Product Price</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

export default TableBoot;
