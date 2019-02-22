//d3 expects data in array format, to do more that one rectangle pass more rectangle objects into the array
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
///////////// old way //////////////
// const rect = svg.select("rect")
//   .data(data)
//   .attr("width", function(d, i, n) {
//     return d.width;
//   })
//   .attr("height", function(d) {
//     return d.height;
//   })
//   .attr("fill", function(d) {
//     return d.fill;
//   });

/////////further refinement of the es6////////////////////////
const rect = svg

  // this becomes select all rectangle
  // .select("rect")
  .selectAll("rect")
  .data(data)
  .attr("width", (d, i, n) => d.width)
  .attr("height", d => d.height)
  .attr("fill", d => d.fill);
console.log(rect);
