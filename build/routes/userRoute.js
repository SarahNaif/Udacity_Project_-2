"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var users_1 = require("../handlers/users");
var verifyAuthToken_1 = __importDefault(require("../middlewares/verifyAuthToken"));
var routes = (0, express_1.Router)();
routes.get('/users', verifyAuthToken_1.default, users_1.index);
routes.get('/users/:id', verifyAuthToken_1.default, users_1.show);
routes.post("/signin", users_1.authenticate);
routes.post('/register', users_1.create);
routes.put('/users/:id', verifyAuthToken_1.default, users_1.update);
routes.delete('/users/:id', verifyAuthToken_1.default, users_1.destroy);
exports.default = routes;
