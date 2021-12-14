import React, { useState } from "react";
import axios from "axios";
import { URL_BASE } from "../../../constants/constants";
import { useAuth } from "../../../auth/useAuth";

// /channels/status <= on delete

interface InfoSubmit {
  schemaName: string;
  oldName?: string;
  newName?: string;
}
export const EditChannel: React.FC = () => {
  const [infoSubmit, setInfoSubmit] = useState<InfoSubmit>({
    schemaName: "",
    oldName: "",
    newName: "",
  });
  const auth = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!infoSubmit.schemaName) {
      console.log("sale gatito porque no hay esquema");
    } else {
      await axios.put(`${URL_BASE}/channels`, infoSubmit);
    }
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
      <form onSubmit={handleSubmit}>
        <div>
          <select onChange={handleWorkspaceSelect} name="schemaName" id="">
            <option value="all">Workspaces</option>
            {auth?.user?.workspacesTitles?.map((w, i) => (
              <option
                key={i}
                value={
                  auth?.user?.workspaces?.length ? auth.user.workspaces[i] : ""
                }
              >
                {w}
              </option>
            ))}
          </select>
          <label>Current name: </label>
          <input
            type="text"
            name="oldName"
            value={infoSubmit.oldName}
            onChange={handleOnChange}
          />
          <label>New name: </label>
          <input
            type="text"
            name="newName"
            value={infoSubmit.newName}
            onChange={handleOnChange}
          />
          <button type="submit">Edit Channel</button>
        </div>
      </form>

      {/*====================================================================================================  */}
    </div>
  );
};
