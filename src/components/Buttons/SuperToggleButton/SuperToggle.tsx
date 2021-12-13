import React, { useState } from "react";

interface Props{
    handleChecked : Function,
    handleUnchecked : Function,    
}

export const SuperToggle : React.FC<Props> = ({ handleChecked, handleUnchecked}) => {

    //States
    const [ value, setValue] = useState(true);

    // Value of checkbox
    const  handleOnChange = () => {
        setValue(!value);
        console.log(value);

        if(value){
            handleChecked()
        }else{
            handleUnchecked()
        }
    }

    // Returned
    return(<section>
        <label className="switch">
          <input onChange={handleOnChange} type="checkbox" />
          <span className="slider round"></span>
        </label>
    </section>)
}