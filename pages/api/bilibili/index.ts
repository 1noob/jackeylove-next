import type { NextApiRequest, NextApiResponse } from 'next';

const bilibiliStats = async (_: NextApiRequest, res: NextApiResponse) => {
    // 阿水暂时没有 b 站认证号，先用他老父亲 rookie 的

    const up_interface = await fetch(
        `http://api.bilibili.com/x/web-interface/card?mid=1017081142`
    );

    const up_stat = await fetch(
        `https://api.bilibili.com/x/space/upstat?mid=1017081142&jsonp=jsonp`, {
            headers:{
                "Cookie": "SESSDATA=14442190%2C1665918513%2Caf92a%2A41"
            }
        }
    );

    const up_top_arc = await fetch(
      `http://api.bilibili.com/x/space/top/arc?vmid=1017081142`
    );


    // 阿水话题频道

    const channel = await fetch(
        `https://api.bilibili.com/x/web-interface/web/channel/detail?channel_id=1132582`
    );

    const channel_top_arc = await fetch(
        `https://api.bilibili.com/x/web-interface/web/channel/multiple/list?channel_id=1132582&sort_type=hot`
    );


    const upinterface_json = await up_interface.json();
    const upstat_json = await up_stat.json();
    const channel_json = await channel.json();
    const up_top_arc_json = await up_top_arc.json();
    const channel_top_arc_json = await channel_top_arc.json();

    const up_follower  = upinterface_json?.data.follower;
    const up_archive_count = upinterface_json?.data.archive_count;
    const up_view  = upstat_json?.data.archive.view;
    const up_top_arc_bv = up_top_arc_json?.data.bvid;


    const { subscribed_count, archive_count, view_count } = channel_json?.data;
    const channel_top_arc_bv = channel_top_arc_json.data.list[0].items[0].bvid;

    res.setHeader(
        'Cache-Control',
        'public, s-maxage=1200, stale-while-revalidate=600',
    );

    res.status(200).json({
            up_follower,
            up_view,
            up_archive_count,
            up_top_arc_bv,

            subscribed_count,
            archive_count,
            view_count,
            channel_top_arc_bv,
        }
    )
};



export default bilibiliStats;
