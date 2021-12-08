import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { createUser, Logout } from "../../redux/actions";
import axios from "axios";
// import google from "../../images/google.png";
import "./loginAccountType.scss";
import { GoogleLogout } from "react-google-login";
import { storeState } from "../../redux/type";
import { CLIENT_ID } from "../../constants/constants";
interface Props {
  setLogsPage: any;
}
export const LoginAccountType: React.FC<Props> = ({setLogsPage}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { plan } = useSelector((state: storeState) => state);
  const json = localStorage.getItem("user");
  const user = json && JSON.parse(json);
  const [input, setInput] = useState(plan ? "business" : "user");

  function handleSubmit(e) {
    e.preventDefault();
    if (input === "business") {
      dispatch(createUser(user, true));
      setLogsPage(2)
    } else {
      dispatch(createUser(user));
      history.push("/home");
    }
  }

  function handleInput(e) {
    setInput(e.target.value);
  }
  function logout() {
    setLogsPage(0)
    dispatch(Logout(history));
  }

  return (
    <div className="acctype-super-container">
      <div className="acctype-container">
        <div className="acctype-title-div">
          <h2>Welcome !</h2>
          <h2>Choose your account type</h2>
        </div>
        <div className="acctype-button-div">
          <form onSubmit={handleSubmit}>
            <div>
              {/* <p>An employee/subscriber looking to only access and watch videos</p> */}
              {/* <button onClick={handleClick} value='user' className="acctype-choose-business">Subscriber Account</button> */}
              <div className="acctype-input-div">
                <input
                  type="radio"
                  value="user"
                  className="acctype-choose-business"
                  name="acctype"
                  id="acctype"
                  checked={input === "user"}
                  onChange={handleInput}
                />
                <label htmlFor="acctype" className="acctype-labels">
                  User Account
                </label>
              </div>
            </div>
            <div>
              {/* <p>A company/enterprise looking to use our service to upload and showcase videos</p> */}
              {/* <button onClick={handleClick} value='business' className="acctype-choose-business">Business Account</button> */}
              <div className="acctype-input-div">
                <input
                  type="radio"
                  value="business"
                  className="acctype-choose-business"
                  name="acctype"
                  id="acctype"
                  checked={input === "business"}
                  onChange={handleInput}
                />
                <label htmlFor="acctype" className="acctype-labels">
                  Business Account
                </label>
              </div>
            </div>
            <div className="acctype-buttons-div">
              <div className="acctype-submit-div">
                <button type="submit" className="acctype-submit-btn">
                  Accept
                </button>
              </div>
              <div className="acctype-submit-div">
                <GoogleLogout
                  clientId={CLIENT_ID}
                  buttonText="Logout"
                  className="acctype-google-btn"
                  onLogoutSuccess={logout}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
