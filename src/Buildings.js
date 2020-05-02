import React, { useEffect, useRef } from "react";
import { select, scaleLinear, scaleBand, max, axisBottom, axisLeft } from "d3";
import useResizeObserver from "./useResizeObserver";

function Buildings({ data }) {
  const svgRef = useRef();
  // console.log(svgRef);
  const wrapperRef = useRef();
  // console.log(wrapperRef);
  const dimensions = useResizeObserver(wrapperRef);
  // console.log(dimensions);
  const margin = { left: 100, right: 10, top: 10, bottom: 100 };
  const width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  useEffect(() => {
    const svg = select(svgRef.current);
    console.log(dimensions);
    if (!dimensions) return;
    svg
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");
    //
    // X Label
    svg
      .append("text")
      .attr("class", "x axis-label")
      .attr("x", width / 2)
      .attr("y", height + 140)
      .attr("font-size", "20px")
      .attr("text-anchor", "middle")
      .text("The word's tallest buildings");
    // console.log(width);
    // console.log(dimensions.width);
    // using this code to add title at bottom of the graph Y label
    svg
      .append("text")
      .attr("class", "y axis-label")
      .attr("x", -(height / 2))
      .attr("y", -60)
      .attr("font-size", "20px")
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .text("Height (m)");
    //
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
      // .range([0, width])
      // this is currently re drawing the bars and axi when resized but it does resize
      //width here is the width of the ??? bars or SVG or both ??
      .range([0, dimensions.width]) //make SVG dynamic with dimensions.width
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
    const xAxisCall = axisBottom(x);
    svg
      .append("g")
      .attr("class", "x axis")
      // for x translate by the hight of the visualization
      .attr("transform", "translate(0, " + height + ")")
      // need to call the generattor
      .call(xAxisCall)
      // here rotating the text on the x axis so it is readable
      .selectAll("text")
      .attr("y", "10")
      .attr("x", "-5")
      //lines the text up
      .attr("text-anchor", "end")
      // rotate takes one argument which is the num of deg to rotate
      .attr("transform", "rotate(-40)");

    const yAxisCall = axisLeft(y)
      // hard code number of tick marks
      .ticks(3)
      // this is to show values with m after them
      .tickFormat((d) => {
        return d + "m";
      });
    svg
      .append("g")
      .attr("class", "y-axis")
      // need to call the generattor
      .call(yAxisCall);

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
      <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
        <svg ref={svgRef}>
          {/* <g className="x-axis"></g>
          <g className="y-axis"></g> */}
        </svg>
      </div>
    </React.Fragment>
  );
}

export default Buildings;
