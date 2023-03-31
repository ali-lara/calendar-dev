const express = require('express')
const app = express();
const path = require('path');
const connection = require('./database/database');
const bodyParser = require('body-parser');
const Event = require('./events/Event');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static('public'));

const eventsController = require('./events/eventsController');
app.use('/', eventsController);


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/index.html'));
});

app.listen(8080, () => {
    console.log('app rodando');
});
