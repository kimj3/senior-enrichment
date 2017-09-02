import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite';
import store, {updatePlayer, fetchSinglePlayer, writePlayer, erasePlayer} from '../store';

export default class PlayerForm extends Component {
	constructor(){
		super();
		this.state = store.getState();
		this.submitHandler = this.submitHandler.bind(this);
      	this.handleInputChange = this.handleInputChange.bind(this);
	}

	componentDidMount(){ 
		const thunk = fetchSinglePlayer(this.props.match.params.id);
		store.dispatch(thunk); //store gets the data
		this.unsubscribe = store.subscribe(()=> {
			this.setState(store.getState());
		});
	}

	componentWillUnmount(){
		this.unsubscribe();
	}

	submitHandler(ev){
		ev.preventDefault(); 
      	const {name, salary, team_id} = this.state.displayingPlayer;
		const updateAction = updatePlayer({name, salary, team_id}); // where is this coming from?
		store.dispatch(updateAction);
		store.dispatch(erasePlayer());
	}

	handleInputChange(ev){
      	const player = {
          player_name: this.playerName.value, 
          salary: this.salary.value, 
          team_id: this.teamId.value 
        };
		const writeAction = writePlayer(player);
		console.log("PLAYER: ", player);
		store.dispatch(writeAction);
	}
  
  	render(){

    	return (
    		<div>
	    		<h2>Edit Your Player's Information</h2>
	    		<h3>{this.state.displayingPlayer.player_name}</h3>

		        	<form onSubmit={this.submitHandler}>
			          	<label className={css(styles.label)}>
			          	<span>Name:</span>
				          <input onChange={this.handleInputChange}
				          	type="text"
				          	name="player_name"
				          	placeholder="Player's name"
							ref={playerName => this.playerName = playerName}
				          />
				        </label>
			          	<label className={css(styles.label)}>
			          	<span>Salary:</span>
				          <input onChange={this.handleInputChange}
				          	type="number"
				          	name="salary"
				          	placeholder="Player's salary"
							ref={salary => this.salary = salary}
				          />
				        </label>
			          	<label className={css(styles.label)}>
			          	<span>Team Id:</span>
				          <input onChange={this.handleInputChange}
				          	type="text"
				          	name="team_id"
				          	placeholder="Player's team id"
							ref={teamId => this.teamId = teamId}
				          />    
                       
				        </label>
				        <input type="submit" />      
			        </form> 
			</div>
     	)
    }	
}

const styles = StyleSheet.create({
	label: {
      display: "block",
    }
})