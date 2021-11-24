import React from "react";

// ----- ----- -----
export interface Props {
    name : string,
    image : string,
    description : string,
    social : []
}
// ----- ----- -----
// LInks:
/*
https://cinthialandia.com/es/blog/props/
https://www.pluralsight.com/guides/defining-props-in-react-function-component-with-typescript
https://adrianrueda.dev/typescript-con-react/

*/
// ----- ----- -----

// Componente about
const AboutDetailComponent: React.FC<Props> = (props:Props) => {
    // Caja de variables
    // ----- ----- ----- ----- -----
    return (
        <div>
            {/* Componente que va a ser renderizado por otros componentes */}
            <h1>{ props.name }</h1>
            <h1>{ props.image }</h1>
            <h1>{ props.description }</h1>
            <h1>{ props.social.map((x) => {
                return (<span>{x}</span>) 
            })}</h1>
        </div>
    )
} 

export default AboutDetailComponent