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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const auth_service_1 = require("./auth.service");
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const createUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { confirmPassword } = _a, userData = __rest(_a, ["confirmPassword"]);
    if ((userData === null || userData === void 0 ? void 0 : userData.password) !== confirmPassword) {
        throw new ApiError_1.default(http_status_1.default.NOT_ACCEPTABLE, "password not matched");
    }
    const result = yield auth_service_1.UserService.createUser(userData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User Created Successfully",
        data: result,
    });
}));
const loginUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const loginData = __rest(req.body, []);
    // console.log(loginData)
    const result = yield auth_service_1.UserService.loginUser(loginData);
    const { refreshToken, accessToken } = result, others = __rest(result, ["refreshToken", "accessToken"]);
    console.log(result);
    const cookieOptions = {
        secure: config_1.default.env === "development",
        httpOnly: true,
    };
    res.cookie("refreshToken", refreshToken, cookieOptions);
    res.cookie("accessToken", accessToken, cookieOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "User logged In successfully !",
        data: others,
    });
}));
const LogOut = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cookieOptions = {
        secure: process.env.NODE_ENV === "development",
        httpOnly: true,
        expires: new Date(0),
    };
    res.cookie("refreshToken", "", cookieOptions);
    res.cookie("accessToken", "", cookieOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User Logged out Successfully",
    });
}));
const getUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authorizationHeader = req.cookies.accessToken;
    if (typeof authorizationHeader === "string") {
        const token = authorizationHeader.split(" ")[1] || authorizationHeader;
        const result = yield auth_service_1.UserService.getLoggedUser(token);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "User Get Successfully",
            data: result,
        });
    }
}));
exports.UserController = {
    createUser,
    loginUser,
    LogOut,
    getUser,
};
