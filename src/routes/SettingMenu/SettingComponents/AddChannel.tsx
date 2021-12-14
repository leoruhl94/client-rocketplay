import React, {useState} from "react";
import axios from "axios";
import { URL_BASE } from "../../../constants/constants";
import { useAuth } from "../../../auth/useAuth";

 
  interface InfoSubmit {
    schemaName: string;
    name?: string;
  }


export const AddChannel: React.FC = () => {
 
    const auth = useAuth();
    const [infoSubmit, setInfoSubmit] = useState<InfoSubmit>({
        schemaName: "",
        name: "",
      })
   //schemaName, name, isprivate, description 
    const handleSubmit = async (e) => {
       e.preventDefault()
        if (!infoSubmit.schemaName) {
          console.log("sale gatito porque no hay esquema");
        } else {
            await axios.post(`${URL_BASE}/channels` , infoSubmit)
            setInfoSubmit({...infoSubmit, schemaName: e.target.value})
        }
      };

    const handleWorkspaceSelect = (e) => {
        e.preventDefault();
        setInfoSubmit({...infoSubmit, schemaName: e.target.value})
      };
      const handleOnChange = (e) =>{
        e.preventDefault();
        setInfoSubmit({
          ...infoSubmit,
          [e.target.name]:e.target.value
        })
      }
    return (
        <div>
            <form onSubmit={handleSubmit} >
                <div>
                <select onChange={handleWorkspaceSelect} name="schemaName" id="">
        <option value="all">Workspaces</option>
        {auth?.user?.workspacesTitles?.map((w, i) => (
            
          <option key={i} value={auth?.user?.workspaces?.length ? auth.user.workspaces[i] : ""}>
            {w}
          </option>
        ))} 
      </select>
      <label>Name: </label>
      <input type="text" name="name" value={infoSubmit.name} placeholder="Name..." onChange={handleOnChange}/>
      <button type='submit'>Add Channel</button>
                </div>                
            </form>
        </div>
    )
 

 

}