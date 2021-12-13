import React, { useEffect } from "react";

interface Props {
    value : string
}

/*

¿Queŕes usarme?
-> Poneme en cualquier parte de tu componente con un value a elección
-> En el archivo 'functions' hay una llamada testFunction que me hace aparecer.
-> Coloca la función donde quieras usarme, por ejemplo

<button onClick={testFunction} >Show Snackbar</button>



*/


// Component
export const SuperToast : React.FC<Props> = ({value}) => {
    //***************************************** */
    return(<div>
            <div id="snackbar">{value}</div>
    </div>)
}