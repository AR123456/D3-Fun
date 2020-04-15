import React, { useRef, useEffect } from "react";
import { select } from "d3";
// import useResizeObserver from "./useResizeObserver";

function RecLineElipse() {
  const svgRef = useRef();

  useEffect(() => {
    const svg = select(svgRef.current);

    svg
      .append("rect")
      .attr("x", 200)
      .attr("y", 100)
      .attr("width", 100)
      .attr("height", 50)
      .attr("fill", "grey");
    svg
      .append("ellipse")
      .attr("cx", 50)
      .attr("cy", 10)
      .attr("rx", 50)
      .attr("ry", 75)
      .style("fill", "green");
    svg
      .append("line")
      .attr("x1", 300)
      .attr("y1", 200)
      .attr("x2", 350)
      .attr("y2", 250)
      .style("stroke", "black");
  });

  return <svg ref={svgRef}></svg>;
}

export default RecLineElipse;
