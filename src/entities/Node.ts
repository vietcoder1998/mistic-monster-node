import { NodeInfo } from '..'

class MMCNode {
    private id: number
    private host: string
    private port: number
    private name: string
    private txs_len: number

    constructor(id: number, host: string, port: number, name: string) {
        this.id = id
        this.host = host
        this.port = port
        this.name = name
    }

    get _host() {
        return this.host
    }

    get _port() {
        return this.port
    }

    get _id() {
        return this.id
    }

    get _name() {
        return this.name
    }

    get _info(): NodeInfo {
        return {
            host: this.host,
            port: this.port,
            id: this.id,
            txs_len: this.txs_len,
            name: this.name,
            address: this._address,
        }
    }

    get _address() {
        return `${this.host}:${this.port}`
    }
}

export default MMCNode
