//add today's date to the header
$("#currentDay").text(moment().format('dddd, MMMM Do'));

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

//don't forget to save! add a red border to form areas that have been edited, but not saved
$(".description").change(function(){
    $(this).addClass("unSaved");
})

//save events
$(".saveBtn").click(function(){
    $(this).parent().find(".description").removeClass("unSaved");
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
        reset();
    }
    Object.keys(schedAppts)
    .forEach(function eachKey(key) { 
        keyId = "#" + key;
        keyVal = schedAppts[key]
        $("#container").find(keyId).find(".description").val(keyVal);
    });
}

//how many hours in the work day have passed?
workDay = 0;

//calculate the difference in hours between the current time and 9AM
var timeCheck = function() {
    var start = moment().hour(9).minutes(00);
    var current = moment();
    var duration = moment.duration(current.diff(start));
    workDay = Math.floor(duration.asHours());
    currentTime();
    // dateCheck();
}

//the index number of each array in the savedAppts array corresponds to one hour passing in the work day, check that against workDay
var currentTime = function() {
    Object.keys(schedAppts)
    .forEach(function eachKey(key, index) { 
        keyId = "#" + key;
        parseInt(index);
        if (index < workDay) {
            $("#container").find(keyId).find(".description").removeClass("future");
            $("#container").find(keyId).find(".description").removeClass("present");
            $("#container").find(keyId).find(".description").addClass("past");
        } else if (index === workDay) {
            $("#container").find(keyId).find(".description").removeClass("future");
            $("#container").find(keyId).find(".description").removeClass("past");
            $("#container").find(keyId).find(".description").addClass("present");
        } else if (index > workDay) {
            $("#container").find(keyId).find(".description").removeClass("present");
            $("#container").find(keyId).find(".description").removeClass("past");
            $("#container").find(keyId).find(".description").addClass("future");
        }
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

//
var timeStamp = moment().valueOf();
var formatStamp = moment(timeStamp).format("L");
console.log(formatStamp);

$("#container").mousemove(function() {
    console.log("moved!")
    var now = moment().valueOf();
    var formatNow = moment(now).format("L");
    if (formatNow !== formatStamp) {
        reset();
        loadAppointments();
    }
    timeStamp = moment().valueOf();
    formatStamp = moment(timeStamp).format("L");
    console.log(formatStamp);  
})



loadAppointments();
timeCheck();
//run time/dateCheck in the background to keep up to date
var refresh = setInterval(timeCheck, (1000 * 60) * 3);