import { Paper, Stack, Title, Text } from '@mantine/core';
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
    <Stack>
      <Stack>
        <Title order={1}>{item.title}</Title>
        <Text>
          by {item.by} on {new Date(item.time * 1000).toLocaleString()}
        </Text>
        <Text>
          <a href={item.url}>{item.url}</a>
        </Text>
      </Stack>
      <Title order={2}>Comments</Title>
      <Stack gap='xs'>
        {kids.map((kidsItem) => (
          <Paper key={kidsItem.id} shadow='xs' p='sm'>
            <Title order={3}>by: {kidsItem.by}</Title>
            <Text p='md'>{kidsItem.text}</Text>
            <Text px='md'>
              {new Date(kidsItem.time * 1000).toLocaleString()}
            </Text>
          </Paper>
        ))}
      </Stack>
    </Stack>
  );
}
