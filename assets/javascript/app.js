

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAKvy2ib_69JZ6JIa9KQ0p_UMDTFyCP7CA",
    authDomain: "train-time-4e728.firebaseapp.com",
    databaseURL: "https://train-time-4e728.firebaseio.com",
    projectId: "train-time-4e728",
    storageBucket: "",
    messagingSenderId: "763425236086"
  };
  firebase.initializeApp(config);
  //create the connection to Firebase console log the object 
     firebase.database().ref().on('value',function(snapshot){
    //  console.log("snapshot val:  " +snapshot.val());
   }) ;

  //create reference to the firebase database
  var trainData = firebase.database();
  // sending data to firebase- this means with every click all the form inputs will be colleted and stored into the vars trainName,destination,firstTrain and frequency
  $("#addTrainBtn").on("click",function(){
      var trainName = $("#trainNameInput").val().trim();
      console.log("train name :  "+ trainName);
      var destination = $("#destinationInput").val().trim();
      //need to turn this into an actual time variable using moment JS - this turns this into a unit variable - converting everything into one line 
      console.log("destination :  "+ destination);
      var firstTrain = moment($("#firstTrainInput").val().trim(),"HH:mm").subtract(10,"years").format("X");
      console.log("fristTrain:  "+ firstTrain);
      var frequency = $("#frequencyInput").val().trim();
      console.log("frequency :   "+frequency );

      var newTrain ={
          name: trainName,
          destination: destination,
          firstTrain: firstTrain,
          frequency: frequency, 
      }
      trainData.ref().push(newTrain);
      alert("Train Added");
      $("#trainNameInput").val("");
      $("#destinationInput").val("");
      $("#firstTrainInput").val("");
      $("#frequencyInput").val("");
     
    //because button type is submit need to return false so page dose not  reload 
    return false;
    
  })
// may need to add database.ref instead of trainData.ref 
  trainData.ref().on("child_added",function(snapshot){
    // console.log(snapshot.val());
      var name = snapshot.val().name;
      var destination = snapshot.val().destination;
      var frequency = snapshot.val().frequency;
      var firstTrain = snapshot.val().firstTrain;

        var remainder = moment().diff(moment.unix(firstTrain),"minutes")%frequency;
        var minutes = frequency- remainder;
        var arrival = moment().add(minutes,"m").format("hh:mm A");

console.log("remainder is:  "+remainder);
console.log("minutes are:  " +minutes);
console.log("arrival is:  "  +arrival);

// ref the table body of train table , append a new row for each new piece of data and new data for each column so the name, destination , frequency arrival and minutes 

$("#trainTable > tBody").append("<tr><td>"+name+"</td><td>"+destination+"</td><td>"+ frequency+"</td><td>"+arrival+"</td><td>"+minutes+"</td></tr>");

  });