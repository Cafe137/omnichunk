import { Bee } from '@ethersphere/bee-js'
import { readFileSync } from 'fs'
import { depth } from './config'

type JsonItem = {
    neighborhood: string
    bytes: string
    reference: string
}

main()

async function main() {
    const json = JSON.parse(readFileSync('neighborhoods.json', 'utf-8')) as JsonItem[]
    const bee = new Bee('https://bzz.limo')
    let i = 0
    for (const item of json) {
        console.log(++i, '/', 2 ** depth)
        try {
            const result = await bee.downloadData(item.reference)
            if (!result.equals(item.bytes)) {
                console.error(
                    `Mismatch for neighborhood ${item.neighborhood}: expected ${item.bytes}, got ${result.toHex()}`
                )
            }
        } catch (error) {
            console.error(`Error downloading neighborhood ${item.neighborhood}:`, error)
        }
    }
}
