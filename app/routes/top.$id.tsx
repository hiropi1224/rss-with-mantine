import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getItem } from '~/utils/hackerNews.server';

// paramsの値を使ってデータを取得する
export const loader = async ({ params }: { params: { id: string } }) => {
  const item = await getItem(params.id);

  const kidsItems = await Promise.all(
    item.kids.map((kidsItemId) => getItem(String(kidsItemId))),
  );

  return json({ item, kids: kidsItems });
};

export default function Item() {
  const { item, kids } = useLoaderData<typeof loader>();

  return (
    <article>
      <h1>{item.title}</h1>
      <p>
        by {item.by} on {new Date(item.time * 1000).toLocaleString()}
      </p>
      <p>
        <a href={item.url}>{item.url}</a>
      </p>
      <h2>Comments</h2>
      {kids.map((kidsItem) => (
        <div key={kidsItem.id}>
          <h3>by: {kidsItem.by}</h3>
          <p>{kidsItem.text}</p>
          <p>{new Date(kidsItem.time * 1000).toLocaleString()}</p>
          <hr />
        </div>
      ))}
    </article>
  );
}
