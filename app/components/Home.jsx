import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite';
import Navbar from "./Navbar";



export default class Home extends Component {
	render(){       
		return(
			<div>
				<Navbar/>
				<Link className={css(styles.link)} to="/players">Players Page</Link>
				<Link className={css(styles.link)} to="/teams">Teams Page</Link>
			</div>
		)
	}
}

const styles = StyleSheet.create({
	link: {
      display: "block",
      color: "inherit",
      textDecoration: "blue"
    }
})