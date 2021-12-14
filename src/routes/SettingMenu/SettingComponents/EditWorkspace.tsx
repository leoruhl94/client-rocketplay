import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Icon } from '../../../components/Icon/Icon';
import { useAuth } from '../../../auth/useAuth';
import { URL_BASE } from '../../../constants/constants';
import './EditWorkspace.scss';

export const EditWorkspace: React.FC = () => {
    const auth = useAuth();
    const [input, setInput] = useState({
        name: '',
        code: '',
    })
    useEffect(() => {
        axios.get(`${URL_BASE}/members?schemaName=${auth?.user?.workspaces && auth?.user?.workspaces[0]}`)
        .then(({data}) => {
            console.log(data)
        })
    },[])
    function handleSubmit(e){
        e.preventDefault()
        console.log('submit')
    }
    function handleChange(e){
        setInput({ ...input, [e.target.name]: e.target.value})
    }
    return(
        <div className="editWorkspace">
            <form className="editWorkSpace__form" onSubmit={handleSubmit}>
                <div className="editWorkSpace__input-container">
                    <h2 className="editWorkspace__input-title">Workspace Name <Icon svg='pencil' classes="editWorkspace__input-title-icon"></Icon></h2> 
                    <input type="text" name='name' className="editWorkspace__input" onChange={handleChange} value={input.name}/>
                </div>
                <div className="editWorkSpace__input-container">
                    <h2 className="editWorkspace__input-title">Workspace Code <Icon svg='pencil' classes="editWorkspace__input-title-icon"></Icon></h2>
                    <input type="text" name='code' className="editWorkspace__input" onChange={handleChange} value={input.code}/>
                </div>
                <div className="editWorkspace__save-cont">
                    <button type="submit" className="editWorkspace__save">Save</button>
                </div>
            </form>
        </div>
    )
}