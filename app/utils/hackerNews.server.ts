/** Hacker Newsの人気・最新の記事500件の記事IDを取得する */
export async function getTopStories() {
  return fetch('https://hacker-news.firebaseio.com/v0/topstories.json').then(
    (res) => res.json(),
  );
}

/** 記事の詳細データを取得する */
export async function getItem(id: string): Promise<Item> {
  return fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(
    (res) => res.json(),
  );
}

interface Item {
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  text: string;
  time: number;
  title: string;
  type: string;
  url: string;
}
