import * as d3 from "d3";
// loading data from external sources
const url = "https://udemy-react-d3.firebaseio.com/ages.json";
// make a class
class D3Chart {
  // class must have  a constructor function which is run whenever a class is first initialized
  constructor(element) {
    const svg = d3
      .select(element)
      .append("svg")
      .attr("width", 500)
      .attr("height", 500);
    // can be json, csv or tsv the first param is the path to the data file,
    // this returns a promis whihc can be resovled using the l then method.
    // then provide a callback method to execurre onnce data is loaded(agesData)
    d3.json(url).then(agesData => {
      const rects = svg.selectAll("rect").data(agesData);

      rects
        .enter()
        .append("rect")
        .attr("x", (d, i) => i * 100)
        .attr("y", 50)
        .attr("width", 50)
        // setting height to the value of age in the json object *10
        .attr("height", d => d.age * 10)
        // setting fill with a funciton if age is greater than 10 return red, else return green
        .attr("fill", d => {
          if (d.age > 10) {
            return "red";
          }
          return "green";
        });
    });
  }
}

export default D3Chart;
