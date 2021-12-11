import React, { useEffect, useState } from "react";
import { SingleChannel } from "../../components/ChannelComponents/Channels/SingleChannel";
import { ChannelNotFound } from "../../components/ChannelComponents/ChannelNotFound/ChannelNotFound";
import "./Workspaces.scss";
import { useSelector } from "react-redux";
import { ProfileWnd } from "../Logins/Login-Register/ProfileWnd";
import { NavProfileAndLocation } from "../../containers/NavProfileAndLocation/NavProfileAndLocation";
import { Link } from "react-router-dom";
import { AddChannel } from "../../components/ChannelComponents/AddChannel/AddChannel";

export const Workspaces: React.FC = () => {
  // useEffect(()=> {localStorage.setItem('lastRoute', '/home')}, [])

  const [add, setAdd] = useState(false);

  function handleAdd() {
    setAdd(!add);
  }

  return (
    <div>
      <NavProfileAndLocation />
      {/* <ChannelNotFound/> */}
      <AddChannel dep={add} handleAdd={handleAdd} />
      <div className="singleChannelSuperContainer">
        <div className="singleChannel-outer-div">
          <SingleChannel channel="Workspace 1" />
          <SingleChannel channel="Workspace 2" />
          <SingleChannel channel="Workspace 3" />
          <SingleChannel channel="Workspace 4" />
          <div className="channelsAddChannel2">
            <h4>Join a Workspace </h4>
            <button onClick={handleAdd}>+</button>
          </div>
        </div>
        {/* <Link to="/createVids">
                    <button >Crear un video</button>
                    </Link> */}
      </div>
    </div>
  );
};
