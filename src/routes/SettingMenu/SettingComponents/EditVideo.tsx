import React, { useState } from "react";
import axios from "axios";
import { URL_BASE } from "../../../constants/constants";

interface Props {
    schemaName: string;
    videoId: number;
}

export const EditVideoTitle: React.FC<Props> = ({schemaName, videoId}) => {

    const [input, setInput] = useState("")
    
    const handleSubmit = (e) => {
        e.preventDefault()
        let obj = {
            schemaName: schemaName,
            newTitle: input,
            id: videoId
        }
        axios.put(`${URL_BASE}/videos/editTitle`, obj)
    }

    const handleChange = (e) => {
        setInput(e.target.value)
    }

    return (
        <div className="edit-video-title-div">
            <form onSubmit={handleSubmit}>
                <input type="text" autoComplete="off" placeholder="New title.." id="edit-video-title" className="edit-video-title-input" onChange={handleChange}/>
                <button type="submit" className="edit-video-button-submit">Change title</button>
            </form>
        </div>
    )
}

export const EditVideoDescription: React.FC<Props> = ({schemaName, videoId}) => {

    const [input, setInput] = useState("")

    const handleChange = (e) => {
        setInput(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let obj = {
            schemaName: schemaName,
            id: videoId,
            newDescription: input
        }
        axios.put(`${URL_BASE}/videos/editDescription`, obj)
    }

    return (
        <div className="edit-video-description-div">
            <form onSubmit={handleSubmit}>
                <textarea placeholder="New description.." id="edit-video-description" className="edit-video-description-input" onChange={handleChange}/>
                <button type="submit" className="edit-video-button-submit">Change description</button>
            </form>
        </div>
    )
}