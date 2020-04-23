import React, { useEffect, useRef } from "react";
import { select, scaleLinear, scaleBand } from "d3";
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
      .domain([
        "Burj Khalifa",
        "Shanghai Tower",
        "Abraj Al-Bait Clock Tower",
        "Ping An Finance Centre",
        "Lotte World Tower",
        "One World Trade Center",
        "Guangzhou CTF Finance Center",
      ])
      // the pixle postions that we want chart spaced over
      // span of SVG
      .range([0, 400])
      // padding ratio inbetween the bars in the domain -
      .paddingInner(0.3)
      // padding ratio the outside edge of the whole domain
      .paddingOuter(0.3);
    console.log(x("Burj Khalifa"));

    const y = scaleLinear().domain([0, 828]).range([0, 400]);

    svg
      .selectAll("rectangle")
      .data(data)
      .join("rect")
      .attr("y", 0)
      // return the value from passing the building name into the x scale
      .attr("x", (d, i) => {
        return x(d.name);
      })

      .attr("width", 40)
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
