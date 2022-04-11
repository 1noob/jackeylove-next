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
  Rookie: {
    image: '/img/rookie.png',
    name: '宋义进',
    link: 'https://lpl.qq.com/es/player_detail.shtml?mbid=63',
  },
  TheShy: {
    image: '/img/theshy.png',
    name: '程璐',
    link: 'https://lpl.qq.com/es/player_detail.shtml?mbid=1478',
  },
  Ning: {
    image: '/img/ning.png',
    name: '高振宁',
    link: 'https://lpl.qq.com/es/player_detail.shtml?mbid=1479',
  },
  Baolan: {
    image: '/img/baolan.png',
    name: '王柳羿',
    link: 'https://lpl.qq.com/es/player_detail.shtml?mbid=611',
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
  const pageData = await import('@/data/ig.json');
  return {
    props: {
      ...pageData,
    },
  };
};

export default tescorp;
