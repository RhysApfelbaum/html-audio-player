import { readdir } from 'fs/promises';
import path from 'path';

const assets = await readdir('./src/assets', {
    recursive: true,
    withFileTypes: true,
});
Bun.build({
    entrypoints: [
        './src/index.ts',
        ...assets
            .filter((entry) => entry.isFile())
            .map((entry) => path.join(entry.parentPath, entry.name)),
    ],
    outdir: './dist',
});
