import { build } from './build';
import { watch } from 'fs';
// import index from './src/test.html';
import path from 'path';

console.log('Watching for changes...');

const onChange = () =>
    build('./test', [{ from: './src/test.html', to: './test/index.html' }]);

watch('./src/', (_) => onChange());
await onChange();

// const server = Bun.serve({
//     async fetch(req) {
//
//         const reqPath = new URL(req.url).pathname;
//         const filePath = path.join('./test', reqPath === '/' ? 'index.html' : reqPath);
//
//         console.log(filePath);
//
//         const file = Bun.file(reqPath);
//
//         if (!await file.exists()) {
//             return new Response(`File not found: ${filePath}`, { status: 404 })
//         }
//
//         return new Response(file);
//     },
//     development: false
// })
//
// console.log(`http://localhost:${server.port}`);
