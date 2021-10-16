"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Response {
    constructor(code, data) {
        if (data) {
            this.data = data;
        }
        if (code) {
            this.code = code;
        }
    }
}
exports.default = Response;
