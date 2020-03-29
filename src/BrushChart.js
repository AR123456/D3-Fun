import React, { useRef, useEffect, useState } from "react";
import {
  select,
  scaleLinear,
  line,
  max,
  curveCardinal,
  axisBottom,
  axisLeft,
  brushX,
  event
} from "d3";
import useResizeObserver from "./useResizeObserver";

import usePrevious from "./usePrevious";

function BrushChart({ data, children }) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  const [selection, setSelection] = useState([45, 55]);
  const previousSelection = usePrevious(selection);

  useEffect(() => {
    const svg = select(svgRef.current);
    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect();

    // scales + line generator
    const xScale = scaleLinear()
      .domain([0, data.length - 1])
      .range([0, width]);
    const yScale = scaleLinear()
      .domain([0, max(data)])
      .range([height, 0]);
    const lineGenerator = line()
      .x((d, index) => xScale(index))
      .y(d => yScale(d))
      .curve(curveCardinal);

    // render the line
    svg
      .selectAll(".myLine")
      .data([data])
      .join("path")
      .attr("class", "myLine")
      .attr("stroke", "blue")
      .attr("fill", "none")
      .attr("d", lineGenerator);
    svg
      .selectAll(".myDot")
      .data(data)
      .join("circle")
      .attr("class", "myDot")
      .attr("stroke", "black")
      .attr("r", (value, index) =>
        index >= selection[0] && index <= selection[1] ? 4 : 2
      )
      .attr("fill", (value, index) =>
        index >= selection[0] && index <= selection[1] ? "red" : "black"
      )
      .attr("cx", (value, index) => xScale(index))
      .attr("cy", yScale);

    // axes- set up of the x and y axis
    const xAxis = axisBottom(xScale);
    svg
      .select(".x-axis")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis);

    const yAxis = axisLeft(yScale);
    svg.select(".y-axis").call(yAxis);
    const brush = brushX()
      .extent([
        [0, 0],
        [width, height]
      ])
      .on("start brush end", () => {
        if (event.selection) {
          const indexSelection = event.selection.map(xScale.invert);
          setSelection(indexSelection);
        }
      });

    if (previousSelection === selection) {
      svg
        .select(".brush")
        .call(brush)
        .call(brush.move, selection.map(xScale));
    }
  }, [data, dimensions, previousSelection, selection]);

  return (
    <React.Fragment>
      <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
        <svg ref={svgRef}>
          <g className="x-axis" />
          <g className="y-axis" />
          <g className="brush" />
        </svg>
      </div>

      {children(selection)}
    </React.Fragment>
  );
}

export default BrushChart;
