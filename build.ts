import { Copy, type AssetConfig } from '@alik6/bun-copy-plugin';
import path from 'path';

export async function build(
    outdir = './dist',
    extraAssets: AssetConfig[] = []
) {
    Bun.build({
        entrypoints: ['./src/index.ts', './src/styles.css'],
        outdir,
        plugins: [
            Copy({
                assets: [
                    { from: './src/assets/', to: path.join(outdir, 'assets') },
                    ...extraAssets,
                ],
                verify: true,
                verbose: false,
            }),
        ],
    });
}
