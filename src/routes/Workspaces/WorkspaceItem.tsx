import React from 'react'
import "./WorkspaceItem.scss";
import { Link } from "react-router-dom";
import { Icon } from "../../components/Icon/Icon";
import logo from "../../images/OnlyRocket.png"
interface Props {
  workspace: string;
  path: string;
}
export const WorkspaceItem: React.FC<Props> = ({ workspace, path }) => {
  return (
    <Link to={`/home/${path}`} className="WorkspaceItem">
      <span className="WorkspaceItem__Icon">
        {/* <Icon svg="rocketColor" /> */}
        <img src={logo} alt="alf" className="WorkspaceItem__img"/>
      </span>
      <h2 className="WorkspaceItem__Name">{workspace}</h2>
    </Link>
  );
};
