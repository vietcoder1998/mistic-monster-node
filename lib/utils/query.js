"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function query(page, size, arr) {
    const start = page | 0;
    const end = (start === 0 ? 1 : start) * (size | 10);
    const result = arr
        .filter((v, i) => start <= i && i < end)
        .map((item) => item);
    return {
        result,
        total: arr.length,
    };
}
exports.default = query;
