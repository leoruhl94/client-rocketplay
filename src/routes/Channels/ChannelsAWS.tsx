import React, { useEffect, useState } from "react";
import { SingleChannelAWS } from "../../components/ChannelComponents/Channels/SingleChannelAWS";

import "./channels.scss";

import axios from "axios";
import { URL_BASE } from "../../constants/constants";
import { useParams } from "react-router";
import { Icon } from "../../components/Icon/Icon";
import { VideoForm } from "../Videos/VideoForm";
import { useOpen } from "../../Hooks/useOpen";
import { Modal } from "../../components/Modal/Modal";
import { useAuth } from "../../auth/useAuth";
interface Channels {
  channelId: number;
  channelName: string;
  isprivate: boolean;
  description: string;
  status: string;
}

interface Member {
  memberId: number;
  memberEmail: string;
  memberName: string;
  userType: string;
}

export const ChannelsAWS: React.FC = () => {
  let params: any = useParams();

  let auth = useAuth();

  const [member, setMember] = useState<Member>({
    memberId: 0,
    memberEmail: "",
    memberName: "",
    userType: "",
  });

  const [isOpenUpload, openUpload, closeUpload] = useOpen();
  const [add, setAdd] = useState(false);

  function handleAdd() {
    setAdd(!add);
  }

  const [channelsState, setChannelsState] = useState<Channels[]>([]);

  useEffect(() => {
    axios.get(`${URL_BASE}/channels?schemaName=${params.schema}`).then((r) => {
      let array: any[] = [];
      console.log(r.data);
      r.data.map((el) => {
        let obj = {
          channelId: el.id,
          channelName: el.name,
          isprivate: el.isprivate,
          description: el.description,
          status: el.status,
        };
        array.push(obj);
      });
      setChannelsState(array);
    });
    getMemberInfo();
  }, []);

  const getMemberInfo = async () => {
    let responseMembers = await axios.get(`${URL_BASE}/members`, {
      params: { schemaName: params.schema, memberEmail: auth?.user?.email },
    });
    let data = responseMembers.data[0];
    setMember({
      memberId: data.id,
      memberEmail: data.mail,
      memberName: data.name,
      userType: data.usertype,
    });
    // console.log(data.usertype)
  };

  return (
    <div className="singleChannelSuperContainer">
      <Modal fullWidth={true} isOpen={isOpenUpload} closeModal={closeUpload}>
        <VideoForm schemaName={params.schema} />
      </Modal>
      <div className="singleChannel-outer-div">
        <div className="awsChannels-flex-title-helper">
          <div className="awsChannels-title-mapped">
            <h4>Channels</h4>
          </div>
          {member.userType === "superadmin" || member.userType === "admin" ? (
            <button className="Channels__upload_button" onClick={openUpload}>
              <span>Upload </span>
              <Icon svg="upload" />
            </button>
          ) : (
            <></>
          )}
        </div>
        {channelsState.length > 0 ? (
          channelsState.map((el) => {
            if (el.status === "active") {
              return (
                <SingleChannelAWS
                  channel={el.channelName}
                  id={el.channelId}
                  key={el.channelId}
                />
              );
            } else {
              return <></>;
            }
          })
        ) : (
          <div>There are no channels here yet</div>
        )}
      </div>
    </div>
  );
};
