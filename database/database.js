const Sequelize = require('sequelize');

const connection = new Sequelize('calendar', 'root', 'alisson', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00',
});

module.exports = connection;
