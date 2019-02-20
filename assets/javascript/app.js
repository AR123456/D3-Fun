const canvas = d3.select(".canvas");

const svg = canvas
  .append("svg")
  .attr("height", 600)
  .attr("width", 600);
//  creating grouping
const group = svg
  .append("g")
  // changing the svg to group bellow - could now perform a transform to this group
  // this moves the whole group down 100 px
  .attr("transform", "translate(0,100) ");
group
  .append("rect")
  .attr("width", 200)
  .attr("height", 100)
  .attr("fill", "blue")
  .attr("x", 20)
  .attr("y", 20);

group
  .append("circle")
  .attr("r", 50)
  .attr("cx", 300)
  .attr("cy", 70)
  .attr("fill", "pink");

group
  .append("line")
  .attr("x1", 370)
  .attr("x2", 400)
  .attr("y1", 120)
  .attr("y2", 20)
  .attr("stroke", "red");
// end of the group
svg
  .append("text")

  .attr("x", 20)

  .attr("y", 200)
  .attr("fill", "grey")
  .text("Hello world !")

  .style("font-family", "arial");
