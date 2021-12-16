import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { URL_BASE } from "../../../constants/constants";
import { useAuth } from "../../../auth/useAuth";
import { setToast } from "../../../redux/actions"
import { testFunction } from "../../../constants/functions";

interface InfoSubmit {
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

export const RemoveChannel: React.FC = () => {
  const dispatch = useDispatch()
  const [channelsState, setChannelsState] = useState<Channels[]>();
  const [infoSubmit, setInfoSubmit] = useState<InfoSubmit>({
    schemaName: "",
    channelId: "",
    status: "deleted",
  });
  const auth = useAuth();
  const [openRemove, setOpenRemove] = useState({
    divClass: "remove-channel-div display__none",
    buttonDisabled: true,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!infoSubmit.schemaName) {
      dispatch(setToast('Error: Please try again'));
      testFunction();
      console.log("sale gatito porque no hay esquema");
    } else {
      await axios.put(`${URL_BASE}/channels/status`, infoSubmit);
      dispatch(setToast(`${infoSubmit.schemaName} deleted successfully`))
    }
    setInfoSubmit({
      schemaName: "",
      channelId: "",
      status: "deleted",
    });
    setOpenRemove({
      ...openRemove,
      divClass: "remove-channel-div display__none",
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
      });
  };

  const handleShow = (e) => {
    e.preventDefault();
    let div = document.querySelector(".remove-channel-div");
    setOpenRemove({ ...openRemove, divClass: "remove-channel-div" });
  };

  const handleChannelSelect = (e) => {
    e.preventDefault();
    const array = e.target.value.split("%-%");
    setInfoSubmit({ ...infoSubmit, channelId: array[1] });
    setDisabled(false);
  };

  const handleDeleting = (e) => {
    e.preventDefault();
    let btn = document.getElementById("last-remove-btn");
    if (e.target.value === "delete") {
      setOpenRemove({ ...openRemove, buttonDisabled: false });
    } else {
      setOpenRemove({ ...openRemove, buttonDisabled: true });
    }
  };

  const [disabled, setDisabled] = useState(true);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="Settings__selects">
          <select
            onChange={handleWorkspaceSelect}
            name="schemaName Select__50w"
            id=""
            className="SelectComponent"
          >
            <option selected value="all" className="SelectComponent_option ">
              Workspaces
            </option>
            {auth?.user?.myWorkspaces?.map((w, i) => (
              <option
                key={i}
                className="SelectComponent_option"
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
          {channelsState?.length ? (
            <select
              onChange={handleChannelSelect}
              name="oldName"
              id=""
              className="SelectComponent Select__50w"
            >
              <option value="all" className="SelectComponent_option">
                Channels
              </option>
              {channelsState?.map((ch) => (
                <option
                  key={ch.id}
                  value={ch.name + "%-%" + ch.id}
                  className="SelectComponent_option"
                >
                  {ch.name}
                </option>
              ))}
            </select>
          ) : null}
        </div>
        <div className="Settings__inputs_container">
          <button
            type="button"
            onClick={(e) => handleShow(e)}
            className="Settings__button"
            disabled={disabled}
          >
            Remove Channel
          </button>
          <div className={`Settings__inputs_container ${openRemove.divClass}`}>
            <label className="Settings__label_delete">
              If you are sure about deleting this channel type: <span> delete</span>
            </label>
            <input
              type="text"
              onChange={handleDeleting}
              placeholder="deleted"
              autoComplete="off"
              className="Settings__input"
            ></input>
            <button
              type="submit"
              id="last-remove-btn"
              disabled={openRemove.buttonDisabled}
              className="Settings__button"
            >
              Confirm
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
