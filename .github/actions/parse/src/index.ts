import { getInput, setOutput } from '@actions/core';
import fs from 'node:fs';
import path from 'node:path';
import { remark } from 'remark'
import strip from 'strip-markdown';
import truncate from 'truncate';

const formatTweet = async (content: string, url: string) => {
  const [markdown, ...more] = content.split('---').slice(2);
  return remark()
    .use(strip)
    .process(markdown)
    .then((file) => {
        const str = String(file).trim();
        if (str.length < 260) {
            if (more.length === 0) {
                return str;
            } else {
                return str + '\n\n' + url;
            }
        }
        return truncate(str, 260) + '\n\n' + url;
    })
}

async function run() {
    const files = getInput('files');
    for (const file of files.split(' ')) {
        if (!file.endsWith('.md')) return;

        const contents = fs.readFileSync(file, { encoding: 'utf-8' });
        const id = path.basename(file).replace('.md', '');

        const url = `feed.nmoo.dev/p/${id}`;
        const body = await formatTweet(contents, url);
        return setOutput('body', body);
    }
}

run();
