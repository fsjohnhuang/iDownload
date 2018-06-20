(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["iDownload"] = factory();
	else
		root["iDownload"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/iDownload.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/DownloadTask.ts":
/*!*****************************!*\
  !*** ./src/DownloadTask.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ITask_1 = __webpack_require__(/*! ./ITask */ "./src/ITask.ts");
var IframeWorker_1 = __importDefault(__webpack_require__(/*! ./IframeWorker */ "./src/IframeWorker.ts"));
var XHRWorker_1 = __importDefault(__webpack_require__(/*! ./XHRWorker */ "./src/XHRWorker.ts"));
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


/***/ }),

/***/ "./src/Factory.ts":
/*!************************!*\
  !*** ./src/Factory.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var IWorker_1 = __webpack_require__(/*! ./IWorker */ "./src/IWorker.ts");
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
        if (nextloopTasks.length > 0 || this._tasks.length > 0) {
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


/***/ }),

/***/ "./src/ITask.ts":
/*!**********************!*\
  !*** ./src/ITask.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TASK_STATUS;
(function (TASK_STATUS) {
    TASK_STATUS[TASK_STATUS["PENDING"] = 0] = "PENDING";
    TASK_STATUS[TASK_STATUS["FULFILL"] = 1] = "FULFILL";
    TASK_STATUS[TASK_STATUS["REJECT"] = 2] = "REJECT";
})(TASK_STATUS = exports.TASK_STATUS || (exports.TASK_STATUS = {}));


/***/ }),

/***/ "./src/IWorker.ts":
/*!************************!*\
  !*** ./src/IWorker.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var WORKER_STATUS;
(function (WORKER_STATUS) {
    WORKER_STATUS[WORKER_STATUS["IDLE"] = 0] = "IDLE";
    WORKER_STATUS[WORKER_STATUS["PENDING"] = 1] = "PENDING";
})(WORKER_STATUS = exports.WORKER_STATUS || (exports.WORKER_STATUS = {}));


/***/ }),

/***/ "./src/IframeWorker.ts":
/*!*****************************!*\
  !*** ./src/IframeWorker.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var IframeWorker = /** @class */ (function () {
    function IframeWorker() {
    }
    return IframeWorker;
}());
exports.default = IframeWorker;


/***/ }),

/***/ "./src/XHRWorker.ts":
/*!**************************!*\
  !*** ./src/XHRWorker.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var IWorker_1 = __webpack_require__(/*! ./IWorker */ "./src/IWorker.ts");
var XHRWorker = /** @class */ (function () {
    function XHRWorker() {
        this._status = IWorker_1.WORKER_STATUS.IDLE;
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


/***/ }),

/***/ "./src/iDownload.ts":
/*!**************************!*\
  !*** ./src/iDownload.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var XHRWorker_1 = __importDefault(__webpack_require__(/*! ./XHRWorker */ "./src/XHRWorker.ts"));
var DownloadTask_1 = __importDefault(__webpack_require__(/*! ./DownloadTask */ "./src/DownloadTask.ts"));
var Factory_1 = __importDefault(__webpack_require__(/*! ./Factory */ "./src/Factory.ts"));
function create(recruitment) {
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
exports.create = create;


/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9pRG93bmxvYWQvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL2lEb3dubG9hZC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9pRG93bmxvYWQvLi9zcmMvRG93bmxvYWRUYXNrLnRzIiwid2VicGFjazovL2lEb3dubG9hZC8uL3NyYy9GYWN0b3J5LnRzIiwid2VicGFjazovL2lEb3dubG9hZC8uL3NyYy9JVGFzay50cyIsIndlYnBhY2s6Ly9pRG93bmxvYWQvLi9zcmMvSVdvcmtlci50cyIsIndlYnBhY2s6Ly9pRG93bmxvYWQvLi9zcmMvSWZyYW1lV29ya2VyLnRzIiwid2VicGFjazovL2lEb3dubG9hZC8uL3NyYy9YSFJXb3JrZXIudHMiLCJ3ZWJwYWNrOi8vaURvd25sb2FkLy4vc3JjL2lEb3dubG9hZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBO0FBQ0EsNENBQTRDO0FBQzVDO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7QUNoREE7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MsaUJBQWlCO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyxPQUFPO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtFQUFrRSwyREFBMkQsRUFBRTtBQUMvSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEOzs7Ozs7Ozs7Ozs7O0FDM0RBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsZ0VBQWdFOzs7Ozs7Ozs7Ozs7O0FDUGpFO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLHNFQUFzRTs7Ozs7Ozs7Ozs7OztBQ052RTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEOzs7Ozs7Ozs7Ozs7O0FDUEE7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDs7Ozs7Ozs7Ozs7OztBQ3pEQTtBQUNBO0FBQ0EsNENBQTRDO0FBQzVDO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixpQkFBaUI7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EiLCJmaWxlIjoiaURvd25sb2FkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiaURvd25sb2FkXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImlEb3dubG9hZFwiXSA9IGZhY3RvcnkoKTtcbn0pKHdpbmRvdywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaURvd25sb2FkLnRzXCIpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgSVRhc2tfMSA9IHJlcXVpcmUoXCIuL0lUYXNrXCIpO1xudmFyIElmcmFtZVdvcmtlcl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL0lmcmFtZVdvcmtlclwiKSk7XG52YXIgWEhSV29ya2VyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vWEhSV29ya2VyXCIpKTtcbnZhciBEb3dubG9hZFRhc2sgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRG93bmxvYWRUYXNrKHBheWxvYWQpIHtcbiAgICAgICAgdGhpcy5fc3RhdHVzID0gSVRhc2tfMS5UQVNLX1NUQVRVUy5QRU5ESU5HO1xuICAgICAgICB0aGlzLl9wYXlsb2FkID0gcGF5bG9hZDtcbiAgICAgICAgdGhpcy5fY3JlYXRlZEF0ID0gbmV3IERhdGUoKTtcbiAgICB9XG4gICAgRG93bmxvYWRUYXNrLnByb3RvdHlwZS5nZXRQYXlsb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGF5bG9hZDtcbiAgICB9O1xuICAgIERvd25sb2FkVGFzay5wcm90b3R5cGUuZ2V0U3RhdHVzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3RhdHVzO1xuICAgIH07XG4gICAgRG93bmxvYWRUYXNrLnByb3RvdHlwZS5pc0NhbmRpZGF0ZVdvcmtlciA9IGZ1bmN0aW9uICh3b3JrZXIpIHtcbiAgICAgICAgaWYgKFwidW5kZWZpbmVkXCIgPT0gdHlwZW9mIEJsb2IpIHtcbiAgICAgICAgICAgIC8vIGZvciBJRTlcbiAgICAgICAgICAgIHJldHVybiB3b3JrZXIgaW5zdGFuY2VvZiBJZnJhbWVXb3JrZXJfMS5kZWZhdWx0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gZm9yIElFMTArLCBDaHJvbWVcbiAgICAgICAgICAgIHJldHVybiB3b3JrZXIgaW5zdGFuY2VvZiBYSFJXb3JrZXJfMS5kZWZhdWx0O1xuICAgICAgICB9XG4gICAgfTtcbiAgICBEb3dubG9hZFRhc2sucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICh3b3JrZXIsIGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHdvcmtlci5leGVjdXRlKHRoaXMsIGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgX3RoaXMuX3N0YXR1cyA9IHVuZGVmaW5lZCA9PSBlcnJvciA/IElUYXNrXzEuVEFTS19TVEFUVVMuRlVMRklMTCA6IElUYXNrXzEuVEFTS19TVEFUVVMuUkVKRUNUO1xuICAgICAgICAgICAgX3RoaXMuX3VwZGF0ZWRBdCA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICBpZiAodW5kZWZpbmVkICE9IGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIERvd25sb2FkVGFzay5wcm90b3R5cGUuZ2V0Q3JlYXRlZEF0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY3JlYXRlZEF0O1xuICAgIH07XG4gICAgRG93bmxvYWRUYXNrLnByb3RvdHlwZS5nZXRVcGRhdGVkQXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl91cGRhdGVkQXQ7XG4gICAgfTtcbiAgICByZXR1cm4gRG93bmxvYWRUYXNrO1xufSgpKTtcbmV4cG9ydHMuZGVmYXVsdCA9IERvd25sb2FkVGFzaztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIElXb3JrZXJfMSA9IHJlcXVpcmUoXCIuL0lXb3JrZXJcIik7XG5mdW5jdGlvbiBmaW5kKHhzLCBwcmVkKSB7XG4gICAgdmFyIGZvdW5kID0gdW5kZWZpbmVkO1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0geHMubGVuZ3RoOyAhZm91bmQgJiYgaSA8IGw7IGkrKykge1xuICAgICAgICBmb3VuZCA9IHByZWQoeHNbaV0pID8geHNbaV0gOiBmb3VuZDtcbiAgICB9XG4gICAgcmV0dXJuIGZvdW5kO1xufVxuZnVuY3Rpb24gcmVtb3ZlKHhzLCB4KSB7XG4gICAgdmFyIHlzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSB4cy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICAgICAgaWYgKHggIT0geHNbaV0pIHtcbiAgICAgICAgICAgIHlzLnB1c2goeHNbaV0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB5cztcbn1cbnZhciBGYWN0b3J5ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEZhY3Rvcnkod29ya2Vycykge1xuICAgICAgICB0aGlzLl90YXNrcyA9IFtdO1xuICAgICAgICB0aGlzLl93b3JrZXJzID0gd29ya2VycztcbiAgICB9XG4gICAgRmFjdG9yeS5wcm90b3R5cGUuX2xvb3AgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBpZGxlV29ya2VycyA9IHRoaXMuX3dvcmtlcnMuZmlsdGVyKGZ1bmN0aW9uICh3b3JrZXIpIHsgcmV0dXJuIElXb3JrZXJfMS5XT1JLRVJfU1RBVFVTLklETEUgPT0gd29ya2VyLmdldFN0YXR1cygpOyB9KTtcbiAgICAgICAgdmFyIG5leHRsb29wVGFza3MgPSBbXTtcbiAgICAgICAgd2hpbGUgKHRoaXMuX3Rhc2tzLmxlbmd0aCA+IDBcbiAgICAgICAgICAgICYmIGlkbGVXb3JrZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHZhciB0YXNrID0gdGhpcy5kZXF1ZXVlKCk7XG4gICAgICAgICAgICBpZiAodW5kZWZpbmVkICE9IHRhc2spIHtcbiAgICAgICAgICAgICAgICB2YXIgd29ya2VyID0gZmluZChpZGxlV29ya2VycywgdGFzay5pc0NhbmRpZGF0ZVdvcmtlcik7XG4gICAgICAgICAgICAgICAgaWYgKHVuZGVmaW5lZCA9PSB3b3JrZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gbm8gYXZhaWxhYmxlIHdvcmtlciwgc28gZW5xdWVxZSBhZ2Fpbi5cbiAgICAgICAgICAgICAgICAgICAgbmV4dGxvb3BUYXNrcy5wdXNoKHRhc2spO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWRsZVdvcmtlcnMgPSByZW1vdmUoaWRsZVdvcmtlcnMsIHdvcmtlcik7XG4gICAgICAgICAgICAgICAgICAgIHRhc2sucnVuKHdvcmtlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChuZXh0bG9vcFRhc2tzLmxlbmd0aCA+IDAgfHwgdGhpcy5fdGFza3MubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5fdGFza3MgPSB0aGlzLl90YXNrcy5jb25jYXQobmV4dGxvb3BUYXNrcyk7XG4gICAgICAgICAgICB0aGlzLl9sb29wRGVzY3JpcHRvciA9IHNldFRpbWVvdXQodGhpcy5fbG9vcC5iaW5kKHRoaXMpLCA4MDApO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBGYWN0b3J5LnByb3RvdHlwZS5lbnF1ZXVlID0gZnVuY3Rpb24gKHRhc2spIHtcbiAgICAgICAgdGhpcy5fdGFza3MucHVzaCh0YXNrKTtcbiAgICAgICAgaWYgKHVuZGVmaW5lZCAhPSB0aGlzLl9sb29wRGVzY3JpcHRvcikge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX2xvb3BEZXNjcmlwdG9yKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9sb29wRGVzY3JpcHRvciA9IHNldFRpbWVvdXQodGhpcy5fbG9vcC5iaW5kKHRoaXMpLCAwKTtcbiAgICB9O1xuICAgIEZhY3RvcnkucHJvdG90eXBlLmRlcXVldWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90YXNrcy5zaGlmdCgpO1xuICAgIH07XG4gICAgcmV0dXJuIEZhY3Rvcnk7XG59KCkpO1xuZXhwb3J0cy5kZWZhdWx0ID0gRmFjdG9yeTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIFRBU0tfU1RBVFVTO1xuKGZ1bmN0aW9uIChUQVNLX1NUQVRVUykge1xuICAgIFRBU0tfU1RBVFVTW1RBU0tfU1RBVFVTW1wiUEVORElOR1wiXSA9IDBdID0gXCJQRU5ESU5HXCI7XG4gICAgVEFTS19TVEFUVVNbVEFTS19TVEFUVVNbXCJGVUxGSUxMXCJdID0gMV0gPSBcIkZVTEZJTExcIjtcbiAgICBUQVNLX1NUQVRVU1tUQVNLX1NUQVRVU1tcIlJFSkVDVFwiXSA9IDJdID0gXCJSRUpFQ1RcIjtcbn0pKFRBU0tfU1RBVFVTID0gZXhwb3J0cy5UQVNLX1NUQVRVUyB8fCAoZXhwb3J0cy5UQVNLX1NUQVRVUyA9IHt9KSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBXT1JLRVJfU1RBVFVTO1xuKGZ1bmN0aW9uIChXT1JLRVJfU1RBVFVTKSB7XG4gICAgV09SS0VSX1NUQVRVU1tXT1JLRVJfU1RBVFVTW1wiSURMRVwiXSA9IDBdID0gXCJJRExFXCI7XG4gICAgV09SS0VSX1NUQVRVU1tXT1JLRVJfU1RBVFVTW1wiUEVORElOR1wiXSA9IDFdID0gXCJQRU5ESU5HXCI7XG59KShXT1JLRVJfU1RBVFVTID0gZXhwb3J0cy5XT1JLRVJfU1RBVFVTIHx8IChleHBvcnRzLldPUktFUl9TVEFUVVMgPSB7fSkpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgSWZyYW1lV29ya2VyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIElmcmFtZVdvcmtlcigpIHtcbiAgICB9XG4gICAgcmV0dXJuIElmcmFtZVdvcmtlcjtcbn0oKSk7XG5leHBvcnRzLmRlZmF1bHQgPSBJZnJhbWVXb3JrZXI7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBJV29ya2VyXzEgPSByZXF1aXJlKFwiLi9JV29ya2VyXCIpO1xudmFyIFhIUldvcmtlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBYSFJXb3JrZXIoKSB7XG4gICAgICAgIHRoaXMuX3N0YXR1cyA9IElXb3JrZXJfMS5XT1JLRVJfU1RBVFVTLklETEU7XG4gICAgICAgIHRoaXMuX2luc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICB9XG4gICAgWEhSV29ya2VyLnByb3RvdHlwZS5nZXRTdGF0dXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdGF0dXM7XG4gICAgfTtcbiAgICBYSFJXb3JrZXIucHJvdG90eXBlLmV4ZWN1dGUgPSBmdW5jdGlvbiAodGFzaywgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5fc3RhdHVzID0gSVdvcmtlcl8xLldPUktFUl9TVEFUVVMuUEVORElORztcbiAgICAgICAgdmFyIHVybCA9IHRhc2suZ2V0UGF5bG9hZCgpO1xuICAgICAgICB0aGlzLl9pbnN0Lm9wZW4oXCJHRVRcIiwgdXJsKTtcbiAgICAgICAgdGhpcy5faW5zdC5yZXNwb25zZVR5cGUgPSBcImJsb2JcIjtcbiAgICAgICAgdGhpcy5faW5zdC5vbmxvYWQgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICAgICAgdmFyIGVycm9yID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgaWYgKDIwMCA9PSBfdGhpcy5faW5zdC5zdGF0dXMpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZmlsZU5hbWUgPSB1cmwuc3BsaXQoXCIvXCIpLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodW5kZWZpbmVkICE9IG5hdmlnYXRvci5tc1NhdmVPck9wZW5CbG9iKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBmb3IgSUUxMCtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hdmlnYXRvci5tc1NhdmVPck9wZW5CbG9iKF90aGlzLl9pbnN0LnJlc3BvbnNlLCBmaWxlTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBmb3IgQ2hyb21lXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYmxvYlVSTF8xID0gVVJMLmNyZWF0ZU9iamVjdFVSTChfdGhpcy5faW5zdC5yZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fYW5jaG9yID0gX3RoaXMuX2FuY2hvciB8fCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl9hbmNob3IuaHJlZiA9IGJsb2JVUkxfMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl9hbmNob3Iuc2V0QXR0cmlidXRlKFwiZG93bmxvYWRcIiwgZmlsZU5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuX2FuY2hvci5jbGljaygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVVJMLnJldm9rZU9iamVjdFVSTChibG9iVVJMXzEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IgPSBlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGVycm9yID0gX3RoaXMuX2luc3Quc3RhdHVzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX3RoaXMuZGlzcG9zZSgpO1xuICAgICAgICAgICAgaWYgKHVuZGVmaW5lZCAhPSBjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5faW5zdC5zZW5kKCk7XG4gICAgfTtcbiAgICBYSFJXb3JrZXIucHJvdG90eXBlLmRpc3Bvc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX3N0YXR1cyA9IElXb3JrZXJfMS5XT1JLRVJfU1RBVFVTLklETEU7XG4gICAgfTtcbiAgICByZXR1cm4gWEhSV29ya2VyO1xufSgpKTtcbmV4cG9ydHMuZGVmYXVsdCA9IFhIUldvcmtlcjtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIFhIUldvcmtlcl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL1hIUldvcmtlclwiKSk7XG52YXIgRG93bmxvYWRUYXNrXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vRG93bmxvYWRUYXNrXCIpKTtcbnZhciBGYWN0b3J5XzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vRmFjdG9yeVwiKSk7XG5mdW5jdGlvbiBjcmVhdGUocmVjcnVpdG1lbnQpIHtcbiAgICB2YXIgd29ya2VycyA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVjcnVpdG1lbnQ7IGkrKykge1xuICAgICAgICB3b3JrZXJzLnB1c2gobmV3IFhIUldvcmtlcl8xLmRlZmF1bHQoKSk7XG4gICAgfVxuICAgIHZhciBmYWN0b3J5ID0gbmV3IEZhY3RvcnlfMS5kZWZhdWx0KHdvcmtlcnMpO1xuICAgIHJldHVybiBmdW5jdGlvbiAodXJscykge1xuICAgICAgICB1cmxzLmZvckVhY2goZnVuY3Rpb24gKHVybCkge1xuICAgICAgICAgICAgaWYgKCEvXlxccyokLy50ZXN0KHVybCkpIHtcbiAgICAgICAgICAgICAgICBmYWN0b3J5LmVucXVldWUobmV3IERvd25sb2FkVGFza18xLmRlZmF1bHQodXJsKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG59XG5leHBvcnRzLmNyZWF0ZSA9IGNyZWF0ZTtcbiJdLCJzb3VyY2VSb290IjoiIn0=