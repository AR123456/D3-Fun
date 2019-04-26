//the data that will be used for the app

var quotes = [
  {
    quote: "I see dead people.",
    movie: "The Sixth Sense",
    year: 1999,
    rating: "PG-13"
  },
  {
    quote: "May the force be with you.",
    movie: "Star Wars: Episode IV - A New Hope",
    year: 1977,
    rating: "PG"
  },
  {
    quote:
      "You've got to ask yourself one question: 'Do I feel lucky?' Well, do ya, punk?",
    movie: "Dirty Harry",
    year: 1971,
    rating: "R"
  },
  {
    quote: "You had me at 'hello.'",
    movie: "Jerry Maguire",
    year: 1996,
    rating: "R"
  },
  {
    quote:
      "Just keep swimming. Just keep swimming. Swimming, swimming, swiming.",
    movie: "Finding Nemo",
    year: 2003,
    rating: "G"
  }
];

// this  object converts the ratings to objects
var colors = {
  G: "#3cff00",
  PG: "#f9ff00",
  "PG-13": "#ff900",
  R: "#ff0000"
};

//style the list and add the movie quotes to the page
d3.select("#quotes")
  .style("list-style", "none")
  //select the selection oject
  .selectAll("li")
  //take each item in the array and attach it to a dom element
  .data(quotes)
  // the . data ender and exit properties
  .enter()
  .append("li")
  // old school way
  // .text(function(d) {
  //   //set the text of each item with a call back function
  //   return '"' + d.quote + '"-' + d.movie + "(" + d.year + ")";
  // })
  //es6
  .text(d => '"' + d.quote + '"-' + d.movie + "(" + d.year + ")")
  .style("margin", "20px")
  .style("padding", "20px")
  //old school way
  // .style("font-size", function(d) {
  //   return d.quote.length < 25 ? "2em" : "1em";
  // });
  //es6 way
  .style("font-size", d => (d.quote.length < 25 ? "2em" : "1em"))
  // use the colors object to set the background color of the quote based on rating
  .style("background-color", d => colors[d.rating])
  .style("border=radius", "8px");
