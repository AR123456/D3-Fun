/// band scales space out categories in a bar chart
// the scale of the width of the rectangles so that no matter how many come in as data the all fit into the svg
// use d3 band scale  - splits data in to bands of equeal value
// pass  in names and x coord, where it starts on x axis  and it returns the band width based on how many items and the width avalible in the svg container

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
  }
];

const y = d3
  .scaleLinear()
  .domain([0, 1000])
  .range([0, 500]);

const x = d3
  .scaleBand()
  // array of the different categories use map
  .domain(data.map(item => item.name))
  // console.log(data.map(item => item.name));
  // now pass the range , an array of 2 points representing the x range  0-500
  .range([0, 500])
  //put padding between bars
  .paddingInner(0.2)
  // put padding at begging and end of the chart
  .paddingOuter(0.2);

/// select svg container first
const svg = d3.select("svg");
//join data to elements
const rects = svg.selectAll("rect").data(data);
//update recs in dom
rects
  // the bandWidth  methond returns the value of the width of each bar
  .attr("width", x.bandwidth)
  .attr("height", d => y(d.orders))
  .attr("fill", "orange")
  .attr("x", d => x(d.name));

//append the enter selection from d3 virtuyal to the DOM
rects
  .enter()
  .append("rect")
  // the bandWidth  methond returns the value of the width of each bar
  .attr("width", x.bandwidth)
  .attr("height", d => y(d.orders))
  .attr("fill", "orange")
  .attr("x", d => x(d.name));
