import React, { useEffect, useRef } from "react";
import { select, scaleLinear, scaleBand, max } from "d3";
import useResizeObserver from "./useResizeObserver";

function Buildings({ data }) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
    const svg = select(svgRef.current);
    if (!dimensions) return;
    data.forEach((d) => {
      d.height = +d.height;
    });
    // changing x scale width - need to make the bands more narrow or the SVG bigger for all to fit
    // descrete domain, continuous range
    const x = scaleBand()
      // space out bands of equal length based on how many elements it has in its domain
      // cannot add new values in the same way as ordinal scale
      // categories to display for domain - needed to add to building.json and here in the domain
      .domain(
        // map function to generate the array of building names
        // to add to the domain
        // useful for band scales and ordinal scales category values
        data.map((d) => {
          return d.name;
        })
      )
      // the pixle postions that we want chart spaced over
      // span of SVG
      //range method takes in the min and max of the range
      .range([0, 400])
      // padding ratio inbetween the bars in the domain -
      .paddingInner(0.3)
      // padding ratio the outside edge of the whole domain
      .paddingOuter(0.3);
    console.log(x("Burj Khalifa"));

    const y = scaleLinear()
      //domain method, takes in the vaule of the min and max of the domain
      // 0 to the height of the tallest building
      .domain([
        0,
        // d3 max takes in an array of data as its first argument
        // the second argument is pointing to the buildings height value
        // finds the max value in the array to use in the domain function
        max(data, (d) => {
          return d.height;
        }),
      ])
      //range method takes in the min and max of the range
      .range([0, 400]);

    svg
      .selectAll("rectangle")
      .data(data)
      .join("rect")
      .attr("y", 0)
      // return the value from passing the building name into the x scale
      .attr("x", (d, i) => {
        return x(d.name);
      })

      .attr("width", x.bandwidth)
      .attr("height", (d) => {
        // pass raw hight values into the scales function before returning
        // as value of the height attribute
        return y(d.height);
      })

      // .style("fill", "black");
      .attr("fill", (d) => {
        return "grey";
      });
  }, [data, dimensions]);
  return (
    <React.Fragment>
      <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
        <svg ref={svgRef}></svg>
      </div>
    </React.Fragment>
  );
}

export default Buildings;
