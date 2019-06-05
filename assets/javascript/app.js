var width = 600;
var height = 600;
// array of node data
var nodes = [
  { color: "red", size: 5 },
  { color: "orange", size: 10 },
  { color: "yellow", size: 15 },
  { color: "green", size: 20 },
  { color: "blue", size: 25 },
  { color: "purple", size: 30 }
];

var svg = d3
  .select("svg")
  .attr("width", width)
  .attr("height", height);
//joined and appended - in a foced directed graph a node corresponse to some data point
//the relationship between nodes > visualized links makes a force graph interesting to look at
var nodeSelection = svg
  .selectAll("circle")
  .data(nodes)
  .enter()
  .append("circle")
  .attr("r", d => d.size)
  .attr("fill", d => d.color);
// this adds vx and vy to the simulation x and y are based on the nodes current position and its velocity
var simulation = d3.forceSimulation(nodes);
// adding force ans seting equal to the new center force  passing in the middle point of the SVG
simulation
  .force("center", d3.forceCenter(width / 2, height / 2))
  // adding force many
  .force("nodes", d3.forceManyBody())
  // function that will specify how the positions of nodes should update based on the velocities and positions calculated by the simulation
  // pass the function in as a callback to the method for the simulation

  .on("tick", () => {
    //  with ever tick grab nodes and update cx and cy properties assigned by simulation
    nodeSelection.attr("cx", d => d.x).attr("cy", d => d.y);
  });
