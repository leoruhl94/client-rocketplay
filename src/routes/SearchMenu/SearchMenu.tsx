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

export const SearchMenu: React.FC = () => {
  const auth = useAuth();
  const [schemaName, setSchemaName] = useState(null);
  const [videos, setVideos] = useState<video[]>([]);
  const handleSubmit = async (value) => {
    console.log(schemaName);
    if (!schemaName) {
      console.log("gatito");
    } else {
      let res = await axios.get(`${URL_BASE}/searchBar`, {
        params: { schemaName, title: value },
      });
      console.log(res.data)
      setVideos(res.data);
    }
  };

  const handleSelect = (e) => {
    e.preventDefault();
    setSchemaName(e.target.value);
  };

  return (
    <MenuToggleContainer>
      <select onChange={handleSelect} name="schemaName" id="">
        <option value="all">Workspaces</option>
        {auth?.user?.workspacesTitles?.map((w, i) => (
            
          <option key={w} value={auth?.user?.workspaces?.length ? auth.user.workspaces[i] : ""}>
            {w}
          </option>
        ))} 
      </select>
      <SearchBar handler={handleSubmit} />
      <div className="">
        {
          videos.length > 0 ?
        videos?.map((item) => (
          <VideoItem
            key = {item.videoid}
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
import { Icon } from "src/components/Icon/Icon";

interface Props {
  videoid: string;
  thumbnail: string;
  title: string;
  category: string;
  channelName: string;
}
const VideoItem: React.FC<Props> = ({
  videoid,
  thumbnail,
  title,
  category,
  channelName,
}) => {
  return (
    <Link to={`/home/${videoid}`} className="VideoItem">
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
