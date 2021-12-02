import React, { FormEvent, useState } from "react";
import './PricingDetailComponent.scss'
import { SuperButton } from "../../components/Buttons/SuperButton/SuperButton";

export interface Props {
    color: string;
    plan: string;
    price: number;
    description: string;
}

export const PricingDetailComponent: React.FC<Props> = (props: Props) => {
    const [dep, setDep] = useState<Boolean>(props.plan === 'Standard' ? true : false)

    function handleDeploy() {
        setDep(!dep)
    }
    return (
        <div className={`planContainer ${props.color}${dep ? ' dep':''}`}>
            <button className={`btn-deploy`} onClick={handleDeploy}></button>
            <p className="plan">{props.plan}</p>
            <div className='planData'>
                <div className="price">
                    <span>{props.price}<span> $</span></span> per month
                </div>
                <p className="description">{props.description}</p>
                <SuperButton
                    name={props.plan}
                />
                <button className="btn-buy">Buy Now</button>
            </div>
        </div>
    )
} 

 