import http from 'http'
import { BlockChain } from './entities'

http.createServer(() => {
    try {
        new BlockChain()
        console.log('listen on', 9000)
    } catch (error) {
        console.log(error)
    }
}).listen(9000)
