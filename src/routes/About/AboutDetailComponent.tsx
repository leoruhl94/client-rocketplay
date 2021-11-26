import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";


import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
//import axios from "axios"; After
import { state } from "./info";
import { Props } from './Parts'

// ----- ----- -----
import "./styles/AboutDetail.scss";


// LInks:
/*
https://cinthialandia.com/es/blog/props/
https://www.pluralsight.com/guides/defining-props-in-react-function-component-with-typescript
https://adrianrueda.dev/typescript-con-react/
// https://dev.to/javila35/react-router-hook-useparam-now-w-typescript-m93

*/
// ----- ----- -----

// Componente about
const AboutDetailComponent: React.FC = () => {
    // Caja de variables
    type idParams = {
        id : string
    }

    let { id } = useParams<idParams>()

    // Estado de react con useState
    // TODO: Use state para ofrecer la información a la pantalla
    const [ user, setUser ] = useState({
        id:0,
        name : "",
        image : "....",
        description : "Soy una descripción",
        linkedin: "",
        github : ""
    })

    // TODO: Completar el useEffect de ejemplo
    useEffect(() => {
        async function fetchUsersApi(){
            // let res = await axios.get(`http://aSimpleRestAPi:3001/User/${id}`)
            // setUser(res.data) // Must be an object en el backEnd
            // ------------------------------------------------------------------
            let poder : Props[] = state.filter((x) => { return parseInt(id) === x.id} )
            setUser({
                id: parseInt(id),
                name : poder[0].name,
                image: poder[0].image,
                description : poder[0].description,
                linkedin : poder[0].linkedin,
                github : "s"

            })

        }   
        fetchUsersApi()
    },[]);



    // ----- ----- ----- ----- -----
    return (
        // TODO: Mostrar el user completo del state
        <article className="aboutArticle animated fadeIn fast">

            {/* Sección información principal */}
            <section>

            <Link to="/about">

            <button className="superButton"><FontAwesomeIcon icon={faAngleLeft} size="3x" fixedWidth></FontAwesomeIcon></button>
            </Link>

            <img className="detailImage" src={user.image} alt="" />
            <h1> {user.name} </h1>
            <h2> {user.description} </h2>


            </section>

        {/* Sección de redes sociales */}

        <div>
            {/* LinkedIn */}
            <div className="socialNetwork">
                <img className="icon" src="data:image/png;base64,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" alt="" />
                
                <div className="socialTextNetwork">
                    <p>LinkedIn</p>
                    <Link className="aboutText" to={user.linkedin}>
                        <p>{user.name}</p>
                    </Link>

                </div>
            </div>

            {/* GIthub */}
            <div className="socialNetwork">

            <img className="icon" src="data:image/png;base64,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" alt="" />


            <div className="socialTextNetwork">
                    <p>Github</p>
                    <Link className="aboutText" to={user.linkedin}>
                        <p>{user.name}</p>
                    </Link>

                </div>
            </div>

        </div>

        </article>

    )
} 

export default AboutDetailComponent