'use strict'
import React from 'react'
import {render} from 'react-dom'
import Teams from './components/Teams';
import Team from './components/Team';
import Players from './components/Players';
import Player from './components/Player';
import Home from './components/Home';
import PlayerForm from './components/PlayerForm';
import {
   	BrowserRouter as Router, 
    Route,
    Switch,
    } from 'react-router-dom';

render(
  <Router>
  	<div id="teams-app">
      <Switch>
        <Route exact path="/" component={Home} />
  		  <Route exact path="/teams" component={Teams} />
        <Route path="/teams/:id" component={Team} />
  		  <Route exact path="/players" component={Players} />
        <Route exact path="/players/:id" component={Player} />
        <Route path="/players/:id/edit" component={PlayerForm} />
      </Switch>
 	</div>
  </Router>,
   document.getElementById('main')
);

