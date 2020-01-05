// https://www.youtube.com/watch?v=LQHt0wr3ybw&t=2s
import React, { useRef, useEffect, useState } from "react";
import "./App.css";
// axis bottom,linear scale and axis right
import { select, axisBottom, scaleLinear, axisRight, scaleBand } from "d3";

function App() {
  const [data, setData] = useState([25, 30, 45, 60, 20, 65, 75]);
  const svgRef = useRef();
  useEffect(() => {
    const svg = select(svgRef.current);
    const xScale = scaleBand()
      //scaleBand takes the range and divides it into 5 equaldistant bands
      // scale band maps abitrary values to a range of linier values in the range
      // .domain([0, 1, 2, 3, 4, 5, 6])
      // better way to write
      .domain(data.map((value, index) => index))
      .range([0, 300])
      //outer and inner padding also adjusts the x axis
      .padding(0.5);
    const yScale = scaleLinear()
      //linear range of input to linear range of input values
      .domain([0, 150])
      .range([150, 0]);
    // colorizing the bars
    const colorScale = scaleLinear()
      //linear range of input to linear range of input values
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

    // drawing the bars for the bar chart
    // the general update pattern of D3
    //
    //
    svg
      //select the bar class elements
      .selectAll(".bar")
      //syncronize with data array
      .data(data)
      // create a rect element for each piece of daata
      .join("rect")
      // class bar attr to every entering and updating element in svg,  r elements update
      .attr("class", "bar")

      // using a trick to flip them upside down on the y axis
      .style("transform", "scale(1,-1")
      // position bars on the x axis, index value gets passed to the x scale
      .attr("x", (value, index) => xScale(index))
      // transform values of the data array to their respective y values
      .attr("y", -150)
      //add width to the rectangles 7 equaly wide bands
      .attr("width", xScale.bandwidth())
      // adding animation with transition
      .transition()
      //adding height so we ca see the bars, have to do some math here so bars done fall off the bottom edge of graph
      // adding custom colorization
      .attr("fill", colorScale)

      .attr("height", value => 150 - yScale(value));
  }, [data]);
  return (
    <React.Fragment>
      <svg ref={svgRef}>
        <g className="x-axis"></g>
        <g className="y-axis"></g>
      </svg>
      <br />
      <br />
      <br />
      <br />
      <button onClick={() => setData(data.map(value => value + 5))}>
        Update data
      </button>
      <button onClick={() => setData(data.filter(value => value < 35))}>
        Filter data
      </button>
    </React.Fragment>
  );
}

export default App;
