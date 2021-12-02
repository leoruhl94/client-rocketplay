import React, { useState } from "react";
import './PricingDetailComponent.scss'
import { useDispatch } from "react-redux";
import { pricingSelect } from "../../redux/actions";
import { useHistory } from "react-router";

export interface Props {
    color: string;
    plan: string;
    price: number;
    description: string;
}

export const PricingDetailComponent: React.FC<Props> = (props: Props) => {
    const [dep, setDep] = useState<Boolean>(props.plan === 'Standard' ? true : false)
    const dispatch = useDispatch()
    const history = useHistory()

    function handleDeploy() {
        setDep(!dep)
    }
    function handleClick() {
        dispatch(pricingSelect(props.plan))
        history.push('/logs')
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
                
                <button className="btn-buy" onClick={handleClick} >Buy Now</button>
            </div>
        </div>
    )
} 

 