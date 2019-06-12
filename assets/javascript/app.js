var width = 600;
var height = 600;

var nodes = [
  { color: "red", size: 5 },
  { color: "orange", size: 10 },
  { color: "yellow", size: 15 },
  { color: "green", size: 20 },
  { color: "blue", size: 25 },
  { color: "purple", size: 30 }
];

var links = [
  { source: "red", target: "orange" },
  { source: "orange", target: "yellow" },
  { source: "yellow", target: "green" },
  { source: "green", target: "blue" },
  { source: "blue", target: "purple" },
  { source: "purple", target: "red" },
  { source: "green", target: "red" }
];

var svg = d3
  .select("svg")
  .attr("width", width)
  .attr("height", height);
var linkSelection = svg
  .selectAll("line")
  .data(links)
  .enter()
  .append("line")
  .attr("stroke", "black")
  .attr("stroke-width", 1);
// add the drag call back to the nodeSelection
var nodeSelection = svg
  .selectAll("circle")
  .data(nodes)
  .enter()
  .append("circle")
  .attr("r", d => d.size)
  .attr("fill", d => d.color)
  //d3.drags 3 elements
  .call(
    d3
      .drag()
      // she second parameter is a function defined below
      .on("start", dragStart)
      .on("drag", drag)
      .on("end", dragEnd)
  );

var simulation = d3.forceSimulation(nodes);

simulation
  .force("center", d3.forceCenter(width / 2, height / 2))
  .force("nodes", d3.forceManyBody())
  // adding force links method to the simulation
  .force(
    "links",
    d3
      .forceLink(links)
      .id(d => d.color)

      .distance(d => 5 * (d.source.size + d.target.size))
  )
  .on("tick", ticked);

function ticked() {
  /// conosle.log the alpha value
  // console.log(simulation.alpha());
  nodeSelection.attr("cx", d => d.x).attr("cy", d => d.y);

  linkSelection
    .attr("x1", d => d.source.x)
    .attr("y1", d => d.source.y)
    .attr("x2", d => d.target.x)
    .attr("y2", d => d.target.y);
}
// pass "d" into the functions
function dragStart(d) {
  console.log("starting to drag");
  // could work with alpha value here and in drag end to manipulate the target and cause simulation to warm back up as alpha goes towards new target
  simulation.alphaTarget(0.5).restart();
  // set the fx and fy properties for the start position
  d.fx = d.x;
  d.fy = d.y;
}
function drag(d) {
  console.log("dragging");
  // could forcibly set a new alpha value inside drag event then restart the simulation, don't pick a value greater than one or the simulation will break
  // simulation.alpha(0.5).restart();
  // update the properties base on the event
  d.fx = d3.event.x;
  d.fx = d3.event.y;
}
function dragEnd(d) {
  console.log("drag ended ");
  // could need to set the  alpha value back or it will never decay to
  simulation.alphaTarget(0);
  // now at end set the properties back to null
  d.fx = null;
  d.fy = null;
}
