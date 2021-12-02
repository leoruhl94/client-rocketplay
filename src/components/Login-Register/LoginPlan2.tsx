import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router"
import { changeLogsPage } from "../../redux/actions"
import axios from 'axios'
import './LoginPlan.scss'

export const LoginPlan: React.FC = () => {
    const [input, setInput] = useState("free")
    const dispatch = useDispatch()
    const history = useHistory() 

    function handleSubmit(e){
        e.preventDefault() 
        const json = localStorage.getItem('user')
        const user = json && JSON.parse(json)
        axios.put('http://localhost:3002/users', {isBusiness: true, plan: input, email: user.email})
        history.push('/home')
    }
    function handleInput(e){
        setInput(e.target.value)
    }
    function handleBack(){
        dispatch(changeLogsPage(1))
    }
    return (
        <div className="loginPlan__container">
        <div className="loginPlan">
            <h2 className="loginPlan__title">Choose your account plan</h2>
            <form onSubmit={handleSubmit} className="loginPlan__form">
                <div className="loginPlan__option-container">
                    <input type="radio" value="user" className="loginPlan__option-input" name="acctype" id="acctype" defaultChecked onChange={handleInput} />
                    <label htmlFor="acctype" className="loginPlan__option-label">Basic</label>
                </div>
                <div className="loginPlan__option-container">
                    <input type="radio" value="user" className="loginPlan__option-input" name="acctype" id="acctype" defaultChecked onChange={handleInput} />
                    <label htmlFor="acctype" className="loginPlan__option-label">Standard</label>
                </div>
                <div className="loginPlan__option-container">
                    <input type="radio" value="user" className="loginPlan__option-input" name="acctype" id="acctype" defaultChecked onChange={handleInput} />
                    <label htmlFor="acctype" className="loginPlan__option-label">Premium</label>
                </div>
                <div className="loginPlan__btns-container">
                    <div className="loginPlan__btn-cont">
                        <button type="button" onClick={handleBack} className="loginPlan__btn">Back</button>
                    </div>
                    <div className="loginPlan__btn-cont">
                        <button type="submit" className="loginPlan__btn">Accept</button>
                    </div>
                </div>
            </form>
        </div>
        </div>
    )
}