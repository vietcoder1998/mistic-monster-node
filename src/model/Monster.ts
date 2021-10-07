import { MonsterType } from '../enums/type'

const pet = [MonsterType.BEAST, MonsterType.BIRD, MonsterType.REPTILE]

export default class Monster {
    from: string
    type: MonsterType
    name: string = 'test'
    dmg: number = 10
    def: number = 2
    spe: number = 60
    health: number = 80
    hash: string = '23dfd_id_adf_sf_id_fng'

    constructor(
        from?: string,
        type?: MonsterType,
        name?: string,
        dmg?: number,
        def?: number
    ) {
        this.from = from || 'earth'
        this.type = type || this.randomPet()
        this.name = name || 'ooooo'
        this.dmg = dmg || this.randomDmg()
        this.def = def || this.randomDef()
    }

    randomPet(): MonsterType {
        return pet[Math.floor(Math.random() * pet.length)]
    }

    randomDmg() {
        return Math.floor(Math.random() * 10 + 10)
    }

    randomDef() {
        return Math.floor(Math.random() * 10 + 10)
    }
}
