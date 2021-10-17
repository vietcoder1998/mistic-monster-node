"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Code = void 0;
var Code;
(function (Code) {
    Code[Code["success"] = 1] = "success";
    Code[Code["error"] = 0] = "error";
    Code[Code["not_found"] = -1] = "not_found";
    Code[Code["request_err"] = -2] = "request_err";
    Code[Code["err_private_key"] = 2] = "err_private_key";
    Code[Code["unknown"] = 4] = "unknown";
})(Code || (Code = {}));
exports.Code = Code;
