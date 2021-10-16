"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonsterClass = exports.MonsterShortInfo = exports.MonsterBodyPart = void 0;
class MonsterShortInfo {
    constructor(id, name, cls, level, image, gene) {
        this.id = id;
        this.name = name;
        this.cls = cls;
        this.level = level;
        this.image = image;
        this.gene = gene;
    }
}
exports.MonsterShortInfo = MonsterShortInfo;
var MonsterClass;
(function (MonsterClass) {
    MonsterClass["Dragon"] = "dragon";
    MonsterClass["Unicorn"] = "unicorn";
    MonsterClass["Bird"] = "bird";
    MonsterClass["Reptile"] = "reptile";
    MonsterClass["Mech"] = "mech";
    MonsterClass["AquaDragon"] = "aqua_dragon";
    MonsterClass["Bug"] = "bug";
})(MonsterClass || (MonsterClass = {}));
exports.MonsterClass = MonsterClass;
var MonsterBodyPart;
(function (MonsterBodyPart) {
    MonsterBodyPart["Eye"] = "eye";
    MonsterBodyPart["Ear"] = "ear";
    MonsterBodyPart["Mouth"] = "mouth";
})(MonsterBodyPart || (MonsterBodyPart = {}));
exports.MonsterBodyPart = MonsterBodyPart;
