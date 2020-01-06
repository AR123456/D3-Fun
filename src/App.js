// https://www.youtube.com/watch?v=BS5VU0gFgE0
import React, { useRef, useEffect, useState } from "react";
import "./App.css";
import { select, axisBottom, scaleLinear, axisRight, scaleBand } from "d3";

function App() {
  const [data, setData] = useState([25, 30, 45, 60, 20, 65, 75]);
  const svgRef = useRef();
  useEffect(() => {
    const svg = select(svgRef.current);
    const xScale = scaleBand()
      .domain(data.map((value, index) => index))
      .range([0, 300])
      .padding(0.5);
    const yScale = scaleLinear()
      .domain([0, 150])
      .range([150, 0]);
    const colorScale = scaleLinear()
      .domain([75, 100, 150])
      .range(["green", "orange", "red"])
      .clamp(true);
    const xAxis = axisBottom(xScale).ticks(data.length);
    svg
      .select(".x-axis")
      .style("transform", "translateY(150px)")
      .call(xAxis);
    const yAxis = axisRight(yScale);
    svg
      .select(".y-axis")
      .style("transform", "translateX(300px)")
      .call(yAxis);
    // draw the bars
    svg
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .style("transform", "scale(1,-1")
      .attr("x", (value, index) => xScale(index))
      .attr("y", -150)
      .attr("width", xScale.bandwidth())
      // add the text on hover- pass into "on", it is important to do this before the transition
      // define handler function that recives the value and index of the current bar.

      .on("mouseenter", (value, index) => {
        // with the selected argument tell D3 I want to....
        // with every mouse enter select the elements with calss tooltip and sync with data passed in IE the value of the bar
        svg
          .selectAll(".tooltip")
          .data([value])
          // create new text element for each piece of data
          // .join("text")
          // updating this to  a join so that the y transiiton from the top is more subtel
          .join(enter => enter.append("text").attr("y", yScale(value) - 4))
          // add attr so tooltip can update
          .attr("class", "tooltip")
          // define content of the element to be the value of the bar
          .text(value)
          // postiion the text on the x axis
          // getting the value of index from the on mounseenter not the index of the xscale above it.  that index ref to the element in the data array. we need the index of the element in the data array
          // adding 1/2 of the width of element to help with centering text over SVG  as data changes
          .attr("x", xScale(index) + xScale.bandwidth() / 2)

          // center the text on top of the bar
          // this centers on top of left edge- need to do one more step - add 1/2 the width of the x scale so this moves over
          .attr("text-anchor", "middle")
          .transition()
          //now position the text on the y axis- puts text on top of bar,  the d-8 adds a bit of margin
          // putting this under transition to it looks nice as well
          .attr("y", yScale(value) - 8)
          // transition the opacity of the text element when it comes in
          .attr("opacity", 1);
      })
      //need to remove the transition onmouse leave so that effects can be applyed to next element hovered over
      .on("mouseleave", () => svg.select(".tooltip").remove())
      .transition()
      .attr("fill", colorScale)
      .attr("height", value => 150 - yScale(value));
  }, [data]);
  return (
    <React.Fragment>
      <svg ref={svgRef}>
        <g className="x-axis"></g>
        <g className="y-axis"></g>
      </svg>

      <button onClick={() => setData(data.map(value => value + 5))}>
        Update data
      </button>
      <button onClick={() => setData(data.filter(value => value < 35))}>
        Filter data
      </button>
      <button
        //add data to the chart randomly
        onClick={() => setData([...data, Math.round(Math.random() * 100)])}
      >
        Add data
      </button>
    </React.Fragment>
  );
}

export default App;
