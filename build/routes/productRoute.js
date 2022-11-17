"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var products_1 = require("../handlers/products");
var verifyAuthToken_1 = __importDefault(require("../middlewares/verifyAuthToken"));
var routes = (0, express_1.Router)();
routes.get("/products", products_1.index);
routes.get("/products/category", products_1.category);
routes.get("/products/:id", products_1.show);
routes.post("/products", verifyAuthToken_1.default, products_1.create);
routes.put("/products/:id", verifyAuthToken_1.default, products_1.update);
routes.delete("/products/:id", verifyAuthToken_1.default, products_1.destroy);
exports.default = routes;
