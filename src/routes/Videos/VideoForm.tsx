import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "./VideoForm.scss";
import { NavigationMobile } from "../../containers/NavigationMobile/NavigationMobile";
import { URL_BASE } from "../../constants/constants";
import { Icon } from "../../components/Icon/Icon";
import { storeState } from "../../redux/type";
import { Upload } from "@aws-sdk/lib-storage"
import { S3Client, S3 } from "@aws-sdk/client-s3";
// Interfaces

interface User {
  accessToken: string;
  name: string;
  pic: string;
  email: string;
  isBusiness: boolean;
}
interface Input {
  file: any;
  title: string;
  description: string,
  channel: string,
  category: string,
  thumb: any,
}
 
// -----------------------------------------------------------------------------------------
export const VideoForm: React.FC = () => {
  // Caja de variables
  const [user, setUser] = useState({});
  const [selectBool, setSelectBool] = useState(false);
  const [input, setInput] = useState<Input>({
    file: null,
    title: "",
    description: "",
    channel: "",
    category: "",
    thumb: null,
  });

  const [textFile, setTextFile] = useState<string>(
    "Drag and drop a file or select add Video"
  );

  // ..... Con esta función subimos los cambios .....
  async function handleUpload(e) {
    e.preventDefault();
    let response = await axios.get("http://localhost:3002/uploadVideo/aws-client")
    // console.log(response)
    const { creds, bucket } = response.data
    const target = { Bucket: bucket, Key: input.title, Body: input.file, ContentType: input.file.type}
    const upload = new Upload({
      client: new S3Client({region: "us-east-1", credentials: creds}),
      leavePartsOnError: false,
      params: target,
    })
    // console.log(typeof upload)
    upload.on("httpUploadProgress", (progress) => {
      console.log(progress)
    })

    let videoPromise = upload.done()
    // .then((e) => console.log("done", e))

    const targetThumb = {Bucket: bucket, Key: input.title + "thumb", Body: input.thumb, ContentType: input.thumb.type }
    const uploadThumb = new Upload({
      client: new S3Client({region: "us-east-1", credentials: creds}),
      leavePartsOnError: false,
      params: targetThumb,
    })

    uploadThumb.on("httpUploadProgress", (progress) => {
      console.log(progress)
    })

    let thumbPromise = uploadThumb.done()

    Promise.all([videoPromise, thumbPromise])
    .then(() => console.log("termine de subir los dos"))






    // e.preventDefault();
    // const js = localStorage.getItem("tok");
    // const tokens = js && JSON.parse(js);
    // console.log(tokens.data.data);
    // let formData = new FormData();
    // formData.append("videoFile", input.file);
    // formData.append("title", input.title);
    // formData.append("tokens", JSON.stringify(tokens.data.data));
    // const config = {
    //   headers: { "Content-Type": "multipart/form-data" },
    // };

    // console.log("FORM DATA tok", formData.getAll("tokens"))

    // axios
    // // .post(
    //   //   `${URL_BASE}/uploadVideo`,
    //   //   {
    //     //     videoFile: input.file,
    //     //     title: input.title,
    //     //     tokens: JSON.stringify(tokens.data.data),
    //     //   },
    //     //   config
    //     // )
    //     .post(`${URL_BASE}/uploadVideo`, formData, config)
    //     .then((r) => {
    //       // TODO: Devolver un feedback
    //       console.log("respuesta: ", r);
    //     });
    //     console.log("EN ESTE PUNTO YA HICE POST Y NO PASO NADA OTRA VEZ :P");
  }
  // ..... Captamos los cambios con esta función .....
  function handleChange(e) {
    if (e.target.name === "video") {
      setInput({ ...input, file: e.target.files[0] });
      setTextFile(e.target.value);
      console.log(e.target.files[0]);
      return;
    }
    if(e.target.name === "thumb"){
      setInput({
        ...input,
        thumb: e.target.files[0]
      })
      return;
    }
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  function handleDoubleSelect(e){
    setInput({...input, [e.target.name]: e.target.value})
    e.target.name === "channel" && setSelectBool(true)
  }

  return (
    // TODO: Estilización de la creación de videos .....
    // TODO: Proponer el popUp Component .....
    // Avatar - Autor - Descripcion - UUID (video) - Link AWS - Titulo video - Likes -
    // Canal - Categorias de ese canal - tags 


    <article className="Video__container-main animated fadeIn fast">
      <section className="Video__container-form">
        <h1 className="Video__title-main">Create a video</h1>

        {/* ..... Comenzamos con el formulario para subir las cosas ..... */}
        <form onSubmit={handleUpload}>
          {/* ..... Title ..... */}
          <div className="inputDiv">
            <input
              className="Video__file-uploader-text"
              type="text"
              name="title"
              value={input.title}
              id="title"
              placeholder="Title"
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          {/* ..... Description ..... */}
          <div>
            <textarea /* type="text" */ className="Video__file-uploader-text" name="description" id="description" value={input.description} placeholder="Description" onChange={(e) => handleChange(e) } />
          </div>
          {/* ..... Selects (Channels y Categories) ..... */}
          <div>
            <select name="channel" id="channel" onChange={handleDoubleSelect}>
              <option value="" selected disabled>Select a channel</option>
              <option value="primeroA">Primero A</option>
              <option value="primeroB">Primero B</option>
              <option value="segundoA">Segundo A</option>
              <option value="segundoB">Segundo B</option>
            </select>
            {
              selectBool ? (
                <select name="category" id="category" onChange={handleDoubleSelect}>
                  <option value="" selected disabled>Select a category</option>
                  <option value="math">Math</option>
                  <option value="science">Science</option>
                  <option value="history">History</option>
                  <option value="geography">Geography</option>
                </select>
              ) : <></>
            }
          </div>
          {/* ..... Tags ..... */}
          <div>
            <select name="tags" id="tags">
              <option value="" selected>Select a tag</option>
              <option value="ecuaciones">Ecuaciones</option>
              <option value="fracciones">Fracciones</option>
              <option value="predicado">Predicado</option>
              <option value="Eli se me ocurrio como hacerlo">Eli se me ocurrio como hacerlo</option>
            </select>
          </div>
          {/* ..... File ..... */}
          {/* <input className="Video__file-uploader-textfield" type="file" name="video" onChange={handleChange} />         */}
          <div className="image-upload-wrap">
            <div>
              <input
                className="file-upload-input"
                type="file"
                accept=".mp4"
                name="video"
                onChange={(e) => handleChange(e)}
                required
              />
            </div>
            <div className="drag-text">
              <h3>{textFile}</h3>
            </div>
          </div>
          <div>
            <input type="file" onChange={(e) => handleChange(e)} name="thumb"></input>
          </div>
          {/* ..... Upload ..... */}
          <button className="Video__file-uploader-btn" type="submit">
            Upload video
          </button>
        </form>
        {/* ..... ..... ..... ..... */}
        <video title="Testing" width="300px" height="300px" controls>
            <source src="https://rocketplay2021.s3.us-east-1.amazonaws.com/test10"/>
        </video>
        <img src="https://rocketplay2021.s3.us-east-1.amazonaws.com/test11thumb"/>
        <NavigationMobile />
      </section>
    </article>
    // TODO: Control de errores debería llegar al front
  );
};
