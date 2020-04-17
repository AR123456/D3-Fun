import React, { useEffect, useRef } from "react";
import { select } from "d3";
import useResizeObserver from "./useResizeObserver";

function Buildings({ data }) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
    const svg = select(svgRef.current);
    if (!dimensions) return;
    data.forEach((d) => {
      d.height = +d.height;
    });
    svg
      .selectAll("rectangle")
      .data(data)
      .join("rect")
      .attr("y", 0)
      .attr("x", (d, i) => {
        return i * 60;
      })

      .attr("width", 40)
      .attr("height", (d) => {
        return d.height;
      })

      .style("fill", "black");
  }, [data, dimensions]);
  return (
    <React.Fragment>
      <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
        <svg ref={svgRef}></svg>
      </div>
    </React.Fragment>
  );
}

export default Buildings;
