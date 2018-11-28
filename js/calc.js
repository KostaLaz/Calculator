let runningTotal = 0;
let buffer = "0"; // What is on the screen
let previousOperator;

// We grab the .screen class and put it in the const screen variable.
const screen = document.querySelector('.screen');

function buttonClick(value){
    if(isNaN(value)){
    //This is not a number
    handleSymbol(value);
}else{
    //This is a number
    handleNumber(value);
} // We are asignin every value on the buttons to apear on the screen.
     screen.innerText = buffer;
}
function handleSymbol(symbol) {
        switch(symbol){
            case 'C':
        buffer = "0";
        runningTotal = "0";
        break;
        case '=':
        if(previousOperator === null){
            //We need two numbers to do math
            return;
        }
        flushOperation(parseInt(buffer));
        previousOperator = null;
        buffer = runningTotal;
        runningTotal = 0;
        break;
        case '←':
        if(buffer.length === 1){
            buffer = "0";
        }else{
            buffer = buffer.substring(0, buffer.length - 1);
            // If buffer is longer than one, asign the buffer to his length - 1 charachter.
        }
        break;
        case '+':
        case '-':
        case '×':
        case '÷':
        handleMath(symbol);
        break;
        }
    }

    function handleMath(symbol){
        if(buffer === "0"){
        //Do nothing
        return;
    }
    const intBufer = parseInt(buffer); // Asigning the value of the number we type(intBufffer) to the value on the screen(buffer).
    if(runningTotal === 0){
        runningTotal = intBufer;
    } else{
        flushOperation(intBufer);
    }
    previousOperator = symbol;
    buffer = "0";
}
// Creating the math operations with intBuffer(the number we type on the calculator) as a parametar.
function flushOperation(intBufer){
    if(previousOperator === '+'){
        runningTotal += intBufer;
    }else if(previousOperator === '-' ){
        runningTotal -= intBufer;
    }else if(previousOperator === '×'){
        runningTotal *= intBufer;
    }else {
        runningTotal /= intBufer;
    }
    console.log('runingTotal', runningTotal);
}

function handleNumber(numberString){
    //If the number you type(in a String) is "0" the value won`t chabge it stays zero
    if(buffer === "0"){
      buffer = numberString;
    }else{
        // Concatanteing numbers in strings (so we can have 55 instead of 5+5 if we type butten with value 5 twice)
        buffer += numberString;
    }
}

function init(){
    //We grab the .calc-buttons
    document.querySelector('.calc-buttons')
    //Whenever a click('click' is an event type)happens
    .addEventListener('click', function(even){
        // Do this
       buttonClick(event.target.innerText);
       //InnerText means that the value on the buttons(exampe num 7) will be the value of the event
    })
}

init();