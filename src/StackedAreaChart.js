import React, { useEffect, useRef } from "react";
import {
  select,
  axisBottom,
  stack,
  max,
  scaleLinear,
  axisLeft,
  stackOrderAscending,
  // helps define generate the d attribute which defines the path element
  area,
  scalePoint,
  curveCardinal,
} from "d3";
import useResizeObserver from "./useResizeObserver";

/**
 * Component that renders a StackedBarChart
 */

function StackedBarChart({ data, keys, colors }) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  // will be called initially and on every data change
  useEffect(() => {
    const svg = select(svgRef.current);
    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect();

    // stacks / layers
    const stackGenerator = stack()
      .keys(keys)
      // will keep data points in same place in stack if they are removed and re added
      // will update according to which item (band) has the greatest value
      //relative to the others on top
      // to keep the order of the stacks the same just remove this line
      .order(stackOrderAscending);
    const layers = stackGenerator(data);
    const extent = [
      0,
      max(layers, (layer) => max(layer, (sequence) => sequence[1])),
    ];

    // scales
    // need to use the scalePoint() here not scaleBand(),
    //this moves the first date over to the very left edge and removes gap from right
    const xScale = scalePoint()
      .domain(data.map((d) => d.year))
      .range([0, width]);

    const yScale = scaleLinear().domain(extent).range([height, 0]);

    // area generator - the area() function returns a generator function
    // which will recive our layer with the five sequences to give back
    //the shape and form of the path element.
    // sequence is an array with a range of values
    // define for each of the sequences what will the x corordinate be
    const areaGenerator = area()
      // now need to define 3 things x y0 and y1
      // for each sequence in the layer what will the
      //x y0 and y1 be?
      // x is for year pass to xScale which transform into pixle values on screen
      .x((sequence) => xScale(sequence.data.year))
      // .y0 and y1 - need 2 the upper and lower coordinates
      //of area at any given point or sequence
      // lower end of area at any given sequence
      // pass sequence as argument to this function
      // and return the lower y position at that sequence
      // so pass the first value of sequence
      /** reminder a sequence is an array of 2 values, a
       * range of values, raw data
       */
      .y0((sequence) => yScale(sequence[0]))
      // top end of area at any given point or sequence
      // retuning the second value in the sequence array
      .y1((sequence) => yScale(sequence[1]))
      // add in a curve type d3 curve factory
      .curve(curveCardinal);

    // rendering
    svg
      .selectAll(".layer")
      .data(layers)
      // note this is now a path element, not a group
      // single path element for each layer
      .join("path")
      .attr("class", "layer")
      .attr("fill", (layer) => colors[layer.key])
      // the d element defines the shape and form
      // pass the sequnece to the area generator
      // the areaGenerator is capable of handleing an array of sequences
      // in a layer and transforming them into the d element of a path element
      // so here pass the areaGenerator to the d attr
      .attr("d", areaGenerator);

    // axes
    const xAxis = axisBottom(xScale);
    svg
      .select(".x-axis")
      .attr("transform", `translate(0, ${height})`)
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
