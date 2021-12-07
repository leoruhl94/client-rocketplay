import React, { useState } from "react";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";
import "./PreApproval.scss";
import { useLocation, useHistory } from "react-router";
import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { storeState } from "../../redux/type";
import { URL_BASE } from "../../constants/constants";

export const PreApproval: React.FC = () => {
  const history = useHistory();
  const location = useLocation();

  const json = localStorage.getItem("user");
  const user = json && JSON.parse(json);

  let id = location.search.slice(16);

  const postSubscriptions = async () => {
    let response:any = await axios.post(`${URL_BASE}/subscriptions`, {
      subscription_id: id,
      mail: user.email,
    });
    history.push("/home");
  };
  if (!!user && !!id) {
    postSubscriptions();
  }
  

  // useEffect(() => {
  //    history.push("/home");
  // }, [res.message]);

  // console.log("approval", location.search.slice(16));

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
