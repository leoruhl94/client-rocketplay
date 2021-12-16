import React, { useState } from "react";
import { useDispatch } from "react-redux";

import axios from "axios";
import { URL_BASE } from "../../../constants/constants";
import { useAuth } from "../../../auth/useAuth";
import { setToast } from "../../../redux/actions"
import { testFunction } from "../../../constants/functions";

interface InfoSubmit {
  schemaName: string;
  categoryId?: string;
  newName?: string;
}

interface Categories {
  name?: string;
  id?: number;
}
interface Channels {
  name?: string;
  id?: number;
}
interface SchemaName {
  name: string;
}
interface openRemove {
  divClass: string;
  buttonDisabled: boolean;
}
export const EditCategory: React.FC = () => {
  const auth = useAuth();
  const dispatch = useDispatch()
  const [schemaName, setSchemaName] = useState<SchemaName>();
  const [channelsState, setChannelsState] = useState<Channels[]>();
  const [categoryState, setCategoryState] = useState<Categories[]>();
  const [infoSubmit, setInfoSubmit] = useState<InfoSubmit>({
    schemaName: "",
    categoryId: "",
    newName: "",
  });

  const [openRemove, setOpenRemove] = useState({
    divClass: "remove-channel-div display__none",
    buttonDisabled: true,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!infoSubmit.schemaName || !infoSubmit.newName || !infoSubmit.categoryId) {
      !infoSubmit.schemaName && dispatch(setToast("Error: No schema name"));
      !infoSubmit.newName && dispatch(setToast("Error: No name"));
      !infoSubmit.categoryId &&
        dispatch(setToast("Error: No category selected"));
      testFunction();
      console.log("sale conejito porque no hay esquema", infoSubmit);
    } else {
      await axios.put(`${URL_BASE}/category`, infoSubmit);
      dispatch(setToast("Category updated"));
      testFunction();
    }
    setInfoSubmit({
      schemaName: "",
      categoryId: "",
      newName: "",
    });
  };

  const handleWorkspaceSelect = (e) => {
    e.preventDefault();
    setSchemaName(e.target.value);
    categoryState ? setCategoryState([]) : null;
    setInfoSubmit({
      schemaName: e.target.value,
      categoryId: "",
      newName: "",
    });
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
    const array = e.target.value.split("%-%");

    axios
      .get(`${URL_BASE}/category/bychannel`, {
        params: { schemaName: schemaName, channelId: array[1] },
      })
      .then((r) => {
        let array1: any[] = [];
        r.data.map((el) => {
          let obj = {
            name: el.catName,
            id: el.catId,
          };
          array1.push(obj);
          setCategoryState(array1);
        });
      });
  };

  const handleCategorySelect = (e) => {
    e.preventDefault();
    setInfoSubmit({ ...infoSubmit, categoryId: e.target.value });
  };

  const handleOnChange = (e) => {
    e.preventDefault();
    setInfoSubmit({ ...infoSubmit, newName: e.target.value });
  };

  const handleShow = (e) => {
    e.preventDefault();
    let div = document.querySelector(".remove-channel-div");
    setOpenRemove({ ...openRemove, divClass: "remove-channel-div" });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="Settings__selects ">
          <select
            onChange={handleWorkspaceSelect}
            name="schemaName"
            id=""
            className="SelectComponent Select__100w"
          >
            <option
              selected
              disabled
              value=""
              className="SelectComponent_option"
            >
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
        </div>
        <div className="Settings__selects ">
          {channelsState?.length ? (
            <select
              onChange={handleChannelSelect}
              name="oldName"
              id=""
              className="SelectComponent Select__50w"
            >
              <option selected value="" className="SelectComponent_option">
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
          {categoryState?.length ? (
            <select
              onChange={handleCategorySelect}
              className="SelectComponent Select__50w"
              name="category"
            >
              <option selected value="" disabled className="SelectComponent_option">
                Categories
              </option>
              {categoryState?.map((ca) => (
                <option
                  key={ca.id}
                  className="SelectComponent_option"
                  value={ca.id}
                >
                  {ca.name}
                </option>
              ))}
            </select>
          ) : null}
        </div>
        <div className="Settings__inputs_container">
          <label className="Settings__label">New name: </label>
          <input
            autoComplete="off"
            type="text"
            name="newName"
            value={infoSubmit.newName}
            onChange={handleOnChange}
            className="Settings__input"
          />
          <button type="submit" className="Settings__button">
            Edit Category
          </button>
        </div>
      </form>
    </div>
  );
};
