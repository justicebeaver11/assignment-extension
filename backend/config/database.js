const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('mysql', 'root', 'project', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
