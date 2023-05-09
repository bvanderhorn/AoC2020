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
var evaluateAddFirst = (expression:string) : number => {
    var newExpression = expression + "";
    while (newExpression.includes('+')) newExpression = newExpression.replace(/(\d+) \+ (\d+)/g, (_, p1, p2) => (+p1 + +p2) + "");
    return evaluateLR(newExpression);
}
var evaluate = (expression:string, part: number) : number => {
    var newExpression = expression + "";
    var func = part == 1 ? evaluateLR : evaluateAddFirst;
    while (newExpression.includes('(')) newExpression = newExpression.replace(/\(([^()]+)\)/g, (_, p1) => func(p1) + "");
    return func(newExpression);
}

h.print("part 1:", expressions.map(x => evaluate(x, 1)).sum());
h.print("part 2:", expressions.map(x => evaluate(x, 2)).sum());