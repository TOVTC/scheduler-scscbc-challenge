var currentDay = document.querySelector("#currentDay");
currentDay.textContent = moment().format('dddd, MMMM Do');

//an array for each hour of the day
//function to package each hour's events into an object
//function that checks and updates the current time setInterval()
//function that changes the background colour of the timeblock
//function to save changes as an array when save button is clicked
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

$("#save-button").click(function(){
    var hour = $(this).parent().attr("id");
    console.log(hour);
    schedAppts.hour = [];
    var apptText = $("#task-description").val();
    schedAppts.hour.push(apptText);
    console.log(schedAppts);
    saveAppointments();
})

var saveAppointments = function() {
    localStorage.setItem("schedAppts", JSON.stringify(schedAppts));
}