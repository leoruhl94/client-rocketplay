import { URL_BASE } from "../../constants/constants";
import axios from "axios";
import React, { useState } from "react";
import "./SelectWorkspace.scss";

interface PropsWP {
  handler(name?: any, value?: any, arrayChannels?: any): any;
  name: string;
  schemaName: string;
  arrayChannels: any;
}

export const SelectChannel: React.FC<PropsWP> = ({
  handler,
  name,
  schemaName,
  arrayChannels,
}) => {
  const handleSelect = async (e) => {
    const { name, value } = e.target;
    e.preventDefault();

    let arrayChannels: any[] = [];

    let channels = await axios.get(`${URL_BASE}/category/bychannel`, {
      params: { schemaName: schemaName, channelId: arrayChannels[1] },
    });
    channels.data.map((item) => {
      arrayChannels.push({ name: item.name, id: item.id });
    });

    handler(name, value, arrayChannels);
  };

  return (
    <select
      onChange={handleSelect}
      name={name}
      id=""
      className="SelectComponent"
    >
      <option value="all" id="pollito" className="SelectComponent_option">
        Channels
      </option>
      {arrayChannels?.map((item) => (
        <option
          key={item.id}
          id={item.id}
          value={item.name}
          className="SelectComponent_option"
        >
          {item.name}
        </option>
      ))}
    </select>
  );
};

//       <option value="all">Channels</option>
//       {channelsState?.map((ch) => (
//         <option key={ch.id} value={ch.name + "%-%" + ch.id}>
//           {ch.name}
//         </option>
//       ))}
//     </select>
//   ) : null}
//   {categoryState ? (
//     <select onChange={handleCategorySelect} name="category">
//       <option value="all">Categories</option>
//       {categoryState?.map((ca) => (
//         <option key={ca.id} value={ca.name}>
//           {ca.name}
//         </option>
//       ))}
//     </select>
//   ) : null}
