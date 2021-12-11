// Importaciones de react
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

// Estilización
import "./../VideoDetail.scss";

// Componentes para que ande youtube Component.
import { CommentsYT, VimeoInt } from '../hardcode';

// Extras
import { Icon } from '../../../../components/Icon/Icon';
import { NavigationMobile } from '../../../../containers/NavigationMobile/NavigationMobile';


// ..... Componente principal del archivo .....
export const VideoVimeoDetail: React.FC = () => {
  // ..... Var box .....

  // .. Info principal de los videos
  const [video, setVideo] = useState<VimeoInt>({
    //Todo esto viene del useEffect que hace peticiones a la API de youtube
    created_time : "",
    description: "",
    metadata: { comments : "", credits : "", likes : "", pictures: "" },
    name: "",
    user: {
      name : "",
      createdTime : "",
      link : "",
      location : "",
      gender : "",
      pictures : "",
      uri : ""
    },
  });

  // .. Info principal del autor
  const [autor, setAutor] = useState({
    channelId: "",
    channelTitle: "",
    description : '',
    icon : ''
  });

  // Obtener los comentarios
  const [comment, setComment] = useState<CommentsYT[]>([])

  // useParams(id)
  type idParams = {
    id: string;
  };
  let { id } = useParams<idParams>();

  // Unlisted: ¿Debería pedir el resto de información al backEnd? - a debatir
  // Complete: Descripción, name, comentarios, 
  // Unlisted: Los channels que hizo marcos

  // ..... useEffect .....
  useEffect(() => {

    // Esto debería ir en un .env - api, client_id, client_secret


    let access_token = "747fd305748b0b630984a979377bae88";
    
    let config = {
      headers : {
        Authorization : `bearer ${access_token}`
      }
    }
    
    // Para cuando tenga que pedir cosas de vimeo
    axios
      .get(
        `
        https://api.vimeo.com/videos/${id}
        `,config
      )
      .then((x) => { // ..... Cuándo me pasen el video primero, luego la data adicional .....
        
        let c = x.data

        setVideo({
          created_time : c.created_time,
          description : c.description,
          metadata : {
            comments : c.metadata.comments,
            credits : c.metadata.credits,
            likes : c.metadata.likes,
            pictures : c.metadata.pictures,
          },
          name : c.name,
          user : {
            name : c.user.metadata.name,
            createdTime : c.user.created_time,
            link : c.user.link,
            location : c.user.location,
            gender : c.user.gender,
            pictures : c.user.pictures.sizes[7].link,
            uri : c.user.uri
          }
        })  
        
        // setVideo({        });

        console.log(x.data);
        // return authorImg
      });
    }, []);
    // ..... END OF useEffect((),[]) .....

  // ..... Lo que voy a devolver .....
  return (
    <article className="VideoDetail__main-article">
      {/* ..... Main section ..... */}
      <section className="VideoDetail__main-frame">
        {/* ..... Show videos ..... */}
        <h1 className="VideoDetail-main-title">{video.name}</h1>
        {/* Complete: Mostrar el video en un componente*/}
        <div className="">
          {/* ... frame section ... */}
          <iframe className="VideoDetail-vimeo-frame" src={`https://player.vimeo.com/video/${id}?h=334b031b68&amp;app_id=122963`} allow="autoplay; fullscreen; picture-in-picture" title="Pruebas vimeo" />


          <div className="VideoDetail__author-container">
            <img className="VideoDetail__autor-logo" src={video.user.pictures} alt="..." />
            <h3>{video.user.name}</h3>
            {/* ..... Imágen de like */}
            <Icon classes="VideoDetail__content-detail" svg="like"></Icon>
            {/* ..... Imágen de dislike ..... */}
            <Icon classes="VideoDetail__content-detail" svg="dislike"></Icon>
          </div>
        </div>
        {/* ..... Sección de los detalles del video */}
        <section className="VideoDetail__main-video-detail">
            <div className="VideoDetail__container-description">
                <div className="VideoDetail__rly-description">

                <p>{video.description}</p>
                </div>
            </div>

            {/* ..... Acá van los comentarios ..... */}

            <div className="VideoDetail__container-description">
                { comment.length > 0 ? <div className="VideoDetail__container-comments">
                    
                        {comment.map((x) => {
                            //console.log(x);
                            return (
                                <div className="VideoDetail__container-comment">
                                    <div className="VideoDetail__container-padder">
                                    <p className="VideoDetail__text_title">{x.name}</p>
                                    <p>{x.textDisplay}</p>
                                    <p className="VideoDetail__comment-quote">{x.publishedAt}</p>
                                    </div>
                                </div>
                            )
                        })}
                </div> : <p>There's no comments here</p> }
            </div>

        </section>
        {/* ... End of frame section ... */}
        {/* Unlisted: Mostrar back button */}
      </section>
      <NavigationMobile/> 
    </article>
  );
};