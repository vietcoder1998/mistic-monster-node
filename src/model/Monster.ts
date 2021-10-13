import {
    MonsterAbility,
    MonsterBodyPart,
    MonsterClass,
    MonsterShortInfo,
    MonsterStats,
    SaleInfo,
} from '../entity/monster'

export default class Monster {
    id: string = ''
    name: string = ''
    img: string = ''
    owner: string = ''
    level: number
    birth_day: number
    value: number
    gene: string
    stats: MonsterStats
    class: MonsterClass
    abilities: MonsterAbility[]
    body: MonsterBodyPart[] = []
    children?: MonsterShortInfo[] = []
    parent?: MonsterShortInfo[] = []
    breedCount: number = 0

    constructor(
        id: string,
        name: string,
        img: string,
        owner: string,
        parent?: MonsterShortInfo[],
        stats?: MonsterStats
    ) {
        this.id = id
        this.name = name
        this.img = img
        this.owner = owner
        this.birth_day = new Date().getTime()

        console.log('o ->', owner)

        if (parent) {
            this.parent = parent
            const gene1 = parent[0].gene
            const gene2 = parent[1].gene
            this.gene =
                '0x' + gene1
                    ? gene1.substring(0, gene1.length - 1)
                    : this.make_random_gene(64) + gene2
                    ? gene2.substring(0, gene2.length - 1)
                    : this.make_random_gene(64)
        } else {
            this.gene = this.make_random_gene(128)
        }

        if (stats) {
            this.stats = stats
        }
    }

    make_random_gene(length: number) {
        let gene = ''
        const nuclear_ot = ['a', 't', 'g', 'x']

        for (let i = 0; i < length; i++) {
            const element = nuclear_ot[Math.floor(Math.random() * 4)]
            gene += element
        }

        return gene
    }

    get _sale_info(): SaleInfo {
        return this._sale_info
    }

    set _sale_info(_info: SaleInfo) {
        this._sale_info = _info
    }
}
