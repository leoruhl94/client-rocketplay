// Importaciones de react
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import YouTube from "react-youtube";
// Estilización
import "./VideoDetail.scss";
import { videodatallazo } from "./functions";
import axios from "axios";
import { Comments, CommentsYT } from './hardcode';
import { Icon } from '../../../components/Icon/Icon';
import { NavigationMobile } from '../../../containers/NavigationMobile/NavigationMobile';
import { NavProfileAndLocation } from "../../../containers/NavProfileAndLocation/NavProfileAndLocation";
// ..... Componente principal del archivo .....
export const VideoDetail: React.FC = () => {
  // ..... Var box .....
  const [video, setVideo] = useState({
    //Todo esto viene del useEffect que hace peticiones a la API de youtube
    videoId: "",
    title: "",
    author: "",
    authorId: "",
    description: "",
    createdAt: "",
  });

  const [autor, setAutor] = useState({
    channelId: "",
    channelTitle: "",
    description : '',
    icon : ''
  });

  const [comment, setComment] = useState<CommentsYT[]>([])

  type idParams = {
    id: string;
  };

  let { id } = useParams<idParams>();
  // TODO: ¿Debería pedir el resto de información al backEnd? - a debatir
  // Complete: Descripción, name, comentarios, 
  // TODO: Los channels que hizo marcos

  // ..... useEffect .....
  useEffect(() => {

    // Esto debería ir en un .env
    let api = "AIzaSyDWYs7h3L7MuhumjSVofdjn3RxYkJMsyxI";
    // Para cuando tenga que pedir cosas
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/videos?part=id%2C+snippet&id=${id}&key=${api}
        `
      )
      .then((x) => { // ..... Cuándo me pasen el video primero, luego la data adicional .....
        // Me llegó la data del video

        let authorImg = x.data.items[0].snippet.channelId
        
        setVideo({
          ...video,
          videoId: x.data.items[0].id,
          author: x.data.items[0].snippet.channelTitle,
          authorId: x.data.items[0].snippet.channelId,
          title: x.data.items[0].snippet.title,
          description: x.data.items[0].snippet.description,
          createdAt: x.data.items[0].snippet.publishedAt,
        });
        // Tengo que pedir ahora la data sensible del autor

        console.log(x.data);
        return authorImg
      })
      .then((x) => { // ..... ..... ..... ..... .....
        axios
          .get( // ..... Queremos al autor .....
            `https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${x}&key=${api}`
          ).then((x) => {

            setAutor({...autor,
                channelId : x.data.items[0].id,
                channelTitle : x.data.items[0].snippet.localized.title,
                description : x.data.items[0].snippet.localized.description,
                icon : x.data.items[0].snippet.thumbnails.default.url
            })

            //console.log(x.data);
          });
      }).then((x) => { // Queremos los comentarios
          axios.get(`https://www.googleapis.com/youtube/v3/commentThreads?key=${api}&textFormat=plainText&part=snippet&videoId=${id}&maxResults=100`)
          .then((y) => {
              //console.log(y.data);

              let comentario = y.data.items.map((c) => {

                return { name : c.snippet.topLevelComment.snippet.authorDisplayName, 
                  authorImg : c.snippet.topLevelComment.snippet.authorProfileImageUrl,
                  authorChannelUrl : c.snippet.topLevelComment.snippet.authorChannelUrl,
                  textDisplay : c.snippet.topLevelComment.snippet.textDisplay,
                  publishedAt : c.snippet.topLevelComment.snippet.publishedAt }
              })
              
              setComment([...comment, ...comentario])
              
          })
      })
   
  
    }, []);

    // ..... END OF useEffect((),[]) .....

  // ..... Funciones de Youtube frame .....
  // Están modularizadas ahora las principales

  // ..... Lo que voy a devolver .....
  return (
    <><NavProfileAndLocation header={video.title}/>
    <article className="VideoDetail__main-article">
      {/* ..... Main section ..... */}
      <section className="VideoDetail__main-frame">
        <div className="VideoDetail_Grid_Container">
          <div className="VideoDetail__flex_helper">
            {/* ..... Show videos ..... */}
            <h1 className="VideoDetail-main-title">{video.title}</h1>
            {/* Complete: Mostrar el video en un componente*/}
            <div className="VideoDetail__main-frame2-container">
              {/* ... frame section ... */}
              <YouTube
                videoId={id} // defaults -> null
                // id={string}                       // defaults -> null
                className="VideoDetail__main-frame2" // defaults -> null
                // containerClassName={string}       // defaults -> ''
                // opts={obj}                        // defaults -> {}
                onReady={(e) => {
                  videodatallazo.onReady(e);
                }} // Cuándo esté listo
                // onPlay={func}                     // defaults -> noop
                onPause={(e) => videodatallazo.onPause(e)} // defaults -> noop
                // onEnd={func}                      // defaults -> noop
                // onError={func}                    // defaults -> noop
                // onStateChange={func}              // defaults -> noop
                // onPlaybackRateChange={func}       // defaults -> noop
                // onPlaybackQualityChange={func}    // defaults -> noop
              />
            </div>
            <div className="VideoDetail__author-container">
              <img className="VideoDetail__autor-logo" src={autor.icon} alt="..." />
              <h3>{video.author}</h3>
              {/* ..... Imágen de like */}
              <Icon classes="VideoDetail__content-detail" svg="likeOutline" ></Icon>
              {/* ..... Imágen de dislike ..... */}
              <Icon classes="VideoDetail__content-detail" svg="dislikeOutline"></Icon>
            </div>
          </div>
          <div className="VideoDetail__container-description_desktop">
                <div className="VideoDetail__rly-description">
                <h3>Description</h3>
                <p>{video.description}</p>
                </div>
            </div>
        </div>
        {/* ..... Sección de los detalles del video */}
        <section className="VideoDetail__main-video-detail">
            <div className="VideoDetail__container-description">
                <div className="VideoDetail__rly-description">
                <h3>Description</h3>
                <p>{video.description}</p>
                </div>
            </div>

            {/* ..... Acá van los comentarios ..... */}

            <div className="VideoDetail__container2-description">
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

            {/* <iframe src="https://player.vimeo.com/video/652679928?h=334b031b68&amp;app_id=122963" width="426" height="240" allow="autoplay; fullscreen; picture-in-picture" title="Test" /> */}

        </section>
        {/* ... End of frame section ... */}
        {/* TODO: Mostrar back button */}
        {/* TODO: Ocupar la navbar */}
      </section>
      <NavigationMobile/> 
    </article></>
  );
};

/**            <iframe className="VideoDetail-main-video"
            src={`https://www.youtube.com/embed/${id}`}
            frameBorder='0'
            allow='autoplay; encrypted-media'
            allowFullScreen
            title='video'

                        axios.get(`https://www.googleapis.com/youtube/v3/search?key=${api}&channelId=${video.authorId}&part=snippet,id&order=date&maxResults=20`).then((x) => {
                console.log(x.data);
            })
            /> */
