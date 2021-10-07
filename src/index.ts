import express from 'express'
import path from 'path'
import MainApi from './mainnet'
import Wallet from './model/Wallet'
const app = express()
const port = 8092

// send transaction

const mainnet = new MainApi()
app.get('/send', async (req, res) => {
    const { value, sender, receiver, data } = req.query
    const sendWallet: Wallet = await mainnet.getWallet(String(sender))
    const receivedWallet: Wallet = await mainnet.getWallet(String(sender))

    if (!sendWallet) {
        res.status(404).end('No send wallet fonded')
    } else if (!receivedWallet) {
        res.status(404).end('No receiver wallet fonded')
    } else {
        const transaction = await mainnet.createTransaction(
            String(sender),
            String(receiver),
            Number(value),
            data
        )

        res.status(200).end(JSON.stringify(transaction))
    }
})

// register wallet
app.get('/register', async (req, res) => {
    const { name, pass } = req.query
    const result = await mainnet.registerWallet(String(name), String(pass))

    if (result) {
        res.status(200).send(result)
    } else {
        res.status(409).send('error in name or pass')
    }
})

// get wallet
app.get('/wallet/:address', async (req, res) => {
    const { address } = req.params
    if (address) {
        const walletDetail: Wallet = await mainnet.getWallet(String(address))

        if (!walletDetail || walletDetail.pass) {
            res.status(404).send('no wallet found')
        } else {
            res.send(walletDetail)
        }
    }
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'view/index.html'))
})

app.get('/w3.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'view/w3.js'))
})

app.listen(port, () => {
    console.log('server running, ', `http://localhost:` + port)
})
