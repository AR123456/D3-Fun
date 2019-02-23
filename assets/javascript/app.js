const data = [
  {
    radius: 50,
    distance: 110,
    fill: "orange"
  },
  {
    radius: 70,
    distance: 260,
    fill: "red"
  },
  {
    radius: 35,
    distance: 400,
    fill: "brown"
  },
  {
    radius: 55,
    distance: 530,
    fill: "green"
  }
];

/// select svg container first
const svg = d3.select("svg");

const circs = svg
  .selectAll("circle")
  // no circles so will need enter selection after join
  //get the actual data from the json
  .data(data);
//add the attribute to circles already in the dom - we do not have any in this case but in future may so this is good practice
// cy is being hard coded the y position from the top
circs
  .attr("cy", 200)
  // left to right - taking distance from the left from the json object
  .attr("cx", d => d.distance)
  //getting radius from the json object
  .attr("r", d => d.radius)
  //get the fill from the json object
  .attr("fill", d => d.fill);

// repeat the attr above for what is not hard coded, what is coming from the virtual d3 storage using  enter().append()
circs
  .enter()
  .append("circle")
  .attr("cy", 200)
  // left to right - taking distance from the left from the json object
  .attr("cx", d => d.distance)
  //getting radius from the json object
  .attr("r", d => d.radius)
  //get the fill from the json object
  .attr("fill", d => d.fill);
