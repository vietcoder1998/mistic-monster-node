import { MonsterType } from "../enums/type"
import Monster from "../model/Monster"

/**
 * Miner - who mining block and mining coin for transaction
 */

export default class Miner {
    id: string
    address: string = '1'
    walletAddress: string = ''
    state = 'stop'
}

