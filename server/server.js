const express = require('express');
const bodyParser = require('body-parser');

// Require the router object for tasks:

let todoRouter = require('./routes/tasks.router.js');


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('server/public'));

// Tell express to use the todoRouter for requests to
// the /tasks URL:

app.use('/tasks', todoRouter);


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`The server is running at: http://localhost:${PORT}`)
});
