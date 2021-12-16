import React from "react";
import { useDispatch } from "react-redux";

// import "./WorkspaceItem.scss";
import { Link } from "react-router-dom";
import { Icon } from "../../../components/Icon/Icon";
import { useAuth } from "../../../auth/useAuth";
import axios from 'axios';
import { URL_BASE } from "../../../constants/constants";
import { setToast } from "../../../redux/actions";
import { testFunction } from "../../../constants/functions";
interface Props {
  title?: string;
  schemaName?: string;
}
export const WorkspaceItemDelete: React.FC<Props> = ({ schemaName, title }) => {
  const auth = useAuth();
  const user = auth?.user?.email;
  const dispatch = useDispatch()

  // funncion onclic para el back pasando schema title y user a la ruta que sea
  const onClick = async (e) => {
    e.preventDefault()
    const result = await axios.put(`${URL_BASE}/workspace/leave`, {schemaName: schemaName, schemaTitle: title, userEmail: user})
    dispatch(setToast('Leave workspace succesfully'))
    testFunction()
    auth?.refreshInfo() 
  }

  return (
    <div className="WorkspaceItem">
      <span className="WorkspaceItem__Icon">
        <Icon svg="rocketColor" />
      </span>
      <h2 className="WorkspaceItem__Name">{title}</h2>
      <button className="WorkspaceItem__delete" onClick={onClick}>
        <Icon svg="pencil" />
      </button>
    </div>
  );
};
