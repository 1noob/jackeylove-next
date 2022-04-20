import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { groupByYear } from '@/lib/utils';
import Intro from '@/components/Intro';
import Note from '@/components/Note';
import Meta from '@/components/Meta';
import Section from '@/components/Section';
import EntryList from '@/components/EntryList';
import WorkEntry from '@/components/WorkEntry';
import Image from 'next/image';
import { cx } from '@/lib/utils';
import {ParsedUrlQuery} from "querystring";

interface ContextProps extends ParsedUrlQuery {
  company: string;
}

type igProps = {
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
  recommendations: Array<{
    text: string;
    name: string;
    title: string;
    company: string;
    thumbnail: string;
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

const igcorp: NextPage<igProps> = ({
  title,
  description,
  meta,
  currently,
  timeline,
  recommendations
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

      <Section heading="Recommendations">
        <EntryList>
          {recommendations.map((item, index) => {
            return (
                <div key={index} className="flex flex-col sm:flex-row">
                  <div className="w-28 flex-shrink-0">
                    <div className="mb-4">
                      <Image
                          src={item.thumbnail}
                          alt={`${item.name} portrait`}
                          width={48}
                          height={48}
                          className="rounded-md w-full block"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p style={{ textIndent: '-.65rem' }}>“{item.text}”</p>
                    <p
                        className={cx(
                            'mt-4',
                            'text-gray-600',
                            'dark:text-gray-300',
                        )}
                    >
                      &mdash; {item.name}, {item.title}
                    </p>
                  </div>
                </div>
            );
          })}
        </EntryList>
      </Section>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const pageData = await import('@/data/ig.json');
  const workData = await import('@/data/work.json');
  return {
    props: {
      ...pageData,
      recommendations: workData.recommendations.filter(
          (r: any) => r.company.toLowerCase() === "iG".toLowerCase(),
      ),
    },
  };
};




export default igcorp;
