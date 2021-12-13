import React, { useEffect } from "react";

interface Props {
    value : string
}

/*

¿Queŕes usarme?
-> NO NECESITAS PONERME, YA ESTOY COMO ETIQUETA EN APP.TSX USANDO UN VALOR DEL STORE
-> En el archivo 'functions' hay una llamada testFunction que me hace aparecer.
-> Hacé un dispatch con el string a mostrar con setToast('value')
-> Coloca la función donde quieras usarme, por ejemplo

dispatch(setToast('Okay'))

<button onClick={testFunction()} >Show Snackbar</button>



*/


// Component
export const SuperToast : React.FC<Props> = ({value}) => {
    //***************************************** */
    return(<div>
            <div id="snackbar">{value}</div>
    </div>)
}