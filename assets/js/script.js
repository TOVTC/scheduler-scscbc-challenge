var currentDay = document.querySelector("#currentDay");
currentDay.textContent = moment().format('dddd, MMMM Do');

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

//save events
$(".saveBtn").click(function(){
    var hour = $(this).parent().attr("id");
    schedAppts[hour] = [];
    var apptText = $(this).parent().find(".description").val();
    schedAppts[hour].push(apptText);
    saveAppointments();
});

// upload events
var saveAppointments = function() {
    localStorage.setItem("schedAppts", JSON.stringify(schedAppts));
}

//match the array key to the id of the row and set the text value of the task description to the value in the array
var loadAppointments = function() {
    schedAppts = JSON.parse(localStorage.getItem("schedAppts"));
    //if no array saved to localStorage, upload blank array
    if (!schedAppts) {
        schedAppts = {
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
    localStorage.setItem("schedAppts", JSON.stringify(schedAppts));
    }
    Object.keys(schedAppts)
    .forEach(function eachKey(key) { 
        keyId = "#" + key;
        keyVal = schedAppts[key]
        $("#container").find(keyId).find(".description").val(keyVal);
    });
}

//if moment() - is less than 9am, add future class to all description textareas
//if moment() is greater than 5pm, add past class to all description text areas

// var start = moment().set("hour", 9).set("minutes", 00);
// var end = moment().set("hour", 17).set("minutes", 00);
// if (moment() < start) {
//     $(".description").removeClass("past");
//     $(".description").addClass("future");
// }
// if (moment() > end) {
//     $(".description").addClass("past");
// }

// time = 9;
// iterator = 0;

// Object.keys(schedAppts)
// .forEach(function eachKey(key, index) { 
//     keyId = "#" + key;
//     parseInt(index);
//     if (index < iterator) {
//         $("#container").find(keyId).find(".description").addClass("past")
//     } else if (index === iterator) {
//         $("#container").find(keyId).find(".description").addClass("present")
//     } else if (index > iterator) {
//         $("#container").find(keyId).find(".description").addClass("future")
//     }
// });

//use a set interval to increase the value of time and iterator by 1 in the background
//if the index of the key in the schedAppts is equal to or greater than the iterator, add or remove a class
//reset everything at a specific point in time
//add a function that starts the set interval when it gets to 9:00
//function that checks and updates the current time setInterval()
//function that changes the background colour of the timeblock

loadAppointments();