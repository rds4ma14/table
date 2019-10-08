import React, { Component } from "react";
// import { type } from "os";
import "./css/Table.css";

class Table extends Component {
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
      return <th key={key}>{key.toUpperCase()}</th>;
    });
  };

  getRowsData = function() {
    var items = this.props.data;
    // var keys = this.getKeys;
    console.log(this.props.data.length);
    return items.map((row, index) => {
      if (this.props.data[index].id && row.value !== 0)
        return (
          <tr key={index}>
            <td key={row.id}>{row.id}</td>
            <td key={row.name}>{row.name}</td>
            <td key={row.value}>{row.value}</td>
          </tr>
        );
    });
  };

  render() {
    return (
      <div>
        <table>
          <thead>
            <tr>{this.getHeader()}</tr>
          </thead>
          <tbody>{this.getRowsData()}</tbody>
        </table>
      </div>
    );
  }
}

export default Table;

/*
const RenderRow = props => {
  console.log("bonitono", props.data);
  return props.data.map((key, index) => {
    return <td key={props.data[index].id}>{props.data[index].name}</td>;
  });
};
 <RenderRow key={index} data={this.props.data} keys={keys} />
          <RenderRow key={index} data={this.props.data} key={keys} />
          <RenderRow key={index} data={this.props.data} keys={keys} /> */
