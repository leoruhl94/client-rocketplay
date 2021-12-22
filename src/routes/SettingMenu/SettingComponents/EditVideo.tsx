import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { URL_BASE } from "../../../constants/constants";
import { setToast } from "../../../redux/actions";
import { testFunction } from "../../../constants/functions";
import { useHistory, useLocation } from "react-router";
import {useAuth} from "../../../auth/useAuth"
import "./EditVideo.scss"
interface Props {
  schemaName: string;
  videoId: number;
  closeModal():void;
}

export const EditVideoTitle: React.FC<Props> = ({ schemaName, videoId, closeModal }) => {
  let history = useHistory();
//   let location: any = useLocation()
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  let auth = useAuth()

  const handleSubmit = (e) => {
    e.preventDefault();
    let obj = {
      schemaName: schemaName,
      newTitle: input,
      id: videoId,
    };
    console.log(obj);
    axios.put(`${URL_BASE}/video/editTitle`, obj);
    dispatch(setToast("Video title updated successfully"));
    testFunction();
    history.push(`/videodetail/${schemaName}/${obj.id}`);
    auth?.refreshInfo()
    closeModal()
    location.reload()
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className=" Settings__inputs_container">
      <div className="edit-video-title-div Settings__form">
        <input
          type="text"
          autoComplete="off"
          placeholder="New title.."
          id="edit-video-title"
          className="edit-video-title-input Settings__input"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="edit-video-button-submit Settings__button"
        >
          Change title
        </button>
      </div>
    </form>
  );
};

export const EditVideoDescription: React.FC<Props> = ({
  schemaName,
  videoId,
  closeModal
}) => {
  let history = useHistory();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let obj = {
      schemaName: schemaName,
      id: videoId,
      newDescription: input,
    };
    axios.put(`${URL_BASE}/video/editDescription`, obj);
    dispatch(setToast("Video Description updated successfully"));
    testFunction();
    closeModal()
    location.reload()
  };

  return (
      <form onSubmit={handleSubmit}>
        <div className="edit-video-title-div">
            <textarea
              placeholder="New description.."
              id="edit-video-description"
              className="edit-video-title-input-textarea Settings__input"
              onChange={handleChange}
            />
            <button
              type="submit"
              className="edit-video-button-submit Settings__button"
            >
              Change description
            </button>
        </div>
      </form>
  );
};
