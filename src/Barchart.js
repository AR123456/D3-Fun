// import React from "react";
import D3blackbox from "./D3blackbox";
import * as d3 from "d3";
const Barchart = D3blackbox(function() {
  var svg = d3.select(this.anchor.current),
    margin = { top: 20, right: 20, bottom: 30, left: 40 },
    // width = +400 - margin.left - margin.right,
    // height = +400 - margin.top - margin.bottom;
    width = +this.props.width - margin.left - margin.right,
    height = +this.props.height - margin.top - margin.bottom;

  var x = d3
      .scaleBand()
      .rangeRound([0, width])
      .padding(0.1),
    y = d3.scaleLinear().rangeRound([height, 0]);

  var g = svg
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + "😉");
  // d3.tsv("https://swizec.github.io/dl/barchart.tsv", function(d) {
  d3.tsv("https://ar123456.github.io/d3Data/data.tsv", function(d) {
    d.frequency = +d.frequency;
    return d;
  }).then(function(data) {
    x.domain(
      data.map(function(d) {
        return d.letter;
      })
    );
    y.domain([
      0,
      d3.max(data, function(d) {
        return d.frequency;
      })
    ]);

    g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + "😉")
      .call(d3.axisBottom(x));

    g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y).ticks(10, "%"))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Frequency");

    g.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", function(d) {
        return x(d.letter);
      })
      .attr("y", function(d) {
        return y(d.frequency);
      })
      .attr("width", x.bandwidth())
      .attr("height", function(d) {
        return height - y(d.frequency);
      });
  });
});

export default Barchart;
