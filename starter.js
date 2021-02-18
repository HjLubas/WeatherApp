/* Empty JS object to act as endpoint for all routes */
const moodData = [];

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
app.use('/images', express.static('images'));

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
  response.send(moodData);
};

// POST the location weather
app.post('/addMood', addMood);

function addMood(req, res) {
  let weather_src_url = `url("http://localhost:3030/images/` + (req.body.weather.toLowerCase()) + `.png")`;
  console.log(weather_src_url);
  newEntry = {
    date: req.body.date,
    temp: req.body.temp,
    weather: weather_src_url,
    mood: req.body.mood
  }
  moodData.push(newEntry);
  res.send(moodData);
  console.log(moodData);
};
