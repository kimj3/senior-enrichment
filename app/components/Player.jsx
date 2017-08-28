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