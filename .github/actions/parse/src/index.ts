import { getInput } from '@actions/core';
import fs from 'node:fs';
import path from 'node:path';
import { remark } from 'remark'
import strip from 'strip-markdown';

const formatTweet = async (markdown: string) => {
  const body = remark()
    .use(strip)
    .process(markdown)
    .then((file) => String(file))
  console.log(body);
}

async function run() {
    const files = getInput('files');
    for (const file of files.split(' ')) {
        if (!file.endsWith('.md')) return;
        const contents = fs.readFileSync(file, { encoding: 'utf-8' });
        const id = path.basename(file).replace('.md', '');
        const [markdown] = contents.split('---').slice(2);

        const url = `feed.nmoo.dev/p/${id}`;
        const body = await formatTweet(markdown);
        console.log({ url, body });
    }
}

run();
