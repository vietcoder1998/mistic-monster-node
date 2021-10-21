declare class MMCNode {
    private id;
    private host;
    private port;
    private name;
    constructor(id: string, host: string, port: number, name: string);
    get _host(): string;
    get _port(): number;
    get _id(): string;
    get _name(): string;
    get _info(): {
        host: string;
        port: number;
        id: string;
        name: string;
    };
    get _address(): string;
}
export default MMCNode;
