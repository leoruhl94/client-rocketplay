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
interface InfoSubmit2 {
  schemaName: string;
  channelId?: string;
  status?: string;
}
interface Channels {
  name: string;
  id: number;
}
interface openRemove {
  divClass: string;
  buttonDisabled: boolean;
}

export const EditChannel: React.FC = () => {
  const [channelsState, setChannelsState] = useState<Channels[]>();
  const [infoSubmit, setInfoSubmit] = useState<InfoSubmit>({
    schemaName: "",
    oldName: "",
    newName: "",
  });
  const [infoSubmit2, setInfoSubmit2] = useState<InfoSubmit2>({
    schemaName: "",
    channelId: "",
    status: "deleted",
  });
  const auth = useAuth();
  const [openRemove, setOpenRemove] = useState(
    {
      divClass: "remove-channel-div display__none",
      buttonDisabled: true
    }
  );
  
  // ============================== EDIT CHANNEL ======================================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!infoSubmit.schemaName) {
      console.log("sale gatito porque no hay esquema");
    } else {
      await axios.put(`${URL_BASE}/channels`, infoSubmit);
    }
    setInfoSubmit({
      schemaName: "",
      oldName: "",
      newName: "",
    });
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
        setInfoSubmit2({ ...infoSubmit2, schemaName: e.target.value });
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

  // ============================== REMOVE CHANNEL ======================================================

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    if (!infoSubmit.schemaName) {
      console.log("sale gatito porque no hay esquema");
    } else {
      console.log("LLGUE ACA");
      await axios.put(`${URL_BASE}/channels/status`, infoSubmit2);
    }
    console.log("Y aca no");
    setInfoSubmit2({
      schemaName: "",
      channelId: "",
      status: "deleted",
    });
  };

  const handleShow = (e) => {
    e.preventDefault();
    let div = document.querySelector(".remove-channel-div");
    // div && div.setAttribute("className", "remove-channel-div")
    setOpenRemove({...openRemove, divClass: "remove-channel-div"});
    // Aca hacer q el div de elminar aparezca
  };



  const handleChannelSelect2 = (e) => {
    e.preventDefault();
    const array = e.target.value.split("%-%");
    setInfoSubmit2({ ...infoSubmit2, channelId: array[1] });
  };

  const handleDeleting = (e) => {
    e.preventDefault();
    let btn = document.getElementById("last-remove-btn");
    if (e.target.value === "deleted") {
      // habilitar el boton para eliminarlo
      // btn && btn.setAttribute("disabled", "false");
      setOpenRemove({...openRemove, buttonDisabled: false})
    } else {
      // deshabilitar el boton para eliminarlo
      // btn && btn.setAttribute("disabled", "true");
      setOpenRemove({...openRemove, buttonDisabled: true})
    }
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
      <form onSubmit={handleSubmit2}>
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
            <select onChange={handleChannelSelect2} name="oldName" id="">
              <option value="all">Channels</option>
              {channelsState?.map((ch) => (
                <option key={ch.id} value={ch.name + "%-%" + ch.id}>
                  {ch.name}
                </option>
              ))}
            </select>
          ) : null}
          <button type="button" onClick={(e) => handleShow(e)}>
            Remove Channel
          </button>
          <div className={`${openRemove.divClass}`}>
            <label>
              If you are sure about deleting this channel type 'deleted'
            </label>
            <input
              type="text"
              onChange={handleDeleting}
              placeholder="deleted"
            ></input>
            <button type="submit" id="last-remove-btn" disabled={openRemove.buttonDisabled}>
              Remove Channel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
