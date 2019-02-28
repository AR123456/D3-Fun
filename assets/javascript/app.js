//creating the svg in the javascript
// Groups and Margins   add a margin between the rectangles and the svg edge
// first surround the rectangles in a graph group , set width of the group and move in from the edge
// base the group margin as width and height of svg container less the margin .

const data = [
  {
    name: "veg soup",
    orders: 200
  },
  {
    name: "veg curry",
    orders: 600
  },
  {
    name: "veg pasta",
    orders: 300
  },
  {
    name: "veg surprise",
    orders: 900
  },
  {
    name: "veg burger",
    orders: 1500
  }
];

const y = d3
  .scaleLinear()

  .domain([0, d3.max(data, d => d.orders)])
  .range([0, 500]);

const x = d3
  .scaleBand()
  .domain(data.map(item => item.name))
  .range([0, 500])
  .paddingInner(0.2)
  .paddingOuter(0.2);

// select the canvas and then create the svg in the javascirpt
const svg = d3
  .select(".canvas")
  .append("svg")
  .attr("width", 600)
  .attr("height", 600);
// create margins and dimensions
const margin = {
  top: 20,
  right: 20,
  bottom: 100, // to allow for the axis
  left: 100 // to allow for the axis
};
// work out the graph width
const graphWidth = 600 - margin.left - margin.right;
//work out the graph height
const graphHeight = 600 - margin.top - margin.bottom;
// create the graph and append it to the svg
const graph = svg
  .append("g")
  .attr("width", graphWidth)
  .attr("height", graphHeight)
  // need to translate in by margin left and margin top, need to move in ( use es6 template string to concatonate )
  .attr("transform", `translate(${margin.left},${margin.top})`);

// append the rectangles  to the graph directly
const rects = graph.selectAll("rect").data(data);
//update recs in dom
rects
  .attr("width", x.bandwidth)
  .attr("height", d => y(d.orders))
  .attr("fill", "orange")
  .attr("x", d => x(d.name));

//append the enter selection from d3 virtuyal to the DOM
rects
  .enter()
  .append("rect")
  .attr("width", x.bandwidth)
  .attr("height", d => y(d.orders))
  .attr("fill", "orange")
  .attr("x", d => x(d.name));
