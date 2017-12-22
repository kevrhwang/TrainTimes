//initialize firebase
var config = {
	apiKey: "AIzaSyDnb5ZJUvzWZtJ4EaWXHNuvQmeKE3cv7Hk",
  authDomain: "project-1-ee3e4.firebaseapp.com",
  databaseURL: "https://project-1-ee3e4.firebaseio.com",
  projectId: "project-1-ee3e4",
  storageBucket: "project-1-ee3e4.appspot.com",
  messagingSenderId: "532975605726"
};
firebase.initializeApp(config);

//variable that references firebase database
var database = firebase.database();

//set variables
var trainName;
var destination;
var firstTrain;
var frequency;

//function that runs after submit is clicked
$("#submit").on("click", function() {
	event.preventDefault();

	//set variables to user input
	trainName = $("#train-name").val().trim();
	destination = $("#destination").val().trim();
	firstTrain = $("#first-train-time").val().trim();
	frequency = $("#frequency").val().trim();

	//if any input boxes are left blank, function quits
	if (!trainName || !destination || !firstTrain || !frequency) {
		return;
	}

	//stores variables into firebase database 
	database.ref().set({
		trainName: trainName,
		destination: destination,
		firstTrain: firstTrain,
		frequency: frequency
	});

	//empty input boxes
	$("#train-name").val('');
	$("#destination").val('');
	$("#first-train-time").val('');
	$("#frequency").val('');

})


database.ref().on("value", function(snapshot){

	//time calculations
	var firebaseKey = snapshot.val();

	var firstTimeConverted = moment(firebaseKey.firstTrain, "hh:mm").subtract(1, "years");

	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

	var tRemainder = diffTime % firebaseKey.frequency;

	var minutesTilTrain = firebaseKey.frequency - tRemainder;

	var nextTrain = moment().add(minutesTilTrain, "minutes");

	//append into new data row and append to html
	var newRow = $("<tr>");
	newRow.append("<td>" + snapshot.val().trainName)
				.append("<td>" + snapshot.val().destination)
				.append("<td>" + snapshot.val().frequency)
				.append("<td>" + moment(nextTrain).format("hh:mm A"))
				.append("<td>" + minutesTilTrain);

	$("tbody").append(newRow);
})










