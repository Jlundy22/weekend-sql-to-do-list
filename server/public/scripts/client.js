$(document).ready(onReady);

function onReady() {
    console.log('JQ')
    $('#addTask').on('click', addTask);
    getTasks();
    $(document).on('click', '.deleteTask', deleteTask);
    $(document).on('click', '.completeTask', completeTask);

}

function getTasks() {
    console.log('in get task');
    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then(function (response) {
        $('#taskTable').empty();
        console.log('GET /tasks response', response);
        for (let task of response) {
            let taskComplete;
            if (task.isComplete === true) {
                taskComplete = 'Complete'
            } else {
                taskComplete = 'Incomplete'
            }
            let taskChange;
            let strikeTask;
            if (taskComplete === 'Complete') {
                taskChange = 'complete'
                strikeTask = 'strike'
            } else {
                taskChange = 'notComplete'
                strikeTask = 'notStrike'
            };
            $('#taskTable').append(`
            <tr  data-id="${task.id}" data-status="${task.isComplete}">
                <td class="${strikeTask}">${task.task}</td>
                <td class="${taskChange}">${taskComplete}</td>
                <td> <button class="completeTask">Complete Task</button></td>
                <td> <button class="deleteTask">Delete Task</button></td>
            </tr>
            `);

        }
    }).catch(function (error) {
        console.log(error);
    })
}

function addTask() {
    console.log('add task');
    let taskToAdd = $('#inputTask').val()
    console.log(taskToAdd);
    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: { taskToAdd: taskToAdd }
    }).then(function (response) {
        $('#inputTask').val('');
        getTasks();
    })
}

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