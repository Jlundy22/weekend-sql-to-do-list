$(document).ready(onReady);

function onReady() {
    console.log('JQ')
    $('#addTask').on('click', addTask);
    getTasks();
    $(document).on('click', '.deleteTask',deleteTask);
}



function completeTask() {
    console.log('complete');
}

function getTasks() {
    console.log('in get task');
    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then(function(response) {
        $('#taskTable').empty();
        console.log('GET /tasks response',response);
        for (let task of response) {
            let taskComplete = 'Incomplete';
            if (task.isComplete === true) {
                taskComplete = 'Complete'
            }
            $('#taskTable').append(`
            <tr data-id="${task.id}">
                <td>${task.task}</td>
                <td>${taskComplete}</td>
                <td> <button class="completeTask">Complete Task</button></td>
                <td> <button class="deleteTask">Delete Task</button></td>
            </tr>
            `);
        }
    }).catch(function(error) {
        console.log(error);
    })
}

function addTask() {
    console.log('add task');
    let taskToAdd = {task: $('#inputTask').val()};
    console.log(taskToAdd);
    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: taskToAdd
    }).then(function(response) {
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
    }).then(function(response) {
        getTasks();
    }).catch(function(error) {
        console.log(error);
    })
}