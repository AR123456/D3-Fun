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
//create a linear scale using d3.scaleLinear
//pass domain - the input values between( the max values)  and   range
const y = d3
  .scaleLinear()
  // this is essentialy making it 1/2 scale
  .domain([0, 1000])
  .range([0, 500]);

/// select svg container first
const svg = d3.select("svg");
//join data to elements
const rects = svg.selectAll("rect").data(data);
//update recs in dom
rects
  .attr("width", 50)
  //need to pass the height through the y scale so enclose d function into y
  // .attr("height", d => d.orders)
  .attr("height", d => y(d.orders))
  .attr("fill", "orange")
  // shifting tho the right 70 px for each rectangle
  .attr("x", (d, i) => i * 70);

//append the enter selection to the DOM
rects
  .enter()
  .append("rect")
  .attr("width", 50)
  //need to pass the height through the y scale so enclose d function into y
  // .attr("height", d => d.orders)
  .attr("height", d => y(d.orders))
  .attr("fill", "orange")
  // shifting tho the right 70 px for each rectangle
  .attr("x", (d, i) => i * 70);
