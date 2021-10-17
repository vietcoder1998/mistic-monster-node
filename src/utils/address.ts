function address(length: number): string {
    let base = 'mmx'
    const alphabet = 'qwertyuiopasdfghjklzxcvbnm1234567890'
    for (let i = 0; i < length ? length - 1 : 0; i++) {
        base += alphabet[Math.floor(Math.random() * (alphabet.length - 1))]
    }
    return base
}

function random_hash(length: number): string {
    let hash = ''
    const alphabet = 'qwertyuiopasdfghjklzxcvbnm1234567890'
    for (let i = 0; i < length ? length - 1 : 0; i++) {
        hash += alphabet[Math.floor(Math.random() * (alphabet.length - 1))]
    }

    return hash
}

type Address = ReturnType<typeof address>

export { address, Address, random_hash }
