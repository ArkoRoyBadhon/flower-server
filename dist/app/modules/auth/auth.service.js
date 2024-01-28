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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const auth_model_1 = require("./auth.model");
const config_1 = __importDefault(require("../../../config"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield auth_model_1.User.findOne({
        email: payload === null || payload === void 0 ? void 0 : payload.email,
    });
    if (existingUser) {
        throw new ApiError_1.default(http_status_1.default.NOT_ACCEPTABLE, "User is already exists");
    }
    const info = Object.assign(Object.assign({}, payload), { role: "user" });
    //   console.log('info', info)
    const result = yield auth_model_1.User.create(info);
    return result;
});
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const NormalUser = yield auth_model_1.User.findOne({ email });
    const id = NormalUser === null || NormalUser === void 0 ? void 0 : NormalUser.id;
    const isUserExist = yield auth_model_1.User.isUserExist(id);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User does not exist");
    }
    if (isUserExist.password &&
        !(yield auth_model_1.User.isPasswordMatched(password, isUserExist.password))) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Password is incorrect");
    }
    // create access token & refresh token
    const { _id: Id } = isUserExist;
    const role = (isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.role) || "user";
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ Id, email, role }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ Id }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        accessToken,
        refreshToken,
    };
});
const getLoggedUser = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let verifiedToken = null;
    try {
        verifiedToken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret);
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "Invalid access Token");
    }
    const { Id } = verifiedToken;
    const isUserExist = yield auth_model_1.User.isUserExist(Id);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User does not exist");
    }
    const result = yield auth_model_1.User.findOne({ _id: Id });
    return result;
});
exports.UserService = {
    createUser,
    loginUser,
    getLoggedUser,
};
