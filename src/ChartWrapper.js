// class based to use lifeccyle methods

import React, { Component } from "react";
// import the chart from local directory
import D3Chart from "./D3Chart";

class ChartWrapper extends Component {
  //passing in referace to where to target on page will be appending visualization to this

  componentDidMount() {
    new D3Chart(this.refs.chart);
  }
  // using ref system to keep track of the div
  render() {
    return <div ref="chart"></div>;
  }
}
export default ChartWrapper;
