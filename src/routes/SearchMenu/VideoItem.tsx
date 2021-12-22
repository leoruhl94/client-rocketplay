
import "./VideoItem.scss";
import { Link } from "react-router-dom";
import { Icon } from "../../components/Icon/Icon";
import React from "react";


interface Props {
  videoid: string;
  thumbnail: string;
  title: string;
  category: string;
  channelName: string;
  schemaName: string;
}
export const VideoItem: React.FC<Props> = ({
  videoid,
  thumbnail,
  title,
  category,
  channelName,
  schemaName,
}) => {
  return (
    <Link to={`/videodetail/${schemaName}/${videoid}`} className="VideoItem">
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
