import { AppShell, Group, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useLoaderData, Link } from '@remix-run/react';
import { getItem, getTopStories } from '~/utils/hackerNews.server';

// (1) サーバーサイドでデータを取得する
export const loader = async () => {
  // 500件のデータを取得する
  const top500Ids: string[] = await getTopStories();
  // 上位20件のIDだけに絞り込む
  const topIds = top500Ids.slice(0, 20);
  // 上位20件の記事データを取得する
  const top = await Promise.all(topIds.map((id) => getItem(id)));
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
  // (2) loaderで取得済みのデータを取り出す
  const data = useLoaderData<
    {
      id: any;
      title: any;
    }[]
  >();
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
          <h1>Hacker News Viewer</h1>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p='md'>
        <ul>
          {data.map((item) => (
            <li key={item.id}>
              {/* (3) タイトルをリンクにする */}
              <Link to={`/top/${item.id}`}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </AppShell.Navbar>
      <AppShell.Main>Main</AppShell.Main>
    </AppShell>
  );
}
