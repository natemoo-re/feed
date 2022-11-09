import fs from "node:fs/promises";
import glob from "fast-glob";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

export interface Post {
  id: string;
  name: string;
  data: { title: string, date: Date, draft?: boolean }
  content: string;
  verified?: boolean;
}

async function read(dir: URL): Promise<Post[]> {
  const base = fileURLToPath(dir);
  const entries = await glob(base + "**", { absolute: true });
  return await Promise.all(
    entries.map((file) =>
      fs.readFile(file, { encoding: "utf-8" }).then((doc) => {
        const { content, data } = matter(doc)
        const name = file.replace(base, "").replace(/\.mdx?$/, "");
        const id = name.split('/').pop();
        return {
          id,
          name,
          data,
          content,
          verified: id === "02vB7q6"
        };
      })
    )
  ) as Post[];
}

export async function getPublishedPosts() {
  let posts: Post[] = [];
  if (import.meta.env.PROD) {
    posts = await read(new URL("../../posts/", import.meta.url));
  } else {
    posts = await read(new URL("../../../posts/", import.meta.url));
  }
  return posts;
}

export async function getPosts() {
  const posts = await getPublishedPosts();
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
  return posts.find((post) => post.name === id)!;
}
