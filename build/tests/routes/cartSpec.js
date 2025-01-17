"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var database_1 = __importDefault(require("../../database"));
var supertest_1 = __importDefault(require("supertest"));
var server_1 = __importDefault(require("../../server"));
var order_1 = require("../../models/order");
var product_1 = require("../../models/product");
var user_1 = require("../../models/user");
var cart_1 = require("../../models/cart");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var request = (0, supertest_1.default)(server_1.default);
var userStore = new user_1.UserStore();
var orderStore = new order_1.OrderStore();
var orderProductStore = new cart_1.OrdersProductsModel();
var productStore = new product_1.ProductStore();
var order_id;
var user_id;
var prod_id;
var OrderProd = {
    order_id: 1,
    product_id: 1,
    quantity: 10,
};
var token = jsonwebtoken_1.default.sign(OrderProd, process.env.TOKEN_SECRET);
describe("🚧 Order Product Endpoints  Test --------------- 🚧", function () {
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var connection;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database_1.default.connect()];
                case 1:
                    connection = _a.sent();
                    return [4 /*yield*/, connection.query("DELETE FROM orders_products;\n ALTER SEQUENCE orders_products_id_seq RESTART WITH 1;")];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.query("DELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;")];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, connection.query("DELETE FROM orders;\n ALTER SEQUENCE orders_id_seq RESTART WITH 1;")];
                case 4:
                    _a.sent();
                    connection.release();
                    return [2 /*return*/];
            }
        });
    }); });
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, prod, order;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userStore.create({
                        firstname: "Udacity",
                        lastname: "UD",
                        password: "udacity123",
                        email: "udacity@gmail.com",
                    })];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, productStore.create({
                            name: "macbook",
                            des: "macbook pro 16 inch",
                            image: "blah.png",
                            price: 0,
                            category: "tech",
                        })];
                case 2:
                    prod = _a.sent();
                    return [4 /*yield*/, orderStore.create({
                            status: "active",
                            user_id: "2",
                        })];
                case 3:
                    order = _a.sent();
                    user_id = user.id;
                    prod_id = prod.id;
                    return [2 /*return*/];
            }
        });
    }); });
    //   -------------------ROUTE---------------------
    it("test POST /orders/1/products", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.post("/orders/1/products").send({
                        order_id: 1,
                        product_id: 1,
                        quantity: 10,
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(401);
                    return [2 /*return*/];
            }
        });
    }); });
    it("test POST /orders/1/products", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .post("/orders/1/products")
                        .send({
                        order_id: 1,
                        product_id: 1,
                        quantity: 10,
                    })
                        .set("Authorization", "Bearer ".concat(token))];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    //   -------------------END---------------------
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var connection, sql;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database_1.default.connect()];
                case 1:
                    connection = _a.sent();
                    sql = "\n            DELETE FROM orders_products;\n ALTER SEQUENCE orders_products_id_seq RESTART WITH 1;\n\n            DELETE FROM orders;\n ALTER SEQUENCE orders_id_seq RESTART WITH 1;\n\n            DELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;\n\n            DELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;\n";
                    return [4 /*yield*/, connection.query(sql)];
                case 2:
                    _a.sent();
                    connection.release();
                    return [2 /*return*/];
            }
        });
    }); });
});
