import { MonsterStats } from '../typings/monster'

function random_id(value: number, range: number) {
    return (value | 0) + Math.floor(Math.random() * (range | 0))
}

function create_stats(
    k: string,
    min?: number,
    range?: number,
    value1?: number,
    value2?: number
): { [k: string]: number } {
    const value = (value1 + value2) / 2
    return { [k]: (value | min) + Math.floor(Math.random() * (range | 0)) }
}

function generate_stats(
    min?: number,
    range?: number,
    stats_1?: MonsterStats,
    stats_2?: MonsterStats
) {
    let stats: MonsterStats = {
        dmg: 20,
        amr: 20,
        spe: 20,
        skl: 20,
        hea: 20,
    }

    Object.keys(stats_1).forEach((k: string) => {
        Object.assign(
            stats,
            create_stats(k, min, range, stats_1[k], stats_2[k])
        )
    })

    return stats
}

export { random_id, create_stats, generate_stats }
