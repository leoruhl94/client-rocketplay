import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "./VideoForm.scss";
import { NavigationMobile } from "../../containers/NavigationMobile/NavigationMobile";

import { Icon } from "../../components/Icon/Icon";
import { LoginAccountType } from "../../components/Login-Register/LoginAccountType";

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
}
// -----------------------------------------------------------------------------------------
export const VideoForm: React.FC = () => {
  // Caja de variables
  const { accountType } = useSelector((state: storeState) => state);
  const [user, setUser] = useState({});

  const [input, setInput] = useState<Input>({
    file: null,
    title: "",
  });

  const [ textFile , setTextFile ] = useState<string>('Drag and drop a file or select add Video')

  // ..... Con esta función subimos los cambios ..... 
  function handleUpload(e) {
    e.preventDefault();
    const js = localStorage.getItem("tok");
    const tokens = js && JSON.parse(js);
    console.log(tokens.data.data);
    const formData = new FormData();
    formData.append("videoFile", input.file);
    formData.append("title", input.title);
    formData.append("tokens", JSON.stringify(tokens.data.data));
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };

    axios
      .post("http://localhost:3002/uploadVideo", formData, config)
      .then((r) => {
        // TODO: Devolver un feedback
        console.log("respuesta: ", r);
      });


  }
  // ..... Captamos los cambios con esta función .....
  function handleChange(e) {
    if (e.target.name === "video") {
      
      setInput({ ...input, file: e.target.files[0] })
      setTextFile(e.target.value);
      console.log(e.target.value);
      return 
    
    };

      setInput({ ...input, [e.target.name]: e.target.value });
  }

  return (
    // TODO: Estilización de la creación de videos .....
    // TODO: Proponer el popUp Component .....

    <article className="Video__container-main animated fadeIn fast">
      <section className="Video__container-form">

      {/* ..... ¿ This is necesary ? ..... */}
      {accountType ? <LoginAccountType /> : null}
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
          {/* <label htmlFor="title" className="Video__title-placeholder">Title</label> */}
        </div>
        {/* ..... File ..... */}
        {/* <input className="Video__file-uploader-textfield" type="file" name="video" onChange={handleChange} />         */}
        <div className="image-upload-wrap">
          <input className="file-upload-input" type="file" name="video" onChange={(e) => handleChange(e)} required/>
        <div className="drag-text">
          <h3>{textFile}</h3>
        </div>
        </div>
        {/* ..... Upload ..... */}
        <button className="Video__file-uploader-btn" type="submit">Upload video</button>
      </form>
      {/* ..... ..... ..... ..... */}
      <NavigationMobile />
      </section>
    </article>
    // TODO: Control de errores debería llegar al front
  );
};
