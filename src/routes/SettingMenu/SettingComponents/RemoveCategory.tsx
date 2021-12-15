import React, { useState, useEffect } from "react";
import axios from "axios";
import { URL_BASE } from "../../../constants/constants";
import { useAuth } from "../../../auth/useAuth";
import { auth } from "googleapis/build/src/apis/apikeys";


interface InfoSubmit {
  schemaName: string;
  categoryId?: string;
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
export const RemoveCategory: React.FC = () => {
  const auth = useAuth()
  const [schemaName, setSchemaName] = useState<SchemaName>()
  const [channelsState, setChannelsState] = useState<Channels[]>();
  const [categoryState, setCategoryState] = useState<Categories[]>();
  const [infoSubmit, setInfoSubmit] = useState<InfoSubmit>({
    schemaName: "",
    categoryId: "",
    status: "deleted",
  });

const [openRemove, setOpenRemove] = useState(
  {
    divClass: "remove-channel-div display__none",
    buttonDisabled: true
  }
);

const handleWorkspaceSelect = (e) => {
  e.preventDefault();
  setSchemaName(e.target.value)
  categoryState ? setCategoryState([]) : null;
  setInfoSubmit({
    schemaName: e.target.value,
    categoryId: "",
    status: "deleted",
  });
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
    });
};

//---------------------REMOVE CATEGORY-----------------------------------------------------

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!infoSubmit.schemaName) {
    console.log("sale conejito porque no hay esquema");
  } else {
    await axios.put(`${URL_BASE}/category/status`, infoSubmit);
  }
  setInfoSubmit({
    schemaName: "",
    categoryId: "",
    status: "deleted",
  });
  setOpenRemove({...openRemove, divClass: "remove-channel-div display__none"})
};

const handleShow = (e) => {
  e.preventDefault();
  let div = document.querySelector(".remove-channel-div");
  // div && div.setAttribute("className", "remove-channel-div")
  setOpenRemove({...openRemove, divClass: "remove-channel-div"});
  // Aca hacer q el div de elminar aparezca
};



const handleChannelSelect = (e) => {
  e.preventDefault();
  const array = e.target.value.split("%-%");
  

  axios.get(`${URL_BASE}/category/bychannel`, {params: {schemaName: schemaName, channelId: array[1]}})
  .then(r => {
    console.log(r.data)
    let array1:any[] = []
    r.data.map(el => {
      let obj = {
        name: el.catName,
        id: el.catId,
      }
      array1.push(obj)
    })
    setCategoryState(array1)
    
  })
};

const handleCategorySelect = (e) => {
  e.preventDefault();
  setInfoSubmit({ ...infoSubmit, categoryId:e.target.value });
  setDisabled(false)
}

const handleDeleting = (e) => {
  e.preventDefault();
  let btn = document.getElementById("last-remove-btn");
  if (e.target.value === "delete") {
    setOpenRemove({...openRemove, buttonDisabled: false})
  } else {
    setOpenRemove({...openRemove, buttonDisabled: true})
  }
};

const [disabled, setDisabled] = useState(true)

return(
    <div>     {/*====================================================================================================  */}
      <form onSubmit={handleSubmit} className="Settings__form" >
      <div className="Settings__selects">
          <select onChange={handleWorkspaceSelect} name="schemaName" id="" className="SelectComponent Select__100w">
            <option value="all" className="SelectComponent_option">Workspaces</option>
            {auth?.user?.myWorkspaces?.map((w, i) => (
              <option
                key={i}
                value={
                  auth?.user?.myWorkspaces?.length ? auth.user.myWorkspaces[i].name : ""
                }
                className="SelectComponent_option"
              >
                {w.name}
              </option>
            ))}
          </select>
          </div>
          <div className="Settings__selects">
          {channelsState?.length ? (
            <select onChange={handleChannelSelect} className="SelectComponent Select__50w" name="oldName" id="">
              <option value="all" className="SelectComponent_option">Channels</option>
              {channelsState?.map((ch) => (
                <option key={ch.id} value={ch.name + "%-%" + ch.id} className="SelectComponent_option">
                  {ch.name}
                </option>
              ))}
            </select>
          ) : null}
          {categoryState?.length ? (
            <select
              onChange={handleCategorySelect}
              className="SelectComponent Select__50w"
              name="category"
            >
              <option selected value="" className="SelectComponent_option">
                Categories
              </option>
              {categoryState?.map((ca) => (
                <option
                  key={ca.id}
                  className="SelectComponent_option"
                  value={ca.id}
                >
                  {ca.name}
                </option>
              ))}
            </select>
          ) : null}

          </div>
          <div className="Settings__inputs_container">
          <button type="button" onClick={(e) => handleShow(e)} className='Settings__button' disabled={disabled}>
            Remove Category
          </button>
          <div className={`${openRemove.divClass}`}>
            <label className="Settings__label_delete">
              If you are sure about deleting this category type 'delete'
            </label>
            <input 
              type="text"
              onChange={handleDeleting}
              placeholder="deleted"
              autoComplete='off'
              className="Settings__input"
            ></input>
            <button type="submit" id="last-remove-btn" disabled={openRemove.buttonDisabled} className='Settings__button'>
              Confirm
            </button>
          </div>
        </div>
      </form>
    
    </div>
  )
}
