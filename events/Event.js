const Sequelize = require('sequelize');
const connection = require('../database/database');

const Event = connection.define('events', {
    day: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    typeOfEvent: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

Event.sync({ force: false });

module.exports = Event;
