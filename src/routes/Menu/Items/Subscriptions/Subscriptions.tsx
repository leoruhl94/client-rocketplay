// Imports
import React, { useState } from "react";

// Styling
import "./Subscriptions.scss";
import { Icon } from "../../../../components/Icon/Icon";
import { useSelector } from "react-redux";
import { storeState } from "src/redux/type";
import axios from "axios";
import { URL_BASE } from "../../../../constants/constants";

//import { plans } from './SubsHardcode';
import { getDates } from "../../../../constants/functions";
import { useAuth } from "../../../../auth/useAuth";

interface User {
  accessToken: string;
  name: string;
  pic: string;
}
// Component
export const Subscriptions: React.FC = () => {
  // Var box
  // Icono del dropdown
  const leftArrow = <Icon classes="Subs__icon" svg="arrowRight"></Icon>;
  // useStates
  const [input, setInput] = useState("");
  const [icon, setIcon] = useState(leftArrow);
  const [pop, setPop] = useState("This will never shows");
  const [boolPopD, setBoolPopD] = useState(false);
  const auth = useAuth();

  // Obtenemos los planes de subscripción
  const plan: string = useSelector((state: storeState) => {
    return state.plan;
  });

  // Complete: Subscriptions plan section
  // Complete: The section must be yellow
  // Complete: The section must contain a button that will change the suscription plan
  // Unlisted: If the suscription plan upgrade, it will show 'overlay Continue change Plan'
  // Unlisted: If the suscription plan downgrade, it will show 'Danger zone premium to standard'

  // Complete: Data section
  // Complete: The section must be a soft grey

  function handleUploadNormal(e) {
    // TODO: Función que almacena las cosas que pasarán si la persona acepta el popUp
    e.preventDefault();
    const planText = plan.length > 0 ? plan : "Not Logged";
    if (input === planText) {
      // Cerramos el popUp
      popUpDanger(e, "Cancel");
      // TODO: Conectar la función para el backEnd así lo saca
    } else {
      popUpDanger(e, "Cancel");
    }
  }

  // Función utilizada para mostrar los planes

  // Show 'Cancel Subscription' Popup
  function popUpDanger(e, status: string) {
    let popText =
      status === "Cancel"
        ? "You want to cancel, Are you sure?"
        : "You want to pause, Are you sure?";
    setPop(popText);

    if (boolPopD === true) {
      let id = document.querySelectorAll(".Subs__popup");
      id.forEach((x) => {
        x.className = "Subs__popup Subs__popup-two";
      });
    } else {
      let id = document.querySelectorAll(".Subs__popup");
      id.forEach((x) => {
        x.className = "Subs__popup";
      });
    }
    setBoolPopD(!boolPopD);
  }

  const handleOnUpdateSubscriptions = async (value: String) => {
    console.log(value);
    let res = await axios.put(`${URL_BASE}/subscriptions`, {
      email: auth?.user?.email,
      status: value,
    });

    console.log(res.data);
  };

  // Returned
  return (
    <article className="Subs__main-article">
      {/* ..... Subscription plan ..... */}
      <section className="">
        {/* ..... Subscriptions ..... */}
        <div className="Subs__div-switcher">
          {/* Subs__div-switcher-two */}
          <section className="Subs__switcher-container">
            <div>
              <h2 className="Subs__margin-reset Subs__switcher-title">
                Your current plan is :
              </h2>
              <p className="Subs__margin-reset Subs__switcher-name">
                {plan.length > 0 ? plan : "Not logged"}
              </p>
            </div>
            {/* ..... Button ..... */}
            <div className="Subs__switcher-icon">
              <button className="Subs__dropdown">{icon}</button>
            </div>
          </section>

          <section className="Subs__div-extra">
            {/* {
                         plans.map((x) => {
                             return(
                                 <div>
                                     <h3>{x.name}</h3>
                                 </div>
                             )
                         })
                    } */}
          </section>
        </div>
        <div className="Subs__div-details">
          <div className="Subs__details-headers">
            <h1 className="Subs__margin-reset">Credit Data</h1>
          </div>
          {/* <div className="Subs__details-card">
                    <Icon classes="Subs__details-icon-card" svg="credit_card"></Icon>
                    <div>
                        <h2>
                        **** **** **** 0123
                        </h2>
                        </div>
                </div> */}
          <div className="Subs__payment-date">
            <h3 className="Subs__margin-reset">
              Next payment day : 10/{getDates().month}/{getDates().year}
            </h3>
          </div>
          <div className="Subs__functions-list">
            {/* <h3
              onClick={(e) => popUpDanger(e, "")}
              className="Subs__margin-reset"
            >
              Pause subscription
            </h3> */}

            <label className="switch">
              <input type="checkbox" />
              <span className="slider round"></span>
            </label>

            {/* TODO: Si está pausada debe mostrar el activate */}
            <h3
              onClick={(e) => popUpDanger(e, "Cancel")}
              className="Subs__margin-reset"
            >
              Cancel subscription
            </h3>
          </div>
        </div>

        <label className="switch">
          <input type="checkbox" />
          <span className="slider round"></span>
        </label>

        <section className="Subs__popup Subs__popup-two">
          <div className="popup__normal-title">
            <h3>{pop}</h3>
          </div>
          <form onSubmit={handleUploadNormal}>
            <input className="popup-normal-text" value={input} type="text" />
            <p>
              If you're sure, type {plan.length > 0 ? plan : "Not logged"} to
              continue
            </p>
            <input className="popup-danger-btn" type="submit" value="Delete" />
          </form>
        </section>

        {/* 
        ..... Popup Continue change plan ..... 
        <section className="Subs__popup">
        <div className="popup__normal-title">
        <h3>You want to change your plan to PLAN_NAME, Are you sure?</h3>
        </div>
        <form onSubmit={handleUploadNormal}>
        <input className="popup-normal-text" value={input} type="text" />
        <p>If you're sure, type "Secure" to continue</p>
        <input className="popup-normal-btn" type="submit" value="Change" />
        </form>
        </section>
    */}
      </section>
    </article>
  );
};
