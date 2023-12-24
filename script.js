import * as main from "./main-functions.js";

let input = document.querySelector(".input");
let output = document.querySelector(".output");
const operators = document.querySelectorAll(".operator");
const num = document.querySelectorAll(".number");
const clear = document.querySelector(".clear");
const remove = document.querySelector(".remove");
const equal = document.querySelector(".equal");
const brackets = document.querySelectorAll(".brackets");
const decimal = document.querySelector(".decimal");
const negative = document.querySelector(".negative");

/***********Mouse Click Events***************/

brackets.forEach((bracket) => {
  bracket.addEventListener("click", () => main.Brackets(bracket.classList[1]));
});

num.forEach((number) => {
  number.addEventListener("click", () => main.Operands(number.classList[1]));
});

operators.forEach((operator) => {
  operator.addEventListener("click", () =>
    main.Operators(operator.classList[1])
  );
});

decimal.addEventListener("click", () => main.Decimal());
clear.addEventListener("click", () => main.Clear());
remove.addEventListener("click", () => main.Remove());
equal.addEventListener("click", () => main.Evaluate());

/**********Keyboard Key-Events ************/
const allowedNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
const allowedPeriod = ["."];
const allowedOperators = ["+", "-", "*", "/"];
const allowedBrackets = ["(", ")"];
const specialKeys = ["Enter", "Backspace"];

document.addEventListener("keydown", function (event) {
  let key = event.key;
  if (allowedNumbers.includes(key)) {
    main.Operands(key);
    console.log("Number pressed:", key);
  } else if (allowedOperators.includes(key)) {
    if (key === "*") {
      key = "×";
    } else if (key === "/") {
      key = "÷";
    }
    main.Operators(key);
    console.log("Operator pressed:", key);
  } else if (allowedBrackets.includes(key)) {
    main.Brackets(key);
    console.log("Bracket pressed:", key);
  } else if (allowedPeriod.includes(key)) {
    main.Decimal(key);
  } else if (specialKeys.includes(key)) {
    if (key == "Enter") {
      main.Evaluate();
    } else {
      main.Remove();
    }
  }
});

/*********Exporting the objects************/
export default { input, output };
