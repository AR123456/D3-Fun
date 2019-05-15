var width = 500;
var height = 500;
var padding = 30;
// use extent for this
// var yMax = d3.max(birthData, d => d.lifeExpectancy);
// var yMin = d3.min(birthData, d => d.lifeExpectancy);
var yScale = d3
  .scaleLinear()
  .domain(d3.extent(birthData, d => d.lifeExpectancy))
  .range([height - padding, padding]);
var xScale = d3
  .scaleLinear()
  .domain(d3.extent(birthData, d => d.births / d.population))
  .range([padding, width - padding]);
var xAxis = d3
  .axisBottom(xScale)
  //this adds grid lines by extending the tick lines out
  .tickSize(-height + 2 * padding)
  .tickSizeOuter(0);
var yAxis = d3
  .axisLeft(yScale)
  //this adds grid lines by extending the tick lines out
  .tickSize(-width + 2 * padding)
  .tickSizeOuter(0);
var colorScale = d3
  .scaleLinear()
  .domain(d3.extent(birthData, d => d.population / d.area))
  .range(["lightgreen", "black"]);
var radiusScale = d3
  .scaleLinear()
  .domain(d3.extent(birthData, d => d.births))
  .range([2, 40]);
d3.select("svg")
  .append("g")
  // move the axi to lower left
  .attr("transform", "translate(0, " + (height - padding) + ")")
  .call(xAxis);
d3.select("svg")
  .append("g")
  // move the axi to lower left
  .attr("transform", "translate(" + padding + ",0)")
  .call(yAxis);

d3.select("svg")
  .attr("width", width)
  .attr("height", height)
  .selectAll("circle")
  .data(birthData)

  .enter()
  .append("circle")
  .attr("cx", d => xScale(d.births / d.population))
  .attr("cy", d => yScale(d.lifeExpectancy))
  .attr("fill", d => colorScale(d.population / d.area))

  .attr("r", d => radiusScale(d.births));
// adding text, no secret sauce for this need to use d3 fundementals
//select SVG, append text element, position correclty  and set inner text
d3.select("svg")
  // center horizontally and verticaly with the x axis
  .append("text")
  .attr("x", width / 2)
  .attr("y", height - padding)
  // D-y attribute to push down relative ot the x axis
  .attr("dy", "1.5em")
  .style("text-anchor", "middle")
  .text("Births per Capita ");
// center text relative to x attribute  and set text inside
d3.select("svg")
  // center horizontally and verticaly  with the x axis
  .append("text")
  .attr("x", width / 2)
  .attr("y", padding)
  .style("text-anchor", "middle")
  .style("font-size", "1.5em")
  .text("Data on Births by Country in 2011 ");

// setting the y axis - need to rotate text 90 degrees
d3.select("svg")
  .append("text")
  .attr("transform", "rotate(-90)")

  // x attribute will move text element in vertical direction
  .attr("x", -height / 2)
  .attr("y", padding)
  .attr("dy", "-1.1em")
  .style("text-anchor", "middle")
  .text("Life Expectancy");
