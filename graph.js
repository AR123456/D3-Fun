// interactive D3 visualizaitons - onclicks, double-clicks hovers, drags, tooltips ect
//Section 9 lecture 66

// Event listenters - D3 supports most vanilla JS events
//https://developer.mozilla.org/en-US/docs/Web/Events
// syntax for setting up event listeners
// make selection of the ellements
//const rects = d3.selectAll("rects")
//then use the on metond to attach an event the first parameter is the type of event , then declare the call back function
//  rects.on("click", function)  can be an arrow function  or if you want to use 'this' inside it can be old school function

/////////////////////// adding a mouse over event
const dims = { height: 300, width: 300, radius: 150 };

const cent = { x: dims.width / 2 + 5, y: dims.height / 2 + 5 };

const svg = d3
  .select(".canvas")
  .append("svg")
  .attr("width", dims.width + 150)
  .attr("height", dims.height + 150);

const graph = svg
  .append("g")
  .attr("transform", `translate(${cent.x}, ${cent.y})`);
const pie = d3
  .pie()
  .sort(null)
  .value(d => d.cost);

const arcPath = d3
  .arc()
  .outerRadius(dims.radius)
  .innerRadius(dims.radius / 2);

const colour = d3.scaleOrdinal(d3["schemeSet3"]);
// //// legend set up /////////////////
const legendGroup = svg
  .append("g")
  .attr("transform", `translate(${dims.width + 40}, 10)`);
//legendColor comes from the plug in
const legend = d3
  .legendColor()
  .shape("circle")
  .shapePadding(10)
  .scale(colour);

////////////////////////the update function ///////////////////
const update = data => {
  colour.domain(data.map(d => d.name));
  // update and call legend
  legendGroup.call(legend);
  legendGroup.selectAll("text").attr("fill", "white");

  const paths = graph.selectAll("path").data(pie(data));

  // handle the exit selection
  paths
    .exit()
    .transition()
    .duration(750)
    .attrTween("d", arcTweenExit)
    .remove();
  // handles the current DOM path updates
  paths
    .attr("d", arcPath)
    .transition()
    .duration(750)
    .attrTween("d", arcTweenUpdate);

  paths
    .enter()
    .append("path")
    .attr("class", "arc")
    .attr("stroke", "#fff")
    .attr("stroke-width", 3)
    .attr("fill", d => colour(d.data.name))
    .each(function(d) {
      this._current = d;
    })
    .transition()
    .duration(750)
    .attrTween("d", arcTweenEnter);
  // first step select the elements , in this case the pies are paths so that is the element to select, need to do it in 'enter' since it is at this point where they are on the page
  graph
    .selectAll("path")
    //////// adding events //////
    // then add the event listener and the call back function
    // the call back function is being handed the 'd' (the data on the path)  as  well as the 'i'- index of that element in the selection  and 'n'- the array of elements in that selection
    .on("mouseover", handleMouseOver)
    .on("mouseout", handleMouseOut)
    // adding an on click to del a slice of the pie
    .on("click", handleClick);
};
var data = [];

db.collection("expenses")
  .orderBy("cost")
  .onSnapshot(res => {
    res.docChanges().forEach(change => {
      const doc = { ...change.doc.data(), id: change.doc.id };
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
    update(data);
  });

const arcTweenEnter = d => {
  var i = d3.interpolate(d.endAngle, d.startAngle);
  return function(t) {
    d.startAngle = i(t);
    return arcPath(d);
  };
};

const arcTweenExit = d => {
  var i = d3.interpolate(d.startAngle, d.endAngle);
  return function(t) {
    d.startAngle = i(t);
    return arcPath(d);
  };
};
function arcTweenUpdate(d) {
  var i = d3.interpolate(this._current, d);
  this._current = i(1);
  return function(t) {
    return arcPath(i(t));
  };
}
//// this is the call back function in the on click event
/// event handlers
// using es6 as an alternative
const handleMouseOver = (d, i, n) => {
  // console.log("this is the element being hovered over: ", n[i]);
  //wrap n[i] in the d3.select so that we have access to d3 methods
  d3.select(n[i])
    //adding d3 methods
    //maing this a named transition
    // .transition()
    .transition("changeSliceFill")
    .duration(300)
    .attr("fill", "#fff");
};
const handleMouseOut = (d, i, n) => {
  // console.log("this is the element being hovered over: ", n[i]);
  //wrap n[i] in the d3.select so that we have access to d3 methods
  d3.select(n[i])
    //adding d3 methods

    //maing this a named transition
    // .transition()
    .transition("changeSliceFill")
    .duration(300)
    .attr("fill", colour(d.data.name));
};

const handleClick = d => {
  // console.log(d);
  // in this object is the firestore of the thing that was clicked on .
  const id = d.data.id;
  db.collection("expenses")
    .doc(id)
    .delete();
};
