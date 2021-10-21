"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate_public_private_key = exports.generate_stats = exports.create_stats = exports.random_id = void 0;
const bip39_1 = require("bip39");
const crypto_js_1 = __importDefault(require("crypto-js"));
const address_1 = require("./address");
function random_id(value, range) {
    return (value | 0) + Math.floor(Math.random() * (range | 0));
}
exports.random_id = random_id;
function create_stats(k, min, range, value1, value2) {
    const value = (value1 + value2) / 2;
    return { [k]: (value | min) + Math.floor(Math.random() * (range | 0)) };
}
exports.create_stats = create_stats;
function generate_stats(min, range, stats_1, stats_2) {
    let stats = {
        dmg: 20,
        amr: 20,
        spe: 20,
        skl: 20,
        hea: 20,
    };
    if (stats_1 && stats_2) {
        Object.keys(stats_1).forEach((k) => {
            Object.assign(stats, create_stats(k, min, range, stats_1[k], stats_2[k]));
        });
    }
    else {
        Object.keys(stats).forEach((k) => {
            stats[k] = stats[k] + Math.floor(Math.random() * 10);
        });
    }
    return stats;
}
exports.generate_stats = generate_stats;
function generate_public_private_key(password) {
    try {
        const words = password + (0, address_1.random_hash)(12);
        // rent private_key from password
        const private_key = (0, bip39_1.mnemonicToSeedSync)(words).toString('hex');
        // convert private key to binary
        const strength = Number(Buffer.from(private_key).toString('binary'));
        // generate seed to save into client
        const seed = (0, bip39_1.generateMnemonic)(strength);
        // zip public_key into address
        const public_key = crypto_js_1.default.SHA256(private_key).toString(crypto_js_1.default.enc.Hex);
        const address = 'mmc' + public_key;
        return {
            address,
            private_key,
            seed,
        };
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}
exports.generate_public_private_key = generate_public_private_key;
