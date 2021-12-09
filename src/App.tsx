import React, { useEffect, useState } from "react";
import "./styles/normalize.css";
import "./styles/app.scss";

// Componentes
import {Landing} from "./routes/Landing/Landing";
import AboutComponent from './routes/About/AboutComponent';
import AboutDetailComponent from './routes/About/AboutDetailComponent';
import {Logins} from "./routes/Logins/Logins"
import PricingComponent from './routes/Pricing/PricingComponent';
import { Categories } from "./routes/Categories/Categories";
import { Channels } from "./routes/Channels/Channels";
import { Class } from "./routes/Clases/Class";
import { VideoDetail } from "./routes/Videos/VideoDetail/VideoDetail";
import { VideoForm } from "./routes/Videos/VideoForm";
import { PreApproval } from "./routes/PreApproval/PreApproval";

// Navegación
import { Route, Switch } from "react-router-dom";
import { Redirect, useLocation, useHistory } from "react-router";

// Redux
import { useDispatch } from "react-redux";
import { getPlans, refresh } from "./redux/actions";
import  axios from "axios";
import { useAuth } from "./auth/useAuth";
import { PrivateRoute } from "./auth/PrivateRoute";
import { PaymentsPlans } from "./routes/Logins/Login-Register/PaymentsPlans";
import { PaidRejection } from "./routes/PaidRejection/PaidRejection";

const App: React.FC = () => {
    const dispatch = useDispatch() 
    const history = useHistory()
    let location = useLocation();
    const auth = useAuth()
    
    useEffect(() => {
        // const itemLocal = localStorage.getItem("tok")
        // const itemSession = sessionStorage.getItem("tok")
        // let tokens =  itemLocal ? JSON.parse(itemLocal): (itemSession? JSON.parse(itemSession) : null);
        // axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${tokens.data.data.id_token}`)
        // .then(r => {
        //     const user = {
        //     name: r.data.name,
        //     pic: r.data.picture,
        //     email: r.data.email,
        //     };
        //     dispatch(refresh(user))
        //     console.log("USER app", user)
        // })

        //cargar los planes de pago en redux
        // const json = localStorage.getItem("lastRoute")
        // const lastRoute = json ? json : '/'
        // history.push(lastRoute)
        dispatch(getPlans())
    }, [])

    useEffect(() => {
        // console.log(location)
        if(!location.pathname.startsWith('/login')){
            localStorage.setItem('lastRoute', `${location.pathname}`)
        }
      }, [location]);

    return ( 
        <Switch>
            <Route exact path="/" component={Landing}/>
            <Route exact path="/about" component={AboutComponent}/>
            <Route exact path="/about/:id" component={AboutDetailComponent}/>
            <Route exact path="/pricing" component={PricingComponent} />
            <PrivateRoute exact path="/payment" component={PaymentsPlans}/>
            <PrivateRoute exact path="/preapproval" component={PreApproval}/>
            <PrivateRoute exact path="/paidrejection" component={PaidRejection}/>
            <Route exact path="/login" component={Logins}/>
            <PrivateRoute exact path="/createVids" component={VideoForm}/>
            <PrivateRoute path="/videodetail/:id" component={VideoDetail} />


{/* __________________LOS DE ABAJO HAY QUE DEFINIR BIEN LOS NOMBRES DE LAS RUTAS_____________________________ */}

            <PrivateRoute exact path="/home" component={Channels}/>
            {/* ...... Ruta Categories ..... */}
            <PrivateRoute exact path='/home/:channel' component={Categories}/>
            {/* ...... Ruta Class ..... */}
            <PrivateRoute exact path='/home/:channel/:class' component={Class}/>
          
            {/* ...... Ruta Testing ..... */}
            {/* <PrivateRoute exact path="/testing" component={LoginAccountType}/> */}

        </Switch>   
    )
} 

export default App;
