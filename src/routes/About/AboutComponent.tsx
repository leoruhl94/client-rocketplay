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
      <section className="">


      <h1 className="aboutHeaderName">
        Meet our team
      </h1>

        <img className="detailImage" src="https://img.freepik.com/vector-gratis/mejores-amigos-agitando-mano_23-2148361691.jpg?size=626&ext=jpg" alt="" />

      </section>

      {/* Complete: Back button */}

      {/* Complete: About User components */}
      <h1 className="aboutHeaderName">Team fullstack</h1>
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
      <NavigationMobile/>
    </div>
  );
};

export default AboutComponent;
