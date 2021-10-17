"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate_stats = exports.create_stats = exports.random_id = void 0;
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
    Object.keys(stats_1).forEach((k) => {
        Object.assign(stats, create_stats(k, min, range, stats_1[k], stats_2[k]));
    });
    return stats;
}
exports.generate_stats = generate_stats;
