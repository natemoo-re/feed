import { getInput, setOutput } from '@actions/core';
import fs from 'node:fs';
import path from 'node:path';
import { remark } from 'remark'
import strip from 'strip-markdown';
import truncate from 'truncate';

const formatTweet = async (markdown: string, url: string) => {
  return remark()
    .use(strip)
    .process(markdown)
    .then((file) => truncate(String(file).trim(), 260) + '\n\n' + url)
}

async function run() {
    const files = getInput('files');
    for (const file of files.split(' ')) {
        if (!file.endsWith('.md')) return;

        const contents = fs.readFileSync(file, { encoding: 'utf-8' });
        const id = path.basename(file).replace('.md', '');
        const [markdown] = contents.split('---').slice(2);

        const url = `feed.nmoo.dev/p/${id}`;
        const body = await formatTweet(markdown, url);
        return setOutput('body', body);
    }
}

run();
