import { MonsterStats } from '../typings/monster';
declare function random_id(value: number, range: number): number;
declare function create_id(min?: number, range?: number, value1?: number, value2?: number): number;
declare function generate_stats(min?: number, range?: number, stats_1?: MonsterStats, stats_2?: MonsterStats): MonsterStats;
export { random_id, create_id, generate_stats };
