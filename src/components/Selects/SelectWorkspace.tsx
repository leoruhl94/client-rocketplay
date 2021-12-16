import { URL_BASE } from "../../constants/constants";
import axios from "axios";
import React, { useState } from "react";
import { useAuth } from "../../auth/useAuth";
import './SelectWorkspace.scss'

interface PropsWP {
    handler(name?:any, value?:any, arrayChannels?:any):any;
    name:string;
  }
  
  export const SelectWorkspace: React.FC<PropsWP> = ({ handler, name }) => {
    const auth = useAuth();
    const [schemaName, setSchemaName] = useState("");
    // const [channels, setChannels] = useState<any>([]);
  
    const handleSelect = async (e) => {
      const { name, value } = e.target;
      e.preventDefault();
      setSchemaName(e.target.value);
      let arrayChannels: any[] = [];
  
      let channels = await axios.get(`${URL_BASE}/channels`, {
        params: { schemaName: value },
      });
      channels.data.map((item) => {
        arrayChannels.push({ name: item.name, id: item.id });
      });
  
      handler(name, value, arrayChannels);
    };
  
    return (
      <select onChange={handleSelect} name={name} id="" className="SelectComponent">
        <option selected value="" className="SelectComponent_option">Workspaces</option>
        {auth?.user?.workspacesTitles?.map((item, i) => (
          <option className="SelectComponent_option"
            key={i}
            value={auth?.user?.workspaces?.length ? auth.user.workspaces[i] : ""}
          >
            {item}
          </option>
        ))}
      </select>
    );
  };
  