import React, { useEffect, useRef } from "react";
import { select, scaleLinear, scaleBand, max, axisBottom, axisLeft } from "d3";
import useResizeObserver from "./useResizeObserver";

function StarBreak({ data }) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  const margin = { left: 80, right: 20, top: 50, bottom: 100 };

  const width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  useEffect(() => {
    if (!dimensions) return;

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
      .attr("y", height + 50)
      .attr("x", width / 2)
      .attr("font-size", "20px")
      .attr("text-anchor", "middle")
      .text("Month");

    //  Y label
    svg
      .append("text")
      .attr("class", "y axis-label")
      .attr("x", -(height / 2))
      .attr("y", -60)
      .attr("font-size", "20px")
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .text("Revenue");
    //

    data.forEach((d) => {
      d.revenue = +d.revenue;
    });
    const x = scaleBand()
      .domain(
        data.map((d) => {
          return d.month;
        })
      )
      .range([0, width])
      .padding(0.2);

    const y = scaleLinear()
      .domain([
        0,
        max(data, (d) => {
          return d.revenue;
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
      .call(xAxisCall);

    const yAxisCall = axisLeft(y).tickFormat((d) => {
      return "$" + d;
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
      // shift bars to bottom of screen
      // .attr("y", 0)
      .attr("y", (d) => {
        return y(d.revenue);
      })
      .attr("x", (d, i) => {
        return x(d.month);
      })
      .attr("width", x.bandwidth)
      .attr("height", (d) => {
        return height - y(d.revenue);
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

export default StarBreak;
