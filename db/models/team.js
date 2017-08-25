'use strict';
var Sequelize = require('sequelize')
var db = require('../index.js')


module.exports = db.define('teams', {
	team_id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	team_name:{
		type: Sequelize.STRING,
		allowNull: false
	},
	image_url: {
		type: Sequelize.STRING,
		allowNull: true
	}
})