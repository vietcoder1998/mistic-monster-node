import { NodeInfo } from '..';
declare class MMCNode {
    private id;
    private host;
    private port;
    private name;
    private txs_len;
    constructor(id: number, host: string, port: number, name: string);
    get _host(): string;
    get _port(): number;
    get _id(): number;
    get _name(): string;
    get _info(): NodeInfo;
    get _address(): string;
}
export default MMCNode;
