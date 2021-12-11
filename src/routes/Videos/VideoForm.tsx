import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "./VideoForm.scss";

import { URL_BASE } from "../../constants/constants";
import { Icon } from "../../components/Icon/Icon";
import { storeState } from "../../redux/type";
import { Upload } from "@aws-sdk/lib-storage"
import { S3Client, S3 } from "@aws-sdk/client-s3";
import { SuccessWnd } from "../../components/successWnd/SuccessWnd";

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
interface Errors {
  title: string;
}
interface UploadId {
  uploadId: string;
}
interface Previews{
  video: any,
  img: any
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
  const [errors, setErrors] = useState<Errors>({
    title: "",
  });
  const [uploadIdState, setUploadIdState] = useState<UploadId>({uploadId: ""});
  const [previews, setPreviews] = useState<Previews>({video: undefined, img: undefined});
  const [textFile, setTextFile] = useState<string>(
    "Drag and drop or select a file "
  );
    // console.log("SOY EL UPLOAD ID", uploadIdState.uploadId)
  // ..... Con esta función subimos los cambios .....

  useEffect(() => {
    if (!input.file) {
        setPreviews({...previews, video: undefined});
        return
    } else if (input.file) {
      const objectUrl = URL.createObjectURL(input.file) 
      setPreviews({...previews, video: undefined})
      setTimeout(() => {setPreviews({...previews, video: objectUrl});}, 1)
    } 
  }, [input.file])

  useEffect(() => {
    if (!input.thumb) {
        setPreviews({...previews, img: undefined});
        return
    } else if (input.thumb) {
      const objectUrl = URL.createObjectURL(input.thumb) 
      setPreviews({...previews, img: objectUrl});
    } 
  }, [input.thumb])

  async function handleUpload(e) {
    e.preventDefault();

    if(errors.title) return alert('Fix: '+errors.title)
    let response = await axios.get(`${URL_BASE}/uploadVideo/aws-client`)
    const { creds, bucket } = response.data
    console.log(creds)

    let client = new S3Client({region: "us-east-1", credentials: creds})
    const target = { Bucket: bucket, Key: input.title, Body: input.file, ContentType: input.file.type}

    try {
      const upload = new Upload({
        client: client,
        leavePartsOnError: false,
        params: target,        
      })

      upload.on("httpUploadProgress", (progress) => {
        console.log(progress)
      })
  
      let videoPromise = upload.done()

      const targetThumb = {Bucket: bucket, Key: input.title + "+thumb", Body: input.thumb, ContentType: input.thumb.type }
      const uploadThumb = new Upload({
        client: client,
        leavePartsOnError: false,
        params: targetThumb,
      })
  
      uploadThumb.on("httpUploadProgress", (progress) => {
        console.log(progress)
      })
  
      let thumbPromise = uploadThumb.done()

      Promise.all([videoPromise, thumbPromise])
      .then(() => console.log("termine de subir los dos"))

    } catch (err){
      console.log(err)
    }

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
      e.target.files[0] && setInput({ ...input, file: e.target.files[0] });
      setTextFile(e.target.files[0].name || "Drag and drop a file or select add Video");
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
    if(e.target.name === "title"){
      if(e.target.value.includes('.')){
        setErrors({
          ...errors,
          title: 'The title should not contain dots'
        })
      }else{
        setErrors({
          ...errors,
          title: ''
        })
      }
    }
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  function handleDoubleSelect(e){
    setInput({...input, [e.target.name]: e.target.value})
    e.target.name === "channel" && setSelectBool(true)
  }

  return (

    <article className="Video__container-main animated fadeIn fast">
      <SuccessWnd text="Successfully Uploaded"/>
      <section className="Video__container-form">
        <h1 className="Video__title-main">Create a video</h1>

        {/* ..... Comenzamos con el formulario para subir las cosas ..... */}
        <form onSubmit={/* handleUpload */(e) => handleUpload(e)}>
          <div className='Section__Container'>
            {/* ..... Title ..... */}
            <div >
              <h2 className='Section__title'>Title (required)</h2>
              <div className="inputDiv">
                <input
                  className={`Video__file-uploader-text${errors.title?' invalid':''}`}
                  type="text"
                  name="title"
                  value={input.title}
                  id="title"
                  placeholder="Add a descriptive and simple title to your video"
                  onChange={(e) => handleChange(e)}
                  required
                />
              </div>
              <span className='form__error'>{errors.title}</span>
            </div>

            {/* ..... Description ..... */}
            <div>
              <h2 className='Section__title'>Description</h2>
              <textarea className="Video__file-uploader-description" name="description" id="description" value={input.description} placeholder="Add an overview to your video" onChange={(e) => handleChange(e) } />
            </div>
          </div>

          {/* ..... File ..... */}
          <div className='Section__Container'>
            <h2 className='Section__title'>Video (required)</h2>
            <p className='Section__description'>Upload a video from your computer</p>
            {previews.video ? 
            <video className="Video__preview" title="Testing" width="300px" controls>
                <source src={previews.video}/>
            </video> 
            : <div className="image-upload-wrap">
              <div>
                <input
                  className="file-upload-input"
                  type="file"
                  //accept=".mp4"
                  accept="video/*"
                  name="video"
                  onChange={(e) => handleChange(e)}
                  required
                />
              </div>
              <div className="drag-text">
                <h3>{textFile}</h3>
              </div>
            </div>}

            <div className="file-upload-selectButton">
              <h3>Select Video</h3>
              <input
                className="file-upload-input-selectButton"
                type="file"
                //accept=".mp4"
                accept="video/*"
                name="video"
                onChange={(e) => handleChange(e)}
                required
                />
            </div>
          </div>
          
          {/* ..... image upload ..... */}
          <div className='Section__Container'>
            <h2 className='Section__title'>Thumbnail</h2>
            <p className='Section__description'>Add a thumbnail for your video</p>
            {previews.img ? <div className='Image__preview-cont'><img src={previews.img} className="Image__preview" alt="preview"/></div>
            : <div className="image-upload-wrap">
              <div>
                <input
                  className="file-upload-input"
                  type="file"
                  accept="image/*"
                  name="thumb"
                  onChange={(e) => handleChange(e)}
                  required
                />
              </div>
              <div className="drag-text">
                <h3>{textFile}</h3>
              </div>
            </div>}
            <div className="file-upload-selectButton">
              <h3>Select Image</h3>
              <input
                className="file-upload-input-selectButton"
                type="file"
                accept="image/*"
                name="thumb"
                onChange={(e) => handleChange(e)}
                required
                />
            </div>
          </div>
          
          <div className='Section__Container'>
            {/* ..... Selects (Channels y Categories) ..... */}
            <div>
              <h2 className='Section__title'>Workspace and Category (required)</h2>
              <p className='Section__description'>Choose which workspace and category the video will belong to</p>
              <div>
                <select name="channel" id="channel" onChange={handleDoubleSelect}>
                  <option value="" selected disabled>Select a workspace</option>
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
            </div>

            {/* ..... Tags ..... */}
            <div>
              <h2 className='Section__title'>Tags</h2>
              <p className='Section__description'>Tag your video so users can find it faster</p>
              <select name="tags" id="tags">
                <option value="" selected>Select a tag</option>
                <option value="ecuaciones">Ecuaciones</option>
                <option value="fracciones">Fracciones</option>
                <option value="predicado">Predicado</option>
                <option value="Eli se me ocurrio como hacerlo">Eli se me ocurrio como hacerlo</option>
              </select>
            </div>
          </div>

          {/* ..... Upload ..... */}
          <button className="Video__file-uploader-btn" type="submit">
            Upload video
          </button>
        </form>
        {/* ..... ..... ..... ..... */}
        
      </section>
    </article>
    // TODO: Control de errores debería llegar al front
  );
};