import React from "react"
import './PlanRatio.scss'

interface props{
    plan:any,
    handleInput:any,
    input:boolean,
}
export const PlanRatio: React.FC<props> = ({plan, handleInput, input}) => {
    return(
        <div className={`planRatio__container${input ? ' checked' : ''}`}>
            <input
                type="radio"
                value={plan.name}
                className="planRatio__input"
                name="planRatio"
                id="acctype"
                checked={input}
                onChange={handleInput}
              />
            <span className="planRatio__name">{plan.name}</span>
            <ul className="planRatio__ul">
                {plan?.description.slice(1).map((x, i) => <li className="planRatio__li" key={i}>{x}</li>)}
            </ul>
            <p className="planRatio__price-cont">
                <span className="planRatio__price">${plan.price}</span>
                <span className="planRatio__Pricelapse">/Month</span>
            </p>
        </div>
    )
}