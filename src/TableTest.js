import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import React, { Component } from "react";
// import { type } from "os";
import "./css/Table.css";

class TableTest extends Component {
  constructor(props) {
    super(props);
    this.getHeader = this.getHeader.bind(this);
    this.getRowsData = this.getRowsData.bind(this);
    this.getKeys = this.getKeys.bind(this);
  }

  getKeys = function() {
    return Object.keys(this.props.data[0]);
  };

  getHeader = function() {
    var keys = this.getKeys();
    return keys.map((key, index) => {
      if (key === "link") return null;
      return <TableRow key={key}>{key.toUpperCase()}</TableRow>;
    });
  };

  getRowsData = function() {
    var items = this.props.data;
    // var keys = this.getKeys;
    console.log(this.props.data.length);
    return items.map((row, index) => {
      if (this.props.data[index].id_solr)
        return (
          <TableRow key={index}>
            <TableCell key={row.id_solr}>{row.id_solr}</TableCell>
            <TableCell key={row.governo}>{row.governo}</TableCell>
            <TableCell key={row.id_legislacao}>
              <a href={row.link} target="blank">
                {row.id_legislacao}
              </a>
            </TableCell>
            <TableCell key={row.data}>{row.data}</TableCell>
          </TableRow>
        );
    });
  };

  render() {
    return (
      <Paper>
        <div>
          <Table>
            <TableHead>
              <TableRow>{this.getHeader()}</TableRow>
            </TableHead>
            <TableBody>{this.getRowsData()}</TableBody>
          </Table>
          <TablePagination component="div" count={this.getRowsData().length} />
        </div>
      </Paper>
    );
  }
}

export default TableTest;
