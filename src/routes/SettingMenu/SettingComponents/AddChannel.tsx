import React, { useState } from "react";
import axios from "axios";
import { URL_BASE } from "../../../constants/constants";
import { useAuth } from "../../../auth/useAuth";
import { setToast } from "../../../redux/actions";
import { testFunction } from "../../../constants/functions";
import { useDispatch } from 'react-redux'
interface InfoSubmit {
  schemaName: string;
  name?: string;
}

export const AddChannel: React.FC = () => {
  const auth = useAuth();
  const dispatch = useDispatch()
  const [infoSubmit, setInfoSubmit] = useState<InfoSubmit>({
    schemaName: "",
    name: "",
  });
  //schemaName, name, isprivate, description
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!infoSubmit.schemaName) {
      console.log("sale gatito porque no hay esquema");
      dispatch(setToast('Error: Please try again'))
      testFunction()
    } else {
      await axios.post(`${URL_BASE}/channels`, infoSubmit);
      setInfoSubmit({ ...infoSubmit, schemaName: e.target.value });
      dispatch(setToast('Channel added succesfully'))
      testFunction()
    }
    setInfoSubmit({
      schemaName: "",
      name: "",
    });
  };

  const handleWorkspaceSelect = (e) => {
    e.preventDefault();
    setInfoSubmit({ ...infoSubmit, schemaName: e.target.value });
  };

  const handleOnChange = (e) => {
    e.preventDefault();
    setInfoSubmit({
      ...infoSubmit,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="Settings__form">
        <div className="Settings__selects">
          <select
            onChange={handleWorkspaceSelect}
            name="schemaName"
            id=""
            className="SelectComponent Select__100w"
          >
            <option selected value="" className="SelectComponent_option Select__50w">
              Workspaces
            </option>
            {/* {auth?.user?.workspacesTitles?.map((w, i) => (
            
          <option key={i} value={auth?.user?.workspaces?.length ? auth.user.workspaces[i] : ""} className="SelectComponent_option">
            {w}
          </option>
        ))}  */}
            {auth?.user?.myWorkspaces?.map((w, i) => (
              <option
                className="SelectComponent_option Select__50w"
                key={i}
                value={
                  auth?.user?.myWorkspaces?.length
                    ? auth.user.myWorkspaces[i].name
                    : ""
                }
              >
                {w.name}
              </option>
            ))}
          </select>
            
          </div>
          <div className="Settings__inputs_container">
          <label className="Settings__label">Channel Name: </label>
          <input
            type="text"
            autoComplete="off"
            className="Settings__input"
            name="name"
            value={infoSubmit.name}
            placeholder="Name..."
            onChange={handleOnChange}
          />
          <button type="submit" className="Settings__button">
            Add Channel
          </button>
        </div>
      </form>
    </div>
  );
};
