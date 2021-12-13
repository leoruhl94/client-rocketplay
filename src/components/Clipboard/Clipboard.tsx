import React from "react";
import './Clipboard.scss'

interface Props {
    value : string
}


/*
¿ME QUERÉS USAR?

Importame dentro del componente, 
colocame donde quieras
pasame un "value" que será lo que mandaré al clipboard

Ej:
    <Clipboard value={input}></Clipboard>
*/ 

export const Clipboard : React.FC<Props> = ({value}) =>{
    
    const copyToClipboard = async (val : string) => {
        if ('clipboard' in navigator) {
            return await navigator.clipboard.writeText(val);
          } else {
            return document.execCommand('copy', true, val);
          }
    }


    // ... Clipboard ...
    return(<button className="Clipboard__button" onClick={() => copyToClipboard(value)}>
        Copy to Clipboard
    </button>)
}