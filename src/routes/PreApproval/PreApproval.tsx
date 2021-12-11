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

export const PreApproval: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const auth = useAuth() 

  let id = location.search.slice(16);
  
  const postSubscriptions = async () => {
    let response:any = await axios.post(`${URL_BASE}/subscriptions`, {
      subscription_id: id,
      mail: auth?.user?.email,
    });
    console.log('response postSubscriptions >>>>',response);
    history.push("/home");
  };
  if (!!auth?.user?.email && !!id) {
    postSubscriptions();
  }
  console.log("Preapproval",auth?.user?.email, id)

  // useEffect(() => {
  //    history.push("/home");
  // }, [res.message]);


  return (
    <div className="preapproval">
      <div className="preapproval__loading">
        <LoadingComponent />
      </div>
    </div>
  );
};

function async(arg0: () => React.FC) {
  throw new Error("Function not implemented.");
}
