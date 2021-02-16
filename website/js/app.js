const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const unitTemp = '&units=imperial';
const apiKey = '&appid=dc4847456d8e2ddc8d56deadaee92431';


document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
    let newzipCode = document.getElementById('zip').value;
    let mood = document.getElementById('feelings').value;
    getWeather(baseURL, newzipCode, unitTemp, apiKey)
        .then(function (data) {
            let newDate = new Date(data.dt * 1000).toLocaleString();
            console.log(newDate);
            console.log(data.main.temp);
            console.log(mood);
            postData('/addMood', { date: newDate, temp: data.main.temp, mood: mood })
        })
}
const getWeather = async (baseURL, zipCode, unit, key) => {

    const res = await fetch(baseURL + zipCode + unit + key)
    try {

        const data = await res.json();
        console.log(data)
        return data;
    } catch (error) {
        console.log("error", error);
        // appropriately handle the error
        alert('Error message: ', error);
    }
}


// Async POST
const postData = async (url = '', data = {}) => {
    console.log(data);
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
        console.log(response);
        return newData
    } catch (error) {
        console.log("error", error);
    }
}

// // Async GET
// const retrieveData = async (url = '') => {
//     const request = await fetch(url);
//     try {
//         // Transform into JSON
//         const allData = await request.json()
//     }
//     catch (error) {
//         console.log("error", error);
//         // appropriately handle the error
//     }
// };

// // TODO-Chain your async functions to post an animal then GET the resulting data
// function postGet(){
//     postData('/animal', {fav: 'lion'})
//         .then(function(data)){
//               retrieveData('/all')
//               })
// }
// // TODO-Call the chained function

// postGet();