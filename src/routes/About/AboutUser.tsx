import React from "react";

// Variables para traer
import { Props2 } from "./Parts";
import { Link } from 'react-router-dom';


// Componentes


// Componente about
const AboutUser: React.FC<Props2> = (props:Props2) => {
    // ..... Caja de variables .....
    
    
    // ..... Componente presentacional .....


    // ----- ----- ----- ----- -----
    return (
        <div className="animated fadeIn fast">
            
        <div className="inDivGrid">
            {/* TODO: Investigación acerca de useHistory */}
            {/* Complete: Grilla, similar a Li */}
            {/* Complete: Imágen a la izquierda */}
            {/* Complete: Nombre en el medio */}
            {/* Complete: LinkedIn a la derecha */}


        
            {/* Row1 */}
            <img className="aboutPersonImage" src={props.photo} alt="...." />
            {/* COmplete: name */}
            
            <div className="textDivGrid">

            {/* Row2 */}
            <Link className="aboutText" to={`/about/${props.id}`}>

            <p className="abouth1Name">{props.name}</p>
            {/* Complete: description */}
            <br />
            <p className="about__mobile"> Fullstack Web Developer </p>
        
            <p className="color">  </p>

            </Link>
            </div>
            

        </div>
            </div>
    )
} 

export default AboutUser