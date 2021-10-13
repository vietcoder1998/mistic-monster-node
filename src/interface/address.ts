function address(length: number): string {
    let base = '0x'
    const alphabet = 'qwertyuiopasdfghjklzxcvbnm1234567890'
    for (let i = 0; i < length ? length - 1 : 0; i++) {
        base += alphabet[Math.floor(Math.random() * (alphabet.length - 1))]
    }
    return base
}

type Address = ReturnType<typeof address>

export { address, Address }
