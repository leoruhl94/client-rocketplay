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
interface Channels {
  name: string;
  id: number;
}
export const EditChannel: React.FC = () => {
  const [channelsState, setChannelsState] = useState<Channels[]>();
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
    console.log(infoSubmit, "<<<<<<<<<<<<");
  };
  const handleWorkspaceSelect = (e) => {
    e.preventDefault();
    axios
      .get(`${URL_BASE}/channels`, { params: { schemaName: e.target.value } })
      .then((r) => {
        let array: any[] = [];
        r.data.map((el) => {
          let obj = {
            name: el.name,
            id: el.id,
          };
          array.push(obj);
        });
        setChannelsState(array);
        setInfoSubmit({ ...infoSubmit, schemaName: e.target.value });
      });
  };

  const handleChannelSelect = (e) => {
    e.preventDefault();
    setInfoSubmit({ ...infoSubmit, oldName: e.target.value });
    console.log(e.target.value, "<= deberia ser oldname");
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
          {channelsState ? (
            <select onChange={handleChannelSelect} name="oldName" id="">
              <option value="all">Channels</option>
              {channelsState?.map((ch) => (
                <option key={ch.id} value={ch.name}>
                  {ch.name}
                </option>
              ))}
            </select>
          ) : null}
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
