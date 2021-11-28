import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import axios from "axios";

import { Props2 } from './Parts'

//Componentes del archivo
import AboutUser from "./AboutUser";

// Estilización
import "./styles/About.scss";

// Variables del archivo a usar
import { newState } from "./info";
import { NavigationMobile } from "../../containers/NavigationMobile/NavigationMobile";


// Componente about - Componente principal
const AboutComponent: React.FC = () => {
  // ..... Caja de variables .....

  const[ array, setArray ] = useState<Props2[]>([])


  // ..... EL objeto después del backEnd .....
  useEffect(() => {
    async function getAboutArray(){
      let res = await axios.get(`http://localhost:3002/aboutUs`)

      setArray(res.data)
    }
    getAboutArray()
    // TODO: Usar el redux para guardar los datos de las personas del about
  },[])
  // ----- ----- ----- ----- -----
  return (
    <div>
      {/* ..... Sección información principal ..... */}
      <section className="headerContainer">

            <div className='curve-bg'>
                {/* ..... Svg de la organización ..... */}
                <svg
                className='bottom-curve'
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1533.04 124.29"
                >
                <g data-name="Capa 2">
                    <path
                    d="M1533 124.29H0V98.77C254.45-4.85 453.76-9.46 592.09 7.49 807.91 33.94 923.81 118.79 1158 109.14c159.79-6.58 289.22-53.63 375-93.37z"
                    fill="#22343c"
                    data-name="Capa 1"
                    />
                </g>
                </svg>
                {/* Fin svg */}
            </div>

            {/* ..... Header principal - Text & Image ..... */}
            <div className="about__headerSubContainer">
                <div> {/* Content */}
                    <h1 className="about__title">Meet our team</h1>
                    <img className="detailImage" src="https://img.freepik.com/vector-gratis/mejores-amigos-agitando-mano_23-2148361691.jpg?size=626&ext=jpg" alt="" />
                </div>
            </div>


      {/* Complete: About User components  - Mapeo con cada persona*/}
      <h1 className="aboutHeaderName__mobile ">Team fullstack</h1>
      {/* ..... Componente que va a renderizar otros componentes ..... */}
      <section className="about__responsive">

      {array.map((x) => {
        return (
          //Decoration color HERE
          <div className="aboutText">
              <AboutUser
                id={x.id}
                name={x.name}
                description={x.description}
                photo={x.photo}
                links={x.links}
                ></AboutUser>
            </div>
        );
      })}
      </section>
      <br />
      <br />
      </section>
      <NavigationMobile/>
    </div>
  );
};

export default AboutComponent;
