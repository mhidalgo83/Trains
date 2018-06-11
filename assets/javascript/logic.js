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
    var trainTime = 0;
    var frequency = 0;

    // Button to collect user data
    $("#btn").on("click", function (event) {
        event.preventDefault();

        // Grabs user input
        var trainName = $("#trainName").val().trim();
        var destination = $("#destination").val().trim();
        var trainTime = moment($("#trainTime").val().trim(), "HH:mm").format("LT");
        var frequency = $("#frequency").val().trim();


        // Creates database object for holding train data
        var newTrain = {
            trainName: trainName,
            destination: destination,
            trainTime: trainTime,
            frequency: frequency
        };

        console.log(newTrain.trainName);
        console.log(newTrain.destination);
        console.log(newTrain.trainTime);
        console.log(newTrain.frequency);

        database.ref().push(newTrain);



    })

    /*$("#trainTable > tbody").append("<tr><td>" + empName + "</td><td>" + empRole + "</td><td>" +
        empStartPretty + "</td><td>" + empMonths + "</td><td>" + empRate + "</td><td>" + empBilled + "</td></tr>");*/







})