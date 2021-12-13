import React from "react";
import './MenuToggleContainer.scss'


export const MenuToggleContainer: React.FC = ({children}) => {
    
    return(
        <div className="MenuToggleContainer">
            {children}
        </div>
    )
}