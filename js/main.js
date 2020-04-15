// get the data from the file
d3.json("data/buildings.json").then(data => {
  //all the work with data goes here
  data.forEach(d => {
    // turn string to number
    d.height = +d.height;
  });
  const svg = d3
    .select("#chart-area")
    .append("svg")
    .attr("width", 400)
    .attr("height", 400);

  const rectangle = svg.selectAll("rectangle").data(data);
  rectangle
    .enter()
    .append("rect")
    .attr("x", (d, i) => {
      return i * 60 + 10;
    })
    .attr("y", 50)
    .attr("width", 50)
    .attr("height", d => {
      return d.height;
    })
    // .attr("rx", 0)
    // .attr("ry", 0)
    .style("margin", 10)
    .style("fill", "black")

    ///
    .catch(error => {
      console.log(error);
    });
});
