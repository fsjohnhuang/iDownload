"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function find(xs, pred) {
    var found = undefined;
    for (var i = 0, l = xs.length; !found && i < l; i < l) {
        var x = xs[i];
        found = pred(x) ? x : found;
    }
    return found;
}
exports.find = find;
function curry(fn, thisBinding) {
    var _this = this;
    if (thisBinding === void 0) { thisBinding = null; }
    var expectedArgc = fn.length;
    var argv = [];
    var _fn = function () {
        var localArgv = Array.prototype.slice.call(_this.arguments);
        argv = argv.concat(localArgv);
        if (argv.length >= expectedArgc) {
            return fn.apply(null, argv.slice(0, expectedArgc));
        }
        else {
            return _fn;
        }
    };
}
exports.curry = curry;
function range(includedStart, excludedEnd, step) {
    if (step === void 0) { step = 1; }
    var xs = [];
    for (var i = includedStart, l = excludedEnd; i < l; i = i + step) {
        xs.push(i);
    }
    return xs;
}
exports.range = range;
