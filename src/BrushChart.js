import React, { useRef, useEffect, useState } from "react";
import {
  select,
  scaleLinear,
  line,
  max,
  curveCardinal,
  axisBottom,
  axisLeft,
  brushX,
  event
} from "d3";
import useResizeObserver from "./useResizeObserver";

import usePrevious from "./usePrevious";

function BrushChart({ data }) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  // pass into state the default range for brush in index values
  // find length of array and start the brush at the end of it by default
  const [selection, setSelection] = useState([45, 55]);
  // making use of usePrevious to hve the prevousSelection at desposal
  const previousSelection = usePrevious(selection);

  // will be called initially and on every data change
  useEffect(() => {
    const svg = select(svgRef.current);
    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect();

    // scales + line generator
    //  using scaleLinear to map the index values in that data array to pixel values on the x axis
    const xScale = scaleLinear()
      .domain([0, data.length - 1])
      .range([0, width]);
    // this scale liniar is mappting the values in the data array to the pixel values on the y axis
    const yScale = scaleLinear()
      .domain([0, max(data)])
      .range([height, 0]);
    // line generator function from d3 to use in svg
    const lineGenerator = line()
      .x((d, index) => xScale(index))
      .y(d => yScale(d))
      .curve(curveCardinal);

    // render the line
    svg
      .selectAll(".myLine")
      .data([data])
      .join("path")
      .attr("class", "myLine")
      .attr("stroke", "blue")
      .attr("fill", "none")
      .attr("d", lineGenerator);
    // give the circles a different radius depening if they are in the brush or not
    svg
      .selectAll(".myDot")
      .data(data)
      // rendering circle for every value in the data array
      .join("circle")
      .attr("class", "myDot")
      .attr("stroke", "black")
      //giving different radius if inside brush in this callback function
      .attr("r", (value, index) =>
        index >= selection[0] && index <= selection[1] ? 4 : 2
      )
      //change fill value to orange if inside the brush
      .attr("fill", (value, index) =>
        index >= selection[0] && index <= selection[1] ? "red" : "black"
      )
      .attr("cx", (value, index) => xScale(index))
      .attr("cy", yScale);

    // axes- set up of the x and y axis
    const xAxis = axisBottom(xScale);
    svg
      .select(".x-axis")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis);

    const yAxis = axisLeft(yScale);
    svg.select(".y-axis").call(yAxis);

    // brush logic brushX is from D3 define 3 thins
    //1)extent - where the brush can move on top of the svg - top left to bottom right corner
    //2)default selection of the brush with brush move - calls the brush.move for the current selection- the group element
    // give the range of the brush
    //3) select the brush in the svg element to see it
    const brush = brushX()
      .extent([
        [0, 0],
        [width, height]
      ])
      // handling the brush event with .on
      .on("start brush end", () => {
        // d3 event object has the selection in it- a range of pixels
        // is there a dot in the range of the brush ?  - use scales
        // breaks if click outside of brush area so putting into if statement
        if (event.selection) {
          // the x scale can transform the y pixel values into index values -
          // calculated index values of the selection- xScale.invert
          const indexSelection = event.selection.map(xScale.invert);
          // store indexSelection a usestate hook so that it can be used later in brush.move argument
          // and for the circles so that they can be used bit differenlty if htey are behind the brush or not.
          setSelection(indexSelection);
        }
      });

    // initial position + retaining position on resize
    // only if the prevous selection is the same as this selection call the code block - this gets us out of the infanant loop
    if (previousSelection === selection) {
      svg
        .select(".brush")
        .call(brush)
        // herre is where the default "selection" from useState is being passed in
        // transforming index values  to pixel valuess because selection or brush move needs pixels values
        // to avoid an infenent loop need to make sure that this code block is only called when the selection is changing
        // the usePrevious hook will help with this
        .call(brush.move, selection.map(xScale));
    }
  }, [data, dimensions, previousSelection, selection]);

  return (
    <React.Fragment>
      <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
        <svg ref={svgRef}>
          {/* D3 rendering the tickes and lines in group elements */}
          <g className="x-axis" />
          <g className="y-axis" />
          {/* the brush will be rendered in its own group element */}
          <g className="brush" />
        </svg>
      </div>
      {/* added this small tag to show selected values  */}
      {/*  similar check to  if value is in brush range filter over values */}
      <small style={{ marginBottom: "1rem" }}>
        Numbers in selected number of days: [
        {data
          .filter(
            (value, index) => index >= selection[0] && index <= selection[1]
          )
          // seperate by comma
          .join(", ")}
        ]
      </small>
    </React.Fragment>
  );
}

export default BrushChart;
