import React, { useState } from "react";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";
import "./PreApproval.scss";
import { useLocation, useHistory } from "react-router";
import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { storeState } from "../../redux/type";
import { URL_BASE } from "../../constants/constants";
import { useAuth } from "../../auth/useAuth";
import { SuccessWnd } from "../../components/successWnd/SuccessWnd";

export const PreApproval: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const auth = useAuth() 
  const [success, setSuccess] = useState(false);

  let id = location.search.slice(16);
  
  const postSubscriptions = async () => {
    let response:any = await axios.post(`${URL_BASE}/subscriptions`, {
      subscription_id: id,
      mail: auth?.user?.email,
    });
    console.log('response postSubscriptions >>>>',response);
    setSuccess(true)
    // history.push("/home")
  };
  console.log("Preapproval",auth?.user?.email, id)
  
  useEffect(() => {
      if (!!auth?.user?.email && !!id) {
        postSubscriptions();
      }
      console.log('useEffect preApproval')
    }, []);
    
    
    return (
      <div className="preapproval">
      {success ? <SuccessWnd text='succesful transaction'/> : 
        <div className="preapproval__loading">
        <LoadingComponent />
      </div>}
    </div>
  );
};

// function async(arg0: () => React.FC) {
//   throw new Error("Function not implemented.");
// }
