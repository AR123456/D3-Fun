//d3 expects data in array format
const data = [
  {
    width: 200,
    height: 400,
    fill: "red"
  }
];

//always start off with a reff to the svg - this is were will append to
const svg = d3.select("svg");
//select rectangle inside of the svg
const rect = svg
  .select("rect")
  //here using the .data method from d3 and in the params is the const data above
  .data(data)
  // create a function that returns a value instead of a hard coded number
  //the d is for data
  // the function can also take in  i and n
  // i is the index of the current element inside of the array
  //n is the current selection in this case the rectangle
  .attr("width", function(d, i, n) {
    // console.log(d);
    // console.log(i);
    // console.log(n);
    return d.width;
  })
  .attr("height", function(d) {
    return d.height;
  })
  .attr("fill", function(d) {
    return d.fill;
  });

// console.log(rect);
