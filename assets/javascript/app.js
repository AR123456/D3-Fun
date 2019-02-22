//d3 expects data in array format
const data = [
  {
    width: 200,
    height: 400,
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
//////////////////// explaining using es6/////////////////
// const rect = svg.select("rect")
//   .data(data)
//   .attr("width", (d, i, n) => {
//     console.log(this); //its the window- but what is needed is the rect
//     //can use the n and i that are passed in to get to the rect
//     console.log(n[i]); // now its the rect
//     return d.width;
//   })
//   // most of the documentation on the web and d3 uses the old way bacuase of it issues with "thjs"
//   .attr("height", function(d) {
//     console.log(this); //its the rect
//     return d.height;
//   })
//   .attr("fill", function(d) {
//     return d.fill;
//   });

/////////////now all arrows ////////////////////

// const rect = svg
//   .select("rect")
//   .data(data)

//   .attr("width", (d, i, n) => {
//     return d.width;
//   })
//   .attr("height", d => {
//     return d.height;
//   })
//   .attr("fill", d => {
//     return d.fill;
//   });

/////////further refinement of the es6////////////////////////
const rect = svg
  .select("rect")
  .data(data)
  // with es6 if the return is on one line dont need the return or the braces around it ,  it is implecet
  .attr("width", (d, i, n) => d.width)
  //dont need the parans if there is only one value being passed in
  .attr("height", d => d.height)
  .attr("fill", d => d.fill);
