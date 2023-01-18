// getting all element necessary

const digitsButton = document.querySelectorAll("[data-number]");
const operatorButton = document.querySelectorAll("[data-operator]");
const equalButton = document.querySelector("[data-equals]");
const clearAllButton = document.querySelector("[data-clear-everything]");
const clearButton = document.querySelector("[data-clear]");
const previousEl = document.querySelector("[data-previous]");
const currentEl = document.querySelector("[data-current]");

// defining a class element

class Calculator {
  constructor(previousEl, currentEl) {
    this.previousEl = previousEl;
    this.currentEl = currentEl;
    this.clear();
  }

  // declaring the functions
  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operator = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return; // this line prevents insertion of multiple "."
    this.currentOperand += number.toString();
  }

  selectOperator(operator) {
    if (this.currentOperand === "") return;
    if (this.currentOperand !== "") {
      this.compute();
    }
    this.operator = operator;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let computation;
    const previous = parseFloat(this.previousOperand); // converts the string into an integer
    const current = parseFloat(this.currentOperand); //.......

    if (isNaN(previous) || isNaN(current)) return;

    // Defining the operation of each operator
    switch (this.operator) {
      case "+":
        computation = previous + current;
        break;
      case "-":
        computation = previous - current;
        break;
      case "÷":
        computation = previous / current;
        break;
      case "*":
        computation = previous * current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operator = undefined;
    this.previousOperand = "";
  }

  //formatting the input to a standard EN.....
  formatDisplayDigits(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentEl.textContent = this.formatDisplayDigits(this.currentOperand);
    if (this.operator != null) {
      this.previousEl.textContent = `${this.formatDisplayDigits(
        this.previousOperand
      )} ${this.operator}`;
    } else {
      this.previousEl.textContent = "";
    }
  }
}

const calculator = new Calculator(previousEl, currentEl);

digitsButton.forEach((digit) => {
  digit.addEventListener("click", () => {
    calculator.appendNumber(digit.textContent);
    calculator.updateDisplay();
  });
});

operatorButton.forEach((operator) => {
  operator.addEventListener("click", () => {
    calculator.selectOperator(operator.textContent);
    calculator.updateDisplay();
  });
});

equalButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

clearAllButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});
clearButton.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});
