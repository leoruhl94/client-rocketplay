import React from "react";
import { useParams } from "react-router";
import { VideoFrame } from "../Videos/VideoFrame/VideoFrame";
import "./Class.scss"

interface Props {
    class: string,
}

type idParams = {
    class: string
}

export const Class: React.FC<Props> = () => {

    let params = useParams<idParams>()
    console.log(params)

    return (
        <div className="class-super-container">
            <div className="class-title">
                <h1>Class N° {params.class}</h1>
            </div>
            <div className="class-video-super-container">
                <VideoFrame title="Testeando el titulo" likes={29} video="Aca iria una URL"/>
                <VideoFrame title="Una pruebita a ver que onda" likes={53} video="Aca iria una URL"/>
                <VideoFrame title="Y un titulo muy largo a ver si rompe" likes={87} video="Aca iria una URL"/>
                <VideoFrame title="Y un titulo muy largo a ver si rompe" likes={87} video="Aca iria una URL"/>
                <VideoFrame title="Y un titulo muy largo a ver si rompe" likes={87} video="Aca iria una URL"/>
                <VideoFrame title="Y un titulo muy largo a ver si rompe" likes={87} video="Aca iria una URL"/>
                <VideoFrame title="Y un titulo muy largo a ver si rompe" likes={87} video="Aca iria una URL"/>
                <VideoFrame title="Y un titulo muy largo a ver si rompe" likes={87} video="Aca iria una URL"/>
            </div>
        </div>
    )
}