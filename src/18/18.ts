import * as h from '../helpers';
var expressions = h.read(18, "expressions.txt");
h.print(expressions.slice(0,3));
var evaluateLR = (expression:string) : number => {
    var parts = expression.split(' ');
    var result = +parts[0];
    for (var i = 1; i < parts.length; i += 2) {
        var op = parts[i];
        var num = +parts[i+1];
        (op == '+') ? result += num : result *= num;
    }
    return result;
}
var evaluate = (expression:string) : number => {
    var newExpression = expression + "";
    while (newExpression.includes('(')) newExpression = newExpression.replace(/\(([^()]+)\)/g, (_, p1) => evaluateLR(p1).toString());
    return evaluateLR(newExpression);
}

h.print("part 1:", expressions.map(evaluate).sum());
