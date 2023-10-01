import type { MetaFunction } from '@remix-run/node';
import { List, ThemeIcon, Title } from '@mantine/core';
import { IconCircleCheck, IconCircleDashed } from '@tabler/icons-react';
import '@mantine/core/styles.css';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export default function Index() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>
      <Title order={1} c='blue'>
        Welcome to Remix
      </Title>
      <List
        spacing='xs'
        size='sm'
        center
        icon={
          <ThemeIcon color='teal' size={24} radius='xl'>
            <IconCircleCheck size='1rem' />
          </ThemeIcon>
        }
      >
        <List.Item>
          <a
            target='_blank'
            href='https://remix.run/tutorials/blog'
            rel='noreferrer'
          >
            15m Quickstart Blog Tutorial
          </a>
        </List.Item>
        <List.Item>
          <a
            target='_blank'
            href='https://remix.run/tutorials/jokes'
            rel='noreferrer'
          >
            Deep Dive Jokes App Tutorial
          </a>
        </List.Item>
        <List.Item
          icon={
            <ThemeIcon color='blue' size={24} radius='xl'>
              <IconCircleDashed size='1rem' />
            </ThemeIcon>
          }
        >
          <a target='_blank' href='https://remix.run/docs' rel='noreferrer'>
            Remix Docs
          </a>
        </List.Item>
      </List>
    </div>
  );
}
