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

/*
So a good pattern for writing routes would be to modularize them a
little more. Right now you have them all in one file, which is ok
for a smaller project. However, even for smaller projects, you can
start overlapping. A good structure would be to have separate files
for your players and teams routes.

Then in your api.js file (here) you could just route everything
that starts with /players into the players file, and
everything that starts with /teams in its own file like this:

var app = require('express').Router()

app.use('/players', require('./players.js'));
app.use('/teams', require('./teams.js'));

This way you can keep your routing logic separated and not all
jammed together in one place.
*/

api.get('/hello', (req, res) => res.send({hello: 'world'}));

api.get('/players', (req,res) => {
	if(req.query.pid) { //find 1 player if there is an id
		Player.findAll({
			where: {
				player_id: req.query.pid
			},
			include: [{model: Team}]
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
	Player.update({
		player_name: req.body.player_name,
		salary: req.body.salary,
		team_id: req.body.team_id
	},
	{where: {player_id: req.params.id}}
	).then((updatedPlayer)=>res.status(201).json(updatedPlayer))
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
			},
			include: [{model: Player  , as: 'players' }]
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
