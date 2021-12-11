// Imports
import React, { useState } from "react";

// Styling
import './Subscriptions.scss'
import { Icon } from '../../../../components/Icon/Icon';
import { useSelector } from "react-redux";
import { storeState } from "src/redux/type";
import { SubscriptionsPlan } from "./SubsHardcode";
//import { plans } from './SubsHardcode';

// Component
export const Subscriptions : React.FC = () => {
    // Var box    
    // Icono del dropdown
    const leftArrow = <Icon classes="Subs__icon" svg="arrowRight"></Icon>
    const downArrow = <Icon classes="Subs__icon" svg="arrowRight"></Icon>
    
    // useStates
    const [input, setInput] = useState('')
    const [icon, setIcon] = useState(leftArrow)
    const [bool, setBool] = useState(false)
    const [boolPopD, setBoolPopD] = useState(false)

    const getDates = () => {
        const fecha = new Date()
        const day = fecha.getDate()
        let monthly : number = 0

        if(day < 10){
            let month = fecha.getMonth() + 1
            monthly = month
        }else{
            if(fecha.getMonth() < 10){
                let monthTwo = fecha.getMonth() + 2 
                monthly = monthTwo
            }else{
                let month = 1
                monthly = month
            }
        }

        const year = fecha.getFullYear()

        return {
            year : year,
            month : monthly,
            day : day
        }

    }

    // Obtenemos los planes de subscripción
    const plans : SubscriptionsPlan[] = useSelector((state : storeState) => {return state.plans})

    // Complete: Subscriptions plan section
    // Complete: The section must be yellow
    // Complete: The section must contain a button that will change the suscription plan
    // Unlisted: If the suscription plan upgrade, it will show 'overlay Continue change Plan'
    // Unlisted: If the suscription plan downgrade, it will show 'Danger zone premium to standard'
    
    // Complete: Data section
    // Complete: The section must be a soft grey
    // Complete: The section must contain credit & payment data such as credit cards and payments
    // TODO: The data container must show last 4 digits of the credit card
    // Complete: The data container must show the next payment day
    // Unlisted: The data container must be 5 extra options : ->
    // TODO: Opt 1 -> Edit payment information
    // TODO: Opt 2 -> Add a new credit Card
    // TODO: Opt 3 -> Cancel subscription
    // Unlisted: Opt 4 -> Change payment day
    // Unlisted: Opt 5 -> Redeem Code


    function handleUploadNormal(){
        // TODO: Función que almacena las cosas que pasarán si la persona acepta el popUp
    }

    // Función utilizada para mostrar los planes
    function dropdownPlans(){
        //Complete: Dropdown CSS
        setBool(!bool);
    if (bool === true) {
      setIcon(leftArrow);
      let id = document.querySelectorAll(".Subs__div-switcher");
      id.forEach((x) => {
        x.className = "Subs__div-switcher Subs__div-switcher-two";
      });
    } else {
      setIcon(downArrow);
      let id = document.querySelectorAll(".Subs__div-switcher");
      id.forEach((x) => {
        x.className = "Subs__div-switcher";
      });
    }
    }

    // Show 'Cancel Subscription' Popup 
    function popUpDanger(){
        setBool(!boolPopD);
    if (boolPopD === true) {
      setIcon(leftArrow);
      let id = document.querySelectorAll(".Subs__div-switcher");
      id.forEach((x) => {
        x.className = "Subs__div-switcher Subs__div-switcher-two";
      });
    } else {
      setIcon(downArrow);
      let id = document.querySelectorAll(".Subs__div-switcher");
      id.forEach((x) => {
        x.className = "Subs__div-switcher";
      });
    }
    }


    // Returned
    return (<article className="Subs__main-article">

        {/* ..... Subscription plan ..... */}
        <section className="">
            {/* ..... Subscriptions ..... */}
            <div className="Subs__div-switcher">
                {/* Subs__div-switcher-two */}
                <section className="Subs__switcher-container">
                    <div>
                    <h2 className="Subs__margin-reset Subs__switcher-title">Your current plan is :</h2>
                    <p className="Subs__margin-reset Subs__switcher-name">Premium Plan</p>
                    </div>
                    {/* ..... Button ..... */}
                    <div className="Subs__switcher-icon">
                        <button onClick={dropdownPlans} className="Subs__dropdown">
                        {icon}                        
                        </button>
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
                <div className="Subs__details-card">
                    <Icon classes="Subs__details-icon-card" svg="credit_card"></Icon>
                    <div>
                        <h2>
                        **** **** **** 0123
                        </h2>
                        </div>
                </div>
                <div className="Subs__payment-date">
                <h3 className="Subs__margin-reset">Next payment day : {getDates().day}/{getDates().month}/{getDates().year}</h3>
                </div>
                <div className="Subs__functions-list">
                    <h3 className="Subs__margin-reset">Edit payment information</h3>
                    <h3 className="Subs__margin-reset">Add credit card</h3>
                    <h3 onClick={popUpDanger} className="Subs__margin-reset">Cancel subscription</h3>
                    {/* <h3 className="Subs__margin-reset">Change payment day</h3> */}
                    {/* <h3 className="Subs__margin-reset">Redeem code</h3> */}
                </div>

            </div>
        </section>

        {/* ..... Popup Continue change plan ..... */}
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

        <section className="Subs__popup">
            <div className="popup__normal-title">
            <h3>You want to change your plan to PLAN_NAME, Are you sure?</h3>
            </div>
            <form onSubmit={handleUploadNormal}>
                <input className="popup-normal-text" value={input} type="text" />
                <p>If you're sure, type "PLANTYPE" to continue</p>
                <input className="popup-danger-btn" type="submit" value="Delete"/>
            </form>
        </section>

    </article>)
}