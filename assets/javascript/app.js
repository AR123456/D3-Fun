// updating the domain range to not be hard coded with min max and extend
//

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
  // passing in d3.max
  .domain([0, d3.max(data, d => d.orders)])
  .range([0, 500]);
//cycle through the data and evaluate properties on each object and return the lowest ordered value
// for each order find the lowest value and return that.
// const min = d3.min(data, d => d.orders);
// // console.log(min);
// const max = d3.max(data, d => d.orders);
// // console.log(max);
// // extend finds the lowset and highest
// const extent = d3.extent(data, d => d.orders);
// // console.log(extent);

const x = d3
  .scaleBand()
  .domain(data.map(item => item.name))
  .range([0, 500])
  .paddingInner(0.2)
  .paddingOuter(0.2);

/// select svg container first
const svg = d3.select("svg");
//join data to elements
const rects = svg.selectAll("rect").data(data);
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
