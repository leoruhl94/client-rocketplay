import React from "react";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { MenuToggleContainer } from "../../components/MenuToggleContainer/MenuToggleContainer";
import "./SearchMenu.scss";
import { URL_BASE } from "../../constants/constants";
import axios from "axios";
import { useState } from "react";
import { useAuth } from "../../auth/useAuth";

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

interface props{ 
    transition: any;
  } 
export const SearchMenu: React.FC<props> = ({transition}) => {
  const auth = useAuth();
  const [schemaName, setSchemaName] = useState("");
  const [categoryState, setCategoryState] = useState<Categories[]>()
  const [channelsState, setChannelsState] = useState<Channels[]>()
  const [videos, setVideos] = useState<video[]>([]);
  const [infoSubmit, setInfoSubmit] = useState<InfoSubmit>({
    schemaName: "",
    channel: "",
    category: ""
  })

  const handleSubmit = async (value) => {
    console.log(schemaName);
    console.log(value)
    // setInfoSubmit({...infoSubmit, title: value})
    console.log(infoSubmit)
    if (!schemaName) {
      console.log("sale gatito porque no hay esquema");
    } else {
      let res = await axios.get(`${URL_BASE}/searchBar`, {
        params: {...infoSubmit, title: value},
      });
      console.log(res.data)
      setVideos(res.data);

    }
  };

  const handleWorkspaceSelect = (e) => {
    e.preventDefault();
    setSchemaName(e.target.value);

    axios.get(`${URL_BASE}/channels`, {params: {schemaName: e.target.value}})
    .then(r => {
      let array:any[] = []
      r.data.map(el => {
        let obj = {
          name: el.name,
          id: el.id
        }
        array.push(obj)
      })
      setChannelsState(array)
      setInfoSubmit({...infoSubmit, schemaName: e.target.value})
    })
  };
  
  const handleChannelSelect = (e) => {
    e.preventDefault();
    const array = e.target.value.split("%-%")

    axios.get(`${URL_BASE}/category/bychannel`, {params: {schemaName: schemaName, channelId: array[1]}})
    .then(r => {
      let array:any[] = []
      r.data.map(el => {
        let obj = {
          name: el.name,
          id: el.id
        }
        array.push(obj)
      })
      setCategoryState(array)
    })
    setInfoSubmit({...infoSubmit, channel: array[0]})
  }
const handleCategorySelect = (e) => {
  e.preventDefault();
  setInfoSubmit({...infoSubmit, category: e.target.value})
}

  return (
    <MenuToggleContainer transition={transition} k="001">
      <select onChange={handleWorkspaceSelect} name="schemaName" id="">
        <option value="all">Workspaces</option>
        {auth?.user?.workspacesTitles?.map((w, i) => (
            
          <option key={i} value={auth?.user?.workspaces?.length ? auth.user.workspaces[i] : ""}>
            {w}
          </option>
        ))} 
      </select>
      {channelsState ? 
      <select onChange={handleChannelSelect} name="channels" id="">
        <option value="all">Channels</option>
        {channelsState?.map((ch) => (
            
          <option key={ch.id} value={ch.name + "%-%" + ch.id}>
            {ch.name}
          </option>
        ))} 
      </select> 
      : null
      }
      {categoryState ? 
      <select onChange={handleCategorySelect} name="category" >
        <option value="all">Categories</option>
        {categoryState?.map((ca) => (
            
          <option key={ca.id} value={ca.name}>
            {ca.name}
          </option>
        ))} 
      </select> 
      : null
      }
      <SearchBar handler={handleSubmit} />
      <div className="">
        {
          videos.length > 0 ?
        videos?.map((item) => (
          <VideoItem
            key = {item.videoid}
            schemaName={schemaName}
            videoid={item.videoid}
            thumbnail={item.thumbnail}
            title={item.title}
            category={item.category}
            channelName={item.channelName}
          />
        )) : <></>}
      </div>
    </MenuToggleContainer>
  );
};
// import './SearchMenu.scss'
// import { motion } from "framer-motion";

// interface props{ 
//     transition: any;
//   } 
// export const SearchMenu: React.FC<props> = ({transition}) => {
    
//     return(
//         <motion.div initial='out' animate='in' exit='out' variants={transition} transition={{type:'linear'}}>
//             <SearchBar/>
//             <h1>HOLA MUNDO</h1>
//         </motion.div>
//      )
// }



import "./VideoItem.scss";
import { Link } from "react-router-dom";
import { Icon } from "../../components/Icon/Icon";

interface Props {
  videoid: string;
  thumbnail: string;
  title: string;
  category: string;
  channelName: string;
  schemaName: string;
}
const VideoItem: React.FC<Props> = ({
  videoid,
  thumbnail,
  title,
  category,
  channelName,
  schemaName,
}) => {
  return (
    <Link to={`/videodetail/${schemaName}/${title}`} className="VideoItem">
      <div className="VideoItem__image_container">
        <img
          className="VideoItem__image"
          src={`https://rocketplay2021.s3.us-east-1.amazonaws.com/${thumbnail}`}
        />
      </div>
      <div className="VideoItem__info">
        <h2 className="VideoItem__title">{title}</h2>
        <p className="VideoItem__channel_category">{`${channelName} > ${category}`}</p>
      </div>
    </Link>
  );
};
