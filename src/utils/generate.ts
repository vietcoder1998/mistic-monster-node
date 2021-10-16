import { MonsterStats } from '../typings/monster'

function random_id(value: number, range: number) {
    return (value | 0) + Math.floor(Math.random() * (range | 0))
}

function create_id(
    min?: number,
    range?: number,
    value1?: number,
    value2?: number
) {
    const value = (value1 + value2) / 2
    return (value | min) + Math.floor(Math.random() * (range | 0))
}

function generate_stats(
    min?: number,
    range?: number,
    stats_1?: MonsterStats,
    stats_2?: MonsterStats
) {
    const stats: MonsterStats = {
        amr: create_id(min, range, stats_1?.amr, stats_2?.amr),
        dmg: create_id(min, range, stats_1?.dmg, stats_2?.dmg),
        spe: create_id(min, range, stats_1?.spe, stats_2?.spe),
        skl: create_id(min, range, stats_1?.skl, stats_2?.skl),
        hea: create_id(min, range, stats_1?.hea, stats_2?.hea),
    }

    return stats
}

export { random_id, create_id, generate_stats }
