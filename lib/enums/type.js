"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionState = exports.AccountType = exports.CoinUnit = exports.TransactionType = exports.MonsterType = void 0;
var MonsterType;
(function (MonsterType) {
    MonsterType["REPTILE"] = "reptile";
    MonsterType["BIRD"] = "bird";
    MonsterType["BEAST"] = "beast";
})(MonsterType || (MonsterType = {}));
exports.MonsterType = MonsterType;
var AccountType;
(function (AccountType) {
    AccountType["BANKER"] = "banker";
    AccountType["USER"] = "user";
})(AccountType || (AccountType = {}));
exports.AccountType = AccountType;
var CoinUnit;
(function (CoinUnit) {
    CoinUnit["Monster"] = "MMC";
    CoinUnit["DgCoin"] = "DGC";
    CoinUnit["Dollar"] = "USD";
})(CoinUnit || (CoinUnit = {}));
exports.CoinUnit = CoinUnit;
var TransactionType;
(function (TransactionType) {
    TransactionType["Mining"] = "mining";
    TransactionType["Transfer"] = "transfer";
})(TransactionType || (TransactionType = {}));
exports.TransactionType = TransactionType;
var TransactionState;
(function (TransactionState) {
    TransactionState["call"] = "call";
    TransactionState["deploy"] = "deploy";
    TransactionState["exit"] = "exit";
})(TransactionState || (TransactionState = {}));
exports.TransactionState = TransactionState;
