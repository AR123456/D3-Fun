// find first year in the data set ,
var minYear = d3.min(birthData, d => d.year);
// calculate the max year
var maxYear = d3.max(birthData, d => d.year);
//fixing the bounds on svg
var width = 600;
var height = 600;

var continents = [];
// iterate data and generate a list of all continent codes
for (var i = 0; i < birthData.length; i++) {
  var continent = birthData[i].continent;
  //using indexOf to check for duplicate continents
  if (continents.indexOf(continent) === -1) {
    // push the non duplicates into the array
    continents.push(continent);
  }
}
// using d3 ordinal scale to associate each continent with a color
var colorScale = d3
  .scaleOrdinal()
  //domain is the continents
  .domain(continents)
  //using d3 colors schemes from the git hub repo that work with ordinal scales
  .range(d3.schemeCategory10);
// set up to center the SVG - so it is not cut off in the svg
d3.select("svg")
  //set height / width
  .attr("width", width)
  .attr("height", height)
  // append to group
  .append("g")
  // center it
  .attr("transform", "translate(" + width / 2 + " ," + height / 2 + ")")
  //give class of chart to be able to select later
  .classed("chart", true);
// seting the min,max and value properties on the input with javascript - the slider
d3.select("input")
  .property("min", minYear)
  .property("max", maxYear)
  .property("value", minYear)
  // use helper function inside the event listener
  .on("input", function() {
    // pass in the event target value converted into a number
    makeGraph(+d3.event.target.value);
    //
  });

// using helper function when script loads
makeGraph(minYear);

// helper function to handle graph set up and updates inside the event handler
function makeGraph(year) {
  //filter out data that is not from the first year in the set
  var yearData = birthData.filter(d => d.year === year);
  // pie chart Helper methods - instead of using path > which is very complicated
  // arcs becomes an array of objects with birth data info, it points back to the data object from the original birth data array that is bound to this arc
  // angles are in radiants 2 pi radians = 360 degrees -  the angle values can be used to draw chart
  // need to take the objects and pass as string into the path element
  var arcs = d3
    .pie()
    .value(d => d.births)
    // sorting countries alphabetically
    .sort(function(a, b) {
      if (a.continent < b.continent) return -1;
      else if (a.continent > b.continent) return 1;
      else return a.births - b.births;
    })(yearData);
  // created a fixed inner and outer radius based on the width of svg
  var path = d3
    .arc()
    .outerRadius(width / 2 - 10)
    //radius of zero makes circle , a positive creates a donut shape
    .innerRadius(width / 4)
    // using d3 helper methods to give the pie pieces rounded corners
    .padAngle(0.02)
    .cornerRadius(20);

  // add the general update selection, store in variable
  var update = d3
    .select(".chart")
    .selectAll(".arch")
    .data(arcs);
  // update the exit selection to remove un needed arcs
  update.exit().remove();
  // update enter selection
  update
    .enter()
    //append path element for each new piece of data
    .append("path")
    // give new dtat class or arc
    .classed("arc", true)
    // mert the enter update selections and set each arcs fill , stroke and d attribute

    .merge(update)
    //set fill based on continent
    .attr("fill", d => colorScale(d.data.continent))
    // give each arch a stroke color of black
    .attr("stroke", "black")
    // set the d attribute
    .attr("d", path);
}
