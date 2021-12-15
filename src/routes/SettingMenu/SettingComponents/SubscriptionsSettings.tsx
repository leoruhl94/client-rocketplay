import React, { useEffect } from 'react';
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SuperToggle } from "../../../components/Buttons/SuperToggleButton/SuperToggle";
import { setToast } from '../../../../src/redux/actions';
import { storeState } from '../../../../src/redux/type';

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
    
    // TESTING
    const [pop, setPop] = useState("This will never shows");
    const [input, setInput] = useState("This will never shows");
    const [boolPopD, setBoolPopD] = useState(false);

    const plan: string = useSelector((state: storeState) => {
      return state.plan;
    });

    const [openRemove, setOpenRemove] = useState(
      {
        divClass: "remove-channel-div display__none",
        buttonDisabled: true
      }
    );

    const confirmCancel = async(e) => {
      console.log('Andando');
      let res = await axios.put(`${URL_BASE}/subscriptions`, {
        email: auth?.user?.email,
        status: "cancelled",
      });

      dispatch(setToast("Your subscription was" + res.data.status))
      testFunction()
      // TODO: Conectar el petición al backEnd
    }

    const handleDeleting = (e) => {
      e.preventDefault();
      let btn = document.getElementById("last-remove-btn");
      if (e.target.value === "Cancel") {
        setOpenRemove({...openRemove, buttonDisabled: false})
      } else {
        setOpenRemove({...openRemove, buttonDisabled: true})
      }
    };

    const handleShow = (e) => {
      e.preventDefault();
      let div = document.querySelector(".remove-channel-div");
      // div && div.setAttribute("className", "remove-channel-div")
      setOpenRemove({...openRemove, divClass: "remove-channel-div"});
      // Aca hacer q el div de elminar aparezca
    };

    // WORKING
    const handleOnUpdateSubscriptions = async (value: String) => {
        try{
          setEnabled(false)
          let res = await axios.put(`${URL_BASE}/subscriptions`, {
            email: auth?.user?.email,
            status: value,
          });
          setEnabled(true)
          console.log(res.data);
          setBoolean(value === 'paused' ? true : false)     
          dispatch(setToast(res.data.message ? res.data.message : 'Updated' ))
          testFunction()  
        }catch(err){
          console.error(err)
          dispatch(setToast('Error: Try Again later'))
          testFunction()  
          setEnabled(true)
        }
      };

    return(
        <div className="editSubscription">
           <h4 className='editSubscription__status'>{boolean ? 'Activar' : 'Pausar'}</h4>
           <div className='editSubscription__cont'>
            <SuperToggle
              handleChecked={() => {
                handleOnUpdateSubscriptions("paused");
                //setBoolean(true)
            }}
              handleUnchecked={() => {
                handleOnUpdateSubscriptions("authorized")
                //setBoolean(false)
              }}
              checked={boolean}
              enabled={enabled}
            />
            {!enabled ? <div className="editSubscription__loading"></div> : null}
           </div>

          <button type="button" onClick={(e) => handleShow(e)} className='Settings__button'>
            Cancel subscription
          </button>
          <div className={`${openRemove.divClass}`}>
            <label>
              If you are sure about deleting this category type 'Cancel'
            </label>
            <input 
              type="text"
              onChange={handleDeleting}
              placeholder="deleted"
              autoComplete='off'
              className="Settings__input"
            ></input>
            <button onClick={confirmCancel} type="submit" id="last-remove-btn" disabled={openRemove.buttonDisabled} className='Settings__button'>
              Confirm
            </button>
            </div>

        </div>
    )
}