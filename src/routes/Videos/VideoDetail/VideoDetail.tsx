// Importaciones de react
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import YouTube from 'react-youtube';
// Estilización
import './VideoDetail.scss'
import { videodatallazo } from './functions';
import axios from "axios";
// ..... Componente principal del archivo .....
 export const VideoDetail: React.FC = () => {
    
    const [video, setVideo ] = useState({
        title : '',
        author : ''
    })

    // ..... Var box ..... 
    type idParams = {
        id : string
    }

    interface videoData {
        author : string,
        title : string,
        video_id : string
    }

    let { id } = useParams<idParams>()
    // TODO: ¿Debería pedir el resto de información al backEnd?
    // TODO: Descripción, name, etiquetas, channels

    // useEffect 
    useEffect(() => {
        let api = 'AIzaSyDWYs7h3L7MuhumjSVofdjn3RxYkJMsyxI'
        // Para cuando tenga que pedir cosas
        axios.get(`https://www.googleapis.com/youtube/v3/videos?part=id%2C+snippet&id=${id}&key=${api}
        `).then()

    },[]);
    
    // ..... Funciones de Youtube frame .....
    // Están modularizadas ahora las principales
    function onReadyData(e){

        let r = videodatallazo.onReady(e);

        setVideo({
            ...video,
            title : r.title,
            author : r.video_id
})
    }

    // ..... Lo que voy a devolver .....    
    return (<article>
        {/* ..... Main section ..... */}
        <section className="">
            {/* ..... Show videos ..... */}
            {/* TODO: Mostrar los títulos relacionados */}
            <h1 className="VideoDetail-main-title">{video.title}</h1>
            {/* TODO: Mostrar el video en un componente*/}
            <div className="VideoDetail__video-container">
            {/* ... frame section ... */}
            <YouTube
            videoId={ id }                  // defaults -> null
            // id={string}                       // defaults -> null
            // className={string}                // defaults -> null
            // containerClassName={string}       // defaults -> ''
            // opts={obj}                        // defaults -> {}
             onReady={e => {onReadyData(e)  }}                    // Cuándo esté listo
            // onPlay={func}                     // defaults -> noop
             onPause={e => videodatallazo.onPause(e)}                    // defaults -> noop
            // onEnd={func}                      // defaults -> noop
            // onError={func}                    // defaults -> noop
            // onStateChange={func}              // defaults -> noop
            // onPlaybackRateChange={func}       // defaults -> noop
            // onPlaybackQualityChange={func}    // defaults -> noop
            />
            <h3>Autor :  {video.author}</h3>
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