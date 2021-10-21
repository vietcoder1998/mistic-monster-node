class MMCNode {
    private id: string
    private host: string
    private port: number
    private name: string

    constructor(id: string, host: string, port: number, name: string) {
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

    get _info() {
        return {
            host: this.host,
            port: this.port,
            id: this.id,
            name: this.name,
        }
    }

    get _address() {
        return this.host + this.port
    }
}

export default MMCNode
