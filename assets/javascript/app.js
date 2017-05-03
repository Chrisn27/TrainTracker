$(document).ready(function() {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDgyL3nHWEIfHxSmDQsJdYeAjkWHSUqrao",
    authDomain: "awesometrains-a2b34.firebaseapp.com",
    databaseURL: "https://awesometrains-a2b34.firebaseio.com",
    projectId: "awesometrains-a2b34",
    storageBucket: "awesometrains-a2b34.appspot.com",
    messagingSenderId: "729656116039"
  };

  firebase.initializeApp(config);

 var db = firebase.database();

  $("#add-train").on("click", function() {

   event.preventDefault();

   name = $("#train-name-input").val().trim();
   destination = $("#destination-input").val().trim();
   firstTrain = $("#first-train-input").val().trim();
   frequency = $("#frequency-input").val().trim();

    db.ref().push({
      name: name,
      destination: destination,
      firstTrain: firstTrain,
      frequency: frequency
    });
 
   })

  db.ref().on("child_added", function(snapshot) {

    var sv = snapshot.val();  
    
    var name = sv.name;
    var destination = sv.destination;
    var frequency = sv.frequency
    var firstTrain = sv.firstTrain;

    // first train arrival minus one year to ensure it arrives before the current time
    var firstTrainConvertered = moment(firstTrain, "hh:mm").subtract(1, "years");

    // diff between current time and converted first train time
    var diffTime = moment().diff(moment(firstTrainConvertered), "minutes");

    // time apart remainder
    var trainR = diffTime % frequency;

    // next train
    var nextArrivalLong = moment().add(trainR, "minutes");
    var nextArrival = moment(nextArrivalLong).format("MMMM Do, h:mm a");

    // minutes until next train
    var minutesAway = frequency - trainR;

    //var diffTime = moment().diff(moment(nextArrival), "minutes")

	  
    var tableRow = $("<tr>");

    //var convertedDate = moment(new Date(startDate));

    //var monthsWorked = Math.abs(moment(convertedDate).diff(moment(), "months"));
    //var totalBilled = Math.abs(monthsWorked*rate);

    $("<td>").text(name).appendTo(tableRow);
    $("<td>").text(destination).appendTo(tableRow);
    $("<td>").text(frequency).appendTo(tableRow);
    $("<td>").text(nextArrival).appendTo(tableRow);
    $("<td>").text(minutesAway).appendTo(tableRow);

    $("#schedule").append(tableRow);

    // Handle the errors
  }, function(errorObject) {

    console.log("Errors handled: " + errorObject.code);

  });

/*
// auto refresh testing

function loadlink() {
    $('#schedules').load( ,function() {
    	$(this).unwrap();
    }
            
}

loadlink(); // This will run on page load
setInterval(function(){
    loadlink() // this will run after every 5 seconds
}, 5000);
*/

});