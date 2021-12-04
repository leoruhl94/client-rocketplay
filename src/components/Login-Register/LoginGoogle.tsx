import React, {useState} from "react"
import {GoogleLogin} from 'react-google-login'
import {Icon} from '../Icon/Icon'
import './LoginGoogle.scss'

interface gFuncs{
    res: any,
    fail: any
}
export const LoginGoogle: React.FC<gFuncs> = ({res, fail}) => {
    const [keepSession, setKeepSession] = useState(true) 

    function handleCheck(e) {
      setKeepSession(e.target.checked ? true : false)
    }

    return (
        <div className="Logs">
            <h2 className="Logs_title">Log in / Sign up to start using our service</h2>
        <div className="Logs_logo">
          <Icon svg="logoDarkColor" />
        </div>
        <div className="singleButton">
          <GoogleLogin
            clientId='1034475859743-iv8aok7263jflskvdkubpuosqp09kfj0.apps.googleusercontent.com'
            buttonText="Log in/Sign up with Google "
            scope='profile email https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube.force-ssl'
            className="botoncito"
            accessType='offline'
            responseType='code'
            onSuccess={g => {res(g, keepSession)}}
            onFailure={fail}
            cookiePolicy={'single_host_origin'}
            prompt='consent'
          />
        </div>
        <label className='logs_keppSession-lbl'>
          <input type='checkbox' name='keepSession' className='logs_keppSession-cb' onChange={handleCheck} checked={keepSession}/>
          Mantener sesion iniciada
        </label>
      </div>
    )
}