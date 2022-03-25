var currentDay = document.querySelector("#currentDay");
currentDay.textContent = moment().format('dddd, MMMM Do');

//function that checks and updates the current time setInterval()
//function that changes the background colour of the timeblock
//function to cancel editing if clicking away from the field

//event array
var schedAppts = {
    nineAM: [],
    tenAM: [],
    elevenAM: [],
    twelvePM: [],
    onePM: [],
    twoPM: [],
    threePM: [],
    fourPM: [],
    fivePM: []
};

// var schedAppts = {};

//save events
$(".saveBtn").click(function(){
    var hour = $(this).parent().attr("id");
    schedAppts[hour] = [];
    var apptText = $(this).parent().find(".description").val();
    schedAppts[hour].push(apptText);
    saveAppointments();
    console.log(schedAppts);
});

// upload events
var saveAppointments = function() {
    localStorage.setItem("schedAppts", JSON.stringify(schedAppts));
}

//match the array key to the id of the row and set the text value of the task description to the value in the array
var loadAppointments = function() {
    schedAppts = JSON.parse(localStorage.getItem("schedAppts"));
    Object.keys(schedAppts)
    .forEach(function eachKey(key) { 
        keyId = "#" + key;
        keyVal = schedAppts[key]
        $("#container").find(keyId).find(".description").val(keyVal);
    });
}

loadAppointments();
