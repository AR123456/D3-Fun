import React, { useEffect, useRef } from "react";
import { select, scaleLinear, scaleBand, max, axisBottom, axisLeft } from "d3";
import useResizeObserver from "./useResizeObserver";

function StarBreak({ data, flagData }) {
  // flagData changeing true to faluse ever 2 seconds
  console.log(flagData);
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  let height = 350,
    width = 700;

  useEffect(() => {
    if (!dimensions) return;

    const svg = select(svgRef.current)
      .append("svg")
      .attr("width", width + 100)
      .attr("height", height + 150)
      .append("g")
      .attr("transform", "translate(" + 80 + ", " + 50 + ")");
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
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("fill", "grey")
      .attr("y", (d) => {
        return y(d.revenue);
      })
      .attr("x", (d) => {
        return x(d.month);
      })
      .attr("height", (d) => {
        return height - y(d.revenue);
      })
      .attr("width", x.bandwidth);
  }, [data, dimensions, height, width]);
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
