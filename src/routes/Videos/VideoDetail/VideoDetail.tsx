// Importaciones de react
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import YouTube from 'react-youtube';
// Estilización
import './VideoDetail.scss'
// ..... Componente principal del archivo .....
 export const VideoDetail: React.FC = () => {
    
    // ..... Var box ..... 
    type idParams = {
        id : string
    }

    interface videoData {
        author : string,
        title : string,
        video_id : string
    }

    const [ video, setVideo ] = useState('')

    let { id } = useParams<idParams>()
    // TODO: ¿Debería pedir el resto de información al backEnd?
    // TODO: Descripción, name, etiquetas, channels

    // useEffect 
    useEffect(() => {

    },[]);


    // ..... Funciones de Youtube frame .....
    const onReady = (e) => {
        // Ocurre cuando el video está preparado por completo
        console.log(e.target);
        e.target.playVideo()
        console.log(e.target.playerInfo.videoData);
        console.log(e.target.playerInfo.videoData.title);
        console.log(e.target.showVideoInfo());


    }
    const onPause = (e) => {
        e.target.pauseVideo()
    }

    // ..... Lo que voy a devolver .....    
    return (<article>
        {/* ..... Main section ..... */}
        <section className="">
            {/* ..... Show videos ..... */}
            {/* TODO: Mostrar los títulos relacionados */}
            <h1 className="VideoDetail-main-title">Soy el componente</h1>
            {/* TODO: Mostrar el video en un componente*/}
            <div className="VideoDetail__video-container">
            {/* ... frame section ... */}
            <YouTube
            videoId={ id }                  // defaults -> null
            // id={string}                       // defaults -> null
            // className={string}                // defaults -> null
            // containerClassName={string}       // defaults -> ''
            // opts={obj}                        // defaults -> {}
             onReady={onReady}                    // Cuándo esté listo
            // onPlay={func}                     // defaults -> noop
            // onPause={func}                    // defaults -> noop
            // onEnd={func}                      // defaults -> noop
            // onError={func}                    // defaults -> noop
            // onStateChange={func}              // defaults -> noop
            // onPlaybackRateChange={func}       // defaults -> noop
            // onPlaybackQualityChange={func}    // defaults -> noop
            />
            </div>
            {/* ... End of frame section ... */}
            {/* TODO: Mostrar la descripción */}
            {/* TODO: Mostrar responsive */}
            {/* TODO: Mostrar back button */}
            {/* TODO: Ocupar la navbar */}



        </section>

    </article>)

 }

 /**            <iframe className="VideoDetail-main-video"
            src={`https://www.youtube.com/embed/${id}`}
            frameBorder='0'
            allow='autoplay; encrypted-media'
            allowFullScreen
            title='video'
            /> */