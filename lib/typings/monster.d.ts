import { CoinUnit } from '../enums/type';
interface MonsterStats {
    dmg: number;
    amr: number;
    spe: number;
    skl: number;
    hea: number;
    [key: string]: number | undefined;
}
declare type MonsterAbility = {
    name: string;
    description: string;
    dmg: number;
    amr: number;
    img: string;
};
declare type MonsterFigure = {
    img: string;
    model: Object;
};
declare class MonsterShortInfo {
    id: number;
    name: string;
    cls: MonsterClass;
    level: number;
    image: string;
    gene: string;
    constructor(id: number, name: string, cls: MonsterClass, level: number, image: string, gene: string);
}
declare enum MonsterClass {
    Dragon = "dragon",
    Unicorn = "unicorn",
    Bird = "bird",
    Reptile = "reptile",
    Mech = "mech",
    AquaDragon = "aqua_dragon",
    Bug = "bug"
}
declare enum MonsterBodyPart {
    Eye = "eye",
    Ear = "ear",
    Mouth = "mouth"
}
declare type SaleInfo = {
    time: number;
    value: number;
    unit: CoinUnit;
    seller: string;
};
declare type MonsterEntity = {
    id: string;
    name: string;
    image: string;
    ownerId: string;
    gene: string;
    level: number;
    price: number;
    stats: MonsterStats;
    class: MonsterClass;
    abilities: MonsterAbility[];
    sale_info: SaleInfo;
    body: MonsterBodyPart[];
    children: MonsterShortInfo[];
    parent: MonsterShortInfo[];
};
export { MonsterStats, MonsterAbility, SaleInfo, MonsterBodyPart, MonsterFigure, MonsterShortInfo, MonsterEntity, MonsterClass, };
