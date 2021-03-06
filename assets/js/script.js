//add today's date to the header
$("#currentDay")
    .text(moment()
    .format('dddd, MMMM Do'));

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
}

//don't forget to save! add a red border to form areas that have been edited, but not saved
$(".description").change(function(){
    $(this).addClass("unSaved");
});

//clear all tasks in window and local storage
$("#reset-tasks").click(function(){
    var clear = confirm("This action cannot be undone. Proceed?");
    if (!clear) {
        return false;
    } else {
        $(".description").removeClass("unSaved");
        reset();
        loadAppointments();
    }
});

//save events
$(".saveBtn").click(function(){
    //in this element's parent div, find .description
    $(this)
        .parent()
        .find(".description")
        .removeClass("unSaved");
    //in schedAppts, reset the array with the key that matches the parent id
    var hour = $(this)
        .parent()
        .attr("id");
    schedAppts[hour] = [];
    //push the text value of .description to the blank array and update localStorage
    var apptText = $(this)
        .parent()
        .find(".description")
        .val();
    schedAppts[hour].push(apptText);
    saveAppointments();
});

// upload appointments
var saveAppointments = function() {
    localStorage.setItem("schedAppts", JSON.stringify(schedAppts));
}

//download appointments
var loadAppointments = function() {
    schedAppts = JSON.parse(localStorage.getItem("schedAppts"));
    //if no array saved to localStorage, upload blank array
    if (!schedAppts) {
        reset();
    }
    //match the array key to the row id and set the text of its .description child to the value in the array
    Object.keys(schedAppts)
    .forEach(function eachKey(key) { 
        keyId = "#" + key;
        keyVal = schedAppts[key];
        $("#container")
            .find(keyId)
            .find(".description")
            .val(keyVal);
    });
}

//reset local storage
var reset = function() {
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
    saveAppointments();
}

//hours passed in work day
workDay = 0;

//calculate the difference in rounded hours between the current time and 9AM
var timeCheck = function() {
    var start = moment()
        .hour(9)
        .minutes(00);
    var current = moment();
    var duration = moment.duration(current.diff(start));
    workDay = Math.floor(duration.asHours());
    currentTime();
}

//check the index number of each array in savedAppts against workDay, and add/remove classes accordingly
var currentTime = function() {
    Object.keys(schedAppts)
    .forEach(function eachKey(key, index) { 
        keyId = "#" + key;
        parseInt(index);
        if (index < workDay) {
            $("#container")
                .find(keyId)
                .find(".description")
                .removeClass("future");
            $("#container")
                .find(keyId)
                .find(".description")
                .removeClass("present");
            $("#container")
                .find(keyId)
                .find(".description")
                .addClass("past");
        } else if (index === workDay) {
            $("#container")
                .find(keyId)
                .find(".description")
                .removeClass("future");
            $("#container")
                .find(keyId)
                .find(".description")
                .removeClass("past");
            $("#container")
                .find(keyId)
                .find(".description")
                .addClass("present");
        } else if (index > workDay) {
            $("#container")
                .find(keyId)
                .find(".description")
                .removeClass("present");
            $("#container")
                .find(keyId)
                .find(".description")
                .removeClass("past");
            $("#container")
                .find(keyId)
                .find(".description")
                .addClass("future");
        }
    });
}

//create a timestamp of the date the page was loaded
var timeStamp = moment().valueOf();
var formatStamp = moment(timeStamp).format("L");
var universalStamp = formatStamp;

// upload timeStamp
var uploadTimeStamp = function() {
    localStorage.setItem("formatStamp", JSON.stringify(formatStamp));
}

//download timeStamp
var loadTimeStamp = function() {
    universalStamp = JSON.parse(localStorage.getItem("formatStamp"));
    //if no timeStamp saved, set a new one
    if (!universalStamp) {
        var timeStamp = moment().valueOf();
        var formatStamp = moment(timeStamp).format("L");
        uploadTimeStamp();
    }
}

//when the mouse moves in the container, create a new timestamp of the current date
$("#container").mousemove(function() {
    loadTimeStamp();
    var now = moment().valueOf();
    var formatNow = moment(now).format("L");
    //if the current date is not the same as the existing timestamp, update header, reset tasks and set a new timestamp
    if (formatNow !== universalStamp) {
        $("#currentDay")
            .text(moment()
            .format('dddd, MMMM Do'));
        reset();
        loadAppointments();
        //set a new timeStamp in localStorage
        timeStamp = moment().valueOf();
        formatStamp = moment(timeStamp).format("L");
        uploadTimeStamp();
    }
});

loadAppointments();
timeCheck();
//run timeCheck in the background to keep up to date
var refresh = setInterval(timeCheck, (1000 * 60) * 1);
