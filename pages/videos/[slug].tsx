import type { GetStaticPaths, GetStaticProps } from 'next/types';
import { ParsedUrlQuery } from 'querystring';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import { getAllVideo, getVideo, VideoFrontMatter } from '@/lib/video';
import { components } from '@/components/MDXComponents';
import Intro from '@/components/Intro';
import Prose from '@/components/Prose';

interface ContextProps extends ParsedUrlQuery {
  slug: string;
}

type PostProps = VideoFrontMatter & {
  mdx: any;
};

const Post: React.FC<PostProps> = ({ slug, date, title, mdx }) => {
  return (
    <>
      <Intro date={date} title={title} views={`/video/${slug}`} />
      <Prose>
        <MDXRemote {...mdx} components={components} />
      </Prose>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllVideo();
  return {
    paths: posts.map((file) => {
      return {
        params: { slug: file.slug },
      };
    }),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as ContextProps;
  const { frontMatter, content } = getVideo(`${slug}.mdx`);
  const mdxContent = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    scope: frontMatter,
  });
  return {
    props: {
      ...frontMatter,
      mdx: mdxContent,
    },
  };
};

export default Post;
