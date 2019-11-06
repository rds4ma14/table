// import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import React, { Component } from "react";
// pagination "nova"
import { makeStyles, useTheme } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";

// import { type } from "os";
import "./css/Table.css";

class TableMUI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rowsPerPage: 10,
      page: 0
    };
    this.getHeader = this.getHeader.bind(this);
    this.getRowsData = this.getRowsData.bind(this);
    this.getKeys = this.getKeys.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.TablePaginationActions = this.TablePaginationActions.bind(this);
  }

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: +event.target.value });
    this.setState({ page: 0 });
  };
  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
  };

  getKeys = function() {
    return Object.keys(this.props.data[0]);
  };

  getHeader = function() {
    var keys = this.getKeys();
    return keys.map((key, index) => {
      if (key === "link") return null;
      return (
        <TableCell key={key} style={({ minWidth: 170 }, { align: "right" })}>
          {key.toUpperCase()}
        </TableCell>
      );
    });
  };

  getRowsData = function() {
    var items = this.props.data;
    // var keys = this.getKeys;
    // console.log(this.props.data.length);
    // console.log(this.state.page);

    return items
      .slice(
        this.state.page * this.state.rowsPerPage,
        this.state.page * this.state.rowsPerPage + this.state.rowsPerPage
      )
      .map((row, index) => {
        // console.log("object", row, index);
        if (this.props.data[index].id_solr)
          return (
            <TableRow hover role="checkbox" tabIndex={-1} key={index}>
              {/* <TableRow key={index}> */}
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

          <TablePagination
            component="div"
            count={this.props.data.length}
            rowsPerPage={this.state.rowsPerPage}
            page={this.state.page}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
            onChangePage={this.handleChangePage}
            backIconButtonProps={{
              "aria-label": "previous page"
            }}
            nextIconButtonProps={{
              "aria-label": "next page"
            }}
            lastPageButton={{ "aria-label": "last page" }}
          ></TablePagination>
          {/* <this.TablePaginationActions /> */}
        </div>
      </Paper>
    );
  }

  /*********************Acao de pagination************************************************************/
  TablePaginationActions = function() {
    // const classes = useStyles1();
    const theme = useTheme();
    // const { onChangePage } = this.handleChangePage;
    const rowsPerPage = this.state.rowsPerPage;
    const page = this.state.page;
    const count = this.props.data.length;

    const handleFirstPageButtonClick = event => {
      this.setState({ page: 0 });
      console.log("how  ", page);
    };

    const handleBackButtonClick = event => {
      this.setState({ page: page + 1 });
      // onChangePage(event, page - 1);
    };

    const handleNextButtonClick = event => {
      this.setState({ page: page + 1 });
      console.log("oi", page);

      // onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = event => {
      this.setState({ page: Math.max(0, Math.ceil(count / rowsPerPage) - 1) });
      console.log("oi", this.state.page);
      // onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
      <div>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        {/* <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton> */}
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  };
}

export default TableMUI;
