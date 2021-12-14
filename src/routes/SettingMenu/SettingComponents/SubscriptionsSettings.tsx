import React from 'react';
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { SuperToggle } from "../../../components/Buttons/SuperToggleButton/SuperToggle";
import { setToast } from '../../../../src/redux/actions';
import { testFunction } from '../../../../src/constants/functions';

import { SuperToast } from "../../../components/Toast/SuperToast";
import { URL_BASE } from "../../../constants/constants";
import { useAuth } from "../../../auth/useAuth";
import axios from 'axios';
export const SubscriptionsSettings: React.FC = () => {
  const dispatch = useDispatch()  
  const auth = useAuth();
    const [boolean, setBoolean] = useState(false)
    const handleOnUpdateSubscriptions = async (value: String) => {
        let res = await axios.put(`${URL_BASE}/subscriptions`, {
          email: auth?.user?.email,
          status: value,
        });
        console.log(res.data);
        dispatch(setToast('Updated'))
        testFunction()       
      };
    return(
        <div className="editWorkspace">
           <h4>{boolean ? 'Activar' : 'Pausar'}</h4>
        <SuperToggle
          handleChecked={() => {
            handleOnUpdateSubscriptions("authorized");
         }}
          handleUnchecked={() => handleOnUpdateSubscriptions("paused")}
        ></SuperToggle>
        </div>
    )
}