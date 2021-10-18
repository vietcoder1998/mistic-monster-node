enum MonsterType {
    REPTILE = 'reptile',
    BIRD = 'bird',
    BEAST = 'beast',
}

enum AccountType {
    BANKER = 'banker',
    USER = 'user',
}

enum CoinUnit {
    Monster = 'MMC',
    DgCoin = 'DGC',
    Dollar = 'USD',
}

enum TransactionType {
    Mining = 'mining',
    Transfer = 'transfer',
    Call = 'call',
    Deploy = 'deploy',
}

export { MonsterType, TransactionType, CoinUnit, AccountType }
