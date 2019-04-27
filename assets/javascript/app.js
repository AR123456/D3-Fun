//the data that will be used for the app
var quotes = [
  {
    quote: "I see dead people.",
    movie: "The Sixth Sense",
    year: 1999,
    rating: "PG13"
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
var newQuotes = [
  {
    quote: "Houston, we have a problem.",
    movie: "Apollo 13",
    year: 1995,
    rating: "PG13"
  },
  {
    quote: "Gentlemen, you can't fight in here! This is the war room!",
    movie:
      "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
    year: 1964,
    rating: "PG"
  }
];

// this  object converts the ratings to objects
var colors = {
  G: "#3cff00",
  PG: "#f9ff00",
  PG13: "#ff9000",
  R: "#ff0000"
};
//style the list and add the movie quotes to the page
d3.select("#quotes")
  .style("list-style", "none")
  .selectAll("li")
  .data(quotes)
  .enter()
  .append("li")
  .text(d => '"' + d.quote + '"-' + d.movie + "(" + d.year + ")")
  .style("margin", "20px")
  .style("padding", "20px")
  .style("font-size", d => (d.quote.length < 25 ? "2em" : "1em"))
  .style("background-color", d => colors[d.rating])
  .style("border=radius", "8px");

// code to remove quotes 
var removeBtn = d3.select("#remove");

removeBtn.on('click', function() {
  var nonRQuotes = quotes.filter(function(movie) {
    return movie.rating !== 'R';
  });
  
  d3.selectAll("li")
    .data(nonRQuotes, function(d) {
      return d.quote;
    })
    .exit()
    .remove();

  removeBtn.remove();
});