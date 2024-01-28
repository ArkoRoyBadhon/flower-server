"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post("/signup", auth_controller_1.UserController.createUser);
router.post("/login", auth_controller_1.UserController.loginUser);
// router.get('/user', UserController.getUser)
router.get("/user", (0, auth_1.default)("user", "admin"), auth_controller_1.UserController.getUser);
router.post("/logout", auth_controller_1.UserController.LogOut);
exports.UserRoutes = router;
