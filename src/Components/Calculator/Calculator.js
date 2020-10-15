import React from 'react';
import classes from './Calculator.module.css';
import Screen from './Screen/Screen';
import Button from './../UI/Button/Button';
import OtherButton from './../UI/OtherButton/OtherButton';

const Calculator = (props) => {

	return (	
		<div className={classes.Calculator}>
			<Screen value={props.value}>
			</Screen>
			<div style={{width: "95%", margin: "10px auto"}}>
				<OtherButton clicked={props.clearClicked}>C</OtherButton>
				<Button clicked={props.bkspcClicked} disabled={props.backspaceNotAllowed}>BKSPC</Button>
				<Button clicked={props.divideClicked} disabled={props.operatorsNotAllowed}>/</Button>
				<Button clicked={props.numClicked} disabled={props.numNotAllowed}>7</Button>
				<Button clicked={props.numClicked} disabled={props.numNotAllowed}>8</Button>
				<Button clicked={props.numClicked} disabled={props.numNotAllowed}>9</Button>
				<Button clicked={props.operatorClicked} disabled={props.operatorsNotAllowed}>*</Button>
				<Button clicked={props.numClicked} disabled={props.numNotAllowed}>4</Button>
				<Button clicked={props.numClicked} disabled={props.numNotAllowed}>5</Button>
				<Button clicked={props.numClicked} disabled={props.numNotAllowed}>6</Button>
				<Button clicked={props.operatorClicked} disabled={props.operatorsNotAllowed}>-</Button>
				<Button clicked={props.numClicked} disabled={props.numNotAllowed}>1</Button>
				<Button clicked={props.numClicked} disabled={props.numNotAllowed}>2</Button>
				<Button clicked={props.numClicked} disabled={props.numNotAllowed}>3</Button>
				<Button clicked={props.operatorClicked} disabled={props.operatorsNotAllowed}>+</Button>
				<OtherButton clicked={props.zeroClicked} disabled={props.zeroNotAllowed}>0</OtherButton>
				<Button clicked={props.decimalClicked} disabled={props.decimalNotAllowed}>.</Button>
				<Button clicked={props.equalClicked} disabled={props.operatorsNotAllowed}>=</Button>
			</div>
			
		</div>
	)
}

export default Calculator;