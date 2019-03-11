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

// function to update the vizualization when he data comes back from the db

const update = data => {
  console.log(data);
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
