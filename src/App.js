// https://www.youtube.com/watch?v=hR8xtl_IbCw
import React, { useRef, useEffect, useState } from "react";
import "./App.css";
// adding line and curvedCardian for the line
import { select, line, curveCardinal } from "d3";

function App() {
  const [data, setData] = useState([25, 30, 45, 60, 20, 65, 75]);
  const svgRef = useRef();
  useEffect(() => {
    const svg = select(svgRef.current);
    // using line from D3
    const myLine = line()
      // tell line based on data where to render each dot on line, based on value index in data array use x to be the index of the value
      .x((value, index) => index * 50)
      // y will be the value of the element in the array
      .y(value => 150 - value)
      // thi makes a nice curved line
      .curve(curveCardinal);
    // select the path elements in svg and sync with data
    svg
      .selectAll("path")
      // need to wrap array in another array so d3 doesnt generate a new path element for every element in the array.  We just need one path of all the elements
      .data([data])
      // create update remove with new join api
      .join("path")
      // attahced the attribute for every entering and updating element
      // value is a callback in this case- gets the entier data array as an argument foward to myLine
      // returns the d attribute and attahces it
      .attr("d", value => myLine(value))
      // clean up with no fill  and stoke bule
      .attr("fill", "none")
      .attr("stroke", "blue");
  }, [data]);
  return (
    <React.Fragment>
      <svg ref={svgRef}>
        {/* <path d="M0,150,100,100,150,120" stroke="blue" fill="none" /> */}
      </svg>
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
