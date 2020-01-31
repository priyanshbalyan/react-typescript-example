'use strict';
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const weatherController = require('./controllers/weather');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../client', 'out')));
app.post('/weather', weatherController.getData);

app.get("*", (req, res) => {
    res.status(404).send({ message: 'Not Found' });
});

const { API_PORT } = process.env;
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));