"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IWorker_1 = require("./IWorker");
var XHRWorker = /** @class */ (function () {
    function XHRWorker() {
        this._status = IWorker_1.WORKER_STATUS.PENDING;
        this._inst = new XMLHttpRequest();
    }
    XHRWorker.prototype.getStatus = function () {
        return this._status;
    };
    XHRWorker.prototype.execute = function (task, callback) {
        var _this = this;
        this._status = IWorker_1.WORKER_STATUS.PENDING;
        var url = task.getPayload();
        this._inst.open("GET", url);
        this._inst.responseType = "blob";
        this._inst.onload = function (_) {
            var error = undefined;
            if (200 == _this._inst.status) {
                try {
                    var fileName = url.split("/").pop();
                    if (undefined != navigator.msSaveOrOpenBlob) {
                        // for IE10+
                        navigator.msSaveOrOpenBlob(_this._inst.response, fileName);
                    }
                    else {
                        // for Chrome
                        var blobURL_1 = URL.createObjectURL(_this._inst.response);
                        _this._anchor = _this._anchor || document.createElement("a");
                        _this._anchor.href = blobURL_1;
                        _this._anchor.setAttribute("download", fileName);
                        _this._anchor.click();
                        setTimeout(function () {
                            URL.revokeObjectURL(blobURL_1);
                        }, 0);
                    }
                }
                catch (e) {
                    error = e;
                }
            }
            else {
                error = _this._inst.status;
            }
            _this.dispose();
            if (undefined != callback) {
                callback(error);
            }
        };
        this._inst.send();
    };
    XHRWorker.prototype.dispose = function () {
        this._status = IWorker_1.WORKER_STATUS.IDLE;
    };
    return XHRWorker;
}());
exports.default = XHRWorker;
