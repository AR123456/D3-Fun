var width = 600;
var height = 600;
var padding = 50;
// feed in the regionData  object and apply the filer method to the data coming back from the musHaveKeys function
var data = regionData.filter(mustHaveKeys);
//literacy rate
var xScale = d3
  .scaleLinear()
  //finding the smallest and largest literacy rates using extent
  .domain(d3.extent(data, d => d.adultLiteracyRate))
  // using ragne methond to pass array - map to svg bounds
  .range([padding, width - padding]);
//cell subscriber per 100
var yScale = d3
  .scaleLinear()
  .domain(d3.extent(data, d => d.subscribersPer100))
  .range([height - padding, padding]);
// using radious to vizualize the median age- need a scale for this
var rScale = d3
  .scaleLinear()
  .domain(d3.extent(data, d => d.medianAge))
  .range([5, 30]);
// fill to vizualize the urban population rate - need a scale for this
var fScale = d3
  .scaleLinear()
  .domain(d3.extent(data, d => d.urbanPopulationRate))
  .range(["green", "blue"]);
// axis variables to store d3 Axis s
var xAxis = d3
  .axisBottom(xScale)
  .tickSize(-height + 2 * padding)
  .tickSizeOuter(0);

var yAxis = d3
  .axisLeft(yScale)
  .tickSize(-width + 2 * padding)
  .tickSizeOuter(0);
// setting the SVG variable
var svg = d3
  .select("svg")
  .attr("width", width)
  .attr("height", height);
// append group  to the page for the x axis
svg
  .append("g")
  .attr("transform", "translate(0," + (height - padding) + ")")
  .call(xAxis);
//append group to page for the y axis
svg
  .append("g")
  .attr("transform", "translate(" + padding + ",0)")
  .call(yAxis);
// adding text label to x
svg
  .append("text")
  .attr("x", width / 2)
  .attr("y", height - padding)
  .attr("dy", padding / 2)
  .style("text-anchor", "middle")
  .text("Literacy Rate, Aged 15 and Up");
// add text label to y - need to rotate the y
svg
  .append("text")
  .attr("transform", "rotate(-90)")
  .attr("x", -height / 2)
  .attr("dy", padding / 2)
  .style("text-anchor", "middle")
  .text("Cellular Subscribers per 100 People");
// using the D3 "pattern" to add circles to the page from the SVG
svg
  .selectAll("circle")
  .data(data)
  .enter()
  .append("circle")
  // using scales already built inside the callbacks
  .attr("cx", d => xScale(d.adultLiteracyRate))
  .attr("cy", d => yScale(d.subscribersPer100))
  .attr("r", d => rScale(d.medianAge))
  .attr("fill", d => fScale(d.urbanPopulationRate))
  //giving circles a white outline
  .attr("stroke", "#fff");
// adding the title to the graph
svg
  .append("text")
  .attr("x", width / 2)
  .attr("dy", "1em")
  .style("text-anchor", "middle")
  .style("font-size", "2em")
  .text("Cellular Subscriptions vs. Literacy Rate");
// a helper function to handle  the 4 objects on intrest and check for objects without values on each key , if no  value return false
function mustHaveKeys(obj) {
  var keys = [
    "subscribersPer100",
    "adultLiteracyRate",
    "medianAge",
    "urbanPopulationRate"
  ];
  for (var i = 0; i < keys.length; i++) {
    if (obj[keys[i]] === null) return false;
  }
  return true;
}
