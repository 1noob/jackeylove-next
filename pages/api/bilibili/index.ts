import type { NextApiRequest, NextApiResponse } from 'next';

const bilibiliStats = async (_: NextApiRequest, res: NextApiResponse) => {
    const interface_data = await fetch(
        `http://api.bilibili.com/x/web-interface/card?mid=40201070`
    );

    // https://api.bilibili.com/x/space/upstat?mid=40201070&jsonp=jsonp

    const views_data = await fetch(
        `https://api.bilibili.com/x/space/upstat?mid=40201070&jsonp=jsonp`, {
            headers:{
                "Cookie": "SESSDATA=14442190%2C1665918513%2Caf92a%2A41"
            }
        }
    );

    const stats = await interface_data.json();
    const views = await views_data.json();

    const { follower } = stats?.data;
    const { view } = views?.data.archive;

    res.setHeader(
        'Cache-Control',
        'public, s-maxage=1200, stale-while-revalidate=600',
    );

    res.status(200).json({
            follower,
            view,
        }
    )
};



export default bilibiliStats;
