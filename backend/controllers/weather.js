'use strict';
const axios = require('axios');
const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather';

// get data for a single location
exports.getData = async (req, res)=>{ 
    if(!req.body && !req.body.location) {
        return res.status(400).send({ message: 'Invalid parameters' });
    }

    const { location } = req.body;
    const url = `${BASE_URL}?q=${location}&APPID=${process.env.APP_ID}`;
    
    let data = null;
    try {
        const response = await axios.get(url);
        data = response.data;
    } catch(err) {
        console.log(err.message);
        return res.status(400).send({ message: 'An error occured' });
    }
    return res.status(200).send(data);
};


// get weather data for a zipcode array
exports.getArray = async (req, res) => {
    if (!req.body && !req.body.array) {
        return res.status(400).send({ message: 'Invalid parameters' });
    }
    const { array } = req.body;
    const data = [];
    for (let zipcode of array) {
        const url = `${BASE_URL}?zip=${zipcode}&APPID=${process.env.APP_ID}`;
        const response = await axios.get(url);
        data.push(response.data);
    }

    return res.status(200).send(data);
}