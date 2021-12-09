import React from "react";
import { SuperButton } from "../../components/Buttons/SuperButton/SuperButton";
import './PaidRejection.scss'
import { Icon } from "../../components/Icon/Icon";

export const PaidRejection: React.FC = () => {
    return (
        <div className="paidRej">
            <h1>Oops, no se ha podido concretar el pago, intentalo nuevamente mas tarde</h1>
            <div className='paidRej__icon'>
                <Icon svg="brokenRocket"/>
            </div>
            <div className='paidRej__cont-btns'>
                <SuperButton   
                    name="btnSalir" 
                    text='Go To Home'
                    route='./home'
                    classes='paidRej__btn'
                />
            </div>
        </div>
    )
}