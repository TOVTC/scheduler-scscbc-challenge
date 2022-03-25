# Work Day Scheduler
This website hosts a basic planner for your work day.
## About This Repository
This website hosts a basic planner application.</br>
Tasks can be added to each hour of the work day by directly clicking on its corresponding time block - but don't forget to save! Unsaved tasks will appear with a red border, and unsaved changes can be undone by hitting refresh. Your saved tasks will magically reappear thanks to localStorage.</br>
Individual tasks can be cleared by deleting the text in a specific time block and hitting save, or clear all tasks in the day using the handy "Reset All Tasks" button. At the start of a new day, tasks will automatically be cleared from storage and the page.</br>
To help keep you on track, this application also features a dynamic date and colour-coded time display that reflects the current hour in the work day.

## Website
[Work-Scheduler-Challenge-5](https://tovtc.github.io/scheduler-scscbc-challenge/)

![Work Day Scheduler](./scheduler.png?raw=true "Work Day Scheduler")

## Built With
* HTML
* CSS
* JavaScript
* jQuery
* Momentjs
* Bootstrap
* Google Fonts

## Support
Contact repository author.

## Authors and Acknowledgment
Made with ❤️ by TOVTC </br>
Base code © 2020 - 2022 Trilogy Education Services, a 2U, Inc. brand. All Rights Reserved.</br>
As with all projects, external resources were consulted, but a special thanks to McKayla's answer [here](https://stackoverflow.com/questions/26387052/best-way-to-detect-midnight-and-reset-data) for rendering my own setInterval-based midnight-detection solution obsolete and Michael's answer [here](https://stackoverflow.com/questions/6268679/best-way-to-get-the-key-of-a-key-value-javascript-object) for saving me at four AM when I couldn't load any of my tasks.

## License
MIT License

## Project status
Submitted 2022Mar25</br>

## Assignment Information - Third-Party APIs Challenge: Work Day Scheduler
### User Story
AS AN employee with a busy schedule</br>
I WANT to add important events to a daily planner</br>
SO THAT I can manage my time effectively</br>

### Acceptance Criteria
GIVEN I am using a daily planner to create a schedule</br>
WHEN I open the planner</br>
THEN the current day is displayed at the top of the calendar</br>
WHEN I scroll down</br>
THEN I am presented with time blocks for standard business hours</br>
WHEN I view the time blocks for that day</br>
THEN each time block is color-coded to indicate whether it is in the past, present, or future</br>
WHEN I click into a time block</br>
THEN I can enter an event</br>
WHEN I click the save button for that time block</br>
THEN the text for that event is saved in local storage</br>
WHEN I refresh the page</br>
THEN the saved events persist</br>