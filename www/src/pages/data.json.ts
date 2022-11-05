import { getPosts } from "../utils/data";

export const get = async () => {
    const posts = await getPosts();
    return { body: JSON.stringify(posts, null, 2) }
}
