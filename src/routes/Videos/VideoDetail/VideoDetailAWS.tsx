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

    const handleLike = () => {
        if(outline === "likeButton-displayed"){
            setOutline("likeButton-hidden")
            setSolid("likeButton-displayed")
        } else {
            setOutline("likeButton-displayed")
            setSolid("likeButton-hidden")
        }
    }

    useEffect(() => {
        axios.get(`${URL_BASE}/video?schemaName=${params.schema}&title=${params.title}`)
        .then(r => {
            let data = r.data[0]
            console.log(data)
            setVideoData({
                title: data.title,
                description: data.description,
                channelAvatar: data.channelavatar,
                workspace: data.workspace,
                thumbnail: data.thumbnail,
                username: data.username,
                videoId: data.videoid,
            })
            axios.get(`${URL_BASE}/comments?schemaName=${params.schema}&videoId=${data.videoid}`)
            .then((e) => {
                let array: any[] = []
                e.data.map(el => {
                    let obj = {
                        commentId: el.commentId,
                        memberName: el.memberName,
                        text: el.text,
                        videoTitle: el.videoTitle,
                        videoId: el.videoId,
                        schemaName: el.channelname,
                        timestamp: el.createdAt,
                    }
                    array.push(obj)
                })
                setCommentData(array)
            })
        })
        axios.get(`${URL_BASE}/members`, {params: {schemaName: params.schema, memberEmail: auth?.user?.email}})
        .then(r => {
            let data = r.data[0]
            setMember({
                memberId: data.id,
                memberEmail: data.mail,
                memberName: data.name,
                userType: data.usertype
            })
        })
    }, [])

    const [input, setInput] = useState("")

    const handleInput = (e) => {
        setInput(e.target.value)
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
                <h3 className="awsDetail-description-header">Description</h3>
                <p className="awsDetail-description">{videoData.description}</p>
            </div>
            {/* Comments */}
            <div className="awsDetail-comments-super-container">
                <div className="awsDetail-postcomment-container">
                    <form onSubmit={handleCommentSubmit}>
                        <input type="text" id="post-comment" className="awsDetail-postcomment-input" placeholder="Post a comment..." onChange={handleInput} value={input}/>
                        <button type="submit" className="awsDetail-postcomment-button">Submit Comment</button>
                    </form>
                </div>
                <div className="awsDetail-comments-container">
                    {
                        commentData.length > 0 ?
                        commentData.reverse().map(el => {
                            return (
                                <div className="awsDetail-single-comment" key={el.commentId}>
                                    <h4 className="awsDetail-comment-author">{el.memberName}</h4>
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