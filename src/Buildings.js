import React, { useEffect, useRef } from "react";
import { select, scaleLog, scaleTime } from "d3";
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

    const y = scaleLog().domain([28, 828]).range([0, 400]).base(10);
    // ***************check out the console.log to see this
    const x =
      // time scales are a type of linear scale
      // domain works with the JS date object instead of integers
      // syntax is like that of a linear scale
      scaleTime()
        // create a new date object here by passing in the day time and month we want
        // to do this with with actual data would need to convert a string of the date to a javascript date object
        .domain([new Date(2000, 0, 1), new Date(2001, 0, 1)])
        .range([0, 400]);

    console.log(x(new Date(2000, 7, 1)));
    console.log(x(new Date(2000, 2, 1)));
    console.log(x(new Date(2000, 10, 25)));

    console.log(x.invert(232.8));
    console.log(x.invert(66.5));
    console.log(x.invert(360));
    // ***************** end of console.log
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
