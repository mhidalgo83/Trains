$(document).ready(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBdSYeMjm27VEXz_JjcFGlzQDUTxCQ5nrQ",
        authDomain: "trains-e8129.firebaseapp.com",
        databaseURL: "https://trains-e8129.firebaseio.com",
        projectId: "trains-e8129",
        storageBucket: "",
        messagingSenderId: "1094974192529"
    };
    firebase.initializeApp(config);


    var database = firebase.database();

    // Initial values
    var trainName = "";
    var destination = "";
    var trainTime = "";
    var frequency = 0;

    // Button to collect user data
    $("#btn").on("click", function (event) {
        event.preventDefault();

        // Grabs user input
        trainName = $("#trainName").val().trim();
        destination = $("#destination").val().trim();
        trainTime = moment($("#trainTime").val().trim(), "HH:mm").format("LT");
        frequency = $("#frequency").val().trim();


        // Creates database object for holding train data
        var newTrain = {
            trainName: trainName,
            destination: destination,
            trainTime: trainTime,
            frequency: frequency
        };


        database.ref().push(newTrain);

        // Clears all of the text-boxes
        $("#trainName").val("");
        $("#destination").val("");
        $("#trainTime").val("");
        $("#frequency").val("");

    });

    // Listens for data being added to database...
    database.ref().on("child_added", function (snapshot) {
        var sv = snapshot.val();

        console.log(sv.trainName);
        console.log(sv.destination);
        console.log(sv.trainTime);
        console.log(sv.frequency);


        // Takes frequency from database and stores it...
        var tFrequency = sv.frequency;

        // Takes trainTime from database and stores it...
        var firstTime = sv.trainTime;

        // First Time (pushed back 1 year to make sure it comes before current time)
        var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
        console.log(firstTimeConverted);

        // Current Time
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

        // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

        // Time apart (remainder)
        var tRemainder = diffTime % tFrequency;
        console.log(tRemainder);

        // Minute Until Train
        var tMinutesTillTrain = tFrequency - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

        // Next Train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

        $("#trainTable > tbody").append("<tr><td>" + sv.trainName + "</td><td>" + sv.destination + "</td><td>" + sv.frequency + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>");




    });









})