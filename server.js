/* Empty JS object to act as endpoint for all routes */
const projectData = [];

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
  response.send(projectData);
};

// POST the location weather
app.post('/addMood', addMood);

function addMood(req, res) {
  let weather_src_url = `url("http://localhost:3030/images/` + (req.body.weather.toLowerCase()) + `.png")`;
  console.log(weather_src_url);
  newEntry = {
    date: req.body.date,
    city: req.body.city,
    temp: req.body.temp,
    temp_real: req.body.temp_real,
    temp_max: req.body.temp_max,
    temp_min: req.body.temp_min,
    weather: weather_src_url,
    description: req.body.weather,
    mood: req.body.mood
  }
  projectData.push(newEntry);
  res.send(projectData);
  console.log(projectData);
};
