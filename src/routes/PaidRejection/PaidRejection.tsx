import React from "react";
import { SuperButton } from "../../components/Buttons/SuperButton/SuperButton";
import './PaidRejection.scss'

export const PaidRejection: React.FC = () => {
    return (
        <div className="paidRej">
            <h1>Oops, no se ha podido concretar el pago</h1>
            <div className='paidRej__cont-btns'>
                <SuperButton   
                    name="btnReintentar" 
                    text='volver a intentarlo'
                    externalLink='./home'
                    classes='paidRej__btn'
                />
                <SuperButton   
                    name="btnSalir" 
                    text='Salir'
                    route='./home'
                    classes='paidRej__btn'
                />
            </div>
        </div>
    )
}