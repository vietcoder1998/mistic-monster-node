"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.random_hash = exports.m_address = void 0;
function m_address(length) {
    let base = 'mmc';
    const alphabet = 'abcdef1234567890';
    for (let i = 0; i < length ? length - 1 : 0; i++) {
        base += alphabet[Math.floor(Math.random() * (alphabet.length - 1))];
    }
    return base;
}
exports.m_address = m_address;
function random_hash(length) {
    let hash = '';
    const alphabet = 'qwertyuiopasdfghjklzxcvbnm1234567890';
    for (let i = 0; i < length ? length - 1 : 0; i++) {
        hash += alphabet[Math.floor(Math.random() * (alphabet.length - 1))];
    }
    return hash;
}
exports.random_hash = random_hash;
