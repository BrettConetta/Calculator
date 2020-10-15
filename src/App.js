import React, {Component} from 'react';
import './App.css';
import Calculator from './Components/Calculator/Calculator';

class App extends Component  {

  state = {
    currentVal: "_",
    start: true,
    operators: false,
    zeroFirst: true,
    numAllowed: true,
    zeroFirstAgo: 0,
    operatorsAgo: 0,
    decimalAgo: 0,
    oldOperators: 0,
    decimal: true,
    backspace: true
  };

  numberClickHandler = (event) => {
    if (this.state.start) {
      this.setState({ 
        currentVal: `${event.currentTarget.value}`,
        start: false, 
        oldOperators: this.state.operatorsAgo, 
        operators: true, 
        operatorsAgo: 1,
        zeroFirst: true,
        numAllowed: true,
        zeroFirstAgo: this.state.zeroFirstAgo+1,
        decimalAgo: this.state.decimalAgo+1,
        //decimal: true
      });
    }
    else{
      
      this.setState({ 
        currentVal: `${this.state.currentVal}${event.currentTarget.value}`,
        operators: true,
        oldOperators: this.state.operatorsAgo,
        operatorsAgo: this.state.operatorsAgo+1,
        zeroFirst: true,
        numAllowed: true,
        zeroFirstAgo: this.state.zeroFirstAgo+1,
        decimalAgo: this.state.decimalAgo+1,
        //decimal: true
      });
    }
  }

  operatorClickHandler = (event) => {
    this.setState({ 
      currentVal: `${this.state.currentVal}${event.currentTarget.value}`,
      start: false, 
      operators: false, 
      oldOperators: this.state.operatorsAgo,
      operatorsAgo: 0,
      decimal: true,
      zeroFirst: true,
      numAllowed: true,
      zeroFirstAgo: this.state.zeroFirstAgo+1,
      decimalAgo: this.state.decimalAgo+1
    });
  }

  divideClickHandler = (event) => {
    this.setState({ 
      currentVal: `${this.state.currentVal}${event.currentTarget.value}`,
      start: false, 
      operators: false, 
      oldOperators: this.state.operatorsAgo,
      operatorsAgo: 0,
      decimal: true,
      zeroFirst: false,
      numAllowed: true,
      zeroFirstAgo: this.state.zeroFirstAgo+1,
      decimalAgo: this.state.decimalAgo+1
    });
  }

  clearClickHandler = () => {
    this.setState({ 
      currentVal: "_", 
      start: true, 
      operators: false,
      operatorsAgo: 0,
      oldOperators: 0,
      zeroFirst: true,
      numAllowed: true,
      zeroFirstAgo: 0,
      decimalAgo: 0,
      decimal: true,
      backspace: true
    });
  }

  equalClickHandler = () => {
    //const newStr = eval(this.state.currentVal).toString();

    try {
    const testnewStr = Math.round(eval(this.state.currentVal) * 100000000)/100000000;
    const newStr = testnewStr.toString();

    this.setState({ 
      currentVal: newStr,
      operatorsAgo: newStr.length,
      oldOperators: newStr.length,
      start: true,
      decimal: true});
    } catch(err) {
      this.setState({
        currentVal: "Error",
        numAllowed: false,
        decimal: false,
        operators: false,
        zeroFirst: false,
        backspace: false
      })
    }
  }

  bkspcClickHandler = () => {
    const len = this.state.currentVal.length;
    const newStr = this.state.currentVal.substring(0,len-1);

    if(len > 1 && this.state.currentVal.charAt(len-2) === '/')
    {
      
      this.setState({ 
        currentVal: `${newStr}`, 
        operators: false, 
        start: false, 
        zeroFirst: false,
        operatorsAgo: this.state.oldOperators,
        decimalAgo: this.state.decimalAgo-1
      });
    }
    else if(len > 1 && this.state.operatorsAgo === 1) //if last char is operator
      this.setState({ 
        currentVal: `${newStr}`, 
        operators: false, 
        start: false, 
        operatorsAgo: this.state.oldOperators,
        decimalAgo: this.state.decimalAgo-1
      });
    else if(len > 1 && this.state.zeroFirstAgo === 1) //if last char is a 0
      this.setState({ 
        currentVal: `${newStr}`, 
        operators: true, 
        start: false,
        oldOperators: this.state.oldOperators-1,
        operatorsAgo: this.state.operatorsAgo-1,
        zeroFirstAgo: this.state.zeroFirstAgo-1,
        zeroFirst: false,
        decimalAgo: this.state.decimalAgo-1,
        decimal: true
      });
    else if(len > 1 && this.state.decimalAgo === 1) //if last char is a decimal
      this.setState({ 
        currentVal: `${newStr}`,
        start: false, 
        operators: true, 
        operatorsAgo: this.state.operatorsAgo-1,
        zeroFirstAgo: this.state.zeroFirstAgo-1,
        decimalAgo: this.state.decimalAgo-1,
        decimal: false
      });
    else if(len > 1)
      this.setState({ 
        currentVal: `${newStr}`,
        start: false, 
        operators: true, 
        operatorsAgo: this.state.operatorsAgo-1,
        zeroFirstAgo: this.state.zeroFirstAgo-1,
        decimalAgo: this.state.decimalAgo-1
      });
    else if (len === 1)
      this.setState({ 
        currentVal: "_", 
        start: true, 
        operators: false, 
        operatorsAgo: 0,
        zeroFirst: true
      });  
  }

  decimalClickHandler = async (event) => {
    if (this.state.start) 
    {
      await this.setState({ 
        currentVal: `${event.currentTarget.value}`,
        start: false, 
        oldOperators: this.state.operatorsAgo, 
        operators: false, 
        operatorsAgo: this.state.operatorsAgo+1,
        decimal: false,
        decimalAgo: 0,
        zeroFirst: true,
        numAllowed: true,
        zeroFirstAgo: this.state.zeroFirstAgo+1
      });
    }
    else
    {
      await this.setState({ 
        currentVal: `${this.state.currentVal}${event.currentTarget.value}`,
        operators: false,
        oldOperators: this.state.operatorsAgo,
        operatorsAgo: this.state.operatorsAgo+1,
        decimal: false,
        decimalAgo: 0,
        zeroFirst: true,
        numAllowed: true,
        zeroFirstAgo: this.state.zeroFirstAgo+1
      });   
    }

    const splitResult = this.state.currentVal.split("/");
    const splitLen = splitResult.length;
    
    if(splitResult[splitLen - 1] === 0)
    {
      this.setState({
        operators: false
      })
    }
  }

  zeroClickHandler = async (event) => {
    if (this.state.start) 
    {
      await this.setState({ 
        currentVal: `${event.currentTarget.value}`,
        start: false, 
        oldOperators: this.state.operatorsAgo, 
        operators: true, 
        operatorsAgo: this.state.operatorsAgo+1,
        //decimal: true,
        decimalAgo: this.state.decimalAgo+1,
        zeroFirst: false,
        numAllowed: false,
        zeroFirstAgo: 0
      });
    }
    else
    {
      await this.setState({ 
        currentVal: `${this.state.currentVal}${event.currentTarget.value}`,
        operators: true,
        oldOperators: this.state.operatorsAgo,
        operatorsAgo: this.state.operatorsAgo+1,
        //decimal: true,
        decimalAgo: this.state.decimalAgo+1,
        zeroFirstAgo: 0
      });
    }

    if(this.state.operatorsAgo === 0)
    {
      this.setState({
        zeroFirst: false
      });
    }

    const splitResult = this.state.currentVal.split("/");
    const splitLen = splitResult.length;

    if(splitResult[splitLen - 1] === 0)
    {
      this.setState({
        decimal: false,
        operators: false
      });
    }
    /*else
    {
      this.setState({
        operators: true
      });
    }*/

    //.0 not registering

    //try splitting by '/' check the last element in array then if == 0, dont allow '='
  }

  render() {
    return (
      <div>
        <Calculator 
          numClicked={this.numberClickHandler}
          operatorClicked={this.operatorClickHandler}
          divideClicked={this.divideClickHandler}
          clearClicked={this.clearClickHandler}
          equalClicked={this.equalClickHandler}
          bkspcClicked={this.bkspcClickHandler}
          decimalClicked={this.decimalClickHandler}
          zeroClicked={this.zeroClickHandler}
          value={this.state.currentVal}
          operatorsNotAllowed={!this.state.operators}
          decimalNotAllowed={!this.state.decimal}
          zeroNotAllowed={!this.state.zeroFirst}
          numNotAllowed={!this.state.numAllowed}
          backspaceNotAllowed={!this.state.backspace}>     
        </Calculator>
      </div>
    
      
    );
  }
}


export default App;