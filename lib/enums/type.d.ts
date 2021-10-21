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
    Transfer = "transfer"
}
declare enum TransactionState {
    call = "call",
    deploy = "deploy",
    exit = "exit"
}
export { MonsterType, TransactionType, CoinUnit, AccountType, TransactionState };
