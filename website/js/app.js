//openWeather API variables
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const unitTemp = '&units=imperial';
const apiKey = '&appid=dc4847456d8e2ddc8d56deadaee92431';

//UI variables
const date = document.getElementById('date');
const city = document.getElementById('city');
const temp = document.getElementById('temp');
const temp_real = document.getElementById('temp_real');
const temp_hi_low = document.getElementById('temp_hi_low');
const content = document.getElementById('content');
const description = document.getElementById('description');
const new_zip_code = document.getElementById('zip');
const mood = document.getElementById('feelings');
const icon = document.getElementById('entryHolder');
const temp_symbol = `&#176;`;


//generate event button listener
document.getElementById('generate').addEventListener('click', performAction);

//event listener function
function performAction(e) {
    let new_zip_value = new_zip_code.value;
    if (new_zip_value.length == 5) {
        let new_mood = mood.value;
        getWeather(baseURL, new_zip_value, unitTemp, apiKey)
            .then(function (data) {
                let newDate = new Date(data.dt * 1000).toLocaleString();
                postData('http://localhost:3030/addMood', {
                    date: newDate,
                    city: data.name,
                    temp: Math.round(data.main.temp),
                    temp_real: Math.round(data.main.feels_like),
                    temp_min: Math.round(data.main.temp_max),
                    temp_max: Math.round(data.main.temp_min),
                    weather: data.weather[0].main,
                    mood: new_mood
                })
                    .then(() => updateUI());
            });
    } else {
        alert('Please enter a zip code!');
    }
}

//async openWeather API fetch
const getWeather = async (baseURL, zipCode, unit, key) => {

    const res = await fetch(baseURL + zipCode + unit + key);
    const data = await res.json();

    if (data.cod >= 400) {
        alert(data.message);
    } else {
        return data;
    }
}


// Async POST
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header        
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
}

//Async GET
const updateUI = async () => {
    let request = await fetch('http://localhost:3030/all')
    try {
        let allData = await request.json();
        let recent = allData.length - 1;
        date.innerHTML = allData[recent].date;
        city.innerHTML = allData[recent].city;
        temp.innerHTML = allData[recent].temp + temp_symbol;
        temp_real.innerHTML = "Feels like " + allData[recent].temp_real + temp_symbol;
        temp_hi_low.innerHTML = allData[recent].temp_max + temp_symbol +
            " / " + allData[recent].temp_min + temp_symbol;
        icon.style.backgroundImage = allData[recent].weather;
        description.innerHTML = allData[recent].description;
        content.innerHTML = allData[recent].mood;
    } catch (error) {
        // console.log('error', error);
        alert(error.message);
    }
    new_zip_code.value = "";
    mood.value = "";
}