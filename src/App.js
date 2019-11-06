import React, { Component } from "react";
import "./css/App.css";
import logo from "./jabuti.png";
// import TableMUI from "./TableMUI";
// import CustomPaginationActionsTable from "./utils/CustomPaginationActionsTable";
// import TablePagination from "./TablePagination";
import MUIDataTable from "mui-datatables";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      greeting: "",
      search: "",
      result: [
        {
          governo: "Sem resultados..",
          highlight: "Sem resultados..",
          data: "Sem resultados..",
          id_legislacao: "Sem Resultados.."
        }
      ]
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
  columns = [
    {
      name: "link",
      label: "Texto da Lei",
      options: {
        filterList: 0,
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          // console.log(tableMeta);
          const index = tableMeta.rowIndex;
          return <a href={value}>{this.state.result[index].id_legislacao}</a>;
        }
      }
    },
    {
      name: "governo",
      label: "Governo",
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: "highlight",
      label: "Destaques",
      options: {
        filter: false,
        sort: false
      }
    },
    {
      name: "data",
      label: "Data",
      options: {
        filter: false,
        sort: true
      }
    }
  ];

  options = {
    filterType: "checkbox",
    responsive: "stacked",
    sort: true,
    filterCount: 0
  };
  render() {
    return (
      <div className="App">
        <header className="">
          <img src={logo} className="App-logo" alt="logo" />
          <form onSubmit={this.handleSubmit} className="Label">
            <label htmlFor="search">
              Digite o termo a ser procurado no texto de lei(e.g. armas):{" "}
            </label>
            <br />
            <input
              id="search"
              type="text"
              value={this.state.search}
              onChange={this.handleChangeSearch}
            />

            <button type="submit" className="Button">
              Pesquisa Jabuti
            </button>
          </form>
          <p>{this.state.greeting}</p>
        </header>

        
        <MUIDataTable
          title={"Lista de Leis"}
          data={this.state.result}
          onChange={this.handleChangeResult}
          columns={this.columns}
          options={this.options}
          className="Table"
        />
      </div>
    );
  }
}
export default App;

// {/* <label htmlFor="name">Enter column name: </label>
//           <input
//             id="name"
//             type="text"
//             value={this.state.name}
//             onChange={this.handleChange}
//           />
//           <br /> */}

/**********************************************************************/
// {/* <a
// className="App-link"
// href="https://samaiait.com.br"
// target="_blank"
// rel="noopener noreferrer"
// >
// Conheça Samaia IT
// </a> */}

/******************************************************************/
// {/* <TableMUI data={this.state.result} onChange={this.handleChangeResult} /> */}
// {/* <CustomPaginationActionsTable /> */}
