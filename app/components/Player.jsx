import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite';
import store, {fetchSinglePlayer} from '../store';

class Player extends Component {
	constructor(){
		super();
		this.state = store.getState();
	}

	componentDidMount(){ //Actually triggering the event to get the teams data
		const thunk = fetchSinglePlayer(this.props.match.params.id);
		store.dispatch(thunk); //store gets the data
		this.unsubscribe = store.subscribe(()=> {
			this.setState(store.getState())
		});
	}

	componentWillUnmount(){
		this.unsubscribe();
	}

	render(){
      	const { displayingPlayer } = this.state;
      	const { team, player_name } = displayingPlayer;

		return(
			<div>
          		<h1>{player_name}</h1>
          		<h2>{team.team_name}</h2>
			</div>
		)
	}
}

const styles = StyleSheet.create({
	link: {
      display: "block",
      color: "inherit",
      textDecoration: "none"
    }
})

export default Player;

/*
So this is where I will comment on all of your React Components.

At this point you have done all the work to create the redux store
as well as the dispatch methods etc. At this point, taking advantage
of the 'connect' function is really useful for making your components
aware of changes in the store. You wrote your components to receive
information from the store with a store.getState() wrapped in a
componentDidMount() function. This is fine, but it doesn't fully
take advantage of what the 'connect' function from react-redux can
offer you. Basically, it just gives the proper information from state
to the component as well as any dispatch methods it may need to update
state itself.

After you give it these things, when state changes, it will tell the
component to update on its own. It also takes care of subscribing / unsubscribing
by itself. A connected component would look like this:

----> Connected Component Example <----
import React from 'react'
import { connect } from 'react-redux'
import Players from '../components/Players'

// function that tells Players Component which info it needs from store (list of players)
const mapStateToProps = (state) => {
  return {
    players: state.players,
  }
}

// function that gives Players Component the thunk it will need to delete a player from store
const mapDispatchToProps = (dispatch) => {
  return {
		deletePlayer(playerId) {
			dispatch(deletePlayer(playerId))
		}
  }
}

// Connecting the Players component with the two functions you just wrote above

const PlayersContainer = connect(mapStateToProps, mapDispatchToProps)(Players)

// Finally you will export it below and in your react routes in main.jsx, you would render
// this container, rather than rendering the Players Component directly.

export default PlayersContainer



----> in main.jsx <----

import PlayersContainer from '<wherever it is>'

render(
  <Router>
  	<div id="teams-app">
			<Switch>
				// below you will render the container rather than the component
  		  <Route exact path="/players" component={PlayersContainer} />
      </Switch>
 	</div>
  </Router>,
   document.getElementById('main')
);

*/
