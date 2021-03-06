import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { LoadingComponent } from '../../../components/LoadingComponent/LoadingComponent';
import { useAuth } from '../../../auth/useAuth';
import { URL_BASE } from '../../../constants/constants';
import './MemberType.scss';
import { SuperToggle } from '../../../components/Buttons/SuperToggleButton/SuperToggle';
import { setToast } from "../../../redux/actions"
import { testFunction } from "../../../constants/functions";


export const MemberType: React.FC = () => {
    const auth = useAuth();
    const dispatch = useDispatch()
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
            dispatch(setToast('Member upgraded to admin'))
            testFunction()
            refresh()
        })
    }
    function handleUnchecked(id: string, type: string){
        axios.put(`${URL_BASE}/members`, {
            schemaName: auth?.user?.workspaces && auth?.user?.workspaces[0], 
            newUserType: 'subscriber', 
            memberId: id
        }).then(({data}) => {
            dispatch(setToast('Member updated to subscriber'))
            testFunction()
            refresh()
        })
    }
    return(
        users.length ? (<div className="settingsSubscriptions">
            <h1 className="settingsSubscriptions__title">Workspace Settings</h1>
            <p className="settingsSubscriptions__text">Allows subscribers to manage the channel</p>
                <h3>??What is admin user?</h3>
            <p className="settingsSubscriptions__text">
                "Admin" users can create, edit and delete 
                channels, categories or videos, but cannot make 
                plan purchases or assign other admins </p>
            <div className="settingsSubscriptions__headers">
                <span>Subscriber</span><span>Admin</span>
            </div>
            {users.map(x => <div key={x.id} className="settingsSubscriptions__user">
                <span className="settingsSubscriptions__userName">{x.name}
                    <span>{x.usertype}</span>
                </span>
                <SuperToggle checked={x.usertype === 'admin'} handleChecked={() => {handleChecked(x.id, x.usertype)}} handleUnchecked={() => {handleUnchecked(x.id, x.usertype)}}/>
            </div>)}
        </div>) 
        : <h1 className="settingsSubscriptions">You don't have members yet</h1>
    )
}