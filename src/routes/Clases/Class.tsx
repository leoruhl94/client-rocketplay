import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { VideoFrame } from "../Videos/VideoFrame/VideoFrame";
import thumbnail from "../../images/individual-project-thumbnail.jpg";
import "./Class.scss"
import axios from "axios";

interface Props {
    class: string,
}

type idParams = {
    class: string
}

export const Class: React.FC<Props> = () => {

    let params = useParams<idParams>()
    console.log(params)
    const [videoInfo, setVideoInfo] = useState({
        title: "Loading",
        thumbnail: "",
        videoId: "",
    })
     
    useEffect(() => {
        let id = "lQ3RtZ1QgQI"
        let api = "AIzaSyBCy0Yk2-nAuN6OLO_bQnxR7r1AtmU5ytM"
        let acc_token = "ya29.a0ARrdaM9tZyXZz3Kc2nYG1Z_YfubB1ocI5-idamHyDbC2knmQp6nrXQihsTfKS1Exym0VSGjaScM-joKbqt4T-3dtyjZ5VkeHwOlo9kufK7S4cbh4d3TH2znLcAweKp976l2jzH0Ml4GxdkJkdYKsNtoJBuL-"
        axios.get(`https://www.googleapis.com/youtube/v3/videos?part=id%2C+snippet&id=${id}&key=${api}`)
        .then(r => {
            console.log(r.data.items[0])
            setVideoInfo({
                title: r.data.items[0].snippet.title,
                thumbnail: r.data.items[0].snippet.thumbnails.medium.url,
                videoId: r.data.items[0].id
            })
        })
    }, [])

    return (
        <div className="class-super-container">
            <div className="class-title">
                <h1>Class N° {params.class}</h1>
            </div>
            <div className="class-video-super-container">
            {/* <iframe width="420" height="315"
            src={`https://www.youtube.com/watch?v=fS5xIqJtyXk&ab_channel=AgustinBringas`}>
            </iframe> */}
                <VideoFrame title={videoInfo.title} likes={29} thumbnail={videoInfo.thumbnail} videoId={videoInfo.videoId}/>
                <VideoFrame title="Una pruebita a ver que onda" likes={53} thumbnail={thumbnail} videoId={videoInfo.videoId}/>
                <VideoFrame title="Y un titulo muy largo a ver si rompe" likes={87} thumbnail={thumbnail} videoId={videoInfo.videoId}/>
                <VideoFrame title="Y un titulo muy largo a ver si rompe" likes={87} thumbnail={thumbnail} videoId={videoInfo.videoId}/>
                <VideoFrame title="Y un titulo muy largo a ver si rompe" likes={87} thumbnail={thumbnail} videoId={videoInfo.videoId}/>
                <VideoFrame title="Y un titulo muy largo a ver si rompe" likes={87} thumbnail={thumbnail} videoId={videoInfo.videoId}/>
                <VideoFrame title="Y un titulo muy largo a ver si rompe" likes={87} thumbnail={thumbnail} videoId={videoInfo.videoId}/>
                <VideoFrame title="Y un titulo muy largo a ver si rompe" likes={87} thumbnail={thumbnail} videoId={videoInfo.videoId}/>
            </div>
        </div>
    )
}