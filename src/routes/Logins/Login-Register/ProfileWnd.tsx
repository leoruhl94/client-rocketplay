import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import axios from "axios";
import {  Logout } from "../../../redux/actions";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import "./ProfileWnd.scss";
import { storeState } from "../../../redux/type";
import { URL_BASE, CLIENT_ID, COOKIES_POLICY} from "../../../constants/constants";
import { useAuth } from "../../../auth/useAuth";
import { Link } from "react-router-dom";
import { SuperButton } from "../../../components/Buttons/SuperButton/SuperButton";
import { async } from "@firebase/util";

interface Props {
  dep: boolean,
}

export const ProfileWnd: React.FC<Props> = ({ dep }) => {

  const history = useHistory();
  const dispatch = useDispatch();
  const auth = useAuth() 
  const { plans } = useSelector((state: storeState) => state);
  const user = auth?.user
  let [userPlan, setUserPlan] = useState<any>()

  function logout() {
    dispatch(Logout(history, auth));
  }

  useEffect(() => {
    setUserPlan(auth?.user?.subscriptions?.map(x => plans.find(p => p.id === x.plan_id))[0])
  },[])
  
  // const handleOnUpdateSubscriptions = async( value:String ) =>{
  //   console.log(value);
  //   let res = await axios.put(`${URL_BASE}/subscriptions`,{
  //     email: auth?.user?.email,
  //     status: value
  //   })

  //   console.log(res.data)
  // }
  // const handleDestroy = async( value:String ) =>{
    
  //   let res = await axios.delete(`${URL_BASE}/workspace/deleteall`)

  // }

  return (
    <div className={`profileWnd ${dep ? "profileWndDep" : ""}`}>
      <div className="profileWnd__user">
        <img src={user?.pic+''} className="profileWnd__pic" />
        <div className="profileWnd__info">
          <span>{user?.name}</span>
          {userPlan ? <span className={`profileWnd__info-plan ${userPlan?.color}`}>{userPlan?.name}</span> 
          : <span className="profileWnd__info-plan grey">No plan</span>}
          <span className="profileWnd__info-plan grey">{user?.email}</span>
        </div>
      </div>
      
      <div className="profileWnd__cambiar">
        <GoogleLogout
          clientId={CLIENT_ID}
          buttonText="Logout"
          className="profileWnd__googleBtn"
          onLogoutSuccess={logout}
        />
      </div>
      {/* <SuperButton
        name='activeSub'
        value="authorized"
        text='Active'
        classes='profileWnd__activeSub'
        handler={handleOnUpdateSubscriptions}
      /> */}
      {/* <SuperButton
        name='pauseSub'
        value="paused"
        text='Pause'
        classes='profileWnd__pauseSub'
        handler={handleOnUpdateSubscriptions}
      /> */}
      {/* <SuperButton
        name='cancelSub'
        value="cancelled"
        text='Cancel'
        classes='profileWnd__cancelSub'
        handler={handleOnUpdateSubscriptions}
      /> */}
      {/* <SuperButton
        name='getBusinessAccount'
        route="/payment"
        text='Get business'
        classes='profileWnd__cancelSub'
        /> */}
      {/* <SuperButton
        name='Upload'
        route="/uploadvideo"
        text='Upload Video'
        classes='profileWnd__cancelSub'
      /> */}
       {/* <SuperButton
        name='destroySchemas'
        value="destroyed"
        text='Destroy'
        classes='profileWnd__cancelSub'
        handler={handleDestroy}
      /> */}
      {/* <div className="profileWnd__cambiar">
        <Link to="/payment"> Get a Business Account</Link>
      </div> */}
    </div>
  );
};
