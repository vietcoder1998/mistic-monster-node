"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = exports.Code = void 0;
var Code;
(function (Code) {
    Code[Code["Success"] = 200] = "Success";
    Code[Code["Error"] = 500] = "Error";
    Code[Code["NotFound"] = 404] = "NotFound";
    Code[Code["RequestError"] = 409] = "RequestError";
})(Code = exports.Code || (exports.Code = {}));
var Message;
(function (Message) {
    Message["Success"] = "success";
    Message["Error"] = "error";
    Message["NotFound"] = "notfound";
    Message["RequestError"] = "req_error";
})(Message = exports.Message || (exports.Message = {}));
