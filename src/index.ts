import express from 'express'
import path from 'path'
import { CoinUnit, TransactionType } from './enums/type'
import query from './interface/query'
import Account from './model/Account'
import Monster from './model/Monster'
import Wallet from './model/Wallet'
import TestNet from './testnet'
const app = express()
const port = 8092

// send transaction
const testnet = new TestNet()

// create transaction
app.get('/send', (req, res) => {
    const { value, from, to, data, unit, type } = req.query
    const sender: Account = testnet.get_account_detail(String(from))
    const receiver: Account = testnet.get_account_detail(String(from))

    if (!sender) {
        res.status(404).end('No send account fonded')
    } else if (!receiver) {
        res.status(404).end('No to wallet fonded')
    } else {
        const transaction = testnet._block_chain.append(
            String(data),
            String(from),
            String(to),
            Number(value),
            CoinUnit.Monster,
            TransactionType.Transfer
        )

        res.status(200).end(JSON.stringify(transaction))
    }
})

// register wallet
app.get('/login', async (req, res) => {
    const { password, address } = req.query

    if (password && address) {
        const wallet = testnet._wallets[String(address)]
        if (wallet) {
            res.status(200).send({ code: 200, msg: 'Success', data: wallet })
        } else {
            res.status(404).send({ code: 404, msg: 'Wallet not found' })
        }
    } else {
        res.status(404).send({ code: 404, msg: 'Password or address is error' })
    }
})

// get wallet
app.get('/wallet/:address', async (req, res) => {
    const { address, password } = req.query
    if (String(address) && String(password)) {
        const walletDetail: Wallet = testnet.get_wallet_detail(String(address))

        if (!walletDetail || String(password) !== walletDetail._pass) {
            res.status(404).send('no wallet found')
        } else {
            res.send(walletDetail)
        }
    }
})

// get all wallet
app.get('/wallet', async (req, res) => {
    res.send(testnet.get_wallet_detail())
})

// get all account
app.get('/account', async (req, res) => {
    res.send(testnet._accounts)
})

// default render
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'view/index.html'))
})

app.get('/transaction', (req, res) => {
    const { hash } = req.query
    console.log(testnet._block_chain)
    if (hash) {
        res.send(testnet._block_chain._transactions)
    } else {
        res.send(testnet.get_transaction_detail(String(hash)))
    }
})

app.get('/register', async (req, res) => {
    const { password, seed } = req.query

    if (!password || String(password).length < 8) {
        res.status(404).send({ msg: 'Password is error', code: 404 })
    } else {
        const response = testnet.register(String(password), String(seed))
        res.status(200).send({ data: response, msg: 'success', code: 200 })
    }
})

// mining monster
app.get('/monster', (req, res) => {
    const { page, size } = req.query
    let p, s

    if (!page) {
        p = 0
    } else {
        p = Number(page)
    }

    if (!size) {
        s = 0
    } else {
        s = Number(page)
    }

    const monsters = query<Monster>(p, s, testnet._monster)
    res.send({
        page: p,
        size: s,
        result: monsters.result,
        total: monsters.total,
    })
})

app.listen(port, () => {
    console.log('server running, ', `http://localhost:` + port)
    console.log(testnet._block_chain._transactions)
})
