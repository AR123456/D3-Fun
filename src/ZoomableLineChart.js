// any chart that uses linear or continuous scales can make use of this technique

import React, { useRef, useEffect, useState } from "react";
import {
  select,
  scaleLinear,
  line,
  max,
  curveCardinal,
  axisBottom,
  axisLeft,
  // d3 zoom function to define zoom behavior
  // then apply to the entire svg element
  zoom,
  zoomTransform,
} from "d3";
import useResizeObserver from "./useResizeObserver";

/**
 * Component that renders a ZoomableLineChart
 */

function ZoomableLineChart({ data, id = "myZoomableLineChart" }) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  // use state hook to handle zoom state when component re renders
  // check for zoom state and if so change elements in SVG , no default value
  const [currentZoomState, setCurrentZoomState] = useState();

  // will be called initially and on every data change(data or dimenstions )
  // as defined in the array at the end of the useEffect hook
  // it is grabbing the svg element
  useEffect(() => {
    // pass the svg to D3 using select() , this tells D3 to handle
    //everything that is going on in the  svg
    const svg = select(svgRef.current);
    const svgContent = svg.select(".content");
    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect();

    // scales + line generator
    //- setting up the xScale that transforms the index values
    //in the data aray to pixle values on the x axis
    const xScale = scaleLinear()
      .domain([0, data.length - 1])
      .range([10, width - 10]);
    // check to see if there is a zoom state and if there is handle it a bit differently
    if (currentZoomState) {
      // rescaleX comes with zoom functionality
      const newXScale = currentZoomState.rescaleX(xScale);
      //overide the domain with the newxScale
      xScale.domain(newXScale.domain());
    }
    // transforms the actual values in the data array
    // to pixle values on y axis
    const yScale = scaleLinear()
      .domain([0, max(data)])
      .range([height - 10, 10]);
    // gets the entier data array and retrns the d attr
    // d is the shape and form of the path element
    const lineGenerator = line()
      .x((d, index) => xScale(index))
      .y((d) => yScale(d))
      .curve(curveCardinal);

    // render the line
    svgContent
      .selectAll(".myLine")
      .data([data])
      .join("path")
      .attr("class", "myLine")
      .attr("stroke", "black")
      .attr("fill", "none")
      .attr("d", lineGenerator);
    // rendering a dot for every value in the data array
    svgContent
      .selectAll(".myDot")
      .data(data)
      .join("circle")
      .attr("class", "myDot")
      .attr("stroke", "black")
      .attr("r", 4)
      .attr("fill", "orange")
      .attr("cx", (value, index) => xScale(index))
      .attr("cy", yScale);

    // axes setting up the axis using the xScale and yScale
    // preiously defined
    const xAxis = axisBottom(xScale);
    svg
      .select(".x-axis")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis);

    const yAxis = axisLeft(yScale);
    svg.select(".y-axis").call(yAxis);

    // zoom define the zoom behavior here
    //generate then apply to the svg DOM element
    // need to define 3 things in zoom
    // scaleExtent
    // translateExtent
    // on zoom handler
    const zoomBehavior = zoom()
      // scaleExtend defines how far we can zoom in and out.
      // ([max zoom out value,max zoom in value])
      .scaleExtent([0.5, 5])
      // limits zoom behaivor on click and drag
      // limits zoom behaviour when we click and hold mouse
      // to naviage inside the chart
      .translateExtent([
        // top left corner of svg
        [0, 0],
        // bottom right corner of svg( total width and height)
        [width, height],
      ])
      // on zoom handler pass in funciton
      // what should happen on zppm
      .on("zoom", () => {
        // zoomTransform makes use of the zoom behavior
        // pass the section to apply the zoom behavior into the
        // zoomTransform function needs to be a DOM element
        const zoomState = zoomTransform(svg.node());
        // store the zoom state in the use state hook
        // zoomState is an object containing 3 properties
        // k , x and y .  k is the current zoom level ,
        // x and y is the off set of the svg on x and y axis
        // need to alter the x scale range and domain
        // this will make the transformation visible in the SVG
        // create a currentZoomState useState hook and use its setter here
        setCurrentZoomState(zoomState);
      });
    /// connecting zoom behavior fuction to the svg
    svg.call(zoomBehavior);
    // the currentZoomState needs to be in the dependancy array of useEffect hook
    // needs to be called again every time zoom changes
  }, [currentZoomState, data, dimensions]);

  return (
    <React.Fragment>
      <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
        {/* rendering the svg DOM element  give it the svgRef variable using 
        the useRef() hook  */}
        <svg ref={svgRef}>
          <defs>
            <clipPath id={id}>
              <rect x="0" y="0" width="100%" height="100%" />
            </clipPath>
          </defs>
          <g className="content" clipPath={`url(#${id})`}></g>
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
      </div>
    </React.Fragment>
  );
}

export default ZoomableLineChart;
