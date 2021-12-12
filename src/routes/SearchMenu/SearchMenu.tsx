import React from "react";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { MenuToggleContainer } from "../../components/MenuToggleContainer/MenuToggleContainer";
import './SearchMenu.scss'
import { URL_BASE } from "../../constants/constants";
import axios from 'axios'

// const handleSubmit = async (e) => {
//     e.preventDefault();
   
//     let res = await axios.get(`${URL_BASE}/searchBar`, {
//       params: { schemaName:, title: },
//     });
   
//   };
export const SearchMenu: React.FC = () => {
  


    
    return(
        <MenuToggleContainer>

            <SearchBar handler={()=>console.log("")}/>
            
        </MenuToggleContainer>
     )
}



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
const VideoItem: React.FC<Props> = ({ videoid, thumbnail, title, category , channelName}) => {
  return (
    <Link to={`/home/${videoid}`} className="VideoItem">
      <div className="VideoItem__image_container">
        <img className="VideoItem__image" src={`https://rocketplay2021.s3.us-east-1.amazonaws.com/${thumbnail}`}/>
      </div>
      <div className="VideoItem__info">
      <h2 className="VideoItem__title">{title}</h2>
        <p className="VideoItem__channel_categorie">{`${category} > ${channelName}`}</p>
      </div>
    </Link>
  );
};
