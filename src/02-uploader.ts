import { Bee } from '@ethersphere/bee-js'
import { Binary, Types } from 'cafe-utility'
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
    const bee = new Bee('http://localhost:1633')
    let i = 0
    for (const item of json) {
        console.log(++i, '/', 2 ** depth)
        const result = await bee.uploadData(
            Types.asString(process.env.POSTAGE_BATCH),
            Binary.hexToUint8Array(item.bytes)
        )
        if (result.reference.represent() !== item.reference) {
            console.error(
                `Mismatch for neighborhood ${item.neighborhood}: expected ${
                    item.reference
                }, got ${result.reference.represent()}`
            )
        }
    }
}
