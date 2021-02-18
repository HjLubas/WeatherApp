//openWeather API variables
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const unitTemp = '&units=imperial';
const apiKey = 'your api';

//UI variables
const date = document.getElementById('date');
const temp = document.getElementById('temp');
const content = document.getElementById('content');
let new_zip_code = document.getElementById('zip');
let mood = document.getElementById('feelings');
const icon = document.getElementById('entryHolder');


//generate event button listener
document.getElementById('generate').addEventListener('click', performAction);

//event listener function
function performAction(e) {
    let new_zip_value = new_zip_code.value;
    console.log(new_zip_value.length);
    if (new_zip_value.length == 5) {
        let new_mood = mood.value;
        getWeather(baseURL, new_zip_value, unitTemp, apiKey)
            .then(function (data) {
                let newDate = new Date(data.dt * 1000).toLocaleString();
                console.log(newDate);
                console.log(data.main.temp);
                console.log(new_mood);
                console.log(data.weather[0].main);
                postData('http://localhost:3030/addMood', { date: newDate, temp: data.main.temp, weather: data.weather[0].main, mood: new_mood })
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
    console.log(data);

    if (data.cod >= 400) {
        console.log(data.message);
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
        temp.innerHTML = allData[recent].temp;
        icon.style.backgroundImage = allData[recent].weather;
        content.innerHTML = allData[recent].mood;
    } catch (error) {
        console.log('error', error);
        alert(error.message);
    }
    new_zip_code.value = "";
    mood.value = "";
}