import React from "react";
import { useParams } from "react-router";
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
            <div className="class-frame-container">
                <div className="class-frame-video-div">
                    {/* Frame */}
                    <h4>Video here</h4>
                </div>
                <div className="class-frame-text-div">
                    <div className="class-frame-text-title">
                        <h3>Titulo</h3>
                    </div>
                    <div className="class-frame-text-likes">
                        <h3>Likes</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}