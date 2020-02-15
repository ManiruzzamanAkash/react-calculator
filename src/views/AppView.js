import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css'
import '../assets/styles/App.css';
import Button from '../components/Button';

var Parser = require('expr-eval').Parser;

class AppView extends React.Component {

state = {
    fullText: '0',
    resultText: '',
    isResultClicked : false,
    isResultInvalid: false
}

// undoClick = () => {
//     console.log('undo something');
// }

/**
 * digitClick
 * @param { integer } digit
 * @return { void } Click to digit and adds to full text
 */
digitClick = (digit) => {
    
    if(this.state.isResultClicked){
        this.setState({ fullText : digit.toString(), resultText : '', isResultClicked: false});
    }else{
        let { fullText } = this.state;

        // If fullText is 0, then clear it
        if(fullText === "0."){
            // fullText = "";
        }else if(parseFloat(fullText) === 0){
            fullText = "";
        }
    
        fullText = fullText + digit.toString();
        this.setState({ fullText });
    }
}

operationClick = (operationSign) =>{
    let { fullText, resultText } = this.state;
    console.log('resultText', resultText)
    if(resultText.length > 0){
        this.setState({ 
            fullText : resultText+operationSign, 
            isResultClicked: false 
        });
        this.setState({ 
            resultText : '',
        });
    }else{
        fullText = fullText + operationSign;
        this.setState({ fullText });
    }
}

/**
 * dotClick
 * @return { void } Handle Dot click
 */
dotClick = () => {
    if(this.state.isResultClicked){
        this.setState({ fullText : "0.", resultText : '', isResultClicked: false});
    }else{
        let { fullText } = this.state;
        fullText = fullText + ".";
        this.setState({ fullText });
    }
}


/**
 * functionalButtonClick
 * @return { void } Handle multiple events
 */
functionalButtonClick = (key) => {
    let { fullText, resultText } = this.state;

    switch (key) {
        case "AC":
            this.setState({ fullText : "0", resultText : "" });
            break;

        case "C":
            this.setState({ resultText : "" });
            // Delete one by one character from fullText

            if(fullText.length > 0 ){
                let newFullText = fullText.slice(0, -1);
                if(newFullText == ""){
                    newFullText = "0";
                }
                this.setState({ fullText : newFullText });
            }
            
            break;

        case "CUT_FIRST":
            this.setState({ resultText : "" });

            // Delete one by one character from fullText
            if(fullText.length > 0 ){
                let newFullText = fullText.substring(1);
                if(newFullText == ""){
                    newFullText = "0";
                }
                this.setState({ fullText : newFullText });
            }
            
            break;
        
        case "MC":
            // Clear Memory
            localStorage.setItem('CALC_M', "0");
            break;

        case "MR":
            // MR = Memory Recall uses the number in memory, acts as if you had keyed in that number yourself
            let memValue = localStorage.getItem('CALC_M') || "0";
            let newFullText = memValue;
            this.setState({ fullText : newFullText, resultText: '' });
            break;


        case "M+":
            // Memory Add takes the number on the display, adds it to the memory, and puts the result into memory
            let getMemoryValue = parseFloat(localStorage.getItem('CALC_M') || "0");
            let totalResult = parseFloat(resultText.length > 0 ? resultText : "0") + getMemoryValue;
            localStorage.setItem('CALC_M', totalResult.toString());
            break;

        case "M-":
            // Memory Minus takes the number on the display, minus it to the memory, and puts the result into memory
            let memValue2 = parseFloat(localStorage.getItem('CALC_M') || "0");
            let totalResult2 = parseFloat(resultText.length > 0 ? resultText : "0") - memValue2;
            localStorage.setItem('CALC_M', totalResult2.toString());
            break;

        case "1/x":
            // Get Values in FullText and 1/parse(FullText)
            try {
                let fullTextNew = "(1/("+fullText+"))";
                let finalResult = this.parseCalculate(fullTextNew);
                this.setState({ fullText: fullTextNew, resultText : finalResult.toString() });
            } catch (error) {
                this.setState({ fullText: "", resultText : "" });
            }
            break;

        case "x^2":
            try {
                let fullTextNew = "("+fullText+")^2";
                let finalResult = this.parseCalculate(fullTextNew);
                this.setState({ fullText: fullTextNew, resultText : finalResult.toString() });
            } catch (error) {
                this.setState({ fullText: "", resultText : "" });
            }
            break;

        case "+-":
            try {
                let fullTextNew = "-("+fullText+")";
                // let finalResult = this.parseCalculate(fullTextNew);
                this.setState({ fullText: fullTextNew, resultText : "" });
            } catch (error) {
                this.setState({ fullText: "", resultText : "" });
            }
            break;

        case "SQ_ROOT":
            try {
                let finalResult = this.parseCalculate(fullText);
                finalResult = Math.sqrt(finalResult);
                let fullTextNew = "√("+fullText+")";
                this.setState({ fullText: fullTextNew, resultText : finalResult.toString(), isResultInvalid : false });
            } catch (error) {
                this.setState({ fullText: "", resultText : "invalid", isResultInvalid : true });
            }
            break;
    
        default:
            break;
    }
}

/**
 * equalClick
 * @return { void } Handle Equal click
 */
equalClick = () => {
    try {
        let finalResult = this.parseCalculate(this.state.fullText);
        this.setState({ resultText: finalResult.toString(), isResultClicked : true, isResultInvalid : false });
    } catch (error) {
        console.log('error', error)
        let resultText = "invalid";
        this.setState({ resultText, isResultClicked : true, isResultInvalid : true });
    }
    
}


/**
 * parseCalculate
 * @param { string } the full text for calculation
 * @return { float } Final parsed result 
 */
parseCalculate = (fullText) => {
    let finalResult = 0;
    finalResult = Parser.evaluate(fullText);
    return finalResult;
}

/**
 * checkKeyboardEvent
 * @return { function } Check and make action if any keyboard is pressed
 */
checkKeyboardEvent = (event) => {
    if(event.key === "0" || event.key === "1" || event.key === "2" || event.key === "3" || event.key === "4" || event.key === "5" || event.key === "6" || event.key === "7" || event.key === "8" || event.key === "9") {
        this.digitClick(parseInt(event.key));
    }else if(event.key === "+" || event.key === "-" || event.key === "*" || event.key === "/") {
        return this.operationClick(event.key)
    }else if(event.key === "="){
        this.equalClick();
    }else if(event.key === "Backspace"){
        this.functionalButtonClick("C");
    }else if(event.key === "Enter"){
        this.equalClick();
    }
}

// Handle Key board event
componentDidMount(){
    document.addEventListener("keydown", this.checkKeyboardEvent, false);
    localStorage.setItem('CALC_M', localStorage.getItem('CALC_M') || "0");
}

// Remove Handle Key board event
componentWillUnmount(){
    document.removeEventListener("keydown", this.checkKeyboardEvent, false);
}


/**
 * printResultTextCSS
 * @return { string } css of result span
 */
printResultTextCSS = () => {
    let css = "resultArea ";
    let { fullText, resultText } = this.state;
    let totalLength = fullText.length + resultText.length;
    if(totalLength >= 0 && totalLength <= 18){
        css = css + "resultArea-md";
    }else if(totalLength > 18 && totalLength <= 35){
        css = css + "resultArea-sm";
    }else if(totalLength > 35 && totalLength <= 55){
        css = css + "resultArea-xsm";
    }else{
        css = css + "resultArea-xxsm";
    }
    return css;
}

  render() { 
    const { fullText, resultText, isResultInvalid } = this.state;
    return ( 
        <div className="App">
            <div className="row justify-content-center">
              <div className="col-md-5">

                <div className="app-header">
                    <span className="app-title">AJ</span> Calculator 
                    <span className="badge badge-warning">React <small>js</small></span>
                </div>

                <div className="calculatorArea">
                  <div className="row">
                    
                    <div className="col-md-12 calculator-header-part">
                      <div className={this.printResultTextCSS()}>
                        { fullText }

                        { isResultInvalid && resultText.length > 0 &&
                            <span className="text-danger">
                                { ' = ' + resultText }
                            </span>
                        }

                        { !isResultInvalid && resultText.length > 0 &&
                            <span className="text-success">
                                { ' = '+ resultText }
                            </span>
                        }
                      </div>
                    </div>

                    <div className="col-md-12 calculator-body-part">
                      <div className="row justify-content-center">
                          <Button isIcon={'fa fa-undo'} buttonClass="btn btn-primary top-button" onClick={this.undoClick}/>
                          <Button buttonClass="btn btn-primary top-button" isIcon={'fa fa-arrow-left'}  onClick={() => this.functionalButtonClick("CUT_FIRST")} />
                          <Button buttonClass="btn btn-primary top-button  text-bold" onClick={() => this.functionalButtonClick("C")} textValue="C"/>
                          <Button buttonClass="btn btn-primary top-button  text-bold" onClick={() => this.functionalButtonClick("AC")} textValue="AC"/>

                      </div>

                      <div className="row justify-content-center mt-2">
                          <Button buttonClass="btn btn-success btn-mem text-bold" onClick={() => this.functionalButtonClick('MC')} textValue="mc"/>
                          <Button buttonClass="btn btn-success btn-mem text-bold" onClick={() => this.functionalButtonClick('M+')} textValue="m+"/>
                          <Button buttonClass="btn btn-success btn-mem text-bold" onClick={() => this.functionalButtonClick('M-')} textValue="m-"/>
                          <Button buttonClass="btn btn-success btn-mem text-bold" onClick={() => this.functionalButtonClick('MR')} textValue="mr"/>
                      </div>

                      
                      <div className="row justify-content-center mt-2">
                          <Button buttonClass="btn btn-primary btn-digit-operation btn-digit text-bold" onClick={() => this.digitClick(7)} textValue="7"/>
                          <Button buttonClass="btn btn-primary btn-digit-operation btn-digit text-bold" onClick={() => this.digitClick(8)} textValue="8"/>
                          <Button buttonClass="btn btn-primary btn-digit-operation btn-digit text-bold" onClick={() => this.digitClick(9)} textValue="9"/>
                          <Button buttonClass="btn btn-primary btn-digit-operation btn-operation text-bold" onClick={() => this.operationClick('/')} textValue="÷"/>
                          <Button buttonClass="btn btn-primary btn-digit-operation btn-operation text-bold" textValue="√"  onClick={() => this.functionalButtonClick("SQ_ROOT")} />
                      </div>

                      <div className="row justify-content-center mt-2">
                          <Button buttonClass="btn btn-primary btn-digit-operation btn-digit text-bold" onClick={() => this.digitClick(4)} textValue="4"/>
                          <Button buttonClass="btn btn-primary btn-digit-operation btn-digit text-bold" onClick={() => this.digitClick(5)} textValue="5"/>
                          <Button buttonClass="btn btn-primary btn-digit-operation btn-digit text-bold" onClick={() => this.digitClick(6)} textValue="6"/>
                          <Button buttonClass="btn btn-primary btn-digit-operation btn-operation text-bold" onClick={() => this.operationClick('*')} textValue="×"/>
                          <Button buttonClass="btn btn-primary btn-digit-operation btn-operation text-bold" onClick={() => this.functionalButtonClick('x^2')} textValue="x^2"/>
                      </div>

                      <div className="row justify-content-center mt-2">
                          <Button buttonClass="btn btn-primary btn-digit-operation btn-digit text-bold" onClick={() => this.digitClick(1)} textValue="1"/>
                          <Button buttonClass="btn btn-primary btn-digit-operation btn-digit text-bold" onClick={() => this.digitClick(2)} textValue="2"/>
                          <Button buttonClass="btn btn-primary btn-digit-operation btn-digit text-bold" onClick={() => this.digitClick(3)} textValue="3"/>
                          <Button buttonClass="btn btn-primary btn-digit-operation btn-operation text-bold" onClick={() => this.operationClick('-')} textValue="-"/>
                          <Button buttonClass="btn btn-primary btn-digit-operation btn-operation text-bold" onClick={() => this.functionalButtonClick('1/x')} textValue="1/x"/>
                      </div>

                      <div className="row justify-content-center mt-2">
                        <Button buttonClass="btn btn-primary btn-digit-operation btn-digit text-bold" onClick={() => this.digitClick(0)} textValue="0"/>
                        <Button buttonClass="btn btn-primary btn-digit-operation btn-operation text-bold" onClick={() => this.dotClick()} textValue="."/>
                        <Button buttonClass="btn btn-primary btn-digit-operation btn-operation text-bold" onClick={() => this.functionalButtonClick('+-')} textValue="±"/>
                        <Button buttonClass="btn btn-primary btn-digit-operation btn-operation text-bold" onClick={() => this.operationClick('+')} textValue="+"/>
                        <Button buttonClass="btn btn-primary btn-digit-operation btn-equal text-bold" onClick={() => this.equalClick()} textValue="="/>
                      </div>

                    </div>

                  </div>
                </div>
                
                <p className="copy-right text-right">
                    &copy; 2020, <a href="https://github.com/ManiruzzamanAkash" target="_blank">Maniruzzaman Akash </a>
                </p>
            </div>
            </div>
        </div>
     );
  }
}
 
export default AppView;
