import bodyParser from 'body-parser'
import express, { NextFunction, Request, Response } from 'express'
import { BlockChain } from '.'
import { Node } from './entities'

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

// get tx price
app.get('/tx-price/:address', async (req, res) => {
    const {
        params: { address },
    } = req
    const result = await mmc_chain.get_price_of_account(address)

    res.send(result)
})

// get block
app.get('/block/:height', async (req, res) => {
    const {
        params: { height },
    } = req

    res.send(await mmc_chain.get_block_detail(Number(height)))
})

// call transaction => mmc.transaction.get_account(private_key , address)
app.get('/tx/:hash', async (req, res) => {
    const {
        params: { hash },
    } = req

    res.send(await mmc_chain.get_tx_detail(String(hash)))
})

// get list tx
app.get('/tx', async (req, res) => {
    const {
        query: { page, size },
    } = req

    res.send(await mmc_chain.get_list_txs(Number(page), Number(size)))
})

// node resolve
app.post('/node/resolve', async (req, res) => {
    const {
        body,
        query: { address },
    } = req

    if (!String(address) || String(body)) {
        res.send('address are error')
    } else {
        res.send(
            await mmc_chain.resolve_block(JSON.parse(body), String(address))
        )
    }
})

// mine block
app.get('/mine', async (req, res) => {
    const {
        query: { address, node_address },
    } = req

    res.send(await mmc_chain.mine_block(String(node_address), String(address)))
})


// register node
app.post('/node/register', async (req, res) => {
    const {
        body: { port, host, name },
    } = req

    if (!port || !host || !name) {
        res.send('body error')
    } else {
        const node = new Node(1, String(host), Number(port), String(name))

        res.send(await mmc_chain.register_node(node._info))
    }
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