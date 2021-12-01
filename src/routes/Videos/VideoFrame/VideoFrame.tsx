import React from "react";
import "./videoFrame.scss";
import like from "../../../images/like.png"
import {Link} from "react-router-dom";

interface Props {
    title: string,
    video: string,
    likes: number,
}

export const VideoFrame: React.FC<Props> = ({title, video, likes}) => {
    return (
        <Link to="" className="video-frame-link">
        <div className="video-frame-container">
            <div className="video-frame-video-div">
                {/* Frame */}
                <h4>{video}</h4>
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