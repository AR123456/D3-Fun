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
// each link object must have a force and target
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
var nodeSelection = svg
  .selectAll("circle")
  .data(nodes)
  .enter()
  .append("circle")
  .attr("r", d => d.size)
  .attr("fill", d => d.color);

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
      //need to translate the source and target since de assumes that they are indices.
      // using id method and specify D3 find based on color.
      //strength and force between links ins determined by distance ans strength.  Interactions with other forces can cause actual distance to vary from ideal lenthg.
      //strength attribute is proportional to the diff between the lengths actual distance and its desired distance  like a spring - the more its streched or compressed the more it wants to return to original length
      //using the node data from the simulation so that larger nodes have greater repulsive force when connected by links to smaller nodes
      .distance(d => 5 * (d.source.size + d.target.size))
  )
  .on("tick", ticked);

function ticked() {
  nodeSelection.attr("cx", d => d.x).attr("cy", d => d.y);
  // need to set this dynamically the node data from the simulation can be used , updating the properties here
  linkSelection
    .attr("x1", d => d.source.x)
    .attr("y1", d => d.source.y)
    .attr("x2", d => d.target.x)
    .attr("y2", d => d.target.y);
}
