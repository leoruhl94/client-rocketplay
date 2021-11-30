import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { changeProfile } from "../../redux/actions";
import axios from "axios";
// import google from "../../images/google.png";
import "./loginAccountType.scss";

interface Props{
    googleUser: any
}
export const LoginAccountType: React.FC<Props> = ({googleUser}) => {
    const history = useHistory()
    const dispatch = useDispatch()
    console.log(googleUser)

    function handleClick(e){
        axios.post('http://localhost:3002/loginUser', {isBusiness: false, name: googleUser.profileObj.name, email: googleUser.profileObj.email}) 
        history.push('/home')
        //dispatch(changeProfile(googleUser, history))
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
                            <button onClick={() => history.push('/pricing')} className="acctype-choose-business">Business Account</button>
                        </div>
                        <div>
                            <p>An employee/subscriber looking to only access and watch videos</p>
                            <button onClick={(e) => handleClick(e)} className="acctype-choose-business">Subscriber Account</button>
                        </div>
                </div>
            </div>
        </div>
    )
}