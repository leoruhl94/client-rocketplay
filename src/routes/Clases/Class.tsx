import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { VideoFrame } from "../Videos/VideoFrame/VideoFrame";
// import thumbnail from "../../images/individual-project-thumbnail.jpg";
import "./Class.scss"
import axios from "axios";
import { NavigationMobile } from "../../containers/NavigationMobile/NavigationMobile";
import { NavProfileAndLocation } from "../../containers/NavProfileAndLocation/NavProfileAndLocation";

interface Props {
    class: string,
}

type idParams = {
    class: string
}

export const Class: React.FC<Props> = ({class: string}) => {

    let params = useParams<idParams>()
    console.log(params)
    const [videoInfo, setVideoInfo] = useState({
        title: "Loading",
        thumbnail: "",
        videoId: "",
    })
    const [videos, setVideos] = useState<any>([])
     
    useEffect(() => {
        /* let id = "lQ3RtZ1QgQI"
        let api = ""
        let acc_token = "ya29.a0ARrdaM9tZyXZz3Kc2nYG1Z_YfubB1ocI5-idamHyDbC2knmQp6nrXQihsTfKS1Exym0VSGjaScM-joKbqt4T-3dtyjZ5VkeHwOlo9kufK7S4cbh4d3TH2znLcAweKp976l2jzH0Ml4GxdkJkdYKsNtoJBuL-"
        axios.get(`https://www.googleapis.com/youtube/v3/videos?part=id%2C+snippet&id=${id}&key=${api}`)
        .then(r => {
            console.log(r.data.items[0])
            setVideoInfo({
                title: r.data.items[0].snippet.title,
                thumbnail: r.data.items[0].snippet.thumbnails.medium.url,
                videoId: r.data.items[0].id
            })
        }) */

        //videos de Profe Julio
        const key = 'AIzaSyC9bk8qUluOXv5S4bWIj5_pwOUUF4qxnQg'
        const channelId = 'UCIkCzk3ezlAxX5r2OFlHLaQ'
        axios.get(`https://www.googleapis.com/youtube/v3/search?key=${key}&channelId=${channelId}&part=snippet,id&order=date&maxResults=15`)
        .then(r => {
            console.log(r.data.items)
            setVideos(r.data.items)
        })
    }, [])

    return (
        <><NavProfileAndLocation/>
        <div className="class-super-container">
            <div className="class-title">
                <h1>{params.class}</h1>
            </div>
            <div className="class-video-super-container">
            {/* <iframe width="420" height="315"
            src={`https://www.youtube.com/watch?v=fS5xIqJtyXk&ab_channel=AgustinBringas`}>
            </iframe> */}
                {videos.map(x => <VideoFrame title={x.snippet.title} likes={53} thumbnail={x.snippet.thumbnails.default.url} videoId={x.id.videoId} key={x.id.videoId}/>)}
                {/* <VideoFrame title={videoInfo.title} likes={29} thumbnail={videoInfo.thumbnail} videoId={videoInfo.videoId}/>
                <VideoFrame title="Una pruebita a ver que onda" likes={53} thumbnail={thumbnail} videoId={videoInfo.videoId}/>
                <VideoFrame title="Y un titulo muy largo a ver si rompe" likes={87} thumbnail={thumbnail} videoId={videoInfo.videoId}/>
                <VideoFrame title="Y un titulo muy largo a ver si rompe" likes={87} thumbnail={thumbnail} videoId={videoInfo.videoId}/>
                <VideoFrame title="Y un titulo muy largo a ver si rompe" likes={87} thumbnail={thumbnail} videoId={videoInfo.videoId}/>
                <VideoFrame title="Y un titulo muy largo a ver si rompe" likes={87} thumbnail={thumbnail} videoId={videoInfo.videoId}/>
                <VideoFrame title="Y un titulo muy largo a ver si rompe" likes={87} thumbnail={thumbnail} videoId={videoInfo.videoId}/>
                <VideoFrame title="Y un titulo muy largo a ver si rompe" likes={87} thumbnail={thumbnail} videoId={videoInfo.videoId}/> */}
            </div>
            <NavigationMobile></NavigationMobile>
        </div></>
    )
}