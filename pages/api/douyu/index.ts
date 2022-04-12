import type { NextApiRequest, NextApiResponse } from 'next';
import MD5 from '@/lib/md5'

const douyuStats = async (_: NextApiRequest, res: NextApiResponse) => {
    let timestamp = Date.parse(new Date().toString()).toString().slice(0,10);
    let key = 'VFCS4u6e6kpev7uO!t';
    let strb = '/api/thirdPart/token?aid=ttlive&time='+timestamp+key
    let auth = new MD5().hex_md5(strb);
    
    const token = await fetch(
        `http://openapi.douyu.com/api/thirdPart/token?aid=justdo&time=`+timestamp+`&auth=`+auth
    );

    let strc = '/api/thirdPart/getRoomInfo?aid=ttlive&time='+timestamp+'&token='+token+auth
    auth = new MD5().hex_md5(strc);

    const data = await fetch(
        `http://openapi.douyu.com/api/thirdPart/getRoomInfo?aid=justdo&time=`+timestamp+`&auth=`+auth
        +`&token=`+token
    );
    
    const stats  = await data.json();

    res.setHeader(
        'Cache-Control',
        'public, s-maxage=1200, stale-while-revalidate=600',
    );

    return res.status(200).json(stats);
};

export default douyuStats;
