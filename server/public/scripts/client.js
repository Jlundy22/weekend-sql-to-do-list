$(document).ready(onReady);

function onReady() {
    console.log('JQ')
    $('#addTask').on('click', addTask);
    getTasks();
    $(document).on('click', '.deleteTask',deleteTask);
    $(document).on('click', '.completeTask',completeTask);
}
function addTask() {
    console.log('add task');
    let taskToAdd = $('#inputTask').val();
    console.log(taskToAdd);
    $('#inputTask').val('');
}

function deleteTask() {
    console.log('delete');
}
function completeTask() {
    console.log('complete');
}

function getTasks() {
    console.log('in get task');
    $('#taskTable').empty();
    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then(function(response) {
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
    }).then(function(reasponse) {
        $('#inputTask').val('');
        getTasks();
    })
}