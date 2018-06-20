"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ITask_1 = require("./ITask");
var IframeWorker_1 = __importDefault(require("./IframeWorker"));
var XHRWorker_1 = __importDefault(require("./XHRWorker"));
var DownloadTask = /** @class */ (function () {
    function DownloadTask(payload) {
        this._status = ITask_1.TASK_STATUS.PENDING;
        this._payload = payload;
        this._createdAt = new Date();
    }
    DownloadTask.prototype.getPayload = function () {
        return this._payload;
    };
    DownloadTask.prototype.getStatus = function () {
        return this._status;
    };
    DownloadTask.prototype.isCandidateWorker = function (worker) {
        if ("undefined" == typeof Blob) {
            // for IE9
            return worker instanceof IframeWorker_1.default;
        }
        else {
            // for IE10+, Chrome
            return worker instanceof XHRWorker_1.default;
        }
    };
    DownloadTask.prototype.run = function (worker, callback) {
        var _this = this;
        worker.execute(this, function (error) {
            _this._status = undefined == error ? ITask_1.TASK_STATUS.FULFILL : ITask_1.TASK_STATUS.REJECT;
            _this._updatedAt = new Date();
            if (undefined != callback) {
                callback(error);
            }
        });
    };
    DownloadTask.prototype.getCreatedAt = function () {
        return this._createdAt;
    };
    DownloadTask.prototype.getUpdatedAt = function () {
        return this._updatedAt;
    };
    return DownloadTask;
}());
exports.default = DownloadTask;
