import React, { useEffect } from 'react';
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { SuperToggle } from "../../../components/Buttons/SuperToggleButton/SuperToggle";
import { setToast } from '../../../../src/redux/actions';
import { testFunction } from '../../../../src/constants/functions';

import { SuperToast } from "../../../components/Toast/SuperToast";
import { URL_BASE } from "../../../constants/constants";
import { useAuth } from "../../../auth/useAuth";
import axios from 'axios';
import './SubscriptionsSettings.scss'

export const SubscriptionsSettings: React.FC = () => {
  const dispatch = useDispatch()  
  const auth = useAuth();
    const [boolean, setBoolean] = useState(auth?.user?.subscriptions?.length && auth.user.subscriptions[0].status === 'paused' ? true : false )
    const [enabled, setEnabled] = useState(true)
    
    const handleOnUpdateSubscriptions = async (value: String) => {
        try{
          setEnabled(false)
          let res = await axios.put(`${URL_BASE}/subscriptions`, {
            email: auth?.user?.email,
            status: value,
          });
          setEnabled(true)
          console.log(res.data);
          dispatch(setToast('Updated'))
          testFunction()  
          setBoolean(value === 'paused' ? true : false)     
        }catch(err){
          console.error(err)
          setEnabled(true)
        }
      };

    return(
        <div className="editSubscription">
           <h4>{boolean ? 'Activar' : 'Pausar'}</h4>
           <div className='editSubscription__cont'>
            <SuperToggle
              handleChecked={() => {
                handleOnUpdateSubscriptions("authorized");
                //setBoolean(true)
            }}
              handleUnchecked={() => {
                handleOnUpdateSubscriptions("paused")
                //setBoolean(false)
              }}
              checked={boolean}
              enabled={enabled}
            ></SuperToggle>
            {!enabled ? <div className="editSubscription__loading"></div> : null}
           </div>
        </div>
    )
}