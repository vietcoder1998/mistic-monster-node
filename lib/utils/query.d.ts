declare function query<T>(page?: number, size?: number, arr?: T[]): {
    result: T[];
    total: number;
};
export default query;
