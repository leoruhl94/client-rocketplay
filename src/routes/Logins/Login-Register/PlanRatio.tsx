import React from "react"
import './PlanRatio.scss'

interface props{
    plan:any
}
export const PlanRatio: React.FC<props> = ({plan}) => {
    console.log(plan)
    return(
        <div className="planRatio__container">
            {plan.name}
        </div>
    )
}