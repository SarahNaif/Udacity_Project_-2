"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var orders_1 = require("../handlers/orders");
var verifyAuthToken_1 = __importDefault(require("../middlewares/verifyAuthToken"));
var routes = (0, express_1.Router)();
routes.get("/orders", verifyAuthToken_1.default, orders_1.index);
routes.get("/orders/:id", verifyAuthToken_1.default, orders_1.show);
routes.post("/orders", verifyAuthToken_1.default, orders_1.create);
routes.put("/orders/:id", verifyAuthToken_1.default, orders_1.update);
routes.delete("/orders/:id", verifyAuthToken_1.default, orders_1.destroy);
routes.get("/orders/:id/users", verifyAuthToken_1.default, orders_1.showByUser);
routes.post("/orders/:id/products", verifyAuthToken_1.default, orders_1.addProduct);
exports.default = routes;
