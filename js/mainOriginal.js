var data = [25, 20, 10, 12, 15];
// data join in d3- d3 reads an array of data
// associates each item in the array with an svg

const svg = d3
  .select("#chart-area")
  .append("svg")
  .attr("width", 400)
  .attr("height", 400);
// using select all to get all of the circles on the screen
const circles = svg
  .selectAll("circle")
  //associate this selection with the array of data
  .data(data);

circles
  // the result of above is passed on to the method enter
  .enter()
  // the result of enter is then passed on to append
  .append("circle")
  // now have the option of setting attributes with a annonymous function
  // instead of an integer or a string
  // the function can take one or two arguments
  // the first argument is the items in the array ( d)
  // the second argument represents it's index in the array
  // can set the attributes based on each item in the array
  .attr("cx", function(d, i) {
    // function is looping through and setting cx to be the index * 50 + 25
    return i * 50 + 25;
  })
  // the y axis is set at 25
  .attr("cy", 25)
  // the radius of the circle is being set to what d is,
  // the value of the item in the array
  .attr("r", function(d) {
    return d;
  })
  .attr("fill", "red");
