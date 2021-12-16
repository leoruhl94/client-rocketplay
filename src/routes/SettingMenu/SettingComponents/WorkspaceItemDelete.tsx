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

  // funncion onclick para el back pasando schema title y user a la ruta que sea
  const onClick = async (e) => {
    e.preventDefault()
    try{
      console.log('schemaName: ',schemaName, 'title: ', title)
      const result = await axios.put(`${URL_BASE}/workspace/leave`, {schemaName: schemaName, schemaTitle: title, userEmail: user})
      console.log('result.data: ', result.data)
      dispatch(setToast('Left workspace succesfully'))
      testFunction()
      auth?.refreshInfo()
    }catch(r){
      console.log(r);
      dispatch(setToast('Error: Please try again'))
      testFunction()
    }
    
  }

  return (
    <div className="WorkspaceItem">
      <span className="WorkspaceItem__Icon">
        <Icon svg="rocketColor" />
      </span>
      <div className="WorkspaceItem__section-delete">
      <h2 className="WorkspaceItem__Name">{title}</h2>
      <button className="WorkspaceItem__delete" onClick={onClick}>
        <Icon svg="leave" />
      </button>
      </div>
    </div>
  );
};
