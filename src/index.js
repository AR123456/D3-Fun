import React from "react";
import { render } from "react-dom";

import * as d3 from "d3";

import Barchart from "./Barchart";

// const styles = {
//   fontFamily: "sans-serif",
//   textAlign: "center"
// };

const linearScale = d3
  .scaleLinear()
  .domain([0, 10])
  .range([0, 200]);

const App = () => (
  // <svg width="800" height="400" id="svg">
  //   <Barchart scale={linearScale} type="Bottom" x={30} y={20} label="Example" />
  //   <Barchart scale={linearScale} type="Left" x={100} y={120} label="Example" />
  // </svg>
  <svg width="800" height="600">
    <Barchart x={100} y={110} width={400} height={300} />
  </svg>
);

render(<App />, document.getElementById("root"));
