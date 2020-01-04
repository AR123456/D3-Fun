// https://www.youtube.com/watch?v=yhwHUmjqxQw
import React, { useRef, useEffect, useState } from "react";
import "./App.css";
// axis bottom,linear scale and axis right
import {
  select,
  line,
  curveCardinal,
  axisBottom,
  scaleLinear,
  axisRight
} from "d3";

function App() {
  const [data, setData] = useState([25, 30, 45, 60, 20, 65, 75]);
  const svgRef = useRef();
  // ////use effect will be called initially an don every data change
  useEffect(() => {
    const svg = select(svgRef.current);
    const xScale = scaleLinear()
      // the domain is the input values, need to scale up or down, range of index values
      .domain([0, data.length - 1])
      // also visual representation of data
      .range([0, 300]);
    // a function from d3 needs domain- input values and range - output values
    const yScale = scaleLinear()
      .domain([0, 150])
      .range([150, 0]);
    // takes in scale to use- a function helper that transforms an input value to something that is needed. Ususaly for the visual representation for that value
    // pass in the xScale defined previously
    const xAxis = axisBottom(xScale)
      .ticks(data.length)
      // formating the x axi to show 1-7
      .tickFormat(index => index + 1);
    svg
      .select(".x-axis")
      // making use of the g or group with class name x-axis down in the return.
      .style("transform", "translateY(150px)")
      .call(xAxis);
    const yAxis = axisRight(yScale);
    svg
      // making use of the g or group with class name y-axis down in the return.
      .select(".y-axis")
      .style("transform", "translateX(300px)")
      .call(yAxis);
    ////// generates the "d" attribute of a path element ////////////////
    const myLine = line()
      //scale to use in visual representation of the data, pass the index value into the scale
      .x((value, index) => xScale(index))
      .y(yScale)
      .curve(curveCardinal);
    ///// renders path element, and attaches
    ///// the "d" attribute from line generator abobe
    svg
      .selectAll(".line")
      .data([data])
      .join("path")
      .attr("class", "line")
      .attr("d", myLine)
      .attr("fill", "none")
      .attr("stroke", "blue");
  }, [data]);
  return (
    <React.Fragment>
      <svg ref={svgRef}>
        <g className="x-axis"></g>
        <g className="y-axis"></g>
      </svg>
      <br />
      <br />
      <br />
      <br />
      <button onClick={() => setData(data.map(value => value + 5))}>
        Update data
      </button>
      <button onClick={() => setData(data.filter(value => value < 35))}>
        Filter data
      </button>
    </React.Fragment>
  );
}

export default App;
