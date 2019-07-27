Data Hierarchy
Structured data which involoves a clear "parent"/"child' relationship
a "pecking order"
manager -- top level is the root node, parent to superviosr
^ --- links
supervisor --- child of manager
^ -- links
employee - leaf nodes - child of supervisor

link to example of a interactive d3.js tree diagram
http://bl.ocks.org/d3noob/8375092

Bubble chart
https://observablehq.com/@d3/bubble-chart

Tree map  
https://medium.com/@mroman09/building-a-tree-map-with-d3-cdfa2f0aa7a8

https://observablehq.com/@d3/treemap

Data structure considerations
There could be a hierarcy() way a constructing the data such as
data:{
name: "mario",
children:[
{
name: "yoshi"
},
{
name: "toad",
children:[
{
name: "bowser"
}
]
}
]
}
or
The data could be stratifiy() - this is what will be used in this tutorial
const data =[
{name: "mario:},
{name: "yoshi", parent: "mario"},
{name: "toad", parent: "mario"},
{name: "bowser", parent: "toad"}
]

Circle Parking diagram
The bigger the circle the higher in the category
circle size represents the size or amount
