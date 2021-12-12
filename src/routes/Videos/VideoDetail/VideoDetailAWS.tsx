import React from "react";
import "./VideoDetailAWS.scss";
import {Icon} from "../../../components/Icon/Icon";
import { NavProfileAndLocation } from "../../../containers/NavProfileAndLocation/NavProfileAndLocation";
import { NavigationMobile } from "../../../containers/NavigationMobile/NavigationMobile";
import axios from "axios";

export const VideoDetailAWS: React.FC = () => {

    return (
        <>
        <NavProfileAndLocation header="Testing AWS"/>
        <div className="awsDetail-super-container">
            <div className="awsDetail-square-container">{/* Video Itself */}
                <div className="awsDetail-video-frame-div"> {/* Video Frame */}
                    <video controls className="awsDetail-video" width="250px" height="150px">
                        <source src="https://rocketplay2021.s3.us-east-1.amazonaws.com/demo+cubo"/>
                    </video>
                </div>
                <div className="awsDetail-author-container"> {/* Author Frame */}
                    <div className="awsDetail-avatar-div">{/* Avatar */}
                        <img src="https://rocketplay2021.s3.us-east-1.amazonaws.com/Test+1thumb" alt="" className="awsDetail-avatar" />
                    </div>
                    <div className="awsDetail-name-div">{/* Name */}
                        <h4 className="awsDetail-name">Testing Name</h4>
                    </div>
                    <div className="awsDetail-likes-div">{/* Likes */}
                        <Icon svg="heartSolid" classes="likeIcons likeIcon"/>
                        <Icon svg="heartOutline" classes="likeIcons dislikeIcon"/>
                    </div>
                </div>
            </div>
            <div className="awsDetail-description-container">{/* Description */}
                <h3 className="awsDetail-description-header">Description</h3>
                <p className="awsDetail-description">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt expedita accusantium voluptatem, ad perspiciatis officia qui ex facere nulla itaque labore voluptatibus harum asperiores dolor porro, adipisci ducimus. Quidem, non?</p>
            </div>
            {/* <div className="awsDetail-comments-container">
                <div className="awsDetail-single-comment">
                    <h3>There's no comments here yet..</h3>
                </div>
            </div> */}
            <div className="awsDetail-comments-container">
                <div className="awsDetail-single-comment">
                    <h4 className="awsDetail-comment-author">Author</h4>
                    <p className="awsDetail-comment-p">Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, ducimus.</p>
                </div>
                <div className="awsDetail-single-comment">
                    <h4 className="awsDetail-comment-author">Author</h4>
                    <p className="awsDetail-comment-p">Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, nesciunt? Nostrum quod possimus nobis deserunt in neque rem natus tempore?</p>
                </div>
            </div>
        </div>
        <NavigationMobile/>
        </>
    )
}