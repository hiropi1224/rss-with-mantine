import Parser from 'rss-parser';

type FeedItem = {
  title: string;
  link: string;
  contentSnippet?: string;
  isoDate?: string;
  dateMiliSeconds: number;
};

function isValidUrl(str: string): boolean {
  try {
    const { protocol } = new URL(str);
    return protocol === 'http:' || protocol === 'https:';
  } catch {
    return false;
  }
}

const parser = new Parser();

async function fetchFeedItems(url: string) {
  const feed = await parser.parseURL(url);
  if (!feed?.items?.length) return [];

  return feed.items
    .map(({ title, contentSnippet, link, isoDate }) => {
      return {
        title,
        contentSnippet: contentSnippet?.replace(/\n/g, ''),
        link,
        isoDate,
        dateMiliSeconds: isoDate ? new Date(isoDate).getTime() : 0,
      };
    })
    .filter(
      ({ title, link }) => title && link && isValidUrl(link),
    ) as FeedItem[];
}

/** Zennの記事を取得する */
export async function getZennItem(topic: string): Promise<FeedItem[]> {
  const items = await fetchFeedItems(`https://zenn.dev/topics/${topic}/feed`);

  return items;
}

/** Userの記事を取得する */
export async function getZennUserItem(user: string): Promise<FeedItem[]> {
  const items = await fetchFeedItems(`https://zenn.dev/${user}/feed`);

  return items;
}
