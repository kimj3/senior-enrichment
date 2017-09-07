import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger'; // https://github.com/evgenyrodionov/redux-logger
import thunkMiddleware from 'redux-thunk'; // https://github.com/gaearon/redux-thunk
import axios from 'axios';

const GOT_TEAMS_FROM_SERVER = 'GOT_TEAMS_FROM_SERVER';
const GOT_PLAYERS_FROM_SERVER = 'GOT_PLAYERS_FROM_SERVER';
const GOT_SINGLE_TEAM = 'GOT_SINGLE_TEAM';
const GOT_SINGLE_PLAYER = 'GOT_SINGLE_PLAYER';
const UPDATE_PLAYER = 'UPDATE_PLAYER';
const WRITE_PLAYER = 'WRITE_PLAYER';
const ERASE_PLAYER = 'ERASE_PLAYER';

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

export function gotUpdatedPlayer(player){
  return {
    type: UPDATE_PLAYER,
    player: player
  };
}

export function writePlayer(player){
  return{
    type: WRITE_PLAYER,
    displayingPlayer: player,
  }
}

export function erasePlayer(){
  return {
    type: ERASE_PLAYER,
    displayingPlayer: {team: {}},
  }
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

export function updatePlayer({name,salary,teamId}){
  return function thunk(dispatch){
    axios.put('/api/player/:id', {
      player_name: name,
      salary: salary,
      team_id: teamId
    })
      .then(res=>res.data)
      .then(player => {
        dispatch(updatePlayer(player));
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
    case UPDATE_PLAYER:
      newState.displayingPlayer = action.player;
      return newState;
   default:
   		return state;
  }
}

export default createStore(reducer, applyMiddleware(thunkMiddleware, createLogger()))

/*
Some comments on your store and reducer setup:

Your store is being exported by the above line on 152 > createStore(reducer, applyMiddleware(...etc));
However, in your project, if you go to reducers/index.jsx, you are essentially not using that file.
The reason that file is there is to combine all of your reducers in your project. You can write a reducer
for players and a reducer for teams and put them in your 'reducers' directory. Then in the index.jsx of that
directory, you could combine all those reducers and then import them into this file (store.jsx).

It would look something like this:

----> In reducers/index.jsx <----

import { combineReducers } from 'redux'

const rootReducer = combineReducers({
	players: require('./players').default,
	teams: require('./teams').default
})

export default rootReducer


----> In store.jsx <----

import rootReducer from './reducers'

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      createLogger({collapsed: true}),
      thunkMiddleware
    )
  )
)

export default store

*/
