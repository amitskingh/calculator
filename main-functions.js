import { ExpressionEvaluator } from "./algorithm.js";
import { BalanceParanthesis } from "./balance-paranthesis.js";
import obj from "./script.js";

let stack = [];

function fill() {
  let str = "";
  for (let i = 0; i < stack.length; i++) {
    str = str + stack[i];
  }
  console.log(str);
  console.log(stack);
  return str;
}

function isOperator(c) {
  return ["+", "-", "×", "÷", "^"].includes(c);
}

export function makeNegative() {
  stack.push("(");
  stack.push("-");
}

export function Operands(number) {
  if (stack.length === 0) {
    stack.push(parseFloat(number));
  } else {
    let top = stack.pop().toString();
    console.log("top:", top, "num:", number);
    // handling multiple insertion of 0
    if (top === "0" && number === "0") {
      return;
    }

    // checking if number to set negative allowed for the cur number
    if (top === "-" && stack[stack.length - 1] === "(") {
      top = top + number;
      // handaling the insertion of -0
      if (parseFloat(top) !== 0) {
        stack.push(parseFloat(top));
      } else {
        stack.push(top);
      }
    } else if (isNaN(top) === false) {
      top = top + number;
      stack.push(parseFloat(top));
    } else {
      stack.push(top);
      if (isOperator(top) || top === "(") {
        stack.push(parseFloat(number));
      }
    }
  }
  obj.input.innerHTML = fill();
}

export function Operators(operator) {
  if (stack.length === 0) {
    // handaling the negative number
    if (operator === "-") {
      makeNegative();
    }
  } else {
    let top = stack.pop().toString();

    // handaling the negative number
    if (top === "(" && operator === "-") {
      makeNegative();
      obj.input.innerHTML = fill();

      return;
    }

    // handaling the negative number to avoid twice insertion of arithmetic -
    if (isOperator(top)) {
      if (stack[stack.length - 1] === "(" && top === "-") {
        stack.push(top);
      } else {
        stack.push(operator);
      }
    } else if (top === ")" || isNaN(top) === false) {
      if (top[top.length - 1] === "." || isNaN(top) === false) {
        top = parseFloat(top);
      }
      stack.push(top);
      stack.push(operator);
    } else {
      stack.push(top);
    }
  }
  obj.input.innerHTML = fill();
}

export function Brackets(bracket) {
  stack.push(bracket);
  obj.input.innerHTML = fill();
}

export function Decimal() {
  if (stack.length === 0) {
    stack.push("0.");
  } else {
    let top = stack.pop().toString();
    if (isNaN(top) === false && !top.includes(".")) {
      top = top + ".";
      stack.push(top);
    } else {
      stack.push(top);
    }
  }
  obj.input.innerHTML = fill();
}

export function Remove() {
  if (stack.length !== 0) {
    let top = stack.pop().toString();
    top = top.slice(0, -1);
    if (top.length !== 0) {
      // Avoiding it to neglect the 1. to get convert into 1
      // if (isNaN(top) === false) {
      //   top = parseFloat(top);
      // }
      stack.push(top);
    }
  }

  obj.output.innerHTML = "";
  obj.input.innerHTML = fill();
}

export function Evaluate() {
  const checkBalance = new BalanceParanthesis();

  if (checkBalance.isbalanced(stack) === true) {
    const infixExpression = stack;
    const expressionEvaluator = new ExpressionEvaluator();
    let res = expressionEvaluator.evaluate(infixExpression);

    console.log("Ans : ", res);
    console.log("final Array : ", stack);

    if (res === "Infinite") {
      obj.output.innerHTML = `Can't divide by zero`;
      return;
    }

    if (isNaN(res)) {
      obj.output.innerText = "Invalid Format";
      return;
    }

    obj.output.innerHTML = parseFloat(res).toLocaleString();
  } else if (stack.length > 0) {
    obj.output.innerText = "Invalid";
  }
}

export function Clear() {
  obj.input.innerText = "";
  obj.output.innerText = "";

  stack = [];
}
