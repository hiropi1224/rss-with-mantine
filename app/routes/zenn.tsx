import {
  Text,
  Group,
  Card,
  Button,
  Grid,
  Container,
  Title,
} from '@mantine/core';
import { Link, useLoaderData } from '@remix-run/react';
import { getZennItem, getZennUserItem } from '~/utils/zenn.server';

// サーバーサイドでデータを取得する
export const loader = async () => {
  const itemList = await getZennItem('react');
  const feedList = await getZennUserItem('shiro12');

  return { itemList, feedList };
};

export default function TopRoute() {
  // loaderで取得済みのデータを取り出す
  const { itemList, feedList } = useLoaderData<typeof loader>();
  console.log(feedList, 'feed');

  return (
    <Container>
      <Group>
        <Title>Post</Title>
        <Grid>
          {feedList.map((feed, i) => (
            <Grid.Col key={i} span={6}>
              <Card shadow='sm' padding='lg' radius='md' withBorder>
                <Group justify='space-between' mt='md' mb='xs'>
                  <Text fw={500} lineClamp={1}>
                    {feed.title}
                  </Text>
                </Group>
                <Text size='sm' c='dimmed' lineClamp={3}>
                  {feed.contentSnippet}
                </Text>
                <Link to={feed.link}>
                  <Button
                    variant='light'
                    color='blue'
                    fullWidth
                    mt='md'
                    radius='md'
                  >
                    記事を見る
                  </Button>
                </Link>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </Group>
      <Group>
        <Title>Zenn Topics</Title>
        <Grid>
          {itemList.map((item, i) => (
            <Grid.Col key={i} span={6}>
              <Card shadow='sm' padding='lg' radius='md' withBorder>
                <Group justify='space-between' mt='md' mb='xs'>
                  <Text fw={500} lineClamp={1}>
                    {item.title}
                  </Text>
                </Group>
                <Text size='sm' c='dimmed' lineClamp={3}>
                  {item.contentSnippet}
                </Text>
                <Link to={item.link}>
                  <Button
                    variant='light'
                    color='blue'
                    fullWidth
                    mt='md'
                    radius='md'
                  >
                    記事を見る
                  </Button>
                </Link>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </Group>
    </Container>
  );
}
