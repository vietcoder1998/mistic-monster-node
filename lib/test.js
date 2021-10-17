"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const entities_1 = require("./entities");
http_1.default.createServer(() => {
    try {
        new entities_1.BlockChain();
        console.log('listen on', 9000);
    }
    catch (error) {
        console.log(error);
    }
}).listen(9000);
