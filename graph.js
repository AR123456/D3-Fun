// function to update the vizualization when he data comes back from the db
// this is where the graph will be drawn
const update = data => {
  console.log(data);
};

// data and firestore
// data will be updated as data is recived from the db
var data = [];
//set up the real time lisioner
db.collection("activities").onSnapshot(res => {
  // get this response in this call back function
  //get document changes, use forEach to loop through and fire a callback function
  res.docChanges().forEach(change => {
    //each change has a type each time the application loads each item in the db comes back with a type of added.
    // console.log(change);
    // call back function for the for each loop of changes
    // created a document in which to store the updated data
    // use ... the spread oporator to get all of the changes then make a document  object
    const doc = { ...change.doc.data(), id: change.doc.id };
    // use switch case to account for adds ,updates and deletes
    switch (change.type) {
      case "added":
        data.push(doc);
        break;
      case "modified":
        const index = data.findIndex(item => item.id == doc.id);
        data[index] = doc;
        break;
      case "removed":
        data = data.filter(item => item.id !== doc.id);
        break;
      default:
        break;
    }
  });
  // now that we have the data from the db we need to update the vizualization
  update(data);
});
