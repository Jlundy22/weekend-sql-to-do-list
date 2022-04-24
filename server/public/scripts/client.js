$(document).ready(onReady);

function onReady() {
    //console.log('JQ')
    $('#addTask').on('click', addTask);
    getTasks();
    $(document).on('click', '.deleteTask', deleteTask);
    $(document).on('click', '.completeTask', completeTask);

}

//Get the list of tasks from the database when the page is loaded
// or when our POST, DELETE or PUT routes run
function getTasks() {
    console.log('in get task');
    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then(function (response) {
        $('#taskTable').empty();
        //console.log('GET /tasks response', response);
        for (let task of response) {
            let taskComplete;
            if (task.isComplete === true) {
                taskComplete = 'Complete'
            } else {
                taskComplete = 'Incomplete'
            }
            let taskChange;
            let strikeTask;
            let taskAction;
            if (taskComplete === 'Complete') {
                taskChange = 'complete'
                strikeTask = 'strike'
                taskAction = 'Restart Task'
            } else {
                taskChange = 'notComplete'
                strikeTask = 'notStrike'
                taskAction = 'Complete Task'
            };
            $('#taskTable').append(`
            <tr  data-id="${task.id}" data-status="${task.isComplete}">
                <td class="${strikeTask}">${task.task}</td>
                <td class="${taskChange}">${taskComplete}</td>
                <td><button class="completeTask">${taskAction}</button></td>
                <td><button class="deleteTask">Delete Task</button></td>
            </tr>
            `);

        }
    }).catch(function (error) {
        console.log(error);
    })
}
//Adds the task that was input to the database
// runs getTasks() after
function addTask() {
    console.log('add task');
    let taskToAdd = $('#inputTask').val()
    if (!taskToAdd) {
        return
    };
    //console.log(taskToAdd);
    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: { taskToAdd: taskToAdd }
    }).then(function (response) {
        $('#inputTask').val('');
        getTasks();
    })
}

//Deletes the task tied to the delete button that was pressed
// runs getTasks() after
function deleteTask() {
    console.log('delete');
    let taskToDelete = $(this).closest('tr').data('id');
    console.log(taskToDelete);

    $.ajax({
        method: 'DELETE',
        url: `/tasks/${taskToDelete}`
    }).then(function (response) {
        getTasks();
    }).catch(function (error) {
        console.log(error);
    })
}

//When the 'complete task' button is clicked 
//the button will change to 'restart task'
//while also crossing out the task and changing 
//the status to complete 
// clicking the 'restart task' will undo the changes
function completeTask() {
    console.log('complete');
    let taskToUpdate = $(this).closest('tr').data('id');
    let taskStatus = $(this).closest('tr').data('status');
    taskStatus = !taskStatus;
    console.log(taskStatus);

    $.ajax({
        method: 'PUT',
        url: `/tasks/${taskToUpdate}`,
        data: { taskStatus: taskStatus }
    
    }).then(function (response) {
        getTasks();
    
    }).catch(function (error) {
        console.log(error);
    })
}