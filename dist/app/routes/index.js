"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../modules/auth/auth.route");
const flower_route_1 = require("../modules/flower/flower.route");
const sale_route_1 = require("../modules/sale/sale.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/auth",
        route: auth_route_1.UserRoutes,
    },
    {
        path: "/flower",
        route: flower_route_1.flowerRoutes,
    },
    {
        path: "/sale",
        route: sale_route_1.saleRoutes,
    },
];
moduleRoutes.forEach((route) => {
    router.use(route.path, route.route);
});
exports.default = router;
