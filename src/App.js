import React, { Component } from "react";
import "./css/App.css";
// import Table from "./Table";
// import TableBoot from "./TableBoot";
// import Tableui from "./Table-ui";
import TableTest from "./TableTest";
import logo from "./jabuti.png";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      greeting: "",
      search: "",
      result: [{}]
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeSearch = this.handleChangeSearch.bind(this);
    this.handleChangeResult = this.handleChangeResult.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ name: event.target.value });
  }
  handleChangeSearch(event) {
    this.setState({ search: event.target.value });
  }
  handleChangeResult(event) {
    this.setState({ result: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch(
      `/api/solr?name=${encodeURIComponent(
        this.state.name
      )}&search=${encodeURIComponent(this.state.search)}`
    )
      .then(response => response.json())
      .then(state => {
        this.setState(state);
        // console.log("testinho", this.state);
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.result !== this.props.result) {
      this.setState({ result: this.state.result });
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <form onSubmit={this.handleSubmit}>
            {/* <label htmlFor="name">Enter column name: </label>
            <input
              id="name"
              type="text"
              value={this.state.name}
              onChange={this.handleChange}
            />
            <br /> */}
            <label htmlFor="search">Enter column value: </label>
            <input
              id="search"
              type="text"
              value={this.state.search}
              onChange={this.handleChangeSearch}
            />
            <br />
            <button type="submit">Submit</button>
          </form>
          <p>{this.state.greeting}</p>
          <a
            className="App-link"
            href="https://samaiait.com.br"
            target="_blank"
            rel="noopener noreferrer"
          >
            Conheça Samaia IT
          </a>
        </header>

        {/* <Table data={this.state.result} onChange={this.handleChangeResult} /> */}
        <TableTest
          data={this.state.result}
          onChange={this.handleChangeResult}
        />
        {/* <TableBoot
          data={this.state.result}
          onChange={this.handleChangeResult}
        /> */}
      </div>
    );
  }
}
export default App;
