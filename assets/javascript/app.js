//d3
// handle the reset
d3.select("#reset").on("click", function() {
  // inside call back select anything with a class of letter, Id of phrase or count  and remove it
  d3.selectAll(".letter").remove();
  d3.select("#phrase").text("");
  d3.select("#count").text("");
});

// d3 event listener for form submission
d3.select("form").on("submit", function() {
  //inside this call back call prevent default on the event object access using d3 event
  d3.event.preventDefault();
  //store input as d3 selection
  let input = d3.select("input");
  //get the stored items value using d3 property method
  let text = input.property("value");
  //create enter selection and append some div's to the page for each character
  // select letters container
  // storing this in a variable as set up for multiple form submissions
  let letters = d3
    .select("#letters")
    //select all elements in it with a class of letter
    .selectAll(".letter")
    // this gives empty selection that data can be joined to inside the data method
    // use get frequency function and  pass it the text from form
    .data(getFrequencies(text), function(d) {
      // do the join based on the character rather than the index
      return d.character;
    });
  letters
    // use classed methond to remove the "new class"
    .classed("new", false)
    // go to exit selection
    .exit()
    // remove div that do not need to be there
    .remove();
  // get into the enter selection
  // add class of letter
  letters
    .enter()
    //append div for each piece of data and add a class of letter
    .append("div")

    .classed("letter", true)
    // add class of new to get styleing
    .classed("new", true)
    // move styles into the merged enter update selection since they should apply to both
    .merge(letters)
    // styles
    .style("width", "20px")
    .style("line-height", "20px")
    .style("margin-right", "5px")
    // this is setting the height on the datea
    .style("height", function(d) {
      // for each time the char appears on the string add 20 px of height
      return d.count * 20 + "px";
    })
    //set enter text so that each character is visable
    .text(function(d) {
      return d.character;
    });
  // for the div with id of form
  d3.select("#phrase")
    // set the enter text based on text from form
    .text("Analysis of: " + text);
  // update the count div
  d3.select("#count")
    // new letters - number of nodes in the enter selection
    .text("(New characters: " + letters.enter().nodes().length + ")");
  // clear the form iput
  input.property("value", "");
});
//enter  selection -
// update  selection - update the text inside the phrase div
//merge selections

//exit selection

//** This part is pure javascript  */
//function to calculate character frequesncys for a given string
function getFrequencies(str) {
  //return array of objects and objects store character and its count
  // split string and sort the array alpha
  let sorted = str.split("").sort();
  console.log(sorted);
  // create array to store the outpout
  let data = [];
  //loop over sorted arrray to built up the data array( using for loop but this could be done with reduce)
  for (let i = 0; i < sorted.length; i++) {
    let last = data[data.length - 1];
    //any repeated characters will appear in sequential positions so can use this for count of characters
    // grabbing last element in the array and comparing its character property to the last character if match then increment the count
    if (last && last.character === sorted[i]) last.count++;
    // if first loop or encountering a new character, push a new object into the array who's character proptertie is the current character whoes coutn is 1
    // will never push 2 objects with same character property because  the loop is over sorted array and that would be caught by the first condition
    else data.push({ character: sorted[i], count: 1 });
  }
  return data;
}
