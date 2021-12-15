import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { URL_BASE } from '../../../constants/constants';
import { storeState } from 'src/redux/type';
import { useAuth } from '../../../auth/useAuth';
import './infoAccount.scss'

export const InfoAccount: React.FC = () => {
    const auth = useAuth();
    const user = auth?.user
    const { plans } = useSelector((state: storeState) => state);
    const [users, setUsers] = useState<any[]>([])

    useEffect(() => {
        auth?.user?.myWorkspaces?.length && axios.get(`${URL_BASE}/members?schemaName=${auth.user.myWorkspaces[0].name}`)
        .then(({data}) => {
            setUsers(data.filter(x => x.name !== auth?.user?.name).sort((a,b) => a.id - b.id))
        })
    }, [])

    return (
        <div className="infoaccount">
            <div className="infoaccount__profile">
                <img src={user?.pic+''} className="infoaccount__image" alt="Profile Image"/>
                <div className="infoaccount__profile-info">
                    <h1>{user?.name}</h1>
                    <h4 className='infoaccount__profile-info-email'>{user?.email}</h4>
                </div>
            </div>

            <h2 className='infoaccount__subtitle'>Plan</h2>

            {user?.subscriptions?.length ? user.subscriptions.map(x => plans?.find(p => p.id && x.plan_id && p.id === x.plan_id))
            .map(x => <span key={x?.name} className={`infoaccount__plan ${x?.color}`}>
                    {x?.name}
                </span>) : <h3 className='infoaccount__red'>You don't have a plan</h3>}

            <h2 className='infoaccount__subtitle'>Workspaces</h2>

            {auth?.user?.myWorkspaces?.length ? 
            auth.user.myWorkspaces.map((item, i) => <span key={i} className="infoaccount__works">{`${item.title} (${users.length} subscriber${users.length !== 1 ? 's':''})`}</span>)
            : <h3 className='infoaccount__grey'>You don't have a workspace</h3>}
        </div>
    )
}