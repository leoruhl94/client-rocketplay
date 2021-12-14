import React from 'react';
import { SuperToggle } from "../../../components/Buttons/SuperToggleButton/SuperToggle";
import { SuperToast } from "../../../components/Toast/SuperToast";
import { URL_BASE } from "../../../constants/constants";
import { useAuth } from "../../../auth/useAuth";
import axios from 'axios';
export const SubscriptionsSettings: React.FC = () => {
    const auth = useAuth();
    const handleOnUpdateSubscriptions = async (value: String) => {
        let res = await axios.put(`${URL_BASE}/subscriptions`, {
          email: auth?.user?.email,
          status: value,
        });
      };
    return(
        <div className="editWorkspace">
           <h4>Activar/Pausar</h4>
        <SuperToggle
          handleChecked={() => {
            handleOnUpdateSubscriptions("authorized");
          }}
          handleUnchecked={() => handleOnUpdateSubscriptions("paused")}
        ></SuperToggle>
        </div>
    )
}