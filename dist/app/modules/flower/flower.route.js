"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.flowerRoutes = void 0;
const express_1 = __importDefault(require("express"));
const flower_controller_1 = require("./flower.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post("/create", (0, auth_1.default)("admin"), flower_controller_1.flowerController.insertIntoDB);
router.get("/get-flowers", flower_controller_1.flowerController.getAllFlowers);
router.patch("/update-flower/:id", (0, auth_1.default)("admin"), flower_controller_1.flowerController.updateFlower);
router.delete("/delete-flower/:id", (0, auth_1.default)("admin"), flower_controller_1.flowerController.deleteFlower);
exports.flowerRoutes = router;
