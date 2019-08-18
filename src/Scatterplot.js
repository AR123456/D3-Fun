import React from "react";
import * as d3 from "d3";

import Axis from "./Axis";

class Scatterplot extends React.PureComponent {
  state = {
    xScale: d3
      .scaleLinear()
      .domain([0, 1])
      .range([0, this.props.width]),
    yScale: d3
      .scaleLinear()
      .domain([0, 1])
      .range([this.props.height, 0])
  };

  static getDerivedStateFromProps(props, state) {
    const { yScale, xScale } = state;

    yScale.range([props.height, 0]);
    xScale.range([0, props.width]);

    return {
      ...state,
      yScale,
      xScale
    };
  }

  render() {
    const { x, y, data, height, datapoint } = this.props,
      { yScale, xScale } = this.state;

    return (
      <g transform={`translate(${x}, ${y})`}>
        {data.map(([x, y]) => datapoint({ x: xScale(x), y: yScale(y) }))}
        <Axis x={0} y={0} scale={yScale} type="Left" />
        <Axis x={0} y={height} scale={xScale} type="Bottom" />
      </g>
    );
  }
}

export default Scatterplot;
