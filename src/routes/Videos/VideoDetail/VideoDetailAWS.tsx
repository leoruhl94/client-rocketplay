import React, {useEffect, useState} from "react";
import "./VideoDetailAWS.scss";
import {Icon} from "../../../components/Icon/Icon";
import axios from "axios";
import { URL_BASE } from "../../../constants/constants";
import { useParams } from "react-router";
import {useAuth} from "../../../auth/useAuth"
import { testFunction } from '../../../../src/constants/functions';
import { useDispatch } from "react-redux";
import { setToast } from "../../../redux/actions";
import {useOpen} from "../../../Hooks/useOpen"
import {Modal} from "../../../components/Modal/Modal"
import {EditVideoTitle, EditVideoDescription} from "../../../routes/SettingMenu/SettingComponents/EditVideo"
interface videoState {
    title: string;
    description: string;
    channelAvatar: string;
    workspace: string;
    thumbnail: string;
    username: string;
    videoId: number;
    timestamp: string;
    videoLink: string;
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
    const dispatch = useDispatch()
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
        videoLink: "",
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
        // let responseVideoData = await axios.get(`${URL_BASE}/video?schemaName=${params.schema}&title=${params.title}`)
        let responseVideoData = await axios.get(`${URL_BASE}/video/id?schemaName=${params.schema}&videoId=${params.title}`)
            let dataVideo = responseVideoData.data[0]
            console.log(dataVideo.createdAt)
            let unformatedTimestamp = dataVideo.createdAt.split("T")[0]
            let split = unformatedTimestamp.split("-")
            let timestampVideo = `${split[2]}-${split[1]}-${split[0]}`
            // NO TOCAR ESTE CONSOLE LOG --------- NO TOCAR ESTE CONSOLE LOG -----------
            console.log("EL LINK ======================", "https://rocketplay2021.s3.us-east-1.amazonaws.com/" + dataVideo.link.replace(/\s/g, "+"))
            // NO TOCAR ESTE CONSOLE LOG --------- NO TOCAR ESTE CONSOLE LOG -----------
            setVideoData({
                title: dataVideo.title,
                description: dataVideo.description,
                channelAvatar: dataVideo.channelavatar,
                workspace: dataVideo.workspace,
                thumbnail: dataVideo.thumbnail,
                username: dataVideo.username,
                videoId: dataVideo.videoid,
                timestamp: timestampVideo,
                videoLink: dataVideo.link
            })
        // Info about the comments.. ======================================================
        let responseComments = await axios.get(`${URL_BASE}/comments?schemaName=${params.schema}&videoId=${dataVideo.videoid}`)
            let arrayComments: any[] = []
            // let timezone = URL_BASE === "http://localhost:3002" ? 3 : 0
            responseComments.data.map(el => {
                let unformatedTimestampDay = el.createdAt.split("T")[0]
                let unformatedTimestampHour = el.createdAt.split("T")[1]
                let hours = unformatedTimestampHour.split(":")
                let days = unformatedTimestampDay.split("-")
                let commentTimestamp = `${days[2]}-${days[1]}-${days[0]} / ${hours[0]-3}:${hours[1]}`
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
        } else {
            setErrors({comments: "The comment should have at least 3 characters", disabled: true})
        }
    }

    const handleCommentSubmit = async (e) => {
        e.preventDefault()
        let a = await axios.post(`${URL_BASE}/comments`, {
            schemaName: params.schema,
            description: input,
            videoId: videoData.videoId,
            memberId: member.memberId
        })
        let responseComments = await axios.get(`${URL_BASE}/comments?schemaName=${params.schema}&videoId=${videoData.videoId}`)
            let arrayComments: any[] = []
            responseComments.data.map(el => {
                let unformatedTimestampDay = el.createdAt.split("T")[0]
                let unformatedTimestampHour = el.createdAt.split("T")[1]
                let hours = unformatedTimestampHour.split(":")
                let days = unformatedTimestampDay.split("-")
                let commentTimestamp = `${days[2]}-${days[1]}-${days[0]} / ${hours[0]-3}:${hours[1]}`
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
        
        setCommentData(arrayComments.reverse())
        setInput("")
        dispatch(setToast('Comment posted succesfully'))
        testFunction()
        setErrors({comments: "Already posted a comment", disabled: true})
        auth?.refreshInfo()
    }

    const [isOpenTitleModal, openTitleModal, closeTitleModal] = useOpen(false);

    const handleTitleModal = () => {
        openTitleModal()
    }

    const [isOpenDescriptionModal, openDescriptionModal, closeDescriptionModal] = useOpen(false);

    const handleDescriptionModal = () => {
        openDescriptionModal()
    }

    // "https://rocketplay2021.s3.us-east-1.amazonaws.com/"+params.title


    return (
        <>
        {/* <NavProfileAndLocation header={videoData.title}/> */}
        <div className="awsDetail-super-container">
            <Modal isOpen={isOpenTitleModal} closeModal={closeTitleModal}>
                <EditVideoTitle schemaName={params.schema} videoId={videoData.videoId} closeModal={closeTitleModal}/>
            </Modal>
            <Modal isOpen={isOpenDescriptionModal} closeModal={closeDescriptionModal}>
                <EditVideoDescription schemaName={params.schema} videoId={videoData.videoId} closeModal={closeDescriptionModal}/>
            </Modal>
            <div className="awsDetail-grid-helper">
                <div className="awsDetail-square-container">{/* Video Itself */}
                    <div className="awsDetail-video-frame-div"> {/* Video Frame */}
                        <div className="awsDetail-title-div">
                            <h4 className="awsDetail-title">{videoData.title}</h4>
                            {
                                member.userType === "superadmin" || member.userType === "admin" ? (
                                    <button onClick={() => handleTitleModal()} className="awsDetail-edit-button">
                                        <Icon svg="pencil" classes="awsDetail-edit-icon"/>
                                    </button>
                                ) : <></>
                            }
                        </div>
                        <div className="awsDetail-video-div">
                            {
                                videoData.videoLink !== "" ? (
                                    <video controls className="awsDetail-video" /* width="250px" height="150px" */>
                                        <source src={"https://rocketplay2021.s3.us-east-1.amazonaws.com/"+videoData.videoLink}/>
                                    </video>
                                ) : (<></>)
                            }
                        </div>
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
                        <div className="awsDetail-description-header-div">
                            <h3 className="awsDetail-description-header">Description</h3>
                            {
                                    member.userType === "superadmin" || member.userType === "admin" ? (
                                        <button onClick={() => handleDescriptionModal()} className="awsDetail-edit-button">
                                            <Icon svg="pencil" classes="awsDetail-edit-icon"/>
                                        </button>
                                    ) : <></>
                            }
                        </div>
                        <h5 className="awsDetail-description-timestamp">{videoData.timestamp}</h5>
                    </div>
                    <p className="awsDetail-description">{videoData.description}</p>
                </div>
            </div>
            {/* Comments */}
            <div className="awsDetail-comments-super-container">
                <div className="awsDetail-comments-container">
                    <div className="awsDetail-postcomment-container">
                        <form onSubmit={handleCommentSubmit}>
                            <input type="text" id="post-comment" autoComplete="off" className="awsDetail-postcomment-input" placeholder="Post a comment..." onChange={handleInput} value={input}/>
                            <button type="submit" className="Settings__button" disabled={errors.disabled}>Submit</button>
                        </form>
                    </div>
                    {
                        commentData.length > 0 ?
                        commentData.map(el => {
                            return (
                                <div className="awsDetail-single-comment" key={el.commentId}>
                                    <div className="awsDetail-single-flex-helper">
                                        <h4 className="awsDetail-comment-author">{el.memberName}</h4>
                                        <h5 className="awsDetail-comment-timestamp">{el.timestamp}</h5>
                                    </div>
                                    <p className="awsDetail-comment-p">{el.text}</p>
                                </div>
                            )
                        }) :    <div className="awsDetail-single-comment">
                                    <h3>There are no comments here yet..</h3>
                                </div>
                    }
                </div>
            </div>
        </div>
     
        </>
    )
}