import React, { Component } from "react";
import zc from "@dvsl/zoomcharts";

const { PieChart } = zc;
const license = require("./License.json");
const data = require("./resultado.json");

// Zoomcharts license and license key
window.ZoomChartsLicense = license.License;
window.ZoomChartsLicenseKey = license.LicenseKey;

class PieCharts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: this.props.data
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event, newData) => {
    this.setState({ data: newData });
  };

  componentDidMount() {
    let chart = new PieChart({
      container: document.getElementById("pieChart"),
      assetsUrlBase: "./../node_modules/@dvsl/zoomcharts/lib/assets",
      area: { height: 500 },
      interaction: {
        mode: "select",
        resizing: {
          enabled: false
        }
      },
      pie: {
        innerRadius: 0
      },
      slice: {
        expandableMarkStyle: {
          lineWidth: 0
        }
      },

      data: {
        preloaded: data
      },

      toolbar: {
        fullscreen: true,
        enabled: true
      }
    });
  }

  render() {
    return (
      <div className="chart-wrapper">
        <div id="pieChart" className="chart" />
      </div>
    );
  }
}

export default PieCharts;
