import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite';
import store, {fetchPlayers} from '../store';

class Players extends Component {
	constructor(){
		super();
		this.state = store.getState();
	}

	componentDidMount(){ //Actually triggering the event to get the players data
		const thunk = fetchPlayers();
		store.dispatch(thunk); //store gets the data
		this.unsubscribe = store.subscribe(()=> {
			this.setState(store.getState())
		});
	}

	componentWillUnmount(){
		this.unsubscribe();
	}

	render(){
      	const {players} = this.state; 

		return(
			<div>
          		{players.map(({player_id, player_name}) => (
                 <Link className={css(styles.link)} to={`/players/${player_id}`} key={player_id}>{player_name}</Link>
                ))}
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

export default Players;