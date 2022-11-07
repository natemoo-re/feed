import { getInput } from '@actions/core';

async function run() {
    const files = getInput('files');
    for (const file of files.split(' ')) {
        console.log({ file });
    }
}

run();
