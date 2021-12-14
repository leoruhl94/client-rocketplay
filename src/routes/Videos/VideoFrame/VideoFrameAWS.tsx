import React, {useState, useEffect} from "react";
import "./videoFrame.scss";
import {Link} from "react-router-dom";
import like from "../../../images/like.png"

interface Props {
    schemaName: string;
    videoTitle: string;
    thumbnail: string;
    likes: number;
    timestamp: string;
}

export const VideoFrameAWS: React.FC<Props> = ({schemaName, videoTitle, thumbnail, likes, timestamp}) => {
    return (
        <Link to={`/videodetail/${schemaName}/${videoTitle}`} className="video-frame-link" key={videoTitle}>
        <div className="video-frame-container">
            <div className="video-frame-video-div">
                {/* Frame */}
                {/* <h4>{video}</h4> */}
                <img src={`https://rocketplay2021.s3.us-east-1.amazonaws.com/${thumbnail}`} alt="Thumbnail" className="video-frame-thumbnail"/>
            </div>
            <div className="video-frame-text-div">
                <div className="video-frame-text-title">
                    <h3>{videoTitle}</h3>
                </div>
                <div className="video-frame-text-likes">
                    <img src={like} alt="Like" className="video-frame-like" />
                    <h3>{likes}</h3>
                </div>
            </div>
            <div className="video-frame-timestamp-div">
                <div className="video-frame-timestamp">
                    <h4>{timestamp}</h4>
                </div>
            </div>
        </div>
        </Link>
    )
}