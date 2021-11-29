import React from "react";
import { Link } from 'react-router-dom';

// Interfaces
import { Props2 } from "./Parts";


// Componentes


// Componente about - Le pasamos la interfaz para los valores de Props
const AboutUser: React.FC<Props2> = (props:Props2) => {
    // ..... Caja de variables .....
    // No hay necesarias por el momento
    
    // ..... Componente presentacional .....


    // ----- ----- ----- ----- -----
    return (
        // Contenedor principal, encargado de hacer la animación nomás
        <div className="animated fadeIn fast">
            
        {/* ..... Grilla principall ..... */}
        <div className="inDivGrid">
            {/* TODO: Investigación acerca de useHistory */}


        
            {/* Row1 - Imágen correspondiente */}
            <img className="aboutPersonImage" src={props.photo} alt="...." />
            
            {/* Row 2 - Lugar donde colocamos la información completa junto con un link al detail */}
            <div className="textDivGrid">
            <Link className="aboutText" to={`/about/${props.id}`}>
            <p className="abouth1Name">{props.name}</p>
            <br />
            <p className="about__mobile"> Fullstack Web Developer </p>
            <p className="color">  </p>
            </Link>
            </div>
            {/* ..... Fin del row2 ..... */}
            

        </div>
            </div>
    )
} 

export default AboutUser