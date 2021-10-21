import bodyParser from 'body-parser'
import express, { NextFunction, Request, Response } from 'express'
import { BlockChain } from '.'
import { Node } from './entities'
import { random_hash } from './utils'

const mmc_chain = new BlockChain()
const app = express()
const port = 8092

app.use(bodyParser.json())

app.get('/', async (req, res) => {
    res.send(mmc_chain.get_total_block())
})

app.post('/register', async (req, res) => {
    const {
        body: { password, name },
    } = req

    const wallet = await mmc_chain.register_wallet(password, name)
    res.send(wallet)
})

app.post('/wallet/:address', async (req, res) => {
    const {
        headers: { private_key },
        params: { address },
    } = req

    const wallet = await mmc_chain.get_wallet_detail(
        address,
        String(private_key)
    )

    res.send(wallet)
})

// get block
app.get('/block/:height', async (req, res) => {
    const {
        params: { height },
    } = req

    res.send(await mmc_chain.get_block_detail(Number(height)))
})

/// call transaction => mmc.transaction.get_account(private_key , address)
app.get('/tx/:hash', async (req, res) => {
    const {
        params: { hash },
    } = req

    res.send(await mmc_chain.get_tx_detail(String(hash)))
})

app.post('/tx', async (req, res) => {
    const {
        headers: { pk, aa },
        body: { tx, pw },
    } = req
})

app.get('/nodes/resolve', (req, res) => {
    res.send()
})

// mine block
app.get('/mine', async (req, res) => {
    const {
        query: { address, node_address },
    } = req

    res.send(await mmc_chain.mine_block(String(node_address), String(address)))
})


app.get('/nodes/register', async (req, res) => {
    const {
        body: { port, host, name },
    } = req

    const node = new Node(
        random_hash(12),
        String(host),
        Number(port),
        String(name)
    )

    res.send(node._info)
})

app.get('/block', async (req, res) => {
    const { page, size } = req.query
    const p = page ? Number(page) : 0
    const s = size ? Number(size) : 10
    res.send(await mmc_chain.get_list_block(p, s))
})

app.get('/monster', (req, res) => {
    let p, s
    const { page, size } = req.query

    if (!page) {
        p = 0
    } else {
        p = Number(page)
    }

    if (!size) {
        s = 0
    } else {
        s = Number(size)
    }
})

app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
    if (err) {
        res.status(500).send(err.message)
    }

    next()
})

app.listen(port, () => {
    console.log('server running, ', `http://localhost:${port}`)
})
