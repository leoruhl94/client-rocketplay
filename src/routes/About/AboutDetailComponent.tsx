import React from "react";
import { useParams } from "react-router";


// ----- ----- -----
// LInks:
/*
https://cinthialandia.com/es/blog/props/
https://www.pluralsight.com/guides/defining-props-in-react-function-component-with-typescript
https://adrianrueda.dev/typescript-con-react/

*/
// ----- ----- -----

// Componente about
const AboutDetailComponent: React.FC = () => {
    // Caja de variables
    // https://dev.to/javila35/react-router-hook-useparam-now-w-typescript-m93
    type idParams = {
        id : string
    }

    let { id } = useParams<idParams>()

    



    // ----- ----- ----- ----- -----
    return (
        <div>
            <h1>Buenas soy el {id}</h1>
        </div>
    )
} 

export default AboutDetailComponent