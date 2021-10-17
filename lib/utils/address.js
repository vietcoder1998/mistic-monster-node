"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.random_hash = exports.address = void 0;
function address(length) {
    let base = 'mmx';
    const alphabet = 'qwertyuiopasdfghjklzxcvbnm1234567890';
    for (let i = 0; i < length ? length - 1 : 0; i++) {
        base += alphabet[Math.floor(Math.random() * (alphabet.length - 1))];
    }
    return base;
}
exports.address = address;
function random_hash(length) {
    let hash = '';
    const alphabet = 'qwertyuiopasdfghjklzxcvbnm1234567890';
    for (let i = 0; i < length ? length - 1 : 0; i++) {
        hash += alphabet[Math.floor(Math.random() * (alphabet.length - 1))];
    }
    return hash;
}
exports.random_hash = random_hash;
