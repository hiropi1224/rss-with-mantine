import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getItem } from '~/utils/hackerNews.server';

// paramsの値を使ってデータを取得する
export const loader = async ({ params }: { params: { id: string } }) => {
  const item = await getItem(params.id);
  return json({ item });
};

export default function Item() {
  const { item } = useLoaderData<typeof loader>();

  return (
    <div id='article'>
      <h1>Article</h1>
      <p>{item.id}</p>
      <p>{item.title}</p>
      <p>
        by {item.by} on {new Date(item.time * 1000).toLocaleString()}
      </p>
      <p>
        <a href={item.url}>{item.url}</a>
      </p>
    </div>
  );
}
