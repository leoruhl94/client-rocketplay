import React, { useState } from "react";

interface Props{
    handleChecked : Function,
    handleUnchecked : Function,    
    checked? : boolean
}

export const SuperToggle : React.FC<Props> = ({ handleChecked, handleUnchecked, checked=false}) => {

    //States
    const [ value, setValue] = useState(!checked);

    // Value of checkbox
    const  handleOnChange = () => {
        setValue(!value);

        if(value){
            handleChecked()
        }else{
            handleUnchecked()
        }
    }

    // Returned
    return(<section>
        <label className="switch">
          <input onChange={handleOnChange} type="checkbox" checked={checked}/>
          <span className="slider round"></span>
        </label>
    </section>)
}