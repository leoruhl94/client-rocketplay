import React from "react";
import "./homeClients.scss"
import avatar from "../../../images/avatar.png"

export const HomeClients: React.FC = () => {
    return (
        <div className="clientContainer">
            <img className="client" src={avatar} alt="placeholder" />
            <img className="client" src={avatar} alt="placeholder" />
            <img className="client" src={avatar} alt="placeholder" />
            <img className="client" src={avatar} alt="placeholder" />
            <img className="client" src={avatar} alt="placeholder" />
            <img className="client" src={avatar} alt="placeholder" />
            <img className="client" src={avatar} alt="placeholder" />
            <img className="client" src={avatar} alt="placeholder" />
            <img className="client" src={avatar} alt="placeholder" />
            <img className="client" src={avatar} alt="placeholder" />
            <img className="client" src={avatar} alt="placeholder" />
            <img className="client" src={avatar} alt="placeholder" />
        </div>
    )
}