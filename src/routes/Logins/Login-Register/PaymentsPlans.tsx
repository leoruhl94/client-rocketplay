import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { changeLogsPage, createUser } from "../../../redux/actions";
import axios from "axios";
import "./PaymentsPlans.scss";
import { storeState } from "../../../redux/type";
import { SuperButton } from "../../../components/Buttons/SuperButton/SuperButton";

export const PaymentsPlans: React.FC = () => {
  const { plan } = useSelector((state: storeState) => state);
  const { plans } = useSelector((state: storeState) => state);
  const [input, setInput] = useState(plan ? plan : plans[0]?.name);
  const dispatch = useDispatch();
  const history = useHistory();
  //console.log("Plan =>", plan)
  //console.log("Plans =>", plans)

  let paymentUrl = plans.find((x) => x.name === input)?.url;
  //console.log("P.URL =>", paymentUrl)
  function handleSubmit(e) {
    console.log("submit")
    //e.preventDefault();
    //const json = localStorage.getItem("user");
    //const user = json && JSON.parse(json);
    //dispatch(createUser(user, true, input));
    //axios.put('http://localhost:3002/users', {isBusiness: true, plan: input, email: user.email})
    // window.open(plans.find((x) => x.name === input).url);
    // history.push('/preapproval')
  }
  function handleInput(e) {
    setInput(e.target.value);
  }
  function handleBack() {
    history.goBack()
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
              classes="acctype-superbutton-accept"
            ></SuperButton>
          </div>
        </form>
      </div>
    </div>
  );
};
