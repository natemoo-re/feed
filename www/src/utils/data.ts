import fs from "node:fs/promises";
import glob from "fast-glob";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

export interface Post {
  name: string;
  data: { title: string, date: Date, draft?: boolean }
  content: string;
}

if (import.meta.hot) {
  import.meta.glob('../../../posts/**/*.md');
  import.meta.glob('../../../drafts/**/*.md');
}

async function read(dir: URL): Promise<Post[]> {
  const base = fileURLToPath(dir);
  const entries = await glob(base + "**", { absolute: true });
  return await Promise.all(
    entries.map((file) =>
      fs.readFile(file, { encoding: "utf-8" }).then((doc) => {
        const { content, data } = matter(doc)
        return {
          name: file.replace(base, "").replace(/\.mdx?$/, ""),
          data,
          content,
        };
      })
    )
  ) as Post[];
}

export async function getDrafts() {
  const drafts = await read(new URL("../../../drafts/", import.meta.url));
  for (const entry of drafts) {
    entry.data.draft = true;
  }
  return drafts;
}

export async function getPublishedPosts() {
  const drafts = await read(new URL("../../../posts/", import.meta.url));
  return drafts;
}

export async function getPosts() {
  const posts = await getPublishedPosts();
  if (import.meta.env.DEV) {
    posts.push(...await getDrafts())
  }
  return posts.sort((a, b) => {
    const aDate = a.data.date.valueOf();
    const bDate = b.data.date.valueOf();
    if (aDate < bDate) return 1;
    if (aDate > bDate) return -1;
    return 0;
  });
}

export async function getPost(id: string) {
  const posts = await getPublishedPosts();
  if (import.meta.env.DEV) {
    posts.push(...await getDrafts())
  }
  return posts.find((post) => post.name === id)!;
}
