'use strict'
const api = require('express').Router();
const db = require('../db');

const Player = require('../db/models/player');
const Team = require('../db/models/team');

var bodyParser = require('body-parser')
api.use(bodyParser.json() );       // to support JSON-encoded bodies
api.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 



api.get('/hello', (req, res) => res.send({hello: 'world'}));

api.get('/players', (req,res) => {
	if(req.query.pid) { //find 1 player if there is an id
		Player.findAll({
			where: {
				player_id: req.query.pid
			}
		})
		.then(player => res.json(player[0]))
		.catch(e => res.send(e));
	}
	else { //find all players if there is no id given
		Player.findAll({})
  		.then(players => res.json(players))
  		.catch(e => res.send(e));
	}
})

api.post('/player', (req,res,next)=>{
	Player.create(req.body)
	.then(player=> res.status(201).json(player))
	.catch(next)
})

api.put('/player/:id', (req,res,next)=>{
	Player.update(
	{salary: req.body.salary},
	{where: {player_id: req.params.id}}
	).then(()=>res.json(201))
})

api.delete('/player/:id', (req,res,next)=>{
	Player.destroy({
		where:{player_id: req.params.id}
	})
	.then(()=> res.json(201));
})

api.get('/teams', (req,res,next) => {
	if(req.query.tid) { //find 1 team if there is an id
		Team.findAll({
			where: {
				team_id: req.query.tid
			}
		})
		.then(team => res.json(team[0]))
		.catch(e => res.send(e));
	}
	else { //find all teams if there is no id given
		Team.findAll({})
  		.then(teams => res.json(teams))
  		.catch(next);
	}
})

api.post('/team', (req,res,next)=>{
	Team.create(req.body)
	.then(team=> res.status(201).json(team))
	.catch(next)
})

api.put('/team/:id', (req,res,next)=>{
	Team.update(
	{budget: req.body.budget},
	{where: {team_id: req.params.id}}
	).then(()=>res.json(201))
})

api.delete('/team/:id', (req,res,next)=>{
	Team.destroy({
		where:{team_id: req.params.id}
	})
	.then(()=> res.json(201));
})




module.exports = api