import { getInput } from '@actions/core';
import fs from 'node:fs';
import path from 'node:path';

async function run() {
    const files = getInput('files');
    for (const file of files.split(' ')) {
        if (!file.endsWith('.md')) return;
        const contents = fs.readFileSync(file, { encoding: 'utf-8' });
        const id = path.basename(file).replace('.md', '');
        const post = contents.split('---').slice(1);
        console.log({ id, post });
    }
}

run();
