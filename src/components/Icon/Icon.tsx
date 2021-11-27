import React, { SVGProps } from "react";
// Importamos nuestro objeto desde el archivo de íconos
import allIcons from "./Icons";
// Importamos nuestra interface desde el archivo de íconos para no tener errores
import {IallIcons} from "./Icons";
import './Icon.scss';

//svg as keyof allIcons
interface Props{
  svg: string,
  classes?:string,
}

export const Icon:React.FC<Props> = ({ svg , classes}) => {
  // Ingresaremos el nombre del ícono con la propiedad svg
  // de nuestro ícono en el objeto de íconos
  // Junto con una condicional para buscar el valor por
  // default que retornará null en caso de no encontrar coin allIcons['default']
  // Estructura de un elemento SVG utilizando los datos de nuestro
  // archivo de íconos y las propiedades que le pasamos
  const svgRender = allIcons[svg as keyof IallIcons] || allIcons.default;
  return (
     svgRender? 
      <svg
        viewBox={svgRender.viewBox}
        className={`${classes? classes : ""} svg-icon`}
        xmlns="http://www.w3.org/2000/svg"
        >
        {svgRender.svg}
      </svg>
      : <></>
    
  );
};




// ejemplos de uso:
// <p><span className="myIcon"><Icon svg="facebook"  title="Facebook"/></span> bla bla bla</p>
// <p><span className="myIcon"><Icon svg="youtube"  title="Linkedin"/></span> bla bla bla</p>