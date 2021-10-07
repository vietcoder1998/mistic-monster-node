import Blockchain from "./BlockChain"

export default class Node {
    id: number
    isOnline: boolean
    createDate: number
    address: string
    level: number = 0
    children: Node[]
    sameLevel: Node[]
    chain: Blockchain[]
    paren: Node
    type: 'main' | 'light' | 'root'
    host: string = 'localhost'
    port: string = '82'
    key: string = 'tdv1998'

    constructor(id: number, createDate: number, address: string, children: Node[], chain: Blockchain[], level: 0, host?: string, port?: string) {
        this.id = id
        this.createDate =  createDate
        this.address = address
        this.children = children
        this.chain = chain
        this.host = host
        this.port = port
    }

    register(node: Node) {
        node.isOnline = true
        this.children.push(node)
    }

    compareChain(node: Node): boolean{
        for (let i = 0; i < this.children.length; i++) {
            const childrenNode = this.children[i];
            if (childrenNode.chain.length > node.chain.length ) {
                return false
            }
        }   

        return true
    }

    republicChain(node: Node): void {
        if(this.compareChain(node)) {
            this.setChain(node.chain)
            this.publicChain(node.chain)
        }
    }

    publicChain(chain: Blockchain[]): void {
        for (let i = 0; i < this.children.length; i++) {
            const node = this.children[i];
            node.chain = chain
        }
    }

    setChain(chain: Blockchain[]) {
        this.chain = chain
    }

    getChain(chain: Blockchain[]){
        this.chain = chain
    }
}