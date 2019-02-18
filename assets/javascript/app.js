const canvas = d3.select(".canvas");
// append is an d3 methond that appends the svg to the canvas
const svg = canvas.append("svg");
// append shapes to svg container
svg.append("rect");
svg.append("circle");
svg.append("line");

//can also append p tags and other elements
