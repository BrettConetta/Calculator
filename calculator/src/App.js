import React, {Component} from 'react';
import './App.css';
import Calculator from './Components/Calculator/Calculator';
import ErrorBoundary from './Containers/ErrorBoundary/ErrorBoundary';

class App extends Component  {

  state = {
    currentVal: "_",
    start: true,
    operatorsAllowed: false,
    numAllowed: true,
    decimalAllowed: true,
    zeroFirst: true,
    zeroFirstAgo: 0,
    operatorsAgo: 0,
    decimalAgo: 0,
    oldOperators: 0
  };

  numberClickHandler = (event) => {
    if (this.state.start) {
      this.setState({ 
        currentVal: `${event.currentTarget.value}`,
        start: false, 
        operatorsAllowed: true, 
        numAllowed: true,
        //decimalAllowed: true
        oldOperators: this.state.operatorsAgo, 
        operatorsAgo: 1,
        zeroFirst: true,
        zeroFirstAgo: this.state.zeroFirstAgo+1,
        decimalAgo: this.state.decimalAgo+1,
      });
    }
    else{
      
      this.setState({ 
        currentVal: `${this.state.currentVal}${event.currentTarget.value}`,
        operatorsAllowed: true,
        numAllowed: true,
        //decimalAllowed: true
        oldOperators: this.state.operatorsAgo,
        operatorsAgo: this.state.operatorsAgo+1,
        zeroFirst: true,
        zeroFirstAgo: this.state.zeroFirstAgo+1,
        decimalAgo: this.state.decimalAgo+1,
      });
    }
  }

  operatorClickHandler = (event) => {
    this.setState({ 
      currentVal: `${this.state.currentVal}${event.currentTarget.value}`,
      start: false, 
      operatorsAllowed: false, 
      numAllowed: true,
      decimalAllowed: true,
      oldOperators: this.state.operatorsAgo,
      operatorsAgo: 0,
      zeroFirst: true,
      zeroFirstAgo: this.state.zeroFirstAgo+1,
      decimalAgo: this.state.decimalAgo+1
    });
  }

  divideClickHandler = (event) => {
    this.setState({ 
      currentVal: `${this.state.currentVal}${event.currentTarget.value}`,
      start: false, 
      operatorsAllowed: false, 
      numAllowed: true,
      decimalAllowed: true,
      oldOperators: this.state.operatorsAgo,
      operatorsAgo: 0,
      zeroFirst: false,
      zeroFirstAgo: this.state.zeroFirstAgo+1,
      decimalAgo: this.state.decimalAgo+1
    });
  }

  clearClickHandler = () => {
    this.setState({ 
      currentVal: "_", 
      start: true, 
      operatorsAllowed: false,
      numAllowed: true,
      decimalAllowed: true,
      operatorsAgo: 0,
      oldOperators: 0,
      zeroFirst: true,
      zeroFirstAgo: 0,
      decimalAgo: 0
    });
  }

  equalClickHandler = () => {
    //const newStr = eval(this.state.currentVal).toString();
    const testnewStr = Math.round(eval(this.state.currentVal) * 100000000)/100000000;
    const newStr = testnewStr.toString();

    this.setState({ 
      currentVal: newStr,
      start: true,
      decimalAllowed: true,
      operatorsAgo: newStr.length,
      oldOperators: newStr.length
    });
  }

  bkspcClickHandler = () => {
    const len = this.state.currentVal.length;
    const newStr = this.state.currentVal.substring(0,len-1);

    if(len > 1 && this.state.currentVal.charAt(len-2) === '/')
    {
      
      this.setState({ 
        currentVal: `${newStr}`, 
        start: false, 
        operatorsAllowed: false, 
        zeroFirst: false,
        operatorsAgo: this.state.oldOperators,
        decimalAgo: this.state.decimalAgo-1
      });
    }
    else if(len > 1 && this.state.operatorsAgo === 1) //if last char is operator
      this.setState({ 
        currentVal: `${newStr}`, 
        start: false, 
        operatorsAllowed: false, 
        operatorsAgo: this.state.oldOperators,
        decimalAgo: this.state.decimalAgo-1
      });
    else if(len > 1 && this.state.zeroFirstAgo === 1) //if last char is a 0
      this.setState({ 
        currentVal: `${newStr}`, 
        start: false,
        operatorsAllowed: true, 
        decimalAllowed: true,
        oldOperators: this.state.oldOperators-1,
        operatorsAgo: this.state.operatorsAgo-1,
        zeroFirstAgo: this.state.zeroFirstAgo-1,
        zeroFirst: false,
        decimalAgo: this.state.decimalAgo-1
      });
    else if(len > 1 && this.state.decimalAgo === 1) //if last char is a decimal
      this.setState({ 
        currentVal: `${newStr}`,
        start: false, 
        operatorsAllowed: true, 
        decimalAllowed: false,
        operatorsAgo: this.state.operatorsAgo-1,
        zeroFirstAgo: this.state.zeroFirstAgo-1,
        decimalAgo: this.state.decimalAgo-1
      });
    else if(len > 1)
      this.setState({ 
        currentVal: `${newStr}`,
        start: false, 
        operatorsAllowed: true, 
        operatorsAgo: this.state.operatorsAgo-1,
        zeroFirstAgo: this.state.zeroFirstAgo-1,
        decimalAgo: this.state.decimalAgo-1
      });
    else if (len === 1)
      this.setState({ 
        currentVal: "_", 
        start: true, 
        operatorsAllowed: false, 
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
        operatorsAllowed: false, 
        numAllowed: true,
        decimalAllowed: false,
        oldOperators: this.state.operatorsAgo, 
        operatorsAgo: this.state.operatorsAgo+1,
        decimalAgo: 0,
        zeroFirst: true,
        zeroFirstAgo: this.state.zeroFirstAgo+1
      });
    }
    else
    {
      await this.setState({ 
        currentVal: `${this.state.currentVal}${event.currentTarget.value}`,
        operatorsAllowed: false,
        numAllowed: true,
        decimalAllowed: false,
        oldOperators: this.state.operatorsAgo,
        operatorsAgo: this.state.operatorsAgo+1,
        decimalAgo: 0,
        zeroFirst: true,
        zeroFirstAgo: this.state.zeroFirstAgo+1
      });   
    }

    const splitResult = this.state.currentVal.split("/");
    const splitLen = splitResult.length;
    
    if(splitResult[splitLen - 1] === 0)
    {
      this.setState({
        operatorsAllowed: false
      })
    }
  }

  zeroClickHandler = async (event) => {
    if (this.state.start) 
    {
      await this.setState({ 
        currentVal: `${event.currentTarget.value}`,
        start: false, 
        operatorsAllowed: true, 
        numAllowed: false,
        //decimalAllowed: true,
        oldOperators: this.state.operatorsAgo, 
        operatorsAgo: this.state.operatorsAgo+1,
        decimalAgo: this.state.decimalAgo+1,
        zeroFirst: false,
        zeroFirstAgo: 0
      });
    }
    else
    {
      await this.setState({ 
        currentVal: `${this.state.currentVal}${event.currentTarget.value}`,
        operatorsAllowed: true,
        //decimalAllowed: true,
        oldOperators: this.state.operatorsAgo,
        operatorsAgo: this.state.operatorsAgo+1,
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
        operatorsAllowed: false,
        decimalAllowed: false
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
        <ErrorBoundary>
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
            operatorsNotAllowed={!this.state.operatorsAllowed}
            decimalNotAllowed={!this.state.decimalAllowed}
            zeroNotAllowed={!this.state.zeroFirst}
            numNotAllowed={!this.state.numAllowed}>     
          </Calculator>
        </ErrorBoundary>
      </div>
    
      
    );
  }
}


export default App;