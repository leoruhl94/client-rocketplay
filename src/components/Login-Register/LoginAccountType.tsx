import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { changeProfile, closeAccountType } from "../../redux/actions";
import axios from "axios";
// import google from "../../images/google.png";
import "./loginAccountType.scss";

interface Props{
    googleUser: any
}
export const LoginAccountType: React.FC = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const json = localStorage.getItem('user')
    const user = json && JSON.parse(json)

    function handleClick(e){
        const json = localStorage.getItem('user')
        const user = json && JSON.parse(json)

        const isBusiness = (e.target.value === 'business')
        console.log('isBusiness: ', isBusiness)
        
        axios.put('http://localhost:3002/users', {isBusiness: isBusiness, email: user.email})
        dispatch(closeAccountType())

        if(isBusiness) history.push('/pricing')
        else history.push('/home')
    }
    return (
        <div className="acctype-super-container">
            <div className="acctype-container">
                <div className="acctype-title-div">
                    <h2>Seems like your account is new, which type of account do you want to use?</h2>
                </div>
                <div className="acctype-button-div">
                        <div>
                            <p>A company/enterprise looking to use our service to upload and showcase videos</p>
                            <button onClick={handleClick} value='business' className="acctype-choose-business">Business Account</button>
                        </div>
                        <div>
                            <p>An employee/subscriber looking to only access and watch videos</p>
                            <button onClick={handleClick} value='user' className="acctype-choose-business">Subscriber Account</button>
                        </div>
                </div>
            </div>
        </div>
    )
}