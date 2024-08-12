let a = '';
let b = '';
let operator = '';
let decimalAdded = false;
let equaled = false; // this exists pretty much just to be able to start typiong in a number after you press equals and not concatonate to the result, while also allowing you to press an operator instead of a number to use the previous result as a.
let operated = false;

const numberButtons = document.querySelectorAll('.btn-number');

const operatorButtons = document.querySelectorAll('.btn-operator');

const equals = document.querySelector('.btn-equals');

const decimal = document.querySelector('.btn-decimal');

const clear = document.querySelector('.btn-clear');

const backspace = document.querySelector('.btn-backspace');

const display = document.getElementById('display');

document.addEventListener('keydown', function(event) {
    if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
    }
    
    const key = event.key;

    if (!isNaN(key)) {
        document.getElementById(key).click();
    }

    if (key === '+') {
        document.getElementById('add').click();
    } else if (key === '-') {
        document.getElementById('subtract').click();
    } else if (key === '*') {
        document.getElementById('multiply').click();
    } else if (key === '/') {
        document.getElementById('divide').click();
    } else if (key === '.') {
        document.getElementById('decimal').click();
    } else if (key === 'Enter' || key === '=') {
        document.getElementById('equals').click();
    } else if (key === 'Backspace') {
        document.getElementById('backspace').click();
    } else if (key.toLowerCase() === 'c') {
        document.getElementById('clear').click();
    }
});

numberButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        if (equaled) {
            a = '';
            b = '';
            operator = '';
            operated = false;
            decimalAdded = false;
            equaled = false;
        }
        
        if (operator === '' && operated == false) {
            a += this.textContent;
            display.textContent = a;
        } else {
            b += this.textContent;
            display.textContent = b;
        }
    });
});

decimal.addEventListener('click', function() {
    if (operator === '' && !decimalAdded) {
        a += '.';
        display.textContent = a;
        decimalAdded = true;
        equaled = false;
    } else if (operator !== '' && !decimalAdded) {
        b += '.';
        display.textContent = b;
        decimalAdded = true;
        equaled = false;
    }
    
    // fix the ability to differentiate begween a and b, as right bow when i add two decimals after equating a function, it doesnt work be aise i think the operator is actually assigned when i try to add a decimal point to the result
});

operatorButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        if (equaled) {
            equaled = false;
        }
        
        if (a !== '' && b === '') {
            operator = this.textContent;
            display.textContent = operator;
            decimalAdded = false;
        } else if (a !== '' && b !== '') {
            const result = operate(Number(a), Number(b), operator);
            if (typeof result === 'string') {
                display.textContent = result;
            } else {
                display.textContent = Number(result.toFixed(9));
                a = result.toString();
            }
            b = '';
            operator = this.textContent;
            operated = true;
            decimalAdded = false;
        }
    });
});

equals.addEventListener('click', function() {
    if (a !== '' && b !== '') {
        const result = operate(Number(a), Number(b), operator);
        if (typeof result === 'string') {
            display.textContent = result;
        } else {
            display.textContent = Number(result.toFixed(9));
            a = result.toString();
        }  
        b = '';                 
        operator = '';
        operated = false;
        decimalAdded = false;
        equaled = true;
    } else if (a !== '' && b === '') {
        display.textContent = a;
    } else if (a === '') {
        display.textContent = 0;
    }
});

let operate = function (a, b, operator) {
    if (operator === '+') {
        return a + b
    } else if (operator === '-') {
        return a - b
    } else if (operator === 'X') {
        return a * b
    } else if (operator === '/' && b !== 0) {
        return a / b
    } else if (operator === '/' && b === 0) {
        return "Uh Uh! You can't divide by zero!";
    }
};

clear.addEventListener('click', function() {
    a = '';
    b = '';
    operator = '';
    decimalAdded = false;
    operated = false;
    equaled = false;
    display.textContent = 0;
});

backspace.addEventListener('click', function() {
    if (operator === '') {
        if (a.slice(-1) === '.') {
            decimalAdded = false;
        }
        a = a.slice(0, -1);
        display.textContent = a || 0;
    } else if (operator !== '') {
        if (b.slice(-1) === '.') {
            decimalAdded = false;
        }
        b = b.slice(0, -1);
        display.textContent = b || 0;
    }
});

document.addEventListener('click', function(event) {
    if (event.target.tagName === 'BUTTON') {
        event.target.blur();
    }
});