import type { NextApiRequest, NextApiResponse } from 'next';

const bilibiliStats = async (_: NextApiRequest, res: NextApiResponse) => {
    const data = await fetch(
        `http://api.bilibili.com/x/web-interface/card?mid=2`
    );
    const stats = await data.json();

    const code = stats?.items[0]

    res.setHeader(
        'Cache-Control',
        'public, s-maxage=1200, stale-while-revalidate=600',
    );
    
    
    return res.status(200).json(code);
};

export default bilibiliStats;
