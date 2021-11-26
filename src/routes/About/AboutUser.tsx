import React from "react";

// Variables para traer
import { Props } from "./Parts";
import { Link } from 'react-router-dom';

// Componentes


// Componente about
const AboutUser: React.FC<Props> = (props:Props) => {
    // ..... Caja de variables .....
    
    
    // ..... Componente presentacional .....


    // ----- ----- ----- ----- -----
    return (
        <div className="animated fadeIn fast">
            
        <div className="inDivGrid">
            {/* TODO: Investigación acerca de useHistory */}
            {/* TODO: Grilla, similar a Li */}
            {/* TODO: Imágen a la izquierda */}
            {/* TODO: Nombre en el medio */}
            {/* TODO: LinkedIn a la derecha */}


        
            {/* Row1 */}
            <img className="aboutPersonImage" src={props.image} alt="...." />
            {/* COmplete: name */}
            
            <div className="textDivGrid">

            {/* Row2 */}
            <Link className="aboutText" to={`/about/${props.id}`}>

            <p className="abouth1Name">{props.name}</p>
            {/* Complete: description */}
            <p> {props.description} </p>

            </Link>
            </div>
            
            {/* Row3 */}
            <a className="automatic" href="https://www.linkedin.com/feed/">
            <img className="aboutlinkedInImage" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEsMPG6W2gOOr9S-KeE__8qYca9cJNI0u3Tw&usqp=CAU" alt="linkedIn Icon" />
            </a>

        </div>
            </div>
    )
} 

export default AboutUser