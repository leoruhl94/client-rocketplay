import React, { FormEvent, useState } from "react";
import './PricingDetailComponent.scss'

// ----- ----- -----
export interface Props {
    color: string;
    plan: string;
    price: number;
    description: string;
}
// ----- ----- -----

export const PricingDetailComponent: React.FC<Props> = (props: Props) => {
    // Caja de variables
    const [dep, setDep] = useState<Boolean>(false)
    // ----- ----- ----- ----- -----
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
                <button className="btn-buy">Buy Now</button>
            </div>
        </div>
    )
} 

 