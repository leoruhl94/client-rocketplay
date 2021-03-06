import React, { useState } from "react";
import { useDispatch } from 'react-redux'
import axios from "axios";
import { URL_BASE } from "../../../constants/constants";
import { useAuth } from "../../../auth/useAuth";
import { setToast } from "../../../redux/actions"
import { testFunction } from "../../../constants/functions";


interface InfoSubmit {
  schemaName: string;
  oldName?: string;
  newName?: string;
}

interface Channels {
  name: string;
  id: number;
}
interface openRemove {
  divClass: string;
  buttonDisabled: boolean;
}

export const EditChannel: React.FC = () => {
  const dispatch = useDispatch()
  const [channelsState, setChannelsState] = useState<Channels[]>();
  const [infoSubmit, setInfoSubmit] = useState<InfoSubmit>({
    schemaName: "",
    oldName: "",
    newName: "",
  });
 
  const auth = useAuth();
  const [openRemove, setOpenRemove] = useState(
    {
      divClass: "remove-channel-div display__none",
      buttonDisabled: true
    }
  );
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!infoSubmit.schemaName) {
      dispatch(setToast('Error: Please try again'))
      testFunction()
      console.log("sale gatito porque no hay esquema");
    } else {
      await axios.put(`${URL_BASE}/channels`, infoSubmit);
      dispatch(setToast(`Channel updated`))
      testFunction()
    }
    setInfoSubmit({
      schemaName: "",
      oldName: "",
      newName: "",
    });
  };

  const handleWorkspaceSelect = (e) => {
    e.preventDefault();
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
    setInfoSubmit({ ...infoSubmit, oldName: e.target.value });
    console.log(e.target.value, "<= deberia ser oldname");
  };

  const handleOnChange = (e) => {
    e.preventDefault();
    setInfoSubmit({
      ...infoSubmit,
      [e.target.name]: e.target.value,
    });
  };


  return (
    <div>
      <form onSubmit={handleSubmit} className="Settings__form">
        <div className="Settings__selects">
          <select onChange={handleWorkspaceSelect} name="schemaName" id="" className="SelectComponent">
            <option value="all" className="SelectComponent_option">Workspaces</option>
            {auth?.user?.myWorkspaces?.map((w, i) => (
              <option
                key={i}
                className="SelectComponent_option"
                value={
                  auth?.user?.myWorkspaces?.length ? auth.user.myWorkspaces[i].name : ""
                }
              >
                {w.name}
              </option>
            ))}
          </select>
          {channelsState?.length ? (
            <select onChange={handleChannelSelect} name="oldName" id="" className="SelectComponent">
              <option value="all" className="SelectComponent_option Select__50w">Channels</option>
              {channelsState?.map((ch) => (
                <option key={ch.id} value={ch.name} className="SelectComponent_option Select__50w">
                  {ch.name}                
                </option>
              ))}
            </select>
          ) : null}
            
          </div>
          <div className="Settings__inputs_container">
          <label className="Settings__label">New Name: </label>
          <input
            type="text"
            name="newName"
            value={infoSubmit.newName}
            onChange={handleOnChange}
            autoComplete='off'
            className="Settings__input"
          />
          <button type="submit" className='Settings__button'>Edit Channel</button>
        </div>
      </form>

    
    </div>
  );
};
