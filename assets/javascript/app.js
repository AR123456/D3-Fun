const canvas = d3.select(".canvas");
// append is an d3 methond that appends the svg to the canvas

// ///////////const svg = canvas.append("svg");
// // can use attr to add attributes to the svg
// svg.attr("height", 600);
// svg.attr("width", 600);
// ////////but this can also be done like this
// the return value is the ellement appended const svg = canvas.append("svg")
const svg = canvas
  .append("svg")
  .attr("height", 600)
  .attr("width", 600);

// append shapes to svg container
svg
  .append("rect")
  .attr("width", 200)
  .attr("height", 100)
  .attr("fill", "blue")
  .attr("x", 20)
  .attr("y", 20);

svg
  .append("circle")
  .attr("r", 50)
  .attr("cx", 300)
  .attr("cy", 70)
  .attr("fill", "pink");

svg
  .append("line")
  .attr("x1", 370)
  .attr("x2", 400)
  .attr("y1", 120)
  .attr("y2", 20)
  .attr("stroke", "red");

//can also append p tags and other elements just will not on this course
// can also add text  text svg this is usefull for adding a label to a graph ect
svg
  .append("text")
  //the start of the text string along x
  .attr("x", 20)
  // the start position from the top
  .attr("y", 200)
  .attr("fill", "grey")
  .text("Hello world !")
  //can use the css style methond to apply css
  .style("font-family", "arial");
