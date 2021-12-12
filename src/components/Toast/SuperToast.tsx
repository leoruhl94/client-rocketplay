import React, { useEffect } from "react";

interface Props {
    value : string
}

export function testFunction(){
  // Ya se muestra la palabra jajaja
  let x = document.querySelectorAll("#snackbar");
  x.forEach((i) => {
    i.className = "show";
  });
  setTimeout(function(){ x[0].className = x[0].className.replace("show", ""); }, 3000);
  //TODO: Agregar al redux notificaciones para mapear
}

// Component
export const SuperToast : React.FC<Props> = ({value}) => {
  

  
  useEffect(() => {
      //Function here?

}, []);


    //***************************************** */
    return(<div>
            <div id="snackbar">{value}</div>
    </div>)
}