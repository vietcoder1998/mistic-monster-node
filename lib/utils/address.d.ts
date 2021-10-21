declare function m_address(length: number): string;
declare function random_hash(length: number): string;
declare type Address = ReturnType<typeof m_address>;
export { m_address, Address, random_hash };
