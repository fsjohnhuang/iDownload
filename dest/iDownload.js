"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var XHRWorker_1 = __importDefault(require("./XHRWorker"));
var DownloadTask_1 = __importDefault(require("./DownloadTask"));
var Factory_1 = __importDefault(require("./Factory"));
function iDownload(recruitment) {
    var workers = [];
    for (var i = 0; i < recruitment; i++) {
        workers.push(new XHRWorker_1.default());
    }
    var factory = new Factory_1.default(workers);
    return function (urls) {
        urls.forEach(function (url) {
            if (!/^\s*$/.test(url)) {
                factory.enqueue(new DownloadTask_1.default(url));
            }
        });
    };
}
exports.default = iDownload;
