import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger'; // https://github.com/evgenyrodionov/redux-logger
import thunkMiddleware from 'redux-thunk'; // https://github.com/gaearon/redux-thunk
import axios from 'axios'; 

const GOT_TEAMS_FROM_SERVER = 'GOT_TEAMS_FROM_SERVER';
const GOT_PLAYERS_FROM_SERVER = 'GOT_PLAYERS_FROM_SERVER';
const GOT_SINGLE_TEAM = 'GOT_SINGLE_TEAM';
const GOT_SINGLE_PLAYER = 'GOT_SINGLE_PLAYER';

export function gotSingleTeamFromServer(team) {
	return {
    	type: GOT_SINGLE_TEAM, 
      	team: team 
    };
}

export function gotSinglePlayerFromServer(player){
	return {
		type: GOT_SINGLE_PLAYER,
		player: player
	};
}

export function gotTeamsFromServer(teams) {
	return {
    	type: GOT_TEAMS_FROM_SERVER,
      	teams: teams
    };
}

export function gotPlayersFromServer(players){
	return{
		type: GOT_PLAYERS_FROM_SERVER,
		players: players
	};
}

const initialState = {
  teams: [],
  players: [],
  displayingPlayer: {team: {}}, 
  displayingTeam: {players: []} 
};

export function fetchSingleTeam(id) {
  return function thunk(dispatch) {
  	axios.get(`/api/teams/?tid=${id}`)
    	 .then(res => res.data) 
    	 .then(team => {
      		const gotSingleTeamAction = gotSingleTeamFromServer(team);
    		dispatch(gotSingleTeamAction);
    });  
  }
}

export function fetchSinglePlayer(id) {
  return function thunk(dispatch) {
  	axios.get(`/api/players/?pid=${id}`)
    	 .then(res => res.data) 
    	 .then(player => {
      		const gotSinglePlayerAction = gotSinglePlayerFromServer(player);
    		dispatch(gotSinglePlayerAction);
    });  
  }
}

export function fetchTeams(){
	return function thunk(dispatch) {
    	axios.get('/api/teams/')
      		.then(res => res.data)
      		.then(teams => {
        		const gotTeamsAction = gotTeamsFromServer(teams);
          		dispatch(gotTeamsAction);
        	})				
    }
}

export function fetchPlayers(){
	return function thunk(dispatch){
		axios.get('/api/players/')
			.then(res=>res.data)
			.then(players=> {
				const gotPlayersAction = gotPlayersFromServer(players);
				dispatch(gotPlayersAction);
			})
	}
}

function reducer(state = initialState, action) {
 const newState = Object.assign({}, state); 
  
 switch(action.type) {
 	case GOT_TEAMS_FROM_SERVER:
     	newState.teams = action.teams; 
    	return newState;  
    case GOT_PLAYERS_FROM_SERVER:
    	newState.players = action.players;
    	return newState;
   	case GOT_SINGLE_TEAM:
     	newState.displayingTeam = action.team;
     	return newState;
    case GOT_SINGLE_PLAYER:
    	newState.displayingPlayer = action.player;
    	return newState;
   default: 
   		return state; 
  }
}

export default createStore(reducer, applyMiddleware(thunkMiddleware, createLogger()))
