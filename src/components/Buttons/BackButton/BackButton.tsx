import React from "react";
import {Link} from "react-router-dom"
import { useHistory } from "react-router";
import "./backButton.scss";
export const BackButton: React.FC = () => {

    let history = useHistory()

    const handleBack = () => {
        history.goBack()
    }

    return (
        <div className="buttonContainer">
                <button className="backButton" onClick={() => handleBack()}>{"<-"}</button>
        </div>
    )
}
