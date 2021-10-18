import express from 'express'
import { BlockChain } from './entities'

const app = express()

app.get('/', () => {
    const block_chain = new BlockChain()
    console.log(block_chain)
})
app.listen(3001, () => {
    console.log('server start at', 3001)
})
