const svg = d3
  // selecting chart area div
  .select("#chart-area")
  // adding stirng svg tag
  .append("svg")
  // in the attr method the first argument is the attribute to be set,
  //the second is that attributes value ie 400 pixels
  .attr("width", 400)
  .attr("height", 400);

const circle = svg
  // append takes the type of element to be added to the screen
  .append("circle")
  // sets the attributes of the svg
  // attr is a methond
  .attr("cx", 100)
  // each attr methond  returns the element that they are changing
  .attr("cy", 250)
  .attr("r", 70)
  .attr("fill", "grey");
