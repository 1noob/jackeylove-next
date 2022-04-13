import type { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { cx, formatDate } from '@/lib/utils';
import { getLatestUpdate } from '@/lib/feed';
import { MDXRemote } from 'next-mdx-remote';
import { components } from '@/components/MDXComponents';
import Prose from '@/components/Prose';

type HomeProps = any;

const Home: NextPage<HomeProps> = ({ date, mdx }) => {
  return (
    <>
      <article
        className={cx(
          '-mt-4 relative w-full p-4 rounded-md border',
          'bg-white border-gray-200',
          'dark:bg-gray-800 dark:border-gray-700',
        )}
      >
        <span
          className={cx(
            'block w-4 h-4 absolute top-0 left-4 rotate-45 -translate-y-1/2 border border-r-0 border-b-0',
            'bg-white border-gray-200',
            'dark:bg-gray-800 dark:border-gray-700',
          )}
        />
        <Prose>
          <MDXRemote {...mdx} components={components} />
        </Prose>
        <p
          className={cx(
            'mt-4 text-sm flex justify-between flex-wrap gap-4',
            'text-gray-600',
            'dark:text-gray-300',
          )}
        >
          <span>&mdash; {formatDate(date, 'full')}</span>
          <Link href="/feed/tagged/update">
            <a className="underline">View more</a>
          </Link>
        </p>
      </article>

      <Prose className="mt-12">
        <h2>About</h2>
        <div className="relative float-right w-1/3 ml-4 md:ml-8 mb-4 md:mb-8 inline-flex rounded-md overflow-hidden">
          <Image
            src="/img/2018WorldChampion.jpeg"
            width={800}
            height={530}
            alt="graduate"
          />
        </div>
        <p>
          喻文波（游戏ID：JackeyLove），2000年11月18日出生于湖北省黄冈市，
          英雄联盟职业选手，司职ADC，现效力于滔搏电子竞技俱乐部。
        </p>
        <p>
          2018年正式登上LPL英雄联盟职业联赛的舞台，并在2018英雄联盟全球总决赛上以3:0击败FNC战队夺得LPL赛区首个世界赛冠军。
        </p>
        <h2>Colophon</h2>
        <p>
          本站的技术栈有 Next.js，Tailwind CSS，Framer Motion，React
          Aria，TypeScript，MDX，字体风格为 JetBrains Mono。
          代码保存在 Github 仓库，使用 Vercel 自动构建部署。
          —— 自娱自乐型水鬼
        </p>
      </Prose>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const update = await getLatestUpdate();
  return {
    props: {
      ...update,
    },
  };
};

export default Home;
