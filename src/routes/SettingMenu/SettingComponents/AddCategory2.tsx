import React, { useState } from "react";
import axios from "axios";
import { URL_BASE } from "../../../constants/constants";
import { useAuth } from "../../../auth/useAuth";
import "./AddCategory.scss";

interface SchemaName {
  name: string;
}
interface Channels {
  name: string;
  id: number;
}
interface InfoSubmit {
  schemaName: string;
  channelId?: string;
  name?: string;
}
export const AddCategory2: React.FC = () => {
  const auth = useAuth();
  const [schemaName, setSchemaName] = useState<SchemaName>();
  const [channelsState, setChannelsState] = useState<Channels[]>();
  const [infoSubmit, setInfoSubmit] = useState<InfoSubmit>({
    schemaName: "",
    channelId: "",
    name: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!schemaName) {
      console.log("sale gatito porque no hay esquema");
    } else {
      await axios.post(`${URL_BASE}/category`, infoSubmit);
    }
    setInfoSubmit({
      ...infoSubmit,
      name: "",
    });
  };

  const handleWorkspaceSelect = (e) => {
    e.preventDefault();
    setSchemaName(e.target.value);

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
  const handleOnChange = (e) => {
    e.preventDefault();
    setInfoSubmit({
      ...infoSubmit,
      name: e.target.value,
    });
  };
  console.log(infoSubmit);

  const handleChannelSelect = (e) => {
    e.preventDefault();
    const array = e.target.value.split("%-%");

    axios
      .get(`${URL_BASE}/category/bychannel`, {
        params: { schemaName: schemaName, channelId: array[1] },
      })
      .then((r) => {
        let array: any[] = [];
        r.data.map((el) => {
          let obj = {
            name: el.name,
            id: el.id,
          };
          array.push(obj);
        });
      });
    setInfoSubmit({ ...infoSubmit, channelId: array[1] });
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="Settings__form">
        <div className="Settings__selects">
          <select
            onChange={handleWorkspaceSelect}
            className="SelectComponent Select__50w"
            name="schemaName"
            id=""
          >
            <option value="all" className="SelectComponent_option">
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
              className="SelectComponent Select__50w"
              name="channels"
              id=""
            >
              <option value="all" className="SelectComponent_option">
                Channels
              </option>
              {channelsState?.map((ch) => (
                <option
                  key={ch.id}
                  className="SelectComponent_option"
                  value={ch.name + "%-%" + ch.id}
                >
                  {ch.name}
                </option>
              ))}
            </select>
          ) : null}
            
          </div>
          <div className="Settings__inputs_container">
          <input
            autoComplete="off"
            className="Settings__input"
            type="text"
            name="category name"
            placeholder="Name..."
            onChange={handleOnChange}
            value={infoSubmit.name}
          />
          <button className="Settings__button" type="submit">
            Add Category
          </button>
        </div>
      </form>
    </div>
  );
};
