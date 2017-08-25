'use strict';
var Sequelize = require('sequelize')
var db = require('../index.js')


module.exports = db.define('players', {
	player_id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	player_name:{
		type: Sequelize.STRING,
		allowNull: false
	}
})