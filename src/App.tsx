import React, { useEffect, useState } from "react";
import "./styles/normalize.css";
import "./styles/app.scss";

// Componentes
import {Home} from "./routes/Home/Home";
import AboutComponent from './routes/About/AboutComponent';
import AboutDetailComponent from './routes/About/AboutDetailComponent';
import {Logins} from "./routes/Logins/Logins"
import PricingComponent from './routes/Pricing/PricingComponent';
import { Categories } from "./routes/Categories/Categories";
import { LoginAccountType } from "./components/Login-Register/LoginAccountType";
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
import { VideoVimeoDetail } from "./routes/Videos/VideoDetail/Vimeo/VideoVimeoDetail";
import { MenuComponent } from "./routes/Menu/MenuComponent";



const App: React.FC = () => {
    const dispatch = useDispatch() 
    let location = useLocation();
    // const json = localStorage.getItem("lastRoute")
    // const lastRoute = json ? json : '/home'
    
    useEffect(() => {
        const ksJson = localStorage.getItem("keepSession")
        const ks = ksJson && JSON.parse(ksJson)
        if(!ks?.keepSession) {localStorage.clear()}

        //cargar en redux datos de la sesion abierta
        const js = localStorage.getItem("user")
        const user = js && JSON.parse(js)
        if(js) dispatch(refresh(user))

        //cargar los planes de pago en redux
        dispatch(getPlans())
        // axios.get("http://127.0.0.1:3002/subscriptions/headers")
        // .then(data=>data)
    }, [])

    useEffect(() => {
        if(location.pathname.startsWith('/home')){
            localStorage.setItem('lastRoute', `${location.pathname}`)
        }
      }, [location]);

    return ( // ..... Enrutamiento .....
        <Switch>
            {/* ..... Ruta principal ..... */}
            {/* <Route exact path="/" render={() => 
                !localStorage.getItem("user") || !lastRoute ? 
                <Home/> :
                <Redirect to={lastRoute}/>}/> */}
            <Route exact path="/" component={Home}/>
            {/* ..... Ruta about ..... */}
            <Route exact path="/about" component={AboutComponent}/>
            {/* ..... Ruta preapproval ..... */}
            <Route exact path="/preapproval" component={PreApproval}/>
            {/* ..... Ruta about detail ..... */}
            <Route exact path="/about/:id" component={AboutDetailComponent}/>
            {/* ...... Ruta pricing ..... */}
            <Route exact path="/pricing" component={PricingComponent} />
            {/* ...... Ruta Log In ..... */}
            <Route exact path="/login" component={Logins}/>
            {/* <Route exact path="/login" render={() =>  
                !localStorage.getItem("user") ? 
                <Logins/> :
                <Redirect to="/"/> }/> */}
            {/* ...... Ruta Channel ..... */}
            <Route exact path="/home" render={() =>  
                !localStorage.getItem("user") ? 
                <Redirect to="/login"/> : 
                <Channels/>}/>
            {/* ...... Ruta Categories ..... */}
            <Route exact path='/home/:channel' render={({match}: any) =>  
                !localStorage.getItem("user") ? 
                <Redirect to="/login"/> : 
                <Categories channel={match.params.channel}/>}/>
            {/* ...... Ruta Class ..... */}
            <Route exact path="/home/:channel/:class" render={({match}: any) => 
                !localStorage.getItem("user") ? 
                <Redirect to="/login"/> : 
                <Class class={match.params.class}/>}/>
            {/* ...... Ruta Testing ..... */}
            <Route exact path="/testing" component={LoginAccountType}/>

            {/* ...... Ruta Create Video ..... */}
            <Route exact path="/createVids" component={VideoForm}/>
            {/* ...... Ruta Video Detail ..... */}
            <Route path="/videodetail/:id" component={VideoDetail} />
            {/* ...... Ruta Video Detail - VIMEO ..... */}
            <Route path="/vimeoDetail/:id" component={VideoVimeoDetail} />
            {/* ...... Ruta Menu Component ..... */}
            <Route path="/menu" component={MenuComponent} />
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
