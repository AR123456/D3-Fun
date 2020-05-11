import React, { useEffect, useRef } from "react";
import {
  select,
  scaleLinear,
  scaleLog,
  scaleOrdinal,
  schemePastel1,
  axisBottom,
  axisLeft,
  transition,
} from "d3";
import useResizeObserver from "./useResizeObserver";

function StarBreak({ data, time }) {
  // flagData changeing true to faluse ever 2 seconds
  console.log(time);
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  // const margin = { left: 80, right: 20, top: 50, bottom: 100 };
  const height = 350,
    width = 700;

  useEffect(() => {
    if (!dimensions) return;

    const svg = select(svgRef.current)
      .attr("width", width + 100)
      .attr("height", height + 150)
      .append("g")
      .attr("transform", "translate(" + 80 + ", " + 50 + ")");

    // Scales
    const x = scaleLog().base(10).range([0, width]).domain([142, 150000]);
    const y = scaleLinear().range([height, 0]).domain([0, 90]);
    const area = scaleLinear()
      .range([25 * Math.PI, 1500 * Math.PI])
      .domain([2000, 1400000000]);
    const continentColor = scaleOrdinal(schemePastel1);

    // Labels
    // xLabel
    svg
      .append("text")
      .attr("class", "x axis-label")
      .attr("y", height + 50)
      .attr("x", width / 2)
      .attr("font-size", "20px")
      .attr("text-anchor", "middle")
      .text("GDP Per Capita ($)");
    // yLabel
    svg
      .append("text")
      .attr("class", "y axis-label")
      .attr("transform", "rotate(-90)")
      .attr("y", -40)
      .attr("x", -170)
      .attr("font-size", "20px")
      .attr("text-anchor", "middle")
      .text("Life Expectancy (Years)");
    // timeLable

    svg
      .append("text")
      .attr("class", "timeLabel")
      .attr("y", height - 10)
      .attr("x", width - 40)
      .attr("font-size", "40px")
      .attr("opacity", "0.4")
      .attr("text-anchor", "middle")
      .text("1800");
    // x-axis
    const xAxisCall = axisBottom(x)
      .tickValues([400, 4000, 40000])
      .tickFormat((d) => {
        // return format("$")
      });
    svg
      .append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxisCall);
    //yAxis

    const yAxisCall = axisLeft(y).tickFormat((d) => {
      return "$" + d;
    });
    svg
      .append("g")
      .attr("class", "y-axis")
      // need to call the generattor
      .call(yAxisCall);

    // Clean data

    const formattedData = data.map((year) => {
      return year["countries"]
        .filter((country) => {
          const dataExists = country.income && country.life_exp;
          return dataExists;
        })
        .map((country) => {
          country.income = +country.income;
          country.life_exp = +country.life_exp;
          return country;
        });
    });
    // First run of the visualization
    update(formattedData[0]);
    function update(data) {
      // Standard transition time for the visualization
      const t = transition().duration(100);

      // JOIN new data with old elements.
      const circles = svg.selectAll("circle").data(data, (d) => {
        return d.country;
      });

      // EXIT old elements not present in new data.
      circles.exit().attr("class", "exit").remove();

      // ENTER new elements present in new data.
      circles
        .enter()
        .append("circle")
        .attr("class", "enter")
        .attr("fill", (d) => {
          return continentColor(d.continent);
        })
        .merge(circles)
        .transition(t)
        .attr("cy", (d) => {
          return y(d.life_exp);
        })
        .attr("cx", (d) => {
          return x(d.income);
        })
        .attr("r", function (d) {
          return Math.sqrt(area(d.population) / Math.PI);
        });

      // Update the time label
      svg.text(+(time + 1800));
    }
  }, [data, dimensions, height, width, time]);
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
