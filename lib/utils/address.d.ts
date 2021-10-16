declare function address(length: number): string;
declare function random_hash(length: number): string;
declare type Address = ReturnType<typeof address>;
export { address, Address, random_hash };
