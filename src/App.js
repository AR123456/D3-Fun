// https://www.youtube.com/watch?v=9uEmNgHzPhQ&t=257s
import React, { useRef, useEffect, useState } from "react";
import "./App.css";
import { select } from "d3";

function App() {
  // define the data array
  const [data, setData] = useState([25, 30, 45, 60, 20]);
  const svgRef = useRef();
  useEffect(() => {
    // select makes the SVG avalible to d3
    const svg = select(svgRef.current);
    // render circles based on data in array
    svg
      // select all circles found in svg
      .selectAll("circle")
      // sync data with circle
      .data(data)
      //define the enter callback , append the circle and define with update what to do
      .join("circle")
      // join is handeling entering and updating elements so we do not have to repeat
      .attr("r", value => value)
      .attr("cx", value => value * 2)
      .attr("cy", value => value * 2)
      .attr("stroke", "red");
  }, [data]);
  return (
    <React.Fragment>
      <svg ref={svgRef}></svg>
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
