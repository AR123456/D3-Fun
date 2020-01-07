import React, { useRef, useEffect, useState } from "react";
import { select, axisBottom, scaleLinear, axisRight, scaleBand } from "d3";
// adding ResizeObserver polyfil so that all of this will work in safari and edge
import ResizeObserver from "resize-observer-polyfill";

// create custom hook here that will make use of the resize observer API by ovserving a DOM element and returning the changed width and height of that element
const useResizeObserver = ref => {
  const [dimensions, setDimensions] = useState(null);
  // dimensions set by resize observer- useState will be needed
  //useEffect to get at the DOM element that ref is pointing to after the DOM elemetns have been rendered
  useEffect(() => {
    const observeTarget = ref.current;
    const resizeObserver = new ResizeObserver(entries => {
      // console.log(entries);
      //update dimensions in the useState hook
      entries.forEach(entry => {
        setDimensions(entry.contentRect);
      });
    });
    // tell resizeObserver what to observe
    resizeObserver.observe(observeTarget);
    // clean up funciton - will be called whenever the component that uses the resize observer hook removed or unmounted
    return () => {
      resizeObserver.unobserve(observeTarget);
    };
  }, [ref]);
  return dimensions;
};

function BarChart({ data }) {
  // moving all of this from App JS but leaving the data const there
  const svgRef = useRef();
  // adding wrapperRef
  const wrapperRef = useRef();
  // make use of the useResizeObserver- pass inthe new wrapperRef
  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
    const svg = select(svgRef.current);
    // console log dmenstions
    // console.log(dimensions);
    // on first run the dimensions will be null so  if if dimensions are null dont do anything
    if (!dimensions) return;
    //
    const xScale = scaleBand()
      .domain(data.map((value, index) => index))
      // here 300 is the defalt width of SVG so this needs to become dynamic - resize observer API
      // .range([0, 300])
      .range([0, dimensions.width])
      .padding(0.5);
    const yScale = scaleLinear()
      //TODO  need to make this dynamic
      .domain([0, 150])
      // here 150 needs to be dynamic since we will not know the height of the svg- resize observer API
      // .range([150, 0]);
      .range([dimensions.height, 0]);
    const colorScale = scaleLinear()
      .domain([75, 100, 150])
      .range(["green", "orange", "red"])
      .clamp(true);
    const xAxis = axisBottom(xScale).ticks(data.length);
    svg
      .select(".x-axis")
      // .style("transform", "translateY(150px)")
      .style("transform", `translateY(${dimensions.height}px)`)
      .call(xAxis);
    const yAxis = axisRight(yScale);
    svg
      .select(".y-axis")
      // .style("transform", "translateX(300px)")
      .style("transform", `translateX(${dimensions.width}px)`)
      .call(yAxis);
    svg
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .style("transform", "scale(1,-1")
      .attr("x", (value, index) => xScale(index))
      // .attr("y", -150)
      .attr("y", -dimensions.height)
      .attr("width", xScale.bandwidth())
      .on("mouseenter", (value, index) => {
        svg
          .selectAll(".tooltip")
          .data([value])
          .join(enter => enter.append("text").attr("y", yScale(value) - 4))
          .attr("class", "tooltip")
          .text(value)
          .attr("x", xScale(index) + xScale.bandwidth() / 2)
          .attr("text-anchor", "middle")
          .transition()
          .attr("y", yScale(value) - 8)
          .attr("opacity", 1);
      })
      .on("mouseleave", () => svg.select(".tooltip").remove())
      .transition()
      .attr("fill", colorScale)
      // .attr("height", value => 150 - yScale(value));
      .attr("height", value => dimensions.height - yScale(value));
    // update dependancy array with dimensions
  }, [data, dimensions]);

  //put the SVG in a div so thatResize oberer Entyr works
  return (
    <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
      <svg ref={svgRef}>
        <g className="x-axis"></g>
        <g className="y-axis"></g>
      </svg>
    </div>
  );
}
export default BarChart;
