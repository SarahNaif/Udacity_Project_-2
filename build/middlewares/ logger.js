"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function logger(req, res, next) {
    console.log("".concat(req.method, " ").concat(req.path));
    next();
}
exports.default = logger;
