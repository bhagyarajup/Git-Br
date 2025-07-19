import { LightningElement, track } from 'lwc';

export default class Calculator extends LightningElement {
    @track currentValue = '0';
    firstValue = null;
    operator = null;
    waitingForSecondValue = false;

    handleButtonClick(event) {
        const { value } = event.target;
        this.inputDigit(value);
    }

    inputDigit(digit) {
        const { currentValue, waitingForSecondValue } = this;

        if (waitingForSecondValue) {
            this.currentValue = digit;
            this.waitingForSecondValue = false;
        } else {
            this.currentValue = currentValue === '0' ? digit : currentValue + digit;
        }
    }

    handleOperator(nextOperator) {
        const { currentValue, firstValue, operator } = this;
        const inputValue = parseFloat(currentValue);

        if (firstValue === null) {
            this.firstValue = inputValue;
        } else if (operator) {
            const result = this.performCalculation(operator, firstValue, inputValue);
            this.currentValue = String(result);
            this.firstValue = result;
        }

        this.waitingForSecondValue = true;
        this.operator = nextOperator;
    }

    performCalculation(operator, firstValue, secondValue) {
        switch (operator) {
            case '+':
                return firstValue + secondValue;
            case '-':
                return firstValue - secondValue;
            case '*':
                return firstValue * secondValue;
            case '/':
                return firstValue / secondValue;
            default:
                return secondValue;
        }
    }

    resetCalculator() {
        this.currentValue = '0';
        this.firstValue = null;
        this.operator = null;
        this.waitingForSecondValue = false;
    }
}