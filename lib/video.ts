import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export type VideoFrontMatter = {
    slug: string;
    date: string;
    title: string;
    link?: string;
    tags?: Array<string>;
};

const root = process.cwd();

export const getVideo = (fileName: string) => {
    const fullPath = path.join(path.join(root, 'content/video'), fileName);
    const docSource = fs.readFileSync(fullPath, 'utf-8');
    const { data, content } = matter(docSource);
    return {
        frontMatter: {
            ...data,
            slug: fileName.replace('.mdx', ''),
        } as VideoFrontMatter,
        content,
    };
};

export const getAllVideo = () => {
    const posts = fs
        .readdirSync(path.join(root, 'content/video'))
        .map((fileName) => getVideo(fileName)['frontMatter']);
    return posts;
};
