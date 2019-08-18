import React, { Component } from "react";
import * as d3 from "d3";

class Axis extends Component {
  gRef = React.createRef();

  componentDidMount() {
    this.d3render();
  }
  componentDidUpdate() {
    this.d3render();
  }

  d3render() {
    const scale = d3
      .scaleLinear()
      .domain([0, 10])
      .range([0, 200]);

    const axis = d3.axisBottom(scale);

    d3.select(this.gRef.current).call(axis);
  }

  render() {
    const { y } = this.props;

    return <g transform={`translate(10, 10)`} ref={this.gRef} />;
  }
}

export default Axis;
