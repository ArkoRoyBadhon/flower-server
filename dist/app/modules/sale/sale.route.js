"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saleRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const sale_controller_1 = require("./sale.controller");
const router = express_1.default.Router();
router.post("/create", (0, auth_1.default)("admin"), sale_controller_1.saleController.insertIntoDB);
router.get("/get-all", (0, auth_1.default)("admin"), sale_controller_1.saleController.getAllSales);
exports.saleRoutes = router;
