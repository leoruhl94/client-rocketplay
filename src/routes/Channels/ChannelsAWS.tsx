import React, { useEffect, useState } from "react";
import { SingleChannelAWS } from "../../components/ChannelComponents/Channels/SingleChannelAWS";

import "./channels.scss";
import { NavProfileAndLocation } from "../../containers/NavProfileAndLocation/NavProfileAndLocation";
// import { AddChannel } from "../../components/ChannelComponents/AddChannel/AddChannel";
import axios from "axios";
import { URL_BASE } from "../../constants/constants";
import { useParams } from "react-router";
import { Icon } from "../../components/Icon/Icon";
import { VideoForm } from "../Videos/VideoForm";
import { useOpen } from "../../Hooks/useOpen";
import { Modal } from "../../components/Modal/Modal";
interface Channels {
  channelId: number;
  channelName: string;
  isprivate: boolean;
  description: string;
  status: string;
}

export const ChannelsAWS: React.FC = () => {
  let params: any = useParams();
  const [isOpenUpload, openUpload, closeUpload] = useOpen();
  const [add, setAdd] = useState(false);

  function handleAdd() {
    setAdd(!add);
  }

  const [channelsState, setChannelsState] = useState<Channels[]>([]);

  useEffect(() => {
    axios.get(`${URL_BASE}/channels?schemaName=${params.schema}`).then((r) => {
      let array: any[] = [];
      console.log(r.data)
      r.data.map((el) => {
        let obj = {
          channelId: el.id,
          channelName: el.name,
          isprivate: el.isprivate,
          description: el.description,
          status: el.status
        };
        array.push(obj);
      });
      setChannelsState(array);
    });
  }, []);
  return (
    <div className="singleChannelSuperContainer">
      <Modal fullWidth={true} isOpen={isOpenUpload} closeModal={closeUpload}>
        <VideoForm schemaName={params.schema}/>
      </Modal>
      <div className="singleChannel-outer-div">
      <button className="Channels__upload_button" onClick={openUpload}>
        <span>Upload </span>
        <Icon svg="upload" />
      </button>
        {channelsState.length > 0 ? (
          channelsState.map((el) => {
              if(el.status === 'active'){
                  
                  return <SingleChannelAWS channel={el.channelName} id={el.channelId} key={el.channelId} />
                  
              } else { return <></>}
            
          })
        ) : (
          <div>There are no channels here yet</div>
        )}
      </div>
    </div>
  );
};
