import React, { useState } from "react";
import axios from "axios";
import { URL_BASE } from "../../../constants/constants";
import { useAuth } from "../../../auth/useAuth";
import { auth } from "googleapis/build/src/apis/apikeys";


interface InfoSubmit {
  schemaName: string;
  oldName?: string;
  newName?: string;
}
interface InfoSubmit2 {
  schemaName: string;
  catId?: string;
  status?: string;
}

interface Categories {
  name?: string;
  id?: number;
}
interface Channels {
  name?: string;
  id?: number;
}
interface SchemaName {
  name: string;
  
}
interface openRemove {
  divClass: string;
  buttonDisabled: boolean;
}
export const EditCategory: React.FC = () => {
  const auth = useAuth()
  const [schemaName, setSchemaName] = useState<SchemaName>()
  const [channelsState, setChannelsState] = useState<Channels[]>();
  const [categoryState, setCategoryState] = useState<Categories[]>();
  const [infoSubmit, setInfoSubmit] = useState<InfoSubmit>({
    schemaName: "",
    oldName: "",
    newName: "",
  });
  const [infoSubmit2, setInfoSubmit2] = useState<InfoSubmit2>({
    schemaName: "",
    catId: "",
    status: "",
  });

//{schemaName, oldName, newName} <= put/category para cambiar el nombre
//{schemaName, categoryId, status} <= put/category/status 

const [openRemove, setOpenRemove] = useState(
  {
    divClass: "remove-channel-div display__none",
    buttonDisabled: true
  }
);
//-----------------------EDIT CATEGORY-------------------------------------------------------

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!infoSubmit.schemaName) {
    console.log("sale conejito porque no hay esquema")
  } else {
    await axios.put(`${URL_BASE}/category`, infoSubmit)
  }
  setInfoSubmit({
    schemaName: "",
    oldName: "",
    newName: "",
  })
}

const handleWorkspaceSelect = (e) => {
  e.preventDefault();
  setSchemaName(e.target.value)
  axios.get(`${URL_BASE}/channels`, { params: { schemaName: e.target.value } })
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
      setInfoSubmit2({ ...infoSubmit2, schemaName: e.target.value });
    });
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
    
  })
  setChannelsState(array[1])
}

const handleOnChange = (e) => {
  e.preventDefault()
  setInfoSubmit({...infoSubmit, newName: e.target.value})
}
//---------------------REMOVE CATEGORY-----------------------------------------------------
  return(
    <div>
       <form onSubmit={handleSubmit}>
        <div>
          <select onChange={handleWorkspaceSelect} name="schemaName" id="">
            <option value="all">Workspaces</option>
            {auth?.user?.workspacesTitles?.map((w, i) => (
              <option
                key={i}
                value={
                  auth?.user?.workspaces?.length ? auth.user.workspaces[i] : ""
                }
              >
                {w}
              </option>
            ))}
          </select>
          {channelsState ? (
            <select onChange={handleChannelSelect} name="oldName" id="">
              <option value="all">Channels</option>
              {channelsState?.map((ch) => (
                <option key={ch.id} value={ch.name}>
                  {ch.name}
                </option>
              ))}
            </select>
          ) : null}
          <label>New name: </label>
          <input
            type="text"
            name="newName"
            value={infoSubmit.newName}
            onChange={handleOnChange}
          />
          <button type="submit">Edit Channel</button>
        </div>
      </form>

      {/*====================================================================================================  */}
      {/* <form onSubmit={handleSubmit2}> */}
      <form onSubmit={()=>{}}>
        <div>
          <select onChange={handleWorkspaceSelect} name="schemaName" id="">
            <option value="all">Workspaces</option>
            {auth?.user?.workspacesTitles?.map((w, i) => (
              <option
                key={i}
                value={
                  auth?.user?.workspaces?.length ? auth.user.workspaces[i] : ""
                }
              >
                {w}
              </option>
            ))}
          </select>
          {channelsState ? (
            // <select onChange={handleChannelSelect2} name="oldName" id="">
            <select onSubmit={()=>{}} name="oldName" id="">
              <option value="all">Channels</option>
              {channelsState?.map((ch) => (
                <option key={ch.id} value={ch.name + "%-%" + ch.id}>
                  {ch.name}
                </option>
              ))}
            </select>
          ) : null}
          {/* <button type="button" onClick={(e) => handleShow(e)}>
            Remove Channel
          </button> */}
          <div className={`${openRemove.divClass}`}>
            <label>
              If you are sure about deleting this channel type 'deleted'
            </label>
            <input
              type="text"
              // onChange={handleDeleting}
              placeholder="deleted"
            ></input>
            <button type="submit" id="last-remove-btn" disabled={openRemove.buttonDisabled}>
              Remove Channel
            </button>
          </div>
        </div>
      </form>
    </div>
  )
};
