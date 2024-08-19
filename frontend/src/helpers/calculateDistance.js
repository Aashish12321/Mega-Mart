const axios = require('axios');

const apiKey = '5b3ce3597851110001cf6248ed449c315f004c9989df313198de2b7a';
const startCoords = 'lat1,lon1';
const endCoords = 'lat2,lon2';   

const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${startCoords}&end=${endCoords}`;

axios.get(url)
    .then(response => {
        const distance = response.data.routes[0].summary.distance;
        console.log(`Distance: ${distance} meters`);
    })
    .catch(error => {
        console.error(error);
    });
