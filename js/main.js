var svg = d3
  .select("#chart-area")
  .append("svg")
  .attr("width", "400")
  .attr("height", "400");

d3.json("data/buildings.json").then(data => {
  console.log(data);

  data.forEach(d => {
    d.height = +d.height;
  });

  var rects = svg
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("y", 0)
    .attr("x", (d, i) => {
      return i * 60;
    })
    .attr("width", 40)
    .attr("height", d => {
      return d.height;
    })
    .attr("fill", d => {
      return "grey";
    });
});
