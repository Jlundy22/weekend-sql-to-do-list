const express = require('express');
const bodyParser = require('body-parser');

// Require the router object for songs:
/////////change this!!
let todoRouter = require('./routes/router');
///////////

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('server/public'));

// Tell express to use the songsRouter for requests to
// the /songs URL:

//////////CHANGE THIS
app.use('/todo', todoRouter);
////////////

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`The server is running at: http://localhost:${PORT}`)
});
