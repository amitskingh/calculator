export class ExpressionEvaluator {
  evaluate(exp) {
    const operands = [];
    const operations = [];

    for (let i = 0; i < exp.length; i++) {
      let c = exp[i];
      if (isNaN(c) === false) {
        operands.push(c);
      } else if (c === "(") {
        operations.push(c);
      } else if (c === ")") {
        while (operations[operations.length - 1] !== "(") {
          const output = this.performOperation(operands, operations);
          operands.push(output);
        }
        operations.pop();
      } else if (this.isOperator(c)) {
        while (
          operations.length > 0 &&
          this.precedence(c) <=
            this.precedence(operations[operations.length - 1])
        ) {
          const output = this.performOperation(operands, operations);
          operands.push(output);
        }
        operations.push(c);
      }
    }

    while (operations.length > 0) {
      const output = this.performOperation(operands, operations);
      operands.push(output);
    }

    return operands.pop();
  }

  isDigit(c) {
    return /^\d+$/.test(c);
  }

  precedence(c) {
    switch (c) {
      case "+":
      case "-":
        return 1;
      case "×":
      case "÷":
        return 2;
      case "^":
        return 3;
    }
    return -1;
  }

  performOperation(operands, operations) {
    const a = parseFloat(operands.pop());
    const b = parseFloat(operands.pop());
    const operation = operations.pop();

    switch (operation) {
      case "+":
        return a + b;
      case "-":
        return b - a;
      case "×":
        return b * a;
      case "÷":
        if (a === 0) {
          return "Infinite";
        }
        return b / a;
    }

    return 0;
  }

  isOperator(c) {
    return ["+", "-", "×", "÷", "^"].includes(c);
  }
}
