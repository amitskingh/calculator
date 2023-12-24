// Balanced Paranthesis Class
export class BalanceParanthesis {
  // Function to check if brackets are balanced or not.
  isbalanced(y) {
    let len = y.length;
    const stack = [],
      x = [];

    for (let i = 0; i < len; i++) {
      if (this.isBracket(y[i])) {
        x.push(y[i]);
      }
    }

    len = x.length;

    for (let i = 0; i < len; i++) {
      if (x[i] === "{" || x[i] === "[" || x[i] === "(") {
        stack.push(x[i]);
      } else if (stack.length !== 0) {
        if (
          (stack[stack.length - 1] === "{" && x[i] === "}") ||
          (stack[stack.length - 1] === "[" && x[i] === "]") ||
          (stack[stack.length - 1] === "(" && x[i] === ")")
        ) {
          stack.pop();
        } else {
          return false;
        }
      } else if (x[i] === "}" || x[i] === "]" || x[i] === ")") {
        return false;
      }
    }

    return stack.length === 0;
  }

  isBracket(c) {
    return ["(", ")"].includes(c);
  }
}
