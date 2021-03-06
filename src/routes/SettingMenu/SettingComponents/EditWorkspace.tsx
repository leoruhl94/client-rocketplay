import axios from "axios";
import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { Icon } from "../../../components/Icon/Icon";
import { useAuth } from "../../../auth/useAuth";
import { URL_BASE } from "../../../constants/constants";
import "./EditWorkspace.scss";
import { setToast } from "../../../redux/actions"
import { testFunction } from "../../../constants/functions";

export const EditWorkspace: React.FC = () => {
  const auth = useAuth();
  const dispatch = useDispatch()
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [schemaName, setSchemaName] = useState("");
  // useEffect(() => {
  //     axios.get(`${URL_BASE}/members?schemaName=${auth?.user?.workspaces && auth?.user?.workspaces[0]}`)
  //     .then(({data}) => {
  //         console.log(data)
  //     })
  // },[])
  const changeName = (e) => {
    e.preventDefault();
    setName(e.target.value);
    axios.put(`${URL_BASE}/workspace`, { schemaName, name });
    dispatch(setToast('Workspace updated successfully'))
    testFunction()
  };

  const onChangeName = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const onChangeCode = (e) => {
    e.preventDefault();
    setCode(e.target.value);
  };

  const changeCode = (e) => {
    e.preventDefault();
    setCode(e.target.value);
    axios.put(`${URL_BASE}/workspace`, { schemaName, code });
    dispatch(setToast('Workspace code updated successfully'))
    testFunction()
  };

  const handleWorkspaceSelect = (e) => {
    e.preventDefault();
    setSchemaName(e.target.value);
  };

  return (
    <div className="Settings__form">

      <select
        onChange={handleWorkspaceSelect}
        name="schemaName"
        id=""
        className="SelectComponent Select__100w"
      >
        <option selected value="all" className="SelectComponent_option">
          Workspaces
        </option>
        {auth?.user?.myWorkspaces?.map((w, i) => (
          <option
            key={i}
            value={
              auth?.user?.myWorkspaces?.length
                ? auth.user.myWorkspaces[i].name
                : ""
            }
            className="SelectComponent_option"
          >
            {w.name}
          </option>
        ))}
      </select>
      {/* <label className='Settings__label'>New name: </label>
            <input type='text' autoComplete='off' name='name' value={name} className="Settings__input" onChange={(e) => onChangeName(e)}></input>
            <button className='Settings__button' onClick={changeName}>Save Name</button> */}
     <div className="Settings__inputs_container" >

     
      <label className="Settings__label">New code: </label>
      <input
        type="text"
        autoComplete="off"
        name="code"
        value={code}
        className="Settings__input"
        onChange={(e) => onChangeCode(e)}
      ></input>
      <button className="Settings__button " onClick={changeCode}>
        Save Code
      </button>
      </div>
    </div>
  );
};
