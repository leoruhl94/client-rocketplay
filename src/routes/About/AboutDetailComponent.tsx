import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
//import axios from "axios"; After
import { Props2 } from "./Parts";

// ----- ----- -----
import "./styles/AboutDetail.scss";
import { NavigationMobile } from "../../containers/NavigationMobile/NavigationMobile";
import axios from "axios";
import { Icon } from "../../components/Icon/Icon";
import { Images } from "./info";

// LInks:
/*
https://cinthialandia.com/es/blog/props/
https://www.pluralsight.com/guides/defining-props-in-react-function-component-with-typescript
https://adrianrueda.dev/typescript-con-react/
// https://dev.to/javila35/react-router-hook-useparam-now-w-typescript-m93

*/
// ----- ----- -----

// ..... Componente about .....
const AboutDetailComponent: React.FC = () => {
  // Caja de variables
  type idParams = {
    id: string;
  };
    let { id } = useParams<idParams>();
    let icon = <Icon svg="linkedin"></Icon>
    let boolAbout = true
  // Estado de react con useState - State = Props2
  const [user, setUser] = useState({
    id: 0,
    name: "",
    photo: "....",
    description: "Soy una descripción",
    links: { linkedin: "", github: "" },
  });

  // ..... useEffect .....
  useEffect(() => {
    // Traer los datos desde el backEnd
    async function getAboutAPI() {
      let res = await axios.get(`http://localhost:3002/aboutUs`);
      let power: Props2 = res.data.filter((x: any) => {
        return parseInt(id) === x.id;
      });
      // Transformamos el estado local en lo que necesitamos
      setUser({
        id: parseInt(id),
        name: power[0].name,
        photo: power[0].photo,
        description: power[0].description,
        links: {
          linkedin: power[0].links.LinkedIn,
          github: power[0].links.GitHub,
        },
      });
    }
    // Hacemos ejecutar la función
    getAboutAPI();
  }, []);

  // TODO: Función acordeón
  function handleWidthAbout(){
    if(boolAbout === true){
      boolAbout = false
      let about = document.getElementsByClassName('AboutDetail_about-me')[0]
      about.className = 'AboutDetail_about-me-sec'

    }else{
      boolAbout = true
      let ab = document.getElementsByClassName('AboutDetail_about-me-sec')[0]
      ab.className = 'AboutDetail_about-me '
    }
  }
  function handleWidthTech(){
    if(boolAbout === true){
      boolAbout = false
      let about = document.getElementsByClassName('AboutDetail_about-tech')[0]
      about.className = 'AboutDetail_about-tech-sec'

    }else{
      boolAbout = true
      let ab = document.getElementsByClassName('AboutDetail_about-tech-sec')[0]
      ab.className = 'AboutDetail_about-tech '
    }
  }
  // Mostrar / Ocultar el about Me

  // ----- ----- ----- ----- -----
  return (
    // Complete: Mostrar el user completo del state
    <div>
      <div className="curve-bg">
        {/* ..... Svg de la organización ..... */}
        <svg
          className="bottom-curve"
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

      <article className="about__Article animated fadeIn fast">
        {/* ..... Sección de el perfil - Img, name, social ..... */}
        <section className="AboutDetail_profile-container">
          <img
            src={user.photo}
            alt="profile-image"
            className="AboutDetail_profile-image"
          />
          <div className="AboutDetail_profile-details">
            <h2 className="AboutDetail_profile-name">{user.name}</h2>
            <div className="AboutDetail_profile-links">
              <a href={user.links.linkedin} className="AboutDetail_icon-link">
              {console.log(user.links.linkedin)} 
                <Icon svg="linkedin"></Icon>
              </a>
              <a href={user.links.github} className="AboutDetail_icon-link">
                <Icon svg="github"></Icon>
              </a>
            </div>
          </div>
        </section>
        {/* ..... Sección About Me ..... */}
       <section>
      {/* ..... Dropdown de description ..... */}
       <div className="AboutDetail_about-me">
          <div className="AboutDetail__about-me-drop">
          <h3  className="AboutDetail_about-me-title">About Me</h3>
          <button onClick={handleWidthAbout} className="AboutDetail__about-me-button">{icon}</button>
          </div>
          <div  className="AboutDetail_about-me-description">{user.description}</div>
        </div>
        {/* ..... Dropdown de description ..... */}
       <div className="AboutDetail_about-tech">
          <div className="AboutDetail__about-tech-drop">
          <h3  className="AboutDetail_about-tech-title">Tecnologies</h3>
          <button onClick={handleWidthTech} className="AboutDetail__about-tech-button">{icon}</button>
          </div>
          <div  className="AboutDetail_about-tech-logos">
          {Images.map((x)=>{ return(<img className="AboutDetail__about-tech-logo" src={x.url} />)})}

          </div>
        </div>

       </section>

        <NavigationMobile />
      </article>
    </div>
  );
};

export default AboutDetailComponent;

// // TODO: Mostrar el user completo del state
// <article className="aboutArticle animated fadeIn fast">

// {/* Sección información principal */}
// <section>

// <Link to="/about">

// {/* Es un botón de pruebas nomás */}
// <button className="about__btn"><FontAwesomeabout__icon about__icon={faAngleLeft} size="3x" fixedWidth></FontAwesomeabout__icon></button>
// </Link>

// <img className="detailImage" src={user.image} alt="" />
// <h1> {user.name} </h1>
// <div className="about__socialNetwork">
// <p className="about__icon"> . </p>
// <h2> {user.description} </h2>
// </div>

// </section>

// {/* Sección de redes sociales */}

// <div>
// {/* LinkedIn */}
// <div className="about__socialNetwork">
//     <img className="about__icon" src="data:image/png;base64,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" alt="" />

//     <div className="socialTextNetwork">
//         <p>LinkedIn</p>
//         <Link className="aboutText" to={user.linkedin}>
//             <p>{user.name}</p>
//         </Link>

//     </div>
// </div>

// {/* GIthub */}
// <div className="about__socialNetwork">

// <img className="icon" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ41A8ryU11vs-nxlU8MOizlAun3E9JsYd0Xw&usqp=CAU" alt="" />

// <div className="socialTextNetwork">
//         <p>Github</p>
//         <Link className="aboutText" to={user.linkedin}>
//             <p>{user.name}</p>
//         </Link>

//     </div>
// </div>

// </div>
// <br /><br />

// </article>
