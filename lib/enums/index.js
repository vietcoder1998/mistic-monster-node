"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = exports.Code = exports.TransactionType = exports.CoinUnit = exports.AccountType = exports.MonsterType = exports.RedisStore = exports.ResponseMessage = void 0;
const message_1 = require("./message");
Object.defineProperty(exports, "ResponseMessage", { enumerable: true, get: function () { return message_1.ResponseMessage; } });
const redis_1 = require("./redis");
Object.defineProperty(exports, "RedisStore", { enumerable: true, get: function () { return redis_1.RedisStore; } });
const type_1 = require("./type");
Object.defineProperty(exports, "MonsterType", { enumerable: true, get: function () { return type_1.MonsterType; } });
Object.defineProperty(exports, "AccountType", { enumerable: true, get: function () { return type_1.AccountType; } });
Object.defineProperty(exports, "CoinUnit", { enumerable: true, get: function () { return type_1.CoinUnit; } });
Object.defineProperty(exports, "TransactionType", { enumerable: true, get: function () { return type_1.TransactionType; } });
var Code;
(function (Code) {
    Code[Code["Success"] = 200] = "Success";
    Code[Code["Error"] = 500] = "Error";
    Code[Code["NotFound"] = 404] = "NotFound";
    Code[Code["RequestError"] = 409] = "RequestError";
})(Code || (Code = {}));
exports.Code = Code;
var Message;
(function (Message) {
    Message["Success"] = "success";
    Message["Error"] = "error";
    Message["NotFound"] = "notfound";
    Message["RequestError"] = "req_error";
})(Message || (Message = {}));
exports.Message = Message;
