"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionType = exports.CoinUnit = exports.AccountType = exports.MonsterType = void 0;
var MonsterType;
(function (MonsterType) {
    MonsterType["REPTILE"] = "reptile";
    MonsterType["BIRD"] = "bird";
    MonsterType["BEAST"] = "beast";
})(MonsterType = exports.MonsterType || (exports.MonsterType = {}));
var AccountType;
(function (AccountType) {
    AccountType["BANKER"] = "banker";
    AccountType["USER"] = "user";
})(AccountType = exports.AccountType || (exports.AccountType = {}));
var CoinUnit;
(function (CoinUnit) {
    CoinUnit["Monster"] = "MMC";
    CoinUnit["DgCoin"] = "DGC";
    CoinUnit["Dollar"] = "USD";
})(CoinUnit = exports.CoinUnit || (exports.CoinUnit = {}));
var TransactionType;
(function (TransactionType) {
    TransactionType["Mining"] = "mining";
    TransactionType["Transfer"] = "transfer";
})(TransactionType = exports.TransactionType || (exports.TransactionType = {}));
