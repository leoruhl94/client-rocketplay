import React from "react";
import './Clipboard.scss'
import { testFunction } from "../../constants/functions";
import { useDispatch } from "react-redux";
import { setToast } from "../../redux/actions";
import { Icon } from "../Icon/Icon";

interface Props {
    value : string,
}


/*
¿ME QUERÉS USAR?

Importame dentro del componente, 
colocame donde quieras
pasame un "value" que será lo que mandaré al clipboard

Ej:
    <Clipboard value={input}></Clipboard>


ESTO YA TIRA UN TOAST POR SI SOLO

    */ 

export const Clipboard : React.FC<Props> = ({value }) =>{
    
    const dispatch = useDispatch()
    const icon = <Icon svg="clipboard"></Icon>

    const copyToClipboard = async (val : string) => {
        if ('clipboard' in navigator) {
            return await navigator.clipboard.writeText(val);
          } else {
            return document.execCommand('copy', true, val);
          }
    }

    const useTestFunction = () => {
        dispatch(setToast('Copied to clipboard: ' + value))
        testFunction()
    }

    // ... Clipboard ...
    return(<section>           
        <button 
                className={`Clipboard__button`}
                onClick={() => {copyToClipboard(value);useTestFunction()}}>
        {icon}
    </button>
    </section>)
}