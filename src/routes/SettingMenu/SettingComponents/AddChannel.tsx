import React, { useState } from "react";
import axios from "axios";
import { URL_BASE } from "../../../constants/constants";
import { useAuth } from "../../../auth/useAuth";

interface InfoSubmit {
  schemaName: string;
  name?: string;
}

export const AddChannel: React.FC = () => {
  const auth = useAuth();
  const [infoSubmit, setInfoSubmit] = useState<InfoSubmit>({
    schemaName: "",
    name: "",
  });
  //schemaName, name, isprivate, description
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!infoSubmit.schemaName) {
      console.log("sale gatito porque no hay esquema");
    } else {
      await axios.post(`${URL_BASE}/channels`, infoSubmit);
      setInfoSubmit({ ...infoSubmit, schemaName: e.target.value });
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
            <option value="all" className="SelectComponent_option">
              Workspaces
            </option>
            {/* {auth?.user?.workspacesTitles?.map((w, i) => (
            
          <option key={i} value={auth?.user?.workspaces?.length ? auth.user.workspaces[i] : ""} className="SelectComponent_option">
            {w}
          </option>
        ))}  */}
            {auth?.user?.myWorkspaces?.map((w, i) => (
              <option
                className="SelectComponent_option"
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
