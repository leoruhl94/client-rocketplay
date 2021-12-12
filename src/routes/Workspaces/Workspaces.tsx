import React, { useEffect, useState } from "react";
import "./Workspaces.scss";
import { ProfileWnd } from "../Logins/Login-Register/ProfileWnd";
import { NavProfileAndLocation } from "../../containers/NavProfileAndLocation/NavProfileAndLocation";
import { AddWorkspace } from "./AddWorkspace/AddWorkspace";
import { Icon } from "../../components/Icon/Icon";
import axios from "axios";
import { URL_BASE } from "../../constants/constants";

import { useAuth } from "../../auth/useAuth";

export const Workspaces: React.FC = () => {
  const [add, setAdd] = useState(false);
  const auth = useAuth();

  function handleAdd() {
    setAdd(!add);
  }
  console.log("--", auth?.user?.workspaces);
  function handleFind() {}
  return (
    <>
      <NavProfileAndLocation />
      <AddWorkspace dep={add} handleAdd={handleAdd} />
      <section className="Workspaces__container">
        <div className="Workspaces__list">
          <h2
            className={`Workspaces__title ${
              !auth?.user?.workspaces ? "display__none" : ""
            }`}
          >
            You do not belong to a workspace yet
          </h2>

          {/* BORRAR ESTO QUE ESTA HARDCODEADO */}
          <WorkspaceItem workspace={"habia una vex"} />
          <WorkspaceItem workspace={"habia una vex"} />
          <WorkspaceItem workspace={"habia una vex"} />
          {/* BORRAR ESTO QUE ESTA HARDCODEADO */}

          {auth?.user?.workspaces
            ? auth.user.workspaces.map((item) => {
                return <WorkspaceItem key={item} workspace={item} />;
              })
            : ""}

          <div className="Workspaces__button_container">
            <button className="Workspaces__button" onClick={handleAdd}>
              Join a Workspace
              <span className="Workspaces__button_icon">
                <Icon svg="plusCircle" />
              </span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

import "./WorkspaceItem.scss";
import { Link } from "react-router-dom";
interface Props {
  workspace: string;
}
const WorkspaceItem: React.FC<Props> = ({ workspace }) => {
  return (
    <Link to={`/home/${workspace}`} className="WorkspaceItem">
      <span className="WorkspaceItem__Icon">
        <Icon svg="rocketColor" />
      </span>
      <h2 className="WorkspaceItem__Name">{workspace}</h2>
    </Link>
  );
};
