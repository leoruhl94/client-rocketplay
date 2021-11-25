import React from "react";
import { Link } from "react-router-dom";

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
      {/* Complete: Back button */}
      <Link to="/">
        <button>Back</button>
      </Link>

      {/* Complete: About User components */}
      <h2>Team fullstack</h2>
      {/* Complete: Componente que va a renderizar otros componentes */}
      {state.map((x) => {
        return (
          //Decoration color HERE
          <Link className="aboutText" to={`/about/${x.id}`}>
            <div>
              <AboutUser
                id={x.id}
                name={x.name}
                description={x.description}
                image={x.image}
                linkedin={x.linkedin}
                github={x.github}
              ></AboutUser>
            </div>
          </Link>
        );
      })}
      {/* TODO: Estilización del figma */}
    </div>
  );
};

export default AboutComponent;
