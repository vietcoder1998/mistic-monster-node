"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate_stats = exports.create_id = exports.random_id = void 0;
function random_id(value, range) {
    return (value | 0) + Math.floor(Math.random() * (range | 0));
}
exports.random_id = random_id;
function create_id(min, range, value1, value2) {
    const value = (value1 + value2) / 2;
    return (value | min) + Math.floor(Math.random() * (range | 0));
}
exports.create_id = create_id;
function generate_stats(min, range, stats_1, stats_2) {
    const stats = {
        amr: create_id(min, range, stats_1 === null || stats_1 === void 0 ? void 0 : stats_1.amr, stats_2 === null || stats_2 === void 0 ? void 0 : stats_2.amr),
        dmg: create_id(min, range, stats_1 === null || stats_1 === void 0 ? void 0 : stats_1.dmg, stats_2 === null || stats_2 === void 0 ? void 0 : stats_2.dmg),
        spe: create_id(min, range, stats_1 === null || stats_1 === void 0 ? void 0 : stats_1.spe, stats_2 === null || stats_2 === void 0 ? void 0 : stats_2.spe),
        skl: create_id(min, range, stats_1 === null || stats_1 === void 0 ? void 0 : stats_1.skl, stats_2 === null || stats_2 === void 0 ? void 0 : stats_2.skl),
        hea: create_id(min, range, stats_1 === null || stats_1 === void 0 ? void 0 : stats_1.hea, stats_2 === null || stats_2 === void 0 ? void 0 : stats_2.hea),
    };
    return stats;
}
exports.generate_stats = generate_stats;
