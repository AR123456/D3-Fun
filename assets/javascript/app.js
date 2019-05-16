var width = 600;
var height = 600;
var barPadding = 1;
// get just first year
var minYear = d3.min(birthData, d => d.year);
// store first year in a variable
var yearData = birthData.filter(d => d.year === minYear);
// create an x scale so that rectangles with more or less data are displayed with differing widths
// define this prior to defining the histogram function
var xScale = d3
  .scaleLinear()
  // scale from zero to the largest value in the data set
  .domain([0, d3.max(yearData, d => d.births)])
  // range is 0 to the svg width the range round method rounds the widths to the nearest whole number
  .rangeRound([0, width]);

// create a histogram variable and set it to d3.histogram generator
var histogram = d3
  // the histogram method is called on the histogram generator, can be used to specify domain of values to use to create bins.If no domain is specified will default to using extent of data set
  .histogram()
  // getting domain originally used to create scale with .domain
  .domain(xScale.domain())
  // the thresholds method overides the default ranges on each band
  // xScale.ticks returns an array of evenly spaced intermediate values
  .thresholds(xScale.ticks())
  // histogram of birth counts
  .value(d => d.births);
// pass data into the histogram generator and store it in the bin variable
//bins is an array of 2 array elements with birth data plus the properties x0 and x1
// from this it is known how many rectangles are needed and what the y scale should be
var bins = histogram(yearData);

var barWidth = width / bins.length - barPadding;
// using scale linear to calculate thw width
var yScale = d3
  .scaleLinear()
  // 0 to the length of the largest bin
  .domain([0, d3.max(bins, d => d.length)])
  //svg hight to to zero
  .range([height, 0]);
// select svg - set width and height
var bars = d3
  .select("svg")
  .attr("width", width)
  .attr("height", height)
  // join data to elements with a class of bar
  .selectAll(".bar")
  .data(bins)
  .enter()
  // for each enter node append a g element
  .append("g")
  // need 2 elements for each svg in the data point- rectangle and text element with description of data
  .classed("bar", true);
// inside the group append the histogram rectangles
bars
  // this is the bar chart pattern
  .append("rect")
  // set the attributes so that each rectangle is offset by the bar width plus the bar padding for the y attribute
  // using the zero and x1 properties of bin to calculate bar width
  .attr("x", (d, i) => xScale(d.x0))
  // for y attribute use scale
  .attr("y", d => yScale(d.length))
  // height wil be = to the svg height less the scaled value
  .attr("height", d => height - yScale(d.length))
  // width will be the bar width
  .attr("width", d => xScale(d.x1) - xScale(d.x0) - barPadding)
  .attr("fill", "#9c27b0");
// text labels of each bar chart
bars
  .append("text")
  .text(d => d.x0 + " - " + d.x1 + " (bar height: " + d.length + ")")
  //rotate 90 deg so that text runs lenth of bar
  .attr("transform", "rotate(-90)")
  // align to show in middle of bar and at bottom of svg
  .attr("y", d => (xScale(d.x1) + xScale(d.x0)) / 2)
  .attr("x", -height + 10)
  .style("alignment-baseline", "middle");
