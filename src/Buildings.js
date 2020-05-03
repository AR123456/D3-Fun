import React, { useEffect, useRef } from "react";
import { select, scaleLinear, scaleBand, max, axisBottom, axisLeft } from "d3";
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
      //reversing the range of linear scale so 0 maps to bottom of svg
      // instead of the top
      // .range([0, height]);
      .range([height, 0]);
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
      // .attr("y", 0)
      .attr("y", (d) => {
        // shift bars to bottom of screen
        // set y attribute val to val from y scale
        return y(d.height);
      })
      .attr("x", (d, i) => {
        return x(d.name);
      })
      .attr("width", x.bandwidth)
      .attr("height", (d) => {
        // return y(d.height);
        // changing the height of the bars to hight of vis from y scale
        return height - y(d.height);
      })
      .attr("fill", (d) => {
        return "grey";
      });
  }, [data, dimensions, height, width, margin]);
  return (
    <React.Fragment>
      <div ref={wrapperRef}>
        <svg ref={svgRef}>
          {/* <g className="x-axis"></g>
          <g className="y-axis"></g> */}
        </svg>
      </div>
    </React.Fragment>
  );
}

export default Buildings;
