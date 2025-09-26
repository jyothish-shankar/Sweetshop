const sequelize = require('../database');
const User= require('./User');
const Sweet = require('./Sweet');

const syncDb = async () => {
  await sequelize.sync({ alter: true }); // Use alter: true to avoid dropping tables on change
  console.log("Database synchronized");
};

module.exports = {
  sequelize,
  syncDb,
  User,
  Sweet,
};