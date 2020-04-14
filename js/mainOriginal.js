// d3 can load data form csv,tsv and json files
// or from an ajax request
//////
// this code resutls in a promise that can either be fullfilled ,
//rejected or pending. So can pass this value around in code without needing
// to wait for it to evaluate.
d3.tsv("data/ages.tsv")
  // d3.csv("data/ages.csv")
  // d3.json("data/ages.json")
  // the .then is the newest syntax
  // the function after .then waits for the data
  .then(function(data) {
    // d3 writes this data in as an array of objects
    // the values inside the objects are strings ot need ot make them into numbers
    // use forEach to loop
    data.forEach(function(d) {
      // here the plus sign is making each age an integer
      d.age = +d.age;
    });

    var svg = d3
      .select("#chart-area")
      .append("svg")
      .attr("width", 400)
      .attr("height", 400);

    var circles = svg
      .selectAll("circle")
      // now getting data from external file
      .data(data);

    circles
      .enter()
      .append("circle")
      .attr("cx", function(d, i) {
        // d now retruns an object, not an integer
        // console.log(d);
        return i * 50 + 25;
      })
      .attr("cy", 25)
      .attr("r", function(d) {
        // returning 2 * the age value in the object
        return d.age * 2;
      })
      .attr("fill", function(d) {
        // using this if statement to set
        //fill colors based on name value in the object
        if (d.name == "Tony") {
          return "blue";
        } else {
          return "red";
        }
      });
  })
  // the .then needs the .catch
  .catch(function(error) {
    console.log(error);
  });
