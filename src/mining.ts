import { BaseAddress } from './enums/address'
import { CoinUnit, MonsterType, TransactionType } from './enums/type'
import Blockchain from './model/BlockChain'
import Monster from './model/Monster'

const monstersChain = new Blockchain('monster')

function Mining() {
    const monster = new Monster(
        'earth',
        MonsterType.BEAST,
        'any',
        20 + Math.floor(Math.random() * 10),
        20 + Math.floor(Math.random() * 10)
    )
    monstersChain.appendNew(
        monster,
        BaseAddress.Wallet,
        BaseAddress.Wallet,
        1,
        CoinUnit.Monster,
        TransactionType.Mining,
        6
    )
}

Mining()
