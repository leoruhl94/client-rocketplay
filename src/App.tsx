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
import { Redirect, useLocation } from "react-router";

// Redux
import { useDispatch } from "react-redux";
import { getPlans, refresh } from "./redux/actions";
import  axios from "axios";
import { useAuth } from "./auth/useAuth";
import { PrivateRoute } from "./auth/PrivateRoute";
import { PaymentsPlans } from "./routes/Logins/Login-Register/PaymentsPlans";

const App: React.FC = () => {
    const dispatch = useDispatch() 
    // let location = useLocation();
    const auth = useAuth()
    // const json = localStorage.getItem("lastRoute")
    // const lastRoute = json ? json : '/home'
    
    useEffect(() => {
        /* const js = localStorage.getItem("user")
        const user = js && JSON.parse(js)
        const js2 = sessionStorage.getItem("user")
        const user2 = js && JSON.parse(js)
        if(js) {
            auth?.login(user)
            dispatch(refresh(user))
        } else if(js2) {
            auth?.login(user2)
            dispatch(refresh(user2))
        } */
        /* const ksJson = localStorage.getItem("keepSession")
        const ks = ksJson && JSON.parse(ksJson)
        if(!ks?.keepSession) {localStorage.clear()} */

        //cargar en redux datos de la sesion abierta

        //cargar los planes de pago en redux
        dispatch(getPlans())
    }, [])

    // useEffect(() => {
    //     if(location.pathname.startsWith('/home')){
    //         localStorage.setItem('lastRoute', `${location.pathname}`)
    //     }
    //   }, [location]);

// 1) Definir rutas publicas y privadas
    //   -publicas: 
    //   -privadas:
// 2) Estados globales y locales
// 3) Agregar Payment-failed y payment-pending
// 4) mails de pagos y creaciones de cuentas etc (SMTP HOSTINGER o MP)
// 5) Autorizacion segun tipo de usuario 
// 6) REAGRUPAR Y PENSAR DE NUEVO 




    return ( // ..... Enrutamiento .....
        <Switch>
            {/* ..... Ruta principal ..... */}
            {/* <Route exact path="/" render={() => 
                !localStorage.getItem("user") || !lastRoute ? 
                <Landing/> :
                <Redirect to={lastRoute}/>}/> */}
            <Route exact path="/" component={Landing}/>
            {/* ..... Ruta about ..... */}
            <Route exact path="/about" component={AboutComponent}/>
            {/* ..... Ruta preapproval ..... */}
            <Route exact path="/preapproval" component={PreApproval}/>
            {/* ..... Ruta about detail ..... */}
            <Route exact path="/about/:id" component={AboutDetailComponent}/>
            {/* ...... Ruta pricing ..... */}
            <Route exact path="/pricing" component={PricingComponent} />
            {/* ...... Ruta Payment ..... */}
            <Route exact path="/payment" component={PaymentsPlans}/>

            {/* ...... Ruta Log In ..... */}
            <Route exact path="/login" component={Logins}/>
            {/* <Route exact path="/login" render={() =>  
                !localStorage.getItem("user") ? 
                <Logins/> :
                <Redirect to="/"/> }/> */}
            {/* ...... Ruta Channel ..... */}
            <PrivateRoute exact path="/home" component={Channels}/>
            {/* ...... Ruta Categories ..... */}
            <PrivateRoute exact path='/home/:channel' component={Categories}/>
            {/* <Route exact path='/home/:channel' render={({match}: any) =>
                <Categories channel={match.params.channel}/>}/> */}
            {/* ...... Ruta Class ..... */}
            <PrivateRoute exact path='/home/:channel/:class' component={Class}/>
            {/* <Route exact path="/home/:channel/:class" render={({match}: any) => 
                <Class class={match.params.class}/>}/> */}
            {/* ...... Ruta Testing ..... */}
            {/* <PrivateRoute exact path="/testing" component={LoginAccountType}/> */}

            {/* ...... Ruta Create Video ..... */}
            <PrivateRoute exact path="/createVids" component={VideoForm}/>
            {/* ...... Ruta Video Detail ..... */}
            <PrivateRoute path="/videodetail/:id" component={VideoDetail} />
        </Switch>   
    )
} 
// ----------------------------------------------------
// Componentes para hacer el día 24 / 11 ->
/*

-> Que hacemos cada uno.

- Navegación        | 
- Home              | M
- Pricing           |
- Login             | 
- About             | E

*/

export default App;
