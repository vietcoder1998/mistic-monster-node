import { MonsterStats } from '../entity/monster'

function random_index(value: number, range: number) {
    return (value | 0) + Math.floor(Math.random() * (range | 0))
}

function create_index(
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
        amr: create_index(min, range, stats_1?.amr, stats_2?.amr),
        dmg: create_index(min, range, stats_1?.dmg, stats_2?.dmg),
        spe: create_index(min, range, stats_1?.spe, stats_2?.spe),
        skl: create_index(min, range, stats_1?.skl, stats_2?.skl),
        hea: create_index(min, range, stats_1?.hea, stats_2?.hea),
    }

    return stats
}

export { random_index, create_index, generate_stats }
