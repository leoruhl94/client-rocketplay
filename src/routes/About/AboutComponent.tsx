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

// Componente about
const AboutComponent: React.FC = () => {
  // ..... Caja de variables .....

  // ..... EL objeto después del backEnd .....

  // ----- ----- ----- ----- -----
  return (
    <div>
      {/* Sección información principal */}
      <section>


      <Link to="/">
        <button>Back</button>
      </Link>


      <h1 className="aboutHeaderName">
        Meet our team
      </h1>

        <img className="detailImage" src="https://img.freepik.com/vector-gratis/mejores-amigos-agitando-mano_23-2148361691.jpg?size=626&ext=jpg" alt="" />

      </section>

      {/* Complete: Back button */}

      {/* Complete: About User components */}
      <h1 className="aboutHeaderName">Team fullstack</h1>
      {/* Complete: Componente que va a renderizar otros componentes */}
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
      {/* TODO: Estilización del figma */}
    </div>
  );
};

export default AboutComponent;
