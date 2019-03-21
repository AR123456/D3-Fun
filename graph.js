//set up
//the actual diagram dimention
const dims = { height: 500, width: 1100 };
// the container for the graph
const svg = d3
  .select(".canvas")
  .append("svg")
  .append("width", dims.width + 100)
  .attr("height", dims.height + 100);
// the the graph group
const graph = svg.append("g").attr("transform", "translate (50, 50)");

// setting up the real time event listoner
var data = [];
db.collection("employees").onSnapshot(res => {
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
  console.log(data);
});
