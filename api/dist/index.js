"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const index_1 = __importDefault(require("./Routers/index"));
const app = (0, express_1.default)();
//necessary middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/v1', index_1.default);
app.listen(8080, () => {
    console.log("App is listening on 8080");
});
