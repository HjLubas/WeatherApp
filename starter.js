/* Empty JS object to act as endpoint for all routes */
projectData = {};

/* Express to run server and routes */
const express = require('express');

/* Start up an instance of app */
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')
/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());

/* Initialize the main project folder*/
app.use(express.static('website'));

const port = 3030;
/* Spin up the server*/
const server = app.listen(port, listening);
function listening() {
  // console.log(server);
  console.log(`running on localhost: ${port}`);
};

// GET route
app.get('/all', sendData);

function sendData(request, response) {
  response.send(projectData);
};

// // POST route
// app.post('/add', callBack);

// function callBack(req,res){
//   res.send('POST received');
// }

// POST the location weather
const moodData = [];

app.post('/addMood', addMood);

function addMood(req, res) {
  console.log(req.body);
  newEntry = {
    date: req.body.date,
    temp: req.body.temp,
    mood: req.body.mood

  }
  moodData.push(newEntry);
  res.send(moodData);
  console.log(moodData);
};
