import { Binary, Chunk, Uint8ArrayReader } from 'cafe-utility'
import { getRandomValues } from 'crypto'
import { writeFileSync } from 'fs'

type MapEntry = {
    reference: string
    bytes: string
}

main()

function main() {
    const map = new Map<string, MapEntry>()
    let iterations = 0
    while (map.size !== 1024) {
        const bytes = getRandomValues(new Uint8Array(32))
        const chunk = new Chunk(4096)
        chunk.writer.write(new Uint8ArrayReader(bytes))
        chunk.span = 32n
        const reference = chunk.hash()
        const binary = Binary.uint8ArrayToBinary(reference).slice(0, 10)
        map.set(binary, { reference: Binary.uint8ArrayToHex(reference), bytes: Binary.uint8ArrayToHex(bytes) })
        iterations++
        if (iterations % 100 === 0) {
            console.log(`Iterations: ${iterations}, Map size: ${map.size}`)
        }
    }
    const json = Array.from(map.entries())
        .map(entry => ({
            neighborhood: entry[0],
            bytes: entry[1].bytes,
            reference: entry[1].reference
        }))
        .sort((a, b) => a.neighborhood.localeCompare(b.neighborhood))
    writeFileSync('neighborhoods.json', JSON.stringify(json, null, 2))
}
