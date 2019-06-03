// in order to make the request need to be working over HTTP not the file systme so start the server
d3.json("/assets/javascript/countries.json", function(error, data) {
  if (error) throw error;
  console.log("DATA", data);
  // logic that needs this data nees to be inside the call back
  d3.select("body")
    .selectAll("h3")
    .data(data.geonames)
    .enter()
    .append("h3")
    .text(d => d.countryName);
});
// // this is the csv funtion with its call back
// d3.csv("/assets/javascript/simplemaps-worldcities-basic.csv", function(
//   error,
//   data
// ) {
//   if (error) throw error;
//   // d3 converted each row in the csv into an object
//   //d3 has no way to detect the data type so all come in as strings
// // you can add a formatter call back to the d3.csv
//   console.log(data);
// });
// this is the csv funtion with its call back
d3.csv(
  "/assets/javascript/simplemaps-worldcities-basic.csv",
  function(row) {
    if (+row.pop < 10000) return;
    return {
      cityName: row.city,
      countryCode: row.iso2,
      population: +row.pop
    };
  },
  function(error, data) {
    if (error) throw error;
    console.log("CSV Data" + data);
  }
);
