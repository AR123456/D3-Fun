const svg = d3
  // selecting chart area div
  .select("#chart-area")
  // adding stirng svg tag
  .append("svg")
  // in the attr method the first argument is the attribute to be set,
  //the second is that attributes value ie 400 pixels
  .attr("width", 500)
  .attr("height", 400);

svg
  // append takes the type of element to be added to the screen
  .append("rect")
  // sets the attributes of the svg
  // attr is a methond
  .attr("x", 200)
  // each attr methond  returns the element that they are changing
  .attr("y", 200)
  .attr("width", 100)
  .attr("height", 50)

  .attr("fill", "grey");

svg

  .append("ellipse")
  .attr("cx", 50)
  .attr("cy", 100)
  .attr("rx", 50)
  .attr("ry", 75)
  .style("fill", "green");
svg
  .append("line")
  .attr("x1", 300)
  .attr("y1", 300)
  .attr("x2", 350)
  .attr("y2", 350)
  .style("stroke", "black");
