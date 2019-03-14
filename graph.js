// setting up graph and margins to make room for axi later
const margin = { top: 40, right: 20, bottom: 50, left: 100 };
// the graph height and width inside the svg - so svg less the margins
const graphWidth = 500 - margin.left - margin.right;
const graphHeight = 400 - margin.top - margin.bottom;
// make a const for the SVG container that will go in the index.HTML
const svg = d3
  .select(".canvas")
  .append("svg")
  .attr("width", graphWidth + margin.left + margin.right)
  .attr("height", graphHeight + margin.top + margin.bottom);

// make the group for the graph elements
const graph = svg
  .append("g")
  .attr("width", graphWidth)
  .attr("height", graphHeight)
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

//set up scales
//time
const x = d3.scaleTime().range([0, graphWidth]);
const y = d3.scaleLinear().range([graphHeight, 0]);
// axes groups
const xAxisGroup = graph
  .append("g")
  .attr("class", "x-axis")
  // have to do a transfrom to get the x axis to start at bottom of graph instead of top
  .attr("transform", "translate(0, " + graphHeight + ")");
// y group
const yAxisGroup = graph.append("g").attr("class", "y-axis");
//////////////// function to update the vizualization when he data comes back from the db////////
const update = data => {
  //filter based on the activity button clicked loop to see if activity matches the activity button clicked
  // using filter to determine true to stay in the array
  data = data.filter(item => item.activity == activity);

  //set domains of scales
  x.domain(d3.extent(data, d => new Date(d.date)));
  y.domain([0, d3.max(data, d => d.distance)]);
  ///create circles for objects- jpin data to the selection
  const circles = graph.selectAll("circle").data(data);
  // remove unwanted points, exit selection
  circles.exit().remove();
  //update current points with now positions on the graph
  circles
    //center x coordinate of each circle driven by the data ( time )
    //return data passed data through the x scale
    .attr("cx", d => x(new Date(d.date)))
    //pass in the data from y scale
    .attr("cy", d => y(d.distance));

  ////////////////////////////////////////get the enter selection and append a circle for each one
  //add new points- apppend a circle and assign attributes
  circles
    .enter()
    .append("circle")
    //radius
    .attr("r", 4)
    //center x coordinate of each circle driven by the data ( time )
    //return data passed data through the x scale
    .attr("cx", d => x(new Date(d.date)))
    //pass in the data from y scale
    .attr("cy", d => y(d.distance))
    //fill color to match axes color
    .attr("fill", "#ccc");
  // create the axes
  const xAxis = d3
    .axisBottom(x)
    .ticks(4)
    .tickFormat(d3.timeFormat("%b %d"));
  const yAxis = d3
    .axisLeft(y)
    .ticks(4)
    .tickFormat(d => d + "m");
  //place them in axis groups call methond that takes axis and creates inside groups
  //call axes
  xAxisGroup.call(xAxis);
  yAxisGroup.call(yAxis);
  // rotate axis text
  xAxisGroup
    .selectAll("text")
    .attr("transform", "rotate"(-40))
    .attr("text-anchor", "end");
};

// data and firestore
// data will be updated as data is recived from the db
var data = [];
//set up the real time lisioner
db.collection("activities").onSnapshot(res => {
  // get this response in this call back function
  //get document changes, use forEach to loop through and fire a callback function
  res.docChanges().forEach(change => {
    //each change has a type each time the application loads each item in the db comes back with a type of added.
    // console.log(change);
    // call back function for the for each loop of changes
    // created a document in which to store the updated data
    // use ... the spread oporator to get all of the changes then make a document  object
    const doc = { ...change.doc.data(), id: change.doc.id };
    // use switch case to account for adds ,updates and deletes
    switch (change.type) {
      case "added":
        data.push(doc);
        break;
      case "modified":
        const index = data.findIndex(item => item.id == doc.id);
        data[index] = doc;
        break;
      case "removed":
        data = data.filter(item => item.id !== doc.id);
        break;
      default:
        break;
    }
  });
  // now that we have the data from the db we need to update the vizualization
  update(data);
});
