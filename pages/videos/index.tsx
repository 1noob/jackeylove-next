import { GetStaticProps, NextPage } from 'next';
import useSWR from 'swr';
import type { GroupByYear } from '@/lib/utils';
import { groupByYear, fetcher, slugify } from '@/lib/utils';
import Card from '@/components/Card';
import Entry from '@/components/Entry';
import EntryList from '@/components/EntryList';
import Intro from '@/components/Intro';
import Section from '@/components/Section';
import ExternalLink from '@/components/ExternalLink';
import MD5 from '@/lib/md5';
import BilibiliVideo from '@/components/BilibiliVideo'


type Video = {
  title: string;
  date: string;
  id: string;
  tags: Array<string>;
};

type VideoProps = {
  title: string;
  description: string;
  videos: GroupByYear<Video>;
};

const Videos: NextPage<VideoProps> = ({ title, videos, description }) => {
  const { data } = useSWR('/api/bilibili', fetcher);

  // 这玩意是异步的，不能实时 console.log
  const u_follower = data?.up_follower;
  const u_view = data?.up_view;
  const u_archive = data?.up_archive_count;
  const u_top_arc_bv = data?.up_top_arc_bv;

  const c_follower = data?.subscribed_count;
  const c_archive = data?.archive_count;
  const c_view = data?.view_count;
  const c_top_arc_bv = data?.channel_top_arc_bv;



  return (
    <>
      <Intro title={title} description={description}/>

      <Section heading="Channel">
        <ul className="grid sm:grid-cols-2 gap-4">
          <li className="flex flex-col">
            <Card eyebrow="subscribers" variant="gray">
              <p className="mt-2 text-4xl">
                {c_follower ? c_follower : '-'}
              </p>
            </Card>
          </li>
          <li className="flex flex-col">
            <Card eyebrow="archives" variant="gray">
              <p className="mt-2 text-4xl">
                {c_archive ? c_archive : '-'}
              </p>
            </Card>
          </li>
          <li className="flex flex-col">
            <Card eyebrow="views" variant="gray">
              <p className="mt-2 text-4xl">
                {c_view ? c_view : '-'}
              </p>
            </Card>
          </li>
          <li className="grid place-items-center p-4">
            <ExternalLink
                href="https://www.bilibili.com/v/channel/1132582"
                hostname={false}
            >
              Subscribe on Bilibili
            </ExternalLink>
          </li>
        </ul>
        <br/>
        <div className="relative aspect-video">
          <iframe
              className="w-full h-full absolute inset-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              title="Bilibili video player"
              src={`//player.bilibili.com/player.html?bvid=${c_top_arc_bv}&page=1`}
              scrolling="no"
              frameBorder="no"
              allowFullScreen
          ></iframe>
        </div>
      </Section>

      <Section heading="V5_Rookie">
        <ul className="grid sm:grid-cols-2 gap-4">
          <li className="flex flex-col">
            <Card eyebrow="subscribers" variant="gray">
              <p className="mt-2 text-4xl">
                {u_follower ? u_follower : '-'}
              </p>
            </Card>
          </li>
          <li className="flex flex-col">
            <Card eyebrow="archives" variant="gray">
              <p className="mt-2 text-4xl">
                {u_archive ? u_archive : '-'}
              </p>
            </Card>
          </li>
          <li className="flex flex-col">
            <Card eyebrow="views" variant="gray">
              <p className="mt-2 text-4xl">
                {u_view
                  ? new Intl.NumberFormat('cn', { notation: 'compact' }).format(
                      u_view,
                    )
                  : '-'}
              </p>
            </Card>
          </li>
          <li className="grid place-items-center p-4">
            <ExternalLink
                href="https://space.bilibili.com/1017081142"
                hostname={false}
            >
              Subscribe on Bilibili
            </ExternalLink>
          </li>
        </ul>
        <br/>
        <div className="relative aspect-video">
          <iframe
              className="w-full h-full absolute inset-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              title="Bilibili video player"
              src={`//player.bilibili.com/player.html?bvid=${u_top_arc_bv}&page=1`}
              scrolling="no"
              frameBorder="no"
              allowFullScreen
          ></iframe>
        </div>
      </Section>

      {Object.entries(videos)
        .reverse()
        .map(([year, yearVideos]) => {
          return (
            <Section key={year} heading={year}>
              <EntryList>
                {yearVideos.map((video, index) => {
                  const link = `/videos/${video.id}`;
                  return (
                    <Entry
                      key={index}
                      link={link}
                      date={video.date}
                      title={video.title}
                      tags={video.tags.map((tag) => {
                        return {
                          path: `/videos/tagged/${slugify(tag)}`,
                          tag: tag,
                        };
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
  const pageData = await import('@/data/videos.json');
  const groupedVideos = groupByYear<Video>(pageData.videos);
  return {
    props: {
      ...pageData,
      videos: groupedVideos,
    },
  };
};

export default Videos;
