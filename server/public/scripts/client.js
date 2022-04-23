$(document).ready(onReady);

function onReady() {
    console.log('JQ')
    $('#addTask').on('click', addTask);
}
function addTask() {
    console.log('add task');
}