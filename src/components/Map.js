import React from "react";
import "./mapStyle.css";
import D3blackbox from "./D3blackbox";
import * as d3 from "d3";
import * as topojson from "topojson";

const Map = D3blackbox(function() {
  var svg = d3.select("svg");

  var path = d3.geoPath();

  d3.json("https://d3js.org/us-10m.v1.json", function(us) {}).then(function(
    us
  ) {
    svg
      .append("g")
      .attr("class", "states")
      .selectAll("path")
      .data(topojson.feature(us, us.objects.states).features)
      .enter()
      .append("path")
      .attr("d", path);

    svg
      .append("path")
      .attr("class", "state-borders")
      .attr(
        "d",
        path(
          topojson.mesh(us, us.objects.states, function(a, b) {
            return a !== b;
          })
        )
      );
  });
});

export default Map;
