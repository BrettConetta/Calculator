import React from 'react';
import classes from './Screen.module.css';

const Screen = (props) => {
	return (
		<div className={classes.Screen}>
			<p>{props.value}</p>
		</div>
	)
}

export default Screen;