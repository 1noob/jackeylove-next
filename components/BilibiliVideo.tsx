type VideoProps = {
    bv: string;
};

const BilibiliVideo = ({ bv }: VideoProps) => {
    return (
        <div className="relative aspect-video">
            <iframe
                className="w-full h-full absolute inset-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                title="Bilibili video player"
                src={`//player.bilibili.com/player.html?bvid=${bv}&page=1`}
                scrolling="no"
                frameBorder="no"
                allowFullScreen
            ></iframe>
        </div>
    );
};

export default BilibiliVideo;
