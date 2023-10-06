import { Text, Group, Card, Button, Grid, Container } from '@mantine/core';
import { Link, useLoaderData } from '@remix-run/react';
import { getZennItem } from '~/utils/zenn.server';

// サーバーサイドでデータを取得する
export const loader = async () => {
  const item = await getZennItem();

  return item;
};

export default function TopRoute() {
  // loaderで取得済みのデータを取り出す
  const data = useLoaderData<typeof loader>();

  return (
    <Container>
      <Grid>
        {data.map((item, i) => (
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
    </Container>
  );
}
