import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router";
import "./PaymentsPlans.scss";
import { storeState } from "../../../redux/type";
import { SuperButton } from "../../../components/Buttons/SuperButton/SuperButton";
import { pricingSelect } from "../../../redux/actions";
import { PlanRatio } from "./PlanRatio";

export const PaymentsPlans: React.FC = () => {
  const { plan, plans } = useSelector((state: storeState) => state);
  const [input, setInput] = useState(plan ? plan : plans[0]?.name);
  const dispatch = useDispatch();
  const history = useHistory();
  //console.log("Plan =>", plan)
  //console.log("Plans =>", plans)

  let paymentUrl = plans.find((x) => x.name === input)?.url;
  //console.log("P.URL =>", paymentUrl)
  useEffect(() => {
    dispatch(pricingSelect(""));
  }, []);
  function handleSubmit(e) {

    console.log("submit");
    window.location.replace(paymentUrl);
    //e.preventDefault();
    //const json = localStorage.getItem("user");
    //const user = json && JSON.parse(json);
    //axios.put('http://localhost:3002/users', {isBusiness: true, plan: input, email: user.email})
    // window.open(plans.find((x) => x.name === input).url);
    // history.push('/preapproval')
  }
  function handleInput(e) {
    setInput(e.target.value);
  }
  function handleBack() {
    history.goBack();
  }
  return (
    <div className="loginPlan__container">
      <div className="loginPlan">
        <h2 className="loginPlan__title">Choose your account plan</h2>
        <div className="loginPlan__form">
        {plans.map((x) => (
          <PlanRatio plan={x} handleInput={handleInput} input={input === x.name}/>
        ))}
          {/* {plans.map((x) => (
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
          ))} */}
          <div className="loginPlan__btns-container">
              <SuperButton
                text="Buy"
                name="back"
                handler={handleBack}
                classes="loginPlan__superbutton"
              />
              <SuperButton
                text="Shop"
                name="send"
                handler={handleSubmit}
                classes="loginPlan__superbutton"
              />
          </div>
        </div>
      </div>
    </div>
  );
};
