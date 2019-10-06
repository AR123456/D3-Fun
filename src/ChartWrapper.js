import React, { Component } from "react";
import D3Chart from "./D3Chart";

class ChartWrapper extends Component {
  componentDidMount() {
    this.setState({
      chart: new D3Chart(this.refs.chart)
    });
  }
  // this forces react to let D3 handle ths update
  shouldComponentUpdate() {
    return false;
  }

  componentWillReceiveProps(nextProps) {
    this.state.chart.update(nextProps.gender);
  }

  render() {
    return <div ref="chart"></div>;
  }
}
export default ChartWrapper;
