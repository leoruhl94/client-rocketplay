import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import "./VideoForm.scss";

import { URL_BASE } from "../../constants/constants";
import { Icon } from "../../components/Icon/Icon";
import { storeState } from "../../redux/type";
import { Upload } from "@aws-sdk/lib-storage"
import { S3Client, S3 } from "@aws-sdk/client-s3";
import { SuccessWnd } from "../../components/successWnd/SuccessWnd";
import { useAuth } from "../../auth/useAuth";
import { setToast } from "../../redux/actions"
import { testFunction } from "../../constants/functions";

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
  video: string;
  // image: string;
}
interface UploadId {
  uploadId: string;
}
interface Previews{
  video: any,
  img: any
}

interface Categories {
  name: string;
  id: number;
}

interface Channels {
  name: string;
  id: number;
}

interface Member {
  memberId: number;
  memberEmail: string;
  memberName: string;
  userType: string;
}
 
interface Props {
  schemaName: string;
}
//  -----------------------------------------------------------------------------------------
export const VideoForm: React.FC<Props> = ({schemaName}) => {
  // Caja de variables
  const [user, setUser] = useState<User>({
    accessToken: "",
    name: "",
    pic: "",
    email: "",
    isBusiness: false,
  });
  const dispatch = useDispatch()
  // name, email, isBusiness, pic, subscriptions, workspaces, workspacesTitles
  const auth = useAuth()

  const [selectBool, setSelectBool] = useState(false);
  const [success, setSuccess] = useState(false);
  const [categoryState, setCategoryState] = useState<Categories[]>([])
  const [channelsState, setChannelsState] = useState<Channels[]>([])
  const [member, setMember] = useState<Member>({
    memberId: 0,
    memberEmail: "",
    memberName: "",
    userType: "",
})

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
    video: 'Should upload a video',
    // image: 'Should upload an image',
  });
  const [uploadIdState, setUploadIdState] = useState<UploadId>({uploadId: ""});
  const [previews, setPreviews] = useState<Previews>({video: undefined, img: undefined});
  const [textFile, setTextFile] = useState<string>(
    "Drag and drop or select a file "
  );
    // console.log("SOY EL UPLOAD ID", uploadIdState.uploadId)
  // ..... Con esta funci??n subimos los cambios .....

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

  useEffect(() => {
    axios.get(`${URL_BASE}/channels`, {params: {schemaName: schemaName}})
    .then(r => {
      let array:any[] = []
      r.data.map(el => {
        let obj = {
          name: el.name,
          id: el.id,
        }
        array.push(obj)
      })
      setChannelsState(array)
    })
    getMemberInfo()
  }, [])

  const getMemberInfo = async () => {
    let responseMembers = await axios.get(`${URL_BASE}/members`, {params: {schemaName: schemaName, memberEmail: auth?.user?.email}})
    let data = responseMembers.data[0]
    setMember({
        memberId: data.id,
        memberEmail: data.mail,
        memberName: data.name,
        userType: data.usertype
    })
  }

  const handleCategorySelect = (e) => {
    axios.get(`${URL_BASE}/category/bychannel`, {params: {schemaName: schemaName, channelId: e.target.value}})
    .then(r => {
      let array: any[] = []
      r.data.map(el => {
        let obj = {
          name: el.catName,
          id: el.catId,
        }
        array.push(obj)
      })
      setCategoryState(array)
    })
  }

  async function handleUpload() {

    if(errors.title) return alert('Fix: '+errors.title)
    if(errors.video) return alert('Fix: '+errors.video)
    // if(errors.image) return alert('Fix: '+errors.image)

    let boton = document.querySelector('.Video__file-uploader-btn')
    boton && boton.setAttribute("disabled", "true")

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
      // let realThumb = input.thumb === null ? "" : input.title + "-thumb"
      if(input.thumb !== null){
        const targetThumb = {Bucket: bucket, Key: input.title + "-thumb", Body: input.thumb, ContentType: input.thumb.type }
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
        .then(() => {
          setSuccess(true)
          console.log("termine de subir los dos")
          handleDatabaseLoad()
        })
      } else {
        Promise.all([videoPromise])
        .then(() => {
          setSuccess(true)
          handleDatabaseLoad()
        })
      }


    } catch (err){
      boton && boton.setAttribute("disabled", "false")
      console.log(err)
    }

    const handleDatabaseLoad = () => {
      // let { title, avatar, author, description, thumbnail, memberId, categoryId } = req.body
      let realThumb = input.thumb === null ? "" : input.title + "-thumb"
      axios.post(`${URL_BASE}/uploadvideo/database`, {
        title: input.title,
        avatar: auth?.user?.pic,
        author: schemaName,
        description: input.description,
        thumbnail: realThumb,
        memberId: member.memberId,
        categoryId: input.category
      })
      .then(r => {
        dispatch(setToast('Video uploaded successfully'))
        testFunction()
        console.log(r)
      })
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
  // ..... Captamos los cambios con esta funci??n .....
  function handleChange(e) {
    if (e.target.name === "video") {
      if(e.target.value) setErrors({ ...errors, video: '' })
      e.target.files[0] && setInput({ ...input, file: e.target.files[0] });
      setTextFile(e.target.files[0].name || "Drag and drop a file or select add Video");
      console.log(e.target.files[0]);
      return;
    }
    if(e.target.name === "thumb"){
      /* if(e.target.value) setErrors({ ...errors, image: '' }) */
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
    <>
    {success ? <SuccessWnd text="Successfully Uploaded"/> : null}
    <article className="Video__container-main animated fadeIn fast">
      <section className="Video__container-form">
        <h1 className="Video__title-main">Create a video</h1>

        {/* ..... Comenzamos con el formulario para subir las cosas ..... */}
        <form >
          <div className='Section__Container'>
            {/* ..... Title ..... */}
            <div >
              <h2 className='Section__title'>Title *</h2>
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
            <h2 className='Section__title'>Video *</h2>
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
                />
            </div>
          </div>
          
          <div className='Section__Container'>
            {/* ..... Selects (Channels y Categories) ..... */}
            <div>
              <h2 className='Section__title'>Workspace and Category *</h2>
              <p className='Section__description'>Choose which workspace and category the video will belong to</p>
              <div>
                <select name="channel" id="channel"className="SelectComponent" onChange={(e) => {
                    handleDoubleSelect(e)
                    handleCategorySelect(e)
                }}>
                  <option value="" selected disabled className="SelectComponent_option">Select a channel</option>
                  {
                    channelsState.length > 0 ?
                    channelsState.map(el => {
                      return <option value={el.id} key={el.id} className="SelectComponent_option">{el.name}</option>
                    })
                    : <></>
                  }
                </select>
                {
                  selectBool ? (
                    <select name="category" id="category"className="SelectComponent" onChange={handleDoubleSelect}>
                      <option value="" selected disabled className="SelectComponent_option">Select a category</option>
                      {
                        categoryState.length > 0 ?
                        categoryState.map(el => {
                          return <option value={el.id} key={el.id} className="SelectComponent_option">{el.name}</option>
                        })
                        : <></>
                      }
                    </select>
                  ) : <></>
                }
              </div>
            </div>

            {/* ..... Tags ..... */}
            {/* <div>
              <h2 className='Section__title'>Tags</h2>
              <p className='Section__description'>Tag your video so users can find it faster</p>
              <select name="tags" id="tags">
                <option value="" selected>Select a tag</option>
                <option value="ecuaciones">Ecuaciones</option>
                <option value="fracciones">Fracciones</option>
                <option value="predicado">Predicado</option>
                <option value="Eli se me ocurrio como hacerlo">Eli se me ocurrio como hacerlo</option>
              </select>
            </div> */}
          </div>

          {/* ..... Upload ..... */}
          <button className="Video__file-uploader-btn" type="button" onClick={handleUpload}>
            Upload video
          </button>
        </form>
        {/* ..... ..... ..... ..... */}
        
      </section>
    </article></>
    // TODO: Control de errores deber??a llegar al front
  );
};