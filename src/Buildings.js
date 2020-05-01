import React, { useEffect, useRef } from "react";
import { select, scaleLinear, scaleBand, max } from "d3";
import useResizeObserver from "./useResizeObserver";

function Buildings({ data }) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  const margin = { left: 100, right: 10, top: 10, bottom: 100 };
  const width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  useEffect(() => {
    const svg = select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");
    if (!dimensions) return;
    data.forEach((d) => {
      d.height = +d.height;
    });
    const x = scaleBand()
      .domain(
        data.map((d) => {
          return d.name;
        })
      )
      .range([0, width])
      .paddingInner(0.3)
      .paddingOuter(0.3);

    const y = scaleLinear()
      .domain([
        0,
        max(data, (d) => {
          return d.height;
        }),
      ])
      .range([0, height]);

    svg
      .selectAll("rectangle")
      .data(data)
      .join("rect")
      .attr("y", 0)
      .attr("x", (d, i) => {
        return x(d.name);
      })
      .attr("width", x.bandwidth)
      .attr("height", (d) => {
        return y(d.height);
      })
      .attr("fill", (d) => {
        return "grey";
      });
  }, [data, dimensions, height, width, margin]);
  return (
    <React.Fragment>
      <div ref={wrapperRef}>
        <svg ref={svgRef}></svg>
      </div>
    </React.Fragment>
  );
}

export default Buildings;
