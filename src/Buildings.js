import React, { useEffect, useRef } from "react";
import { select, scaleLog } from "d3";
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
    // convention is to name the const after the axis that it will apply to
    const y =
      // use log scale to display data with large changes in value
      // does better job displaying the diff in values
      //scaleLog takes in min and max values for domain and range
      // the domain of a log scale needs to be either strictly negative or positive
      // the log of 0 is always undefined
      // 0 cannot be in the domain
      scaleLog()
        //domain method, takes in the vaule of the min and max of the domain
        // 0 to the height of the tallest building
        .domain([28, 828])
        //range method takes in the min and max of the range
        // the out put
        .range([0, 400])
        // base value defaults to 10
        // this would place values a factor of 10 apart
        // a log scale with a base of 1 is the same as a linear scale
        .base(10);
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
        // pass raw hight values into the scales function before returning
        // as value of the height attribute
        return y(d.height);
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
