import React, { useEffect, useRef } from "react";
import { select } from "d3";
import useResizeObserver from "./useResizeObserver";

function Circles({ data }) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
    const svg = select(svgRef.current);
    svg
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("cx", (d, i) => {
        return i * 50 + 25;
      })
      .attr("cy", 25)
      .attr("r", d => {
        return d.age * 2;
      })
      .attr("fill", d => {
        // using this if statement to set
        //fill colors based on name value in the object
        if (d.name === "Tony") {
          return "blue";
        } else {
          return "red";
        }
      });
  }, [data, dimensions]);
  return (
    <React.Fragment>
      <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
        <svg ref={svgRef}></svg>
      </div>
    </React.Fragment>
  );
}

export default Circles;
