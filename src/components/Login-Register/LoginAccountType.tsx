import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { changeProfile, closeAccountType } from "../../redux/actions";
import axios from "axios";
// import google from "../../images/google.png";
import "./loginAccountType.scss";
import {GoogleLogout} from 'react-google-login'

interface Props{
    googleUser: any
}
export const LoginAccountType: React.FC = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const json = localStorage.getItem('user')
    const user = json && JSON.parse(json)
    const [input, setInput] = useState("user")

    function handleSubmit(e){
        e.preventDefault();
        const json = localStorage.getItem('user')
        const user = json && JSON.parse(json)
        const isBusiness = (input === 'business')

        axios.put('http://localhost:3002/users', {isBusiness: isBusiness, email: user.email})
        dispatch(closeAccountType())

        if(isBusiness) history.push('/pricing')
        else history.push('/home')
    }
    
    function handleInput(e){
        setInput(e.target.value)
    }
    function logout(){

    }
    
    return (
        <div className="acctype-super-container">
            <div className="acctype-container">
                <div className="acctype-title-div">
                    <h2>Welcome !</h2>
                    <h2>Choose your account type</h2>
                </div>
                <div className="acctype-button-div">
                        <form onSubmit={handleSubmit}>
                            <div>
                                {/* <p>An employee/subscriber looking to only access and watch videos</p> */}
                                {/* <button onClick={handleClick} value='user' className="acctype-choose-business">Subscriber Account</button> */}
                                <div className="acctype-input-div">
                                    <input type="radio" value="user" className="acctype-choose-business" name="acctype" id="acctype" defaultChecked onChange={handleInput} />
                                    <label htmlFor="acctype" className="acctype-labels">User Account</label>
                                </div>
                            </div>
                            <div>
                                {/* <p>A company/enterprise looking to use our service to upload and showcase videos</p> */}
                                {/* <button onClick={handleClick} value='business' className="acctype-choose-business">Business Account</button> */}
                                <div className="acctype-input-div">
                                    <input type="radio" value="business" className="acctype-choose-business" name="acctype" id="acctype" onChange={handleInput} />
                                    <label htmlFor="acctype" className="acctype-labels">Business Account</label>
                                </div>
                            </div>
                            <div className="acctype-buttons-div">
                                <div className="acctype-submit-div">
                                    <button type="submit" className="acctype-submit-btn">Accept</button>
                                </div>
                                <div className="acctype-submit-div">
                                    <GoogleLogout
                                        clientId="1034475859743-iv8aok7263jflskvdkubpuosqp09kfj0.apps.googleusercontent.com"
                                        buttonText="Logout"
                                        className="acctype-google-btn"
                                        onLogoutSuccess={logout}
                                    />
                                </div>
                            </div>
                        </form>
                </div>
            </div>
        </div>
    )
}