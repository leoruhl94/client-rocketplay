import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { changeLogsPage, createUser } from "../../redux/actions";
import axios from "axios";
import "./LoginPlan.scss";
import { storeState } from "../../redux/type";
import { SuperButton } from "../Buttons/SuperButton/SuperButton";

export const LoginPlan: React.FC = () => {
  const { plan } = useSelector((state: storeState) => state);
  const { plans } = useSelector((state: storeState) => state);
  const [input, setInput] = useState(plan ? plan : plans[0]?.name);
  const dispatch = useDispatch();
  const history = useHistory();
  let paymentUrl = plans.find((x) => x.name === input).url;

  function handleSubmit(e) {
    e.preventDefault();
    const json = localStorage.getItem("user");
    const user = json && JSON.parse(json);
    dispatch(createUser(user, true, input));
    //axios.put('http://localhost:3002/users', {isBusiness: true, plan: input, email: user.email})
    // window.open(plans.find((x) => x.name === input).url);
    // history.push('/preapproval')
  }
  function handleInput(e) {
    setInput(e.target.value);
  }
  function handleBack() {
    dispatch(changeLogsPage(1));
  }
  return (
    <div className="loginPlan__container">
      <div className="loginPlan">
        <h2 className="loginPlan__title">Choose your account plan</h2>
        <form onSubmit={handleSubmit} className="loginPlan__form">
          {plans.map((x) => (
            <div key={x.name} className="loginPlan__option-container">
              <input
                type="radio"
                value={x.name}
                className="loginPlan__option-input"
                name="acctype"
                id="acctype"
                checked={input === x.name}
                onChange={handleInput}
              />
              <label htmlFor="acctype" className="loginPlan__option-label">
                {x.name}
              </label>
            </div>
          ))}
          <div className="loginPlan__btns-container">
            <div className="loginPlan__btn-cont">
              <button
                type="button"
                onClick={handleBack}
                className="loginPlan__btn"
              >
                Back
              </button>
            </div>
            <SuperButton
              text="Accept"
              name="send"
              externalLink={paymentUrl}
              value={1}
              handler={handleSubmit}
            ></SuperButton>
          </div>
        </form>
      </div>
    </div>
  );
};
