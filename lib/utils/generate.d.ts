import { MonsterStats } from '../typings/monster';
declare function random_id(value: number, range: number): number;
declare function create_stats(k: string, min?: number, range?: number, value1?: number, value2?: number): {
    [k: string]: number;
};
declare function generate_stats(min?: number, range?: number, stats_1?: MonsterStats, stats_2?: MonsterStats): MonsterStats;
declare function generate_public_private_key(password: string): {
    address: string;
    private_key: string;
    seed: string;
};
export { random_id, create_stats, generate_stats, generate_public_private_key };
