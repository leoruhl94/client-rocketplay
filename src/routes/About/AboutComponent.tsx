import React from "react";
import AboutDetailComponent from "./AboutDetailComponent";
import { Props } from "./AboutDetailComponent";
// Componente about
const AboutComponent: React.FC = () => {
    // ..... Caja de variables .....
    
    
    // ..... EL objeto despues del backEnd .....
    let state : Props = {
        name: "Soy una prueba nomás",
        image : "url...",
        description : "Hace tiempo quería poner eso qsyo",
        social : []
      }

    // ----- ----- ----- ----- -----
    return (
        <div>
            {/* Componente que va a renderizar otros componentes */}
            <AboutDetailComponent name={state.name} image={state.image} description={state.description} social={state.social}></AboutDetailComponent>

        </div>
    )
} 

export default AboutComponent