const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

class Profile extends Model {}

Profile.init({
  name: DataTypes.STRING,
  url: DataTypes.STRING,
  about: DataTypes.TEXT,
  bio: DataTypes.TEXT,
  location: DataTypes.STRING,
  followerCount: DataTypes.INTEGER,
  connectionCount: DataTypes.INTEGER
}, { sequelize, modelName: 'Profile' });

module.exports = Profile;


  