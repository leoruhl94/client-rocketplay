import React, {useEffect, useState} from "react";
import "./VideoDetailAWS.scss";
import {Icon} from "../../../components/Icon/Icon";
import axios from "axios";
import { URL_BASE } from "../../../constants/constants";
import { useParams } from "react-router";
import {useAuth} from "../../../auth/useAuth"

interface videoState {
    title: string;
    description: string;
    channelAvatar: string;
    workspace: string;
    thumbnail: string;
    username: string;
    videoId: number;
    timestamp: string;
}

interface commentsObj {
    commentId: number;
    memberName: string;
    text: string;
    videoTitle: string;
    videoId: number;
    schemaName: string;
    timestamp: string;
    memberId: number;
}

interface Member {
    memberId: number;
    memberEmail: string;
    memberName: string;
    userType: string;
}

export const VideoDetailAWS: React.FC = () => {

    let auth = useAuth()

    let params:any = useParams()

    const [commentData, setCommentData] = useState<commentsObj[]>([])

    const [videoData, setVideoData] = useState<videoState>({
        title: "Loading...",
        description: "Loading...",
        channelAvatar: "",
        workspace: "Loading...",
        thumbnail: "",
        username: "Loading...",
        videoId: 0,
        timestamp: "",
    })

    const [member, setMember] = useState<Member>({
        memberId: 0,
        memberEmail: "",
        memberName: "",
        userType: "",
    })

    // let schemaName = "Marcos"
    // let title = "demo+cubo"
    const [outline, setOutline] = useState("likeButton-displayed")
    const [solid, setSolid] = useState("likeButton-hidden")
    const [isLiked, setIsLiked] = useState<boolean>(false)

    const handlePostLike = () => {
        axios.post(`${URL_BASE}/likes`, {schemaName: params.schema, memberId: member.memberId, videoId: videoData.videoId})
        .then(r => console.log(r))
    }

    const handlePostDislike = () => {
        axios.put(`${URL_BASE}/likes`, {schemaName: params.schema, memberId: member.memberId, videoId: videoData.videoId})
        .then(r => console.log(r))
    }

    const handleLike = () => {
        if(outline === "likeButton-displayed"){
            setOutline("likeButton-hidden")
            setSolid("likeButton-displayed")
            handlePostLike()
        } else {
            setOutline("likeButton-displayed")
            setSolid("likeButton-hidden")
            handlePostDislike()
        }
    }

    useEffect(() => {
        handleLoadOfData()
    }, [])

    const handleLoadOfData = async () => {
        // Info about the video.. =========================================================
        let responseVideoData = await axios.get(`${URL_BASE}/video?schemaName=${params.schema}&title=${params.title}`)
            let dataVideo = responseVideoData.data[0]
            console.log(dataVideo.createdAt)
            let unformatedTimestamp = dataVideo.createdAt.split("T")[0]
            let split = unformatedTimestamp.split("-")
            let timestampVideo = `${split[2]}-${split[1]}-${split[0]}`
            setVideoData({
                title: dataVideo.title,
                description: dataVideo.description,
                channelAvatar: dataVideo.channelavatar,
                workspace: dataVideo.workspace,
                thumbnail: dataVideo.thumbnail,
                username: dataVideo.username,
                videoId: dataVideo.videoid,
                timestamp: timestampVideo
            })
        // Info about the comments.. ======================================================
        let responseComments = await axios.get(`${URL_BASE}/comments?schemaName=${params.schema}&videoId=${dataVideo.videoid}`)
            let arrayComments: any[] = []
            responseComments.data.map(el => {
                let unformatedTimestampDay = el.createdAt.split("T")[0]
                let unformatedTimestampHour = el.createdAt.split("T")[1]
                let hours = unformatedTimestampHour.split(":")
                let days = unformatedTimestampDay.split("-")
                let commentTimestamp = `${days[2]}-${days[1]}-${days[0]} / ${hours[0]}:${hours[1]}`
                let obj = {
                    commentId: el.commentId,
                    memberName: el.memberName,
                    text: el.text,
                    videoTitle: el.videoTitle,
                    videoId: el.videoId,
                    schemaName: el.channelname,
                    timestamp: commentTimestamp,
                }
                arrayComments.push(obj)
            })
            setCommentData(arrayComments)
        // Info about the members.. ========================================================
        let responseMembers = await axios.get(`${URL_BASE}/members`, {params: {schemaName: params.schema, memberEmail: auth?.user?.email}})
        let data = responseMembers.data[0]
        setMember({
            memberId: data.id,
            memberEmail: data.mail,
            memberName: data.name,
            userType: data.usertype
        })
        // Info about the likes.. ==========================================================
        let responseLikes = await axios.get(`${URL_BASE}/likes`, {params: {schemaName: params.schema, videoId: dataVideo.videoid, memberId: data.id}})
        console.log("RESPONSE LIKES =======",responseLikes.data)
        if(responseLikes.data.length === 0){
            setIsLiked(false)
            setOutline("likeButton-displayed")
            setSolid("likeButton-hidden")
        } else {
            setIsLiked(true)
            setOutline("likeButton-hidden")
            setSolid("likeButton-displayed")
        }
        
        
        // schemaName, videoId, memberId
    }

    const [input, setInput] = useState("")
    const [errors, setErrors] = useState({
        comments: "The comment should have at least 3 characters",
        disabled: true
    })

    const handleInput = (e) => {
        setInput(e.target.value)
        if(input.length > 2){
            setErrors({comments: "", disabled: false})
        }
    }

    const handleCommentSubmit = (e) => {
        e.preventDefault()
        axios.post(`${URL_BASE}/comments`, {
            schemaName: params.schema,
            description: input,
            videoId: videoData.videoId,
            memberId: member.memberId
        }).then(r => alert(r.data.message))
    }

    return (
        <>
        {/* <NavProfileAndLocation header={videoData.title}/> */}
        <div className="awsDetail-super-container">
            <div className="awsDetail-square-container">{/* Video Itself */}
                <div className="awsDetail-video-frame-div"> {/* Video Frame */}
                    <video controls className="awsDetail-video" width="250px" height="150px">
                        <source src={"https://rocketplay2021.s3.us-east-1.amazonaws.com/"+params.title}/>
                    </video>
                </div>
                <div className="awsDetail-author-container"> {/* Author Frame */}
                    <div className="awsDetail-avatar-div">{/* Avatar */}
                        <img src={videoData.channelAvatar} alt="" className="awsDetail-avatar" />
                    </div>
                    <div className="awsDetail-name-div">{/* Name */}
                        <h4 className="awsDetail-name">{videoData.username}</h4>
                    </div>
                    <div className="awsDetail-likes-div">{/* Likes */}
                        <button className={`likeButton likeButton-solid ${solid}`} onClick={() => handleLike()}>
                            <Icon svg="heartSolid" classes="likeIcons likeIcon"/>
                        </button>
                        <button className={`likeButton likeButton-outline ${outline}`} id="true" onClick={() => handleLike()}>
                            <Icon svg="heartOutline" classes="likeIcons dislikeIcon"/>
                        </button>
                    </div>
                </div>
            </div>
            <div className="awsDetail-description-container">{/* Description */}
                <div className="awsDetail-description-flex-helper">
                    <h3 className="awsDetail-description-header">Description</h3>
                    <h5 className="awsDetail-description-timestamp">{videoData.timestamp}</h5>
                </div>
                <p className="awsDetail-description">{videoData.description}</p>
            </div>
            {/* Comments */}
            <div className="awsDetail-comments-super-container">
                <div className="awsDetail-postcomment-container">
                    <form onSubmit={handleCommentSubmit}>
                        <input type="text" id="post-comment" className="awsDetail-postcomment-input" placeholder="Post a comment..." onChange={handleInput} value={input}/>
 
                        <button type="submit" className="awsDetail-postcomment-button" disabled={errors.disabled}>Submit Comment</button>
                    </form>
                </div>
                <div className="awsDetail-comments-container">
                    {
                        commentData.length > 0 ?
                        commentData.reverse().map(el => {
                            return (
                                <div className="awsDetail-single-comment" key={el.commentId}>
                                    <div className="awsDetail-single-flex-helper">
                                        <h4 className="awsDetail-comment-author">{el.memberName}</h4>
                                        <h5 className="awsDetail-comment-timestamp">{el.timestamp}</h5>
                                    </div>
                                    <p className="awsDetail-comment-p">{el.text}</p>
                                </div>
                            )
                        }) : <div className="awsDetail-comments-container">
                                <div className="awsDetail-single-comment">
                                    <h3>There's no comments here yet..</h3>
                                </div>
                            </div>
                    }
                </div>
            </div>
        </div>
     
        </>
    )
}