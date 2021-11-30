import React from "react";
// import google from "../../images/google.png";
import "./loginAccountType.scss";

export const LoginAccountType: React.FC = () => {
    return (
        <div className="acctype-super-container">
            <div className="acctype-container">
                <div className="acctype-title-div">
                    <h2>Seems like your account is new, which type of account do you want to use?</h2>
                </div>
                <div className="acctype-button-div">
                        <div>
                            <p>A company/enterprise looking to use our service to upload and showcase videos</p>
                            <button className="acctype-choose-business">Business Account</button>
                        </div>
                        <div>
                            <p>An employee/subscriber looking to only access and watch videos</p>
                            <button className="acctype-choose-business">Subscriber Account</button>
                        </div>
                </div>
            </div>
        </div>
    )
}