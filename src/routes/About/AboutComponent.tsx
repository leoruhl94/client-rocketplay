import React, { useEffect, useState } from "react";
import axios from "axios";
import { URL_BASE } from "../../constants/constants"

// Interfaces
import { Props2 } from './Parts'

//Componentes del archivo
import AboutUser from "./AboutUser";
import { NavigationMobile } from "../../containers/NavigationMobile/NavigationMobile";

// Estilización
// import "./styles/About.scss";
import "./styles/About2.scss";

const AboutComponent: React.FC = () => {
  const[ array, setArray ] = useState<Props2[]>([]);

  useEffect(() => {
    async function getAboutArray(){
       let res = await axios.get(`${URL_BASE}/aboutus`);

      setArray(res.data)
    }
    getAboutArray()
    // TODO: Usar el redux para guardar los datos de las personas del about - Investigar redux + Ts
  },[])
  return (
    <div className="AboutComponent">
      <section className="AboutComponent-header">
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
            <div className="AboutComponent-image-div"> 
                <h1 className="AboutComponent-title">Meet our team</h1>
                <img className="AboutComponent-image" src="https://img.freepik.com/vector-gratis/mejores-amigos-agitando-mano_23-2148361691.jpg?size=626&ext=jpg" alt="" />
            </div>
            <div>
              <h1 className="AboutComponent-header-team">Team fullstack</h1>
            </div>
        {/* <section className="about__responsive">
        {array.map((x) => {
        return (
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
        })} */}

      </section>
      <NavigationMobile/>
    </div>
  );
};

export default AboutComponent;


{/* <div>
      <section className="About__header">
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

            <div className="About__header-container">
                <div className="About__detail-image-div"> 
                    <h1 className="about__title">Meet our team</h1>
                    <img className="detailImage" src="https://img.freepik.com/vector-gratis/mejores-amigos-agitando-mano_23-2148361691.jpg?size=626&ext=jpg" alt="" />
                </div>
            </div>

      <h1 className="aboutHeaderName__mobile ">Team fullstack</h1>
      <section className="about__responsive">
      {array.map((x) => {
        return (
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
  */}