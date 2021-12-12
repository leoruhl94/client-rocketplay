// Imports
import React, { useState } from "react";

// Styling
import "./Subscriptions.scss";
import { Icon } from "../../../../components/Icon/Icon";
import { useDispatch, useSelector } from "react-redux";
import { storeState } from "src/redux/type";
import axios from "axios";
import { URL_BASE } from "../../../../constants/constants";

//import { plans } from './SubsHardcode';
import { getDates, testFunction } from "../../../../constants/functions";
import { useAuth } from "../../../../auth/useAuth";
import { SuperToggle } from "../../../../components/Buttons/SuperToggleButton/SuperToggle";
import { postNotifications } from "../../../../redux/actions";
import { SuperToast } from '../../../../components/Toast/SuperToast';
import { discovery_v1 } from "googleapis";

interface User {
  accessToken: string;
  name: string;
  pic: string;
}
// Component
export const Subscriptions: React.FC = () => {
  // Var box

  const dispatch = useDispatch()
  const auth = useAuth();
  // Icono del dropdown
  const leftArrow = <Icon classes="Subs__icon" svg="crownIcn"></Icon>;
  // useStates
  const [input, setInput] = useState("");
  const [icon, setIcon] = useState(leftArrow);
  const [ notification, setNotification] = useState('')
  const [pop, setPop] = useState("This will never shows");
  const [boolPopD, setBoolPopD] = useState(false);

  // Obtenemos los planes de subscripción
  const plan: string = useSelector((state: storeState) => {
    return state.plan;
  });

  let logged = auth?.isLogged() ? auth?.isLogged() : false;
  console.log(logged);
  // TODO: Si no es de negocios no se muestra el toggle, el payment y el cancel.

  function handleUploadNormal(e) {
    // Complete: Función que almacena las cosas que pasarán si la persona acepta el popUp
    e.preventDefault();
    const planText = plan.length > 0 ? plan : "Not Logged";
    if (input === planText) {
      // Cerramos el popUp
      
      popUpDanger(e, "Cancel");
      // TODO: Conectar la función para el backEnd así lo saca
    } else {
      setNotification('Incorrect')
      testFunction()
      setInput('')
      // popUpDanger(e, "Cancel");
    }
  }

  // console.log(auth?.user);

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

  function handleData(e){
    setInput(e.target.value)
    console.log(input);
  }

  const handleOnUpdateSubscriptions = async (value: String) => {
    console.log(value);
    let res = await axios.put(`${URL_BASE}/subscriptions`, {
      email: auth?.user?.email,
      status: value,
    });
    // isBussiness : true
    console.log(res.data);
    setNotification(res.data.message)
    // Sumamos la notificación a un array y  mandamos un toast
    testFunction()
    dispatch(postNotifications(res.data))
  };

  // Returned
  return (
    <article className="Subs__main-article">
      <SuperToast value={notification ? notification : 'This is a sample message'}></SuperToast>
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
            {/* HERE: Se puede mapear planes para hacer dropdown */}
          </section>
        </div>
        {logged? <div className="Subs__div-details">
          <div className="Subs__details-headers">
            <h1 className="Subs__margin-reset">Credit Data</h1>
          </div>
          <div className="Subs__payment-date">
            <h3 className="Subs__margin-reset">
              Next payment day : 10/{getDates().month}/{getDates().year}
            </h3>
          </div>
          <div className="Subs__functions-list">

            <SuperToggle
              handleChecked={() => {handleOnUpdateSubscriptions('authorized')}}
              handleUnchecked={() => handleOnUpdateSubscriptions('paused')}
            ></SuperToggle>
            <h3
              onClick={(e) => popUpDanger(e, "Cancel")}
              className="Subs__margin-reset"
            >
              Cancel subscription
            </h3>
          </div>
        </div> 
        : 
        <div className="Subs__div-details"><h3>You must be logged in to see options</h3></div>}

        <section className="Subs__popup Subs__popup-two">
          <div className="popup__normal-title">
            <h3>{pop}</h3>
          </div>
          <form onSubmit={handleUploadNormal}>
            <input className="popup-normal-text" value={input} onChange={handleData} type="text" required />
            <p>
              If you're sure, type {plan.length > 0 ? plan : "Not logged"} to
              continue
            </p>
            <input className="popup-danger-btn" type="submit" value="Delete" />
          </form>
        </section>
      </section>
    </article>
  );
};
