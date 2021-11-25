import React from "react";


import AboutDetailComponent from "./AboutDetailComponent";
import {Link} from "react-router-dom"



import { Props } from "./Parts";

// Componente about
const AboutComponent: React.FC = () => {
    // ..... Caja de variables .....
    
    
    // ..... EL objeto despues del backEnd .....


    // ----- ----- ----- ----- -----
    return (
        <div>
            {/* TODO: Back button */}
            <h1>About Component</h1>
            {/* TODO: About image */}


            {/* Componente que va a renderizar otros componentes */}
            <Link to={`/about/0`}>
                <li>1</li>
            </Link>
            <Link to={`/about/1`}>
                <li>1</li>
            </Link>
            <Link to={`/about/2`}>
                <li>2</li>
            </Link>
            <Link to={`/about/3`}>
                <li>3</li>
            </Link>
            <Link to={`/about/4`}>
                <li>4</li>
            </Link>
            <Link to={`/about/5`}>
                <li>5</li>
            </Link>
            <Link to={`/about/6`}>
                <li>6</li>
            </Link>
            <Link to={`/about/7`}>
                <li>7</li>
            </Link>
            <Link to={`/about/8`}>
                <li>8</li>
            </Link>

        </div>
    )
} 

export default AboutComponent