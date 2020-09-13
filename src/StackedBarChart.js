// start off with the basic boiler plate code
import React, { useEffect, useRef } from "react";
import {
  select,
  scaleBand,
  axisBottom,
  // need this for the stacking part
  stack,
  // use max to find extent
  max,
  scaleLinear,
  axisLeft,
  stackOrderAscending,
} from "d3";
// makes this responsive
import useResizeObserver from "./useResizeObserver";

/**
 * Component that renders a StackedBarChart
 */

function StackedBarChart({ data, keys, colors }) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  // useEffect()  will be called initially and on every data change
  useEffect(() => {
    const svg = select(svgRef.current);
    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect();

    // stacks / layers
    // the stack generator function from D3-
    const stackGenerator = stack()
      // which keys to stack on top of one another
      // cuts into layers and stacks or series
      .keys(keys)
      // order is avalible out of the box with D3
      // now layers with the lowest number sum will float to the bottom of the stack in the chart
      .order(stackOrderAscending);
    const layers = stackGenerator(data);
    const extent = [
      0,
      // pass layers array and look for max in each sequence ,
      //then compare to each other to find highest total value

      max(layers, (layer) => max(layer, (sequence) => sequence[1])),
    ];

    // scales - values in data aray to pixel values
    const xScale = scaleBand()
      // array of years in the data array , map and return the years in the array
      .domain(data.map((d) => d.year))
      // how long the axis needs to be
      .range([0, width])
      .padding(0.25);

    const yScale = scaleLinear()
      // extent is the min and max value
      .domain(extent)
      // total height of svg to 0.
      .range([height, 0]);

    // rendering the layers - use d3 general update pattern
    svg
      // three layers
      .selectAll(".layer")
      //sync with data from layers array
      .data(layers)
      // create new group element for each layer
      .join("g")
      //give class layer to update later
      .attr("class", "layer")
      //feeding in the colors
      .attr("fill", (layer) => colors[layer.key])
      // select reca tn sync with data from layers array
      .selectAll("rect")
      .data((layer) => layer)
      .join("rect")
      // add x and y attributes so we can see
      // get current year in each sequence
      .attr("x", (sequence) => xScale(sequence.data.year))
      .attr("width", xScale.bandwidth())
      // point of origin is top right, not bottom left
      .attr("y", (sequence) => yScale(sequence[1]))
      .attr("height", (sequence) => yScale(sequence[0]) - yScale(sequence[1]));

    // axes
    // putting x into the x-axis group element
    const xAxis = axisBottom(xScale);
    svg
      // get calls name
      .select(".x-axis")
      // move the x-axis to the bottom , not top
      .attr("transform", `translate(0, ${height})`)
      // summon the x Axis
      .call(xAxis);

    const yAxis = axisLeft(yScale);
    svg.select(".y-axis").call(yAxis);
  }, [colors, data, dimensions, keys]);

  return (
    <React.Fragment>
      <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
        <svg ref={svgRef}>
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
      </div>
    </React.Fragment>
  );
}

export default StackedBarChart;
