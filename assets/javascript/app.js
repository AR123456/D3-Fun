//creating the axes - create groups and then appply the d3 axes generator
//also using the live server with menu.json file

const svg = d3
  .select(".canvas")
  .append("svg")
  .attr("width", 600)
  .attr("height", 600);

const margin = {
  top: 20,
  right: 20,
  bottom: 100,
  left: 100
};

const graphWidth = 600 - margin.left - margin.right;
const graphHeight = 600 - margin.top - margin.bottom;

const graph = svg
  .append("g")
  .attr("width", graphWidth)
  .attr("height", graphHeight)
  .attr("transform", `translate(${margin.left},${margin.top})`);
//create a group for the x and y axis
// select and rotate the text of the itme on the x axis using transform- see below
const xAxisGroup = graph
  .append("g")
  .attr("transform", `translate(0, ${graphHeight})`);
const yAxisGroup = graph.append("g");

d3.json("menu.json").then(data => {
  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, d => d.orders)])

    .range([graphHeight, 0]);

  const x = d3
    .scaleBand()
    .domain(data.map(item => item.name))
    .range([0, 500])
    .paddingInner(0.2)
    .paddingOuter(0.2);

  const rects = graph.selectAll("rect").data(data);

  rects
    .attr("width", x.bandwidth)

    .attr("height", d => graphHeight - y(d.orders))
    .attr("fill", "orange")
    .attr("x", d => x(d.name))
    .attr("y", d => y(d.orders));

  rects
    .enter()
    .append("rect")
    .attr("width", x.bandwidth)
    .attr("height", d => graphHeight - y(d.orders))
    .attr("fill", "orange")
    .attr("x", d => x(d.name))
    .attr("y", d => y(d.orders));

  //create and call  the axes

  const xAxis = d3.axisBottom(x);
  const yAxis = d3
    .axisLeft(y)
    // add ticks here
    .ticks(3)
    .tickFormat(d => d + " orders");

  xAxisGroup.call(xAxis);
  yAxisGroup.call(yAxis);

  xAxisGroup
    .selectAll("text")
    // rotate could also be -40 like in video but this looks better
    .attr("transform", "rotate( 40)")
    //can be start, middle or end
    .attr("text-anchor", "start")
    //change text color to match the bars
    .attr("fill", "orange");
});
