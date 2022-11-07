import rss from '@astrojs/rss';
import { getPosts } from '../utils/data';

const posts = await getPosts()

export const get = () => rss({
  title: 'Nate Moore\'s Feed',
  description: 'Short-form thoughts from Nate',
  site: import.meta.env.SITE,
  items: posts.map(post => ({
    link: new URL(`/p/${post.name}`, import.meta.env.SITE).toString(),
    title: post.id,
    pubDate: post.data.date,
  })),
});
