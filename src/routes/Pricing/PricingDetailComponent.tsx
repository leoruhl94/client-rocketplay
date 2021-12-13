import React, { useState } from "react";
import './PricingDetailComponent.scss'
import { useDispatch } from "react-redux";
import { pricingSelect } from "../../redux/actions";
import { useHistory } from "react-router";
import { useAuth } from "../../auth/useAuth";

export interface Props {
    color: number;
    plan: string;
    price: number;
    description: string;
}

export const PricingDetailComponent: React.FC<Props> = (props: Props) => {
    const [dep, setDep] = useState<Boolean>(props.plan === 'Standard' ? true : false)
    const dispatch = useDispatch()
    const history = useHistory()
    const auth = useAuth()
    const colors = ['violet', 'blue', 'gold'] 

    function handleDeploy() {
        setDep(!dep)
    }
    function handleClick() {
        dispatch(pricingSelect(props.plan))
        if(auth?.isLogged){
            history.push('/login')
        }else{
            history.push('/payment')
        }
    }

    return (
        <div className={`planContainer ${colors[props.color]}${dep ? ' dep':''}`}>
            <button className={`btn-deploy`} onClick={handleDeploy}></button>
            <p className="plan">{props.plan}</p>
            <div className='planData'>
                <div className="price">
                    <span>{props.price}<span> $</span></span> per month
                </div>
                <div className="description_container">
                    <p className="description">{props.description}</p>
                </div>
                
                <button className="btn-buy" onClick={handleClick} >Buy Now</button>
            </div>
        </div>
    )
} 

 