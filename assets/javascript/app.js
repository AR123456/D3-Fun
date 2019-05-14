// this code assumes that data is arranted min to max
let minYear = birthData[0].year;
let maxYear = birthData[birthData.length - 1].year;
//normaly this code is inside of an event listener that waits for the dom to load contentin this exercise we are using console so now using global scope
let width = 600;
let height = 600;

let numBars = 12;

let barPadding = 20;
let barWidth = width / numBars - barPadding;
d3.select("input")
  .property("min", minYear)
  .property("max", maxYear)
  .property("value", minYear);

d3.select("svg")
  .attr("width", width)
  .attr("height", height)
  .selectAll("rect")
  .data(
    birthData.filter(function(d) {
      return d.year === minYear;
    })
  )
  .enter()
  .append("rect")
  .attr("width", barWidth)
  // this should be equel the the number of births
  .attr("height", function(d) {
    return (d.births / 2.5e6) * height;
  })
  //the y coordinate needs to be the upper left corner of the bar svg 0 is upper let not lower right
  // SVG height less the bar height
  .attr("y", function(d) {
    /// manualy scale data height to the svg height
    return height - (d.births / 2.5e6) * height;
  })
  .attr("x", function(d, i) {
    return (barWidth + barPadding) * i;
  })
  .attr("fill", "purple");
// getting the slider to work
d3.select("input").on("input", function() {
  var year = +d3.event.target.value;
  d3.selectAll("rect")
    .data(
      birthData.filter(function(d) {
        return d.year === year;
      })
    )
    .attr("height", function(d) {
      return (d.births / 2.5e6) * height;
    })
    .attr("y", function(d) {
      return height - (d.births / 2.5e6) * height;
    });
});
