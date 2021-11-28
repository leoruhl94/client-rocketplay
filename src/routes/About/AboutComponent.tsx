import React from "react";
import { Link } from "react-router-dom";

//font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//Componentes del archivo
import AboutUser from "./AboutUser";

// Estilización
import "./styles/About.scss";

// Variables del archivo a usar
import { state } from "./info";
import { NavigationMobile } from "../../containers/NavigationMobile/NavigationMobile";
// Componente about
const AboutComponent: React.FC = () => {
  // ..... Caja de variables .....

  // ..... EL objeto después del backEnd .....

  // ----- ----- ----- ----- -----
  return (
    <div>
      {/* Sección información principal */}
      <section className="headerContainer">

            <div className='curve-bg'>
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
            </div>
            <div className="about__headerSubContainer"> {/* Red sub container */}
                <div> {/* h1 and h2 */}
                    <h1 className="about__title">Meet our team</h1>
                    <img className="detailImage" src="https://img.freepik.com/vector-gratis/mejores-amigos-agitando-mano_23-2148361691.jpg?size=626&ext=jpg" alt="" />
                </div>
            </div>



      {/* Complete: Back button */}

      {/* Complete: About User components */}
      <h1 className="aboutHeaderName__mobile ">Team fullstack</h1>
      {/* Complete: Componente que va a renderizar otros componentes */}
      <section className="about__responsive">

      {state.map((x) => {
        return (
          //Decoration color HERE
          <div className="aboutText">
              <AboutUser
                id={x.id}
                name={x.name}
                description={x.description}
                image={x.image}
                linkedin={x.linkedin}
                github={x.github}
                ></AboutUser>
            </div>
        );
      })}
      </section>
      {/* TODO: Estilización del figma */}
      <br />
      <br />
      </section>
    </div>
  );
};

export default AboutComponent;
