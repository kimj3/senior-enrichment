
import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger'; // https://github.com/evgenyrodionov/redux-logger
import thunkMiddleware from 'redux-thunk'; // https://github.com/gaearon/redux-thunk
import axios from 'axios'; 

const GOT_TEAMS_FROM_SERVER = 'GOT_TEAMS_FROM_SERVER';
const GOT_PLAYERS_FROM_SERVER = 'GOT_PLAYERS_FROM_SERVER';

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
  displayingPlayer: null, 
  displayingTeam: null 
};

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
   default: 
   		return state; 
  }
}

export default createStore(reducer, applyMiddleware(thunkMiddleware, createLogger()))
        
