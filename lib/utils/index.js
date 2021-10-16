"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = __importDefault(require("./query"));
const generate_1 = require("./generate");
const address_1 = require("./address");
exports.default = { query: query_1.default, create_id: generate_1.create_id, random_id: generate_1.random_id, generate_stats: generate_1.generate_stats, address: address_1.address };
