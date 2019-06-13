d3.csv(
  "https://ar123456.github.io/d3Data/senate_committee_data.csv",
  function(d, i, headers) {
    var committees = headers.slice(2).filter(h => d[h] === "1");
    return {
      name: d.name,
      party: d.party,
      committees: committees
    };
  },
  function(error, nodes) {
    if (error) throw error;
    // creating the graph
    var links = makeLinks(nodes);
    var width = 750;
    var height = 750;
    var svg = d3
      .select("svg")
      .attr("width", width)
      .attr("height", height);
    var linkGp = svg.append("g").classed("links", true);
    var nodeGp = svg.append("g").classed("links", true);
    var simulation = d3
      .forceSimulation(nodes)
      .force("charge", d3.forceManyBody().strength(-100))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force(
        "link",
        d3
          .forceLink(links)
          .distance(d => {
            var count1 = d.source.committees.length;
            var count2 = d.target.committees.length;
            return 25 * Math.max(count1, count2);
          })
          .id(d => d.name)
      )
      .on("tick", () => {
        linkGp
          .selectAll("line")
          .attr("x1", d => d.source.x)
          .attr("y1", d => d.source.y)
          .attr("x2", d => d.target.x)
          .attr("y2", d => d.target.y);
        nodeGp
          .selectAll("circle")
          .attr("cx", d => d.x)
          .attr("cy", d => d.y);
      });
    // calling the general update function and passing in data
    graph(nodes, links);
    // calling the check boxes function - ignore name and party
    setUpCheckboxes(nodes.columns.slice(2));

    // defining  general update function
    function graph(nodeData, linkData) {
      var partyScale = d3
        .scaleOrdinal()
        .domain(["D", "R", "I"])
        .range(["blue", "red", "#ccc"]);
      var nodeUpdate = nodeGp.selectAll("circle").data(nodeData, d => d.name);
      // this was a copy past of the general update pattern
      nodeUpdate.exit().remove();
      nodeUpdate
        .enter()
        .append("circle")
        .attr("r", 15)
        .attr("fill", d => partyScale(d.party))
        .attr("stroke", "white")
        .attr("stroke-width", 3)
        // the drag functionality
        .call(
          d3
            .drag()
            .on("start", dragStart)
            .on("drag", drag)
            .on("end", dragEnd)
        )
        //       // tooltip functionality
        .on("mousemove touchmove", showTooltip)
        .on("mouseout touchend", hideTooltip);

      var linkUpdate = linkGp
        .selectAll("line")
        .data(linkData, d => d.source.name + d.target.name);
      linkUpdate.exit().remove();
      linkUpdate.enter().append("line");
    }

    ///  the set up check boxes function
    function setUpCheckboxes(committees) {
      var boxAreas = d3
        .select("#checkboxes")
        .selectAll("div")
        .data(committees)
        .enter()
        .append("div");
      boxAreas
        .append("label")
        .property("for", d => d)
        .text(d => d);
      boxAreas
        .append("input")
        .property("type", "checkbox")
        .property("name", "committee")
        .property("value", d => d)
        .property("checked", true)
        .on("click", () => {
          var activeCommittees = committees.filter(c =>
            d3
              .select(
                `
          input[value="${c}"]`
              )
              .property("checked")
          );
          var newNodes = nodes
            .map(n => {
              return {
                name: n.name,
                party: n.party,
                committees: n.committees.filter(c =>
                  activeCommittees.includes(c)
                ),
                x: n.x,
                y: n.y,
                vx: n.vx,
                vy: n.vy
              };
            })
            .filter(n => n.committees.length > 0);
          var newLinks = makeLinks(newNodes);
          graph(newNodes, newLinks);
          simulation
            .nodes(newNodes)
            .force("link")
            .links(newLinks);
          simulation.alpha(0.5).restart();
        });
    }

    // the tooltip functions///////////////////
    function showTooltip(d) {
      var tooltip = d3.select(".tooltip");
      tooltip
        .style("opacity", 1)
        .style("left", d3.event.x - tooltip.node().offsetWidth / 2 + "px")
        .style("top", d3.event.y + 10 + "px")
        .html(() => {
          // ordered list of all the committees a senator is on
          var committees = d.committees.map(c => `<li>${c}</li>`).join("");
          return `
          <p>${d.name} (${d.party})</p>
          <p>Committees</p>
          <ol>${committees}</ol>
        `;
        });
    }

    function hideTooltip() {
      d3.select(".tooltip").style("opacity", 0);
    }

    /////////////the drag functions ////////////////

    function dragStart(d) {
      simulation.alphaTarget(0.5).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function drag(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    function dragEnd(d) {
      simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    ///////////////them make links function ////////////////
    console.log(makeLinks(nodes));
    // will need to generate node and or link data, in this case we have the nodes from the csv but no links array consisting of objects with source and target properties.
    function makeLinks(nodes) {
      // this function call takes in the array of nodes and generates the links structure
      // empty links array
      var links = [];
      // look at every pair of senators inside the nested loop
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          // store each node in a variable
          var s1 = nodes[i];
          var s2 = nodes[j];
          // loop over the first node if any are also in the second node list create a link
          for (let k = 0; k < s1.committees.length; k++) {
            var committee = s1.committees[k];
            if (s2.committees.includes(committee)) {
              links.push({
                source: s1.name,
                target: s2.name
              });
              break;
            }
          }
        }
      }
      // the number of links is roughly proportional to the square of the number of nodes
      return links;
    }

    //
  }
);
