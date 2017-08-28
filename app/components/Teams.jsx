import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite';
import store, {fetchTeams} from '../store';

class Teams extends Component {
	constructor(){
		super();
		this.state = store.getState();
	}

	componentDidMount(){ //Actually triggering the event to get the teams data
		const thunk = fetchTeams();
		store.dispatch(thunk); //store gets the data
		this.unsubscribe = store.subscribe(()=> {
			this.setState(store.getState())
		});
	}

	componentWillUnmount(){
		this.unsubscribe();
	}

	render(){
      	const {teams} = this.state; 

		return(
			<div>
          		{teams.map(({team_id, team_name}) => (
                 <Link className={css(styles.link)} to={`/teams/${team_id}`} key={team_id}>{team_name}</Link>
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

export default Teams;