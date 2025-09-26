const { Sequelize } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '..', '..', 'database.sqlite'), // Creates a file in the root
  logging: false // Set to console.log to see SQL queries
});

module.exports = sequelize;