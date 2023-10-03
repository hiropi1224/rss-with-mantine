import { AppShell, Group, Burger, Title, List, ThemeIcon } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useLoaderData, Link, Outlet } from '@remix-run/react';
import { IconCircleCheck, IconCircleDashed } from '@tabler/icons-react';
import { getItem, getTopStories } from '~/utils/hackerNews.server';

type Summary = {
  id: string;
  title: string;
};

// サーバーサイドでデータを取得する
export const loader = async () => {
  // 500件のデータを取得する
  const top500Ids: string[] = await getTopStories();
  // 上位20件のIDだけに絞り込む
  const topIds = top500Ids.slice(0, 20);
  // 上位20件の記事データを取得する
  const top: Summary[] = await Promise.all(topIds.map((id) => getItem(id)));
  // 記事データのIDとタイトルだけに絞り込む
  const topSummary = top.map((item) => ({
    id: item.id,
    title: item.title,
  }));
  // idとtitleのみのオブジェクトが20件入った配列を返す
  return topSummary;
};

// /top のURLで表示するページのコンポーネント
export default function TopRoute() {
  // loaderで取得済みのデータを取り出す
  const data = useLoaderData<typeof loader>();
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding='md'
    >
      <AppShell.Header>
        <Group h='100%' px='md'>
          <Burger opened={opened} onClick={toggle} hiddenFrom='sm' size='sm' />
          <Title>Hacker News Viewer</Title>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p='md'>
        <List
          spacing='xs'
          size='md'
          center
          icon={
            <ThemeIcon color='teal' size={24} radius='xl'>
              <IconCircleCheck size='1rem' />
            </ThemeIcon>
          }
        >
          {data.map((item) => (
            <List.Item
              key={item.id}
              icon={
                <ThemeIcon color='blue' size={24} radius='xl'>
                  <IconCircleDashed size='1rem' />
                </ThemeIcon>
              }
            >
              {/* (3) タイトルをリンクにする */}
              <Link to={`/top/${item.id}`}>{item.title}</Link>
            </List.Item>
          ))}
        </List>
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
