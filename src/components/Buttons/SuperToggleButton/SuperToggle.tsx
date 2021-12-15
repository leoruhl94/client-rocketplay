import React, { useState } from "react";
import './SuperToggle.scss'

interface Props{
    handleChecked : Function,
    handleUnchecked : Function,    
    checked? : boolean
    enabled? : boolean
} 

export const SuperToggle : React.FC<Props> = ({ handleChecked, handleUnchecked, checked=false, enabled=true}) => {

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
    return(<section className={!enabled?' disabled':''}>
        <label className='switch'>
          <input onChange={handleOnChange} type="checkbox" checked={checked} disabled={!enabled}/>
          <span className="slider round"></span>
        </label>
    </section>)
}