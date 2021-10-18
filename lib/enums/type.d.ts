declare enum MonsterType {
    REPTILE = "reptile",
    BIRD = "bird",
    BEAST = "beast"
}
declare enum AccountType {
    BANKER = "banker",
    USER = "user"
}
declare enum CoinUnit {
    Monster = "MMC",
    DgCoin = "DGC",
    Dollar = "USD"
}
declare enum TransactionType {
    Mining = "mining",
    Transfer = "transfer",
    Call = "call",
    Deploy = "deploy"
}
export { MonsterType, TransactionType, CoinUnit, AccountType };
