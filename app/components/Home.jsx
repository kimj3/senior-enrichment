import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite';



class Home extends Component {
	render(){       
		return(
			<div>
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
      textDecoration: "none"
    }
})

export default Home;