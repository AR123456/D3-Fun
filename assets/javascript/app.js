//d3 expects data in array format, to do more that one rectangle pass more rectangle objects into the array
// in real life may not know how many rects there will ultimatly be ..
//d3 sees all the items in this array but as virtual selections, they still need to be joined to the DOM - Enter Selection
const data = [
  {
    width: 200,
    height: 100,
    fill: "purple"
  },
  {
    width: 100,
    height: 60,
    fill: "pink"
  },
  {
    width: 50,
    height: 30,
    fill: "red"
  }
];

const svg = d3.select("svg");
//this joins the data to rects

const rects = svg.selectAll("rect").data(data);

//this updates the rect element in the dom
rects
  .attr("width", (d, i, n) => d.width)
  .attr("height", d => d.height)
  .attr("fill", d => d.fill);
//this updates the stuff that has not yet entered the DOM via the enter selection
rects
  .enter()
  .append("rect")
  .attr("width", (d, i, n) => d.width)
  .attr("height", d => d.height)
  .attr("fill", d => d.fill);
