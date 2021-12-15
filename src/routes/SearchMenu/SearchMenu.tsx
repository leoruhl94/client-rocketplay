import React from "react";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { MenuToggleContainer } from "../../components/MenuToggleContainer/MenuToggleContainer";
import "./SearchMenu.scss";
import { URL_BASE } from "../../constants/constants";
import axios from "axios";
import { useState } from "react";
import { useAuth } from "../../auth/useAuth";
import { VideoItem } from "./VideoItem";

interface video {
  videoid: string;
  thumbnail: string;
  title: string;
  category: string;
  channelName: string;
}

interface Categories {
  name: string;
  id: number;
}

interface Channels {
  name: string;
  id: number;
}

interface InfoSubmit {
  schemaName: string;
  channel?: string;
  category?: string;
}

interface props {
  transition: any;
}
export const SearchMenu: React.FC<props> = ({ transition }) => {
  const auth = useAuth();
  const [schemaName, setSchemaName] = useState("");
  const [categoryState, setCategoryState] = useState<Categories[]>();
  const [channelsState, setChannelsState] = useState<Channels[]>();
  const [videos, setVideos] = useState<video[]>([]);
  const [infoSubmit, setInfoSubmit] = useState<InfoSubmit>({
    schemaName: "",
    channel: "",
    category: "",
  });

  const handleSubmit = async (value) => {
    console.log(schemaName);
    console.log(value);
    // setInfoSubmit({...infoSubmit, title: value})
    console.log(infoSubmit);
    if (!schemaName) {
      console.log("sale gatito porque no hay esquema");
    } else {
      let res = await axios.get(`${URL_BASE}/searchBar`, {
        params: { ...infoSubmit, title: value },
      });
      console.log(res.data);
      setVideos(res.data);
    }
  };

  const handleWorkspaceSelect = (e) => {
    e.preventDefault();
    setSchemaName(e.target.value);
    categoryState ? setCategoryState([]) : null;
    setInfoSubmit({
      schemaName: e.target.value,
      channel: "",
      category: "",
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
        let array: any[] = [];
        console.log(r.data);
        r.data.map((el) => {
          let obj = {
            name: el.catName,
            id: el.catId,
          };
          array.push(obj);
        });
        setCategoryState(array);
        console.log(array);
      });
    setInfoSubmit({ ...infoSubmit, channel: array[0], category: "" });
  };
  const handleCategorySelect = (e) => {
    e.preventDefault();
    setInfoSubmit({ ...infoSubmit, category: e.target.value });
  };

  return (
    <MenuToggleContainer transition={transition} k="001">
      <div className="SearchMenu__selects">
        <select
          onChange={handleWorkspaceSelect}
          name="schemaName"
          className="SelectComponent  Select__WP "
          id=""
        >
          <option disabled selected>
            Workspaces
          </option>
          {auth?.user?.workspacesTitles?.map((w, i) => (
            <option
              className="SelectComponent_option"
              key={i}
              value={
                auth?.user?.workspaces?.length ? auth.user.workspaces[i] : ""
              }
            >
              {w}
            </option>
          ))}
        </select>
        <div className="SearchMenu__selects_2 ">
          {channelsState?.length ? (
            <select
              onChange={handleChannelSelect}
              name="channels"
              className="SelectComponent Select__50w"
              id=""
            >
              <option disabled selected className="SelectComponent_option">
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
          {categoryState?.length ? (
            <select
              onChange={handleCategorySelect}
              className="SelectComponent Select__50w"
              name="category"
            >
              <option selected value="" className="SelectComponent_option">
                Categories
              </option>
              {categoryState?.map((ca) => (
                <option
                  key={ca.id}
                  className="SelectComponent_option"
                  value={ca.name}
                >
                  {ca.name}
                </option>
              ))}
            </select>
          ) : null}
        </div>
      </div>
      <SearchBar handler={handleSubmit} />
      <div className="">
        {videos.length > 0 ? (
          videos?.map((item) => (
            <VideoItem
              key={item.videoid}
              schemaName={schemaName}
              videoid={item.videoid}
              thumbnail={item.thumbnail}
              title={item.title}
              category={item.category}
              channelName={item.channelName}
            />
          ))
        ) : (
          <></>
        )}
      </div>
    </MenuToggleContainer>
  );
};
