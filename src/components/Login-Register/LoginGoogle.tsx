import React, {useState} from "react"
import {GoogleLogin} from 'react-google-login'
import {Icon} from '../Icon/Icon'

interface gFuncs{
    res: any,
    fail: any
}
export const LoginGoogle: React.FC<gFuncs> = ({res, fail}) => {
    const [keepSession, setKeepSession] = useState(false) 
    return (
        <div className="Logs">
            <h2 className="Logs_title">Log in/Sign up to start using our service</h2>
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
            onSuccess={res}
            onFailure={fail}
            cookiePolicy={'single_host_origin'}
            prompt='consent'
          />
        </div>
        <label>Mantener sesion iniciada</label>
        <input type='checkbox' name='keepSession' onChange={(e) => {setKeepSession(!e.target.checked)}} checked={keepSession}/>
      </div>
    )
}