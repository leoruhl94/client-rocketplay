import React, {useState} from "react";
import {useHistory, useLocation} from 'react-router-dom'
import {GoogleLogin} from 'react-google-login'
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import "./Logins.scss";
import {changeProfile, deployLogWnd} from '../../redux/actions'
import { NavigationMobile } from "../../containers/NavigationMobile/NavigationMobile";

import { Icon } from "../../components/Icon/Icon";
import { LoginAccountType } from "../../components/Login-Register/LoginAccountType";
//import { useGoogleLogin } from 'react-google-login'

interface User {
  accessToken: string, 
  name: string,
  pic: string,
  email: string,
  isBusiness: boolean,
}
interface Input{
  file: any,
  title: string
}
//let wnd: any = null
export const Logins: React.FC = () => {
  const [sign, setSign] = useState<boolean>(false);
  const history = useHistory();
  const dispatch = useDispatch()
  const {accountType} = useSelector((state: storeState) => state)
  const [user, setUser] = useState({})
  const handleSign = () :void => {
    setSign(!sign)
  }
  const [input, setInput] = useState<Input>({
    file: null, title: '',
  })
  
  async function responseGoogle(googleUser) {
    //console.log(googleUser)
    const {code} = googleUser
    const tokens = await axios.post('http://localhost:3002/loginUser', {code: code})
    //console.log('data: ',tokens.data)
    localStorage.setItem('tok', JSON.stringify(tokens))
    const data = await axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${tokens.data.data.id_token}`)
    const userGoogle = {
      accessToken: tokens.data.data.access_token,
      name: data.data.name,
      pic: data.data.picture,
      email: data.data.email, 
    }
    
    console.log(userGoogle)
    dispatch(changeProfile(userGoogle, history))
    setUser(userGoogle)
  }

  function errorGoogle(response){
    console.log(response)
  }
  function handleUpload(e){
    e.preventDefault()
    const js = localStorage.getItem('tok')
    const tokens = js && JSON.parse(js)
    console.log(tokens.data.data)
    const formData = new FormData()
    formData.append('videoFile', input.file)
    formData.append('title', input.title)
    formData.append('tokens', JSON.stringify(tokens.data.data))
    const config = {
      headers: {'content-type': 'multipart/form-data'}
    }
    //axios.post('http://localhost:5000/upload', formData, config)
    //console.log(formData)
    axios.post('http://localhost:3002/uploadVideo', formData, config)
    .then(r => {
      console.log('respuesta: ',r)
    })
    /* const js = localStorage.getItem('tok')
    const tokens = js && JSON.parse(js)
    axios.post('http://localhost:3002/uploadVideo', {tokens}) */
  }
  function handleChange(e){
    if (e.target.name === 'video') return setInput({...input, file: e.target.files[0]})
    setInput({...input, [e.target.name]: e.target.value})
  }


  return (
    <div>
      <div className="Logs">
        {accountType ? <LoginAccountType googleUser={user} /> : null}
        <h2 className="Logs_title">{`${sign ?'Sign up':'Log in'} to start using our service`}</h2>
        <div className="Logs_logo">
          <Icon svg="logoDarkColor" />
        </div>      
        <div className="singleButton">
          <GoogleLogin
            clientId="1009538709316-mp0t7rds0snem49ajha6d8u74mbgtb9v.apps.googleusercontent.com"
            buttonText={ sign ? "Sign up with Google ": "Log in with Google "}
            scope='profile email https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube.force-ssl'
            className="botoncito"
            accessType='offline'
            responseType='code'
            onSuccess={responseGoogle}
            onFailure={(errorGoogle)}
            cookiePolicy={'single_host_origin'}
            prompt='consent'
          />
        </div>
        <form onSubmit={handleUpload}>
          <input type='text' name='title' value={input.title} onChange={handleChange}/>
          <input type='file' name='video' onChange={handleChange}/>
          <button type='submit' >subir video</button>
        </form>

        <button className="Logins__toggle-botton">
        { sign ? "Already have an account? Log in": "Don’t have an account? Sign up"}
        </button>



        <NavigationMobile />
      </div>
    </div>
  );
};
