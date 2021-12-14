import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { LoadingComponent } from '../../../components/LoadingComponent/LoadingComponent';
import { useAuth } from '../../../auth/useAuth';
import { URL_BASE } from '../../../constants/constants';
import './SettingsSubscriptions.scss';
import { SuperToggle } from '../../../components/Buttons/SuperToggleButton/SuperToggle';


export const SettingsSubscriptions: React.FC = () => {
    const auth = useAuth();
    const [users, setUsers] = useState<any[]>([])

    useEffect(() => {
        refresh()
    },[])
    function refresh(){
        axios.get(`${URL_BASE}/members?schemaName=${auth?.user?.workspaces && auth?.user?.workspaces[0]}`)
        .then(({data}) => {
            setUsers(data.filter(x => x.name !== auth?.user?.name).sort((a,b) => a.id - b.id))
        })
    }
    function handleChecked(id: string, type: string){
        axios.put(`${URL_BASE}/members`, {
            schemaName: auth?.user?.workspaces && auth?.user?.workspaces[0], 
            newUserType: 'admin', 
            memberId: id
        }).then(({data}) => {
            refresh()
        })
    }
    function handleUnchecked(id: string, type: string){
        axios.put(`${URL_BASE}/members`, {
            schemaName: auth?.user?.workspaces && auth?.user?.workspaces[0], 
            newUserType: 'subscriber', 
            memberId: id
        }).then(({data}) => {
            refresh()
        })
    }
    return(
        <div className="settingsSubscriptions">
            <h1 className="settingsSubscriptions__title">Workspace Settings</h1>
            <p className="settingsSubscriptions__text">Allows subscribers to manage the channel</p>
            <p className="settingsSubscriptions__text">
                <h3>¿What is admin user?</h3>
                "Admin" users can create, edit and delete 
                channels, categories or videos, but cannot make 
                plan purchases or assign other admins </p>
            <div className="settingsSubscriptions__headers">
                <span>Subscriber</span><span>Admin</span>
            </div>
            {users ? users.map(x => <div key={x.id} className="settingsSubscriptions__user">
                <span className="settingsSubscriptions__userName">{x.name}
                    <span>{x.usertype}</span>
                </span>
                <SuperToggle checked={x.usertype === 'admin'} handleChecked={() => {handleChecked(x.id, x.usertype)}} handleUnchecked={() => {handleUnchecked(x.id, x.usertype)}}/>
            </div>) : <LoadingComponent/>}
        </div>
    )
}