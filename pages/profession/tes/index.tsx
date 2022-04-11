import type { GetStaticProps, NextPage } from 'next';
import { groupByYear } from '@/lib/utils';
import Intro from '@/components/Intro';
import Note from '@/components/Note';
import Meta from '@/components/Meta';
import Section from '@/components/Section';
import EntryList from '@/components/EntryList';
import WorkEntry from '@/components/WorkEntry';

type TesProps = {
  title: string;
  description: string;
  meta: { [key: string]: string };
  currently: string;
  timeline: Array<{
    title: string;
    date: string;
    description?: string;
    link?: string;
    teammates?: Array<keyof typeof tesTeammates>;
  }>;
};

const tesTeammates: {
  [key: string]: {
    image: string;
    name: string;
    link: string;
  };
} = {
  knight: {
    image: '/img/knight.png',
    name: '卓定',
    link: 'https://lpl.qq.com/es/player_detail.shtml?mbid=2562',
  },
  Zhuo: {
    image: '/img/zhuo.png',
    name: '王旭卓',
    link: 'https://lpl.qq.com/es/player_detail.shtml?mbid=2295',
  },
  Tian: {
    image: '/img/tian.png',
    name: '高天亮',
    link: 'https://lpl.qq.com/es/player_detail.shtml?mbid=1458',
  },
  Zoom: {
    image: '/img/zoom.png',
    name: '张星冉',
    link: 'https://lpl.qq.com/es/player_detail.shtml?mbid=311',
  },
  369: {
    image: '/img/369.png',
    name: '白家浩',
    link: 'https://lpl.qq.com/es/player_detail.shtml?mbid=2147',
  },
  yuyanjia: {
    image: '/img/yuyanjia.png',
    name: '梁家源',
    link: 'https://lpl.qq.com/es/player_detail.shtml?mbid=1207',
  },
  Karsa: {
    image: '/img/karsa.png',
    name: '洪浩轩',
    link: 'https://lpl.qq.com/es/player_detail.shtml?mbid=53',
  },
  QiuQiu: {
    image: '/img/qiuqiu.png',
    name: '张明',
    link: 'https://lpl.qq.com/es/player_detail.shtml?mbid=1276',
  },
};

const tescorp: NextPage<TesProps> = ({
  title,
  description,
  meta,
  currently,
  timeline,
}) => {
  const groupedTimeline = groupByYear(timeline);
  return (
    <>
      <Intro title={title} description={description} />

      <Section>
        <a
          href="https://weibo.com/2144gaming"
          className="inline-flex sm:float-right mb-8"
        >
          <span className="sr-only">TOP E-SPORT</span>
          <svg
            aria-hidden={true}
            width="120"
            height="100%"
            viewBox="0 0 317 88"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
          {/*  svg-path*/}
          </svg>
        </a>

        <Meta
          items={Object.entries(meta).map(([title, description]) => {
            return {
              title,
              description,
            };
          })}
        />

        <div className="mt-12">
          <Note label="Currently" variant="violet">
            <span dangerouslySetInnerHTML={{ __html: currently }} />
          </Note>
        </div>
      </Section>

      {Object.entries(groupedTimeline)
        .reverse()
        .map(([year, items]) => {
          return (
            <Section heading={year} key={year}>
              <EntryList>
                {items.map((item, index) => {
                  return (
                    <WorkEntry
                      key={index}
                      title={item.title}
                      date={item.date}
                      link={item.link}
                      description={item.description}
                      teammates={item.teammates?.map((person) => {
                        return tesTeammates[person];
                      })}
                    />
                  );
                })}
              </EntryList>
            </Section>
          );
        })}
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const pageData = await import('@/data/tes.json');
  return {
    props: {
      ...pageData,
    },
  };
};

export default tescorp;
