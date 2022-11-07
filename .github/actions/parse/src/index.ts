import { getInput } from '@actions/core';
import * as fs from 'node:fs';

async function run() {
    const files = getInput('files');
    for (const file of files.split(' ')) {
        if (!file.endsWith('.md')) return;
        const contents = fs.readFileSync(file, { encoding: 'utf-8' });
        console.log({ file, contents });
    }
}

run();
