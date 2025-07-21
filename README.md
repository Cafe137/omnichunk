## Usage

Use `tsx` or `ts-node`, whichever you have installed **globally**.

Available scripts:

-   `src/01-generator.ts` - Generates `neighborhoods.json` locally
-   `src/02-uploader.ts` - Uploads data from `neighborhoods.json` to the network
-   `src/03-validator.ts` - Downloads the expected hashes from `neighborhoods.json`

The latest run is attached. Please see the files `neighborhoods.json`, `bee.log` and `metrics.txt`.

## Past datasets

Run `git checkout d1aa230377c6a8894d1be1f4edf020ea8379444a` to use `depth=10` dataset. This has been validated before, therefore, the chunks are likely to be cached, making this validation less reliable.

Run `git checkout 6fd79a583ca403b7d54fa059bb4992c2952b6e71` to use a `depth=11` dataset that differs from the one in `HEAD`. This dataset has not been validated before and is good for testing.
