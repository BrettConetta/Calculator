import React from 'react';
import classes from './OtherButton.module.css';

const OtherButton = props => (
	<button className={classes.OtherButton}
		disabled={props.disabled}
		value={props.children}
		onClick={props.clicked}
	>
		{props.children}
	</button>
);

export default OtherButton;