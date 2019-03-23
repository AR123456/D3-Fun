const dims = { height: 500, width: 1500 };

const svg = d3
  .select(".canvas")
  .append("svg")
  .attr("width", dims.width + 100)
  .attr("height", dims.height + 100);

const graph = svg.append("g").attr("transform", "translate(50, 50)");

// tree and stratify
const tree = d3.tree().size([dims.width, dims.height]);

const stratify = d3
  .stratify()
  .id(d => d.name)
  .parentId(d => d.parent);

// update function
const update = data => {
  // get updated root Node data
  const rootNode = stratify(data);
  const treeData = tree(rootNode);

  // console.log(treeData);

  // get nodes selection and join new data
  const nodes = graph.selectAll(".node").data(tree(rootNode).descendants());
  //enter node groups
  const enterNodes = nodes
    .enter()
    .append("g")
    .attr("class", "node")
    .attr("transform", d => `translate(${d.x}, ${d.y})`);
  // append rects to enter nodes
  enterNodes
    .append("rect")
    .attr("fill", "#aaa")
    .attr("stroke", "#555")
    .attr("stroke-width", 2)
    .attr("height", 50)
    .attr("width", d => d.data.name.length * 20);
  // append name text
  enterNodes
    .append("text")
    .attr("text-anchor", "middle")
    .attr("fill", "white")
    .text(d => d.data.name);
};

// data & firebase hook-up
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

  update(data);
});
