"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IWorker_1 = require("./IWorker");
function find(xs, pred) {
    var found = undefined;
    for (var i = 0, l = xs.length; !found && i < l; i++) {
        found = pred(xs[i]) ? xs[i] : found;
    }
    return found;
}
function remove(xs, x) {
    var ys = [];
    for (var i = 0, l = xs.length; i < l; ++i) {
        if (x != xs[i]) {
            ys.push(xs[i]);
        }
    }
    return ys;
}
var Factory = /** @class */ (function () {
    function Factory(workers) {
        this._tasks = [];
        this._workers = workers;
    }
    Factory.prototype._loop = function () {
        var idleWorkers = this._workers.filter(function (worker) { return IWorker_1.WORKER_STATUS.IDLE == worker.getStatus(); });
        var nextloopTasks = [];
        while (this._tasks.length > 0
            && idleWorkers.length > 0) {
            var task = this.dequeue();
            if (undefined != task) {
                var worker = find(idleWorkers, task.isCandidateWorker);
                if (undefined == worker) {
                    // no available worker, so enqueqe again.
                    nextloopTasks.push(task);
                }
                else {
                    idleWorkers = remove(idleWorkers, worker);
                    task.run(worker);
                }
            }
        }
        if (nextloopTasks.length > 0) {
            this._tasks = this._tasks.concat(nextloopTasks);
            this._loopDescriptor = setTimeout(this._loop.bind(this), 800);
        }
    };
    Factory.prototype.enqueue = function (task) {
        this._tasks.push(task);
        if (undefined != this._loopDescriptor) {
            clearTimeout(this._loopDescriptor);
        }
        this._loopDescriptor = setTimeout(this._loop.bind(this), 0);
    };
    Factory.prototype.dequeue = function () {
        return this._tasks.shift();
    };
    return Factory;
}());
exports.default = Factory;
