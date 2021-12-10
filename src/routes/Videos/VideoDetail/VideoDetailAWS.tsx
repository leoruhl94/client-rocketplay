import React from "react";
import "./VideoDetailAWS.scss";

export const VideoDetailAWS: React.FC = () => {

    let json = localStorage.getItem("user")
    let parsed = json && JSON.parse(json)



    return (
        <div className="awsDetail-super-container">
            <div className="awsDetail-square-container">{/* Video Itself */}
                <div className="awsDetail-video-frame-div"> {/* Video Frame */}
                    <video controls className="awsDetail-video" width="250px" height="150px">
                        <source src="https://rocketplay2021.s3.us-east-1.amazonaws.com/demo+cubo"/>
                    </video>
                </div>
                <div className="awsDetail-author-container"> {/* Author Frame */}
                    <div className="awsDetail-avatar-div">{/* Avatar */}
                        <img src={parsed.pic} alt="" />
                    </div>
                    <div className="awsDetail-name-div">{/* Name */}
                        <h4>{parsed.name}</h4>
                    </div>
                    <div className="awsDetail-likes-div">{/* Likes */}

                    </div>
                </div>
            </div>
            <div className="awsDetail-description-container">{/* Description */}

            </div>
        </div>
    )
}