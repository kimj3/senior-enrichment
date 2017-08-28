import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite';
import store, {fetchSingleTeam} from '../store';

class Team extends Component {
	constructor(){
		super();
		this.state = store.getState();
	}

	componentDidMount(){ //Actually triggering the event to get the teams data
		const thunk = fetchSingleTeam(this.props.match.params.id);
		store.dispatch(thunk); //store gets the data
		this.unsubscribe = store.subscribe(()=> {
			this.setState(store.getState())
		});
	}

	componentWillUnmount(){
		this.unsubscribe();
	}

	render(){
      	const { displayingTeam } = this.state; 
      	const { players } = displayingTeam;

		return(
			<div>
          		<h1>{displayingTeam.team_name}</h1>
          		{players.map(({player_name, player_id}) => (          		
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

export default Team;