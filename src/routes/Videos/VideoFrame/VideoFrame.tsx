import React from "react";
import "./videoFrame.scss";
import like from "../../../images/like.png"
import {Link} from "react-router-dom";

interface Props {
    title: string,
    thumbnail: string,
    likes: number,
    videoId: string,
}

export const VideoFrame: React.FC<Props> = ({title, thumbnail, likes, videoId}) => {
    return (
        <Link to={`/videodetail/${videoId}`} className="video-frame-link" key={videoId}>
        <div className="video-frame-container">
            <div className="video-frame-video-div">
                {/* Frame */}
                {/* <h4>{video}</h4> */}
                <img src={thumbnail} alt="Thumbnail" className="video-frame-thumbnail"/>
            </div>
            <div className="video-frame-text-div">
                <div className="video-frame-text-title">
                    <h3>{title}</h3>
                </div>
                <div className="video-frame-text-likes">
                    <img src={like} alt="Like" className="video-frame-like" />
                    <h3>{likes}</h3>
                </div>
            </div>
        </div>
        </Link>
    )
}