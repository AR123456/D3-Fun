// Initialize Firebase
var config = {
  apiKey: "AIzaSyAKvy2ib_69JZ6JIa9KQ0p_UMDTFyCP7CA",
  authDomain: "train-time-4e728.firebaseapp.com",
  databaseURL: "https://train-time-4e728.firebaseio.com",
  projectId: "train-time-4e728",
  storageBucket: "train-time-4e728.appspot.com",
  messagingSenderId: "763425236086"
};
firebase.initializeApp(config);
firebase
  .database()
  .ref()
  .on("value", function(snapshot) {});
var trainData = firebase.database();
$("#addTrainBtn").on("click", function() {
  var trainName = $("#trainNameInput")
    .val()
    .trim();
  console.log("train name :  " + trainName);
  var destination = $("#destinationInput")
    .val()
    .trim();
  console.log("destination :  " + destination);
  var firstTrain = moment(
    $("#firstTrainInput")
      .val()
      .trim(),
    "HH:mm"
  )
    .subtract(10, "years")
    .format("X");
  console.log("fristTrain:  " + firstTrain);
  var frequency = $("#frequencyInput")
    .val()
    .trim();
  console.log("frequency :   " + frequency);

  var newTrain = {
    name: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency
  };
  trainData.ref().push(newTrain);
  alert("Train Added");
  $("#trainNameInput").val("");
  $("#destinationInput").val("");
  $("#firstTrainInput").val("");
  $("#frequencyInput").val("");
  return false;
});
trainData.ref().on("child_added", function(snapshot) {
  var name = snapshot.val().name;
  var destination = snapshot.val().destination;
  var frequency = snapshot.val().frequency;
  var firstTrain = snapshot.val().firstTrain;

  var remainder = moment().diff(moment.unix(firstTrain), "minutes") % frequency;
  var minutes = frequency - remainder;
  var arrival = moment()
    .add(minutes, "m")
    .format("hh:mm A");
  console.log("remainder is:  " + remainder);
  console.log("minutes are:  " + minutes);
  console.log("arrival is:  " + arrival);
  $("#trainTable > tBody").append(
    "<tr><td>" +
      name +
      "</td><td>" +
      destination +
      "</td><td>" +
      frequency +
      "</td><td>" +
      arrival +
      "</td><td>" +
      minutes +
      "</td></tr>"
  );
});
