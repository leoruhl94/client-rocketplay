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

// Navegación
import { HashRouter, Route, Switch } from "react-router-dom";
import { Redirect, useHistory } from "react-router";

// Redux
import { useDispatch } from "react-redux";
<<<<<<< HEAD
import { refresh } from "./redux/actions";



=======
import { changeProfile, refresh } from "./redux/actions";
>>>>>>> 6b908bb45e375a4bd42d4151ddbd069ef9502db7

const App: React.FC = () => {
    const dispatch = useDispatch() 
    let lastRoute = ''
    
    useEffect(() => {
        const ksJson = localStorage.getItem("keepSession")
        const ks = ksJson && JSON.parse(ksJson)
        if(!ks?.keepSession) {localStorage.clear()}
        
        const json = localStorage.getItem("lastRoute")
        lastRoute = json || '/'

        //cargar en redux datos de la sesion abierta
        const js = localStorage.getItem("user")
        const user = js && JSON.parse(js)
        if(js) dispatch(refresh(user))
    }, [])

    return ( // ..... Enrutamiento .....
        <HashRouter>
            <Switch>
                {/* ..... Ruta principal ..... */}
                <Route exact path="/" render={() => 
                    !localStorage.getItem("user") || !lastRoute ? 
                    <Home/> :
                    <Redirect to={lastRoute}/>}/>
                {/* ..... Ruta about ..... */}
                <Route exact path="/about" component={AboutComponent}/>
                {/* ..... Ruta about detail ..... */}
                <Route exact path="/about/:id" component={AboutDetailComponent}/>
                {/* ...... Ruta pricing ..... */}
                <Route exact path="/pricing" component={PricingComponent} />
                {/* ...... Ruta Log In ..... */}
                <Route exact path="/logs" component={Logins}/>
                {/* ...... Ruta Channel ..... */}
                <Route exact path="/home" render={() => 
                    !localStorage.getItem("user") ? 
                    <Redirect to="/logs"/> : 
                    <Channels/>}/>
                {/* ...... Ruta Categories ..... */}
                <Route exact path='/home/:channel' render={({match}: any) => 
                    !localStorage.getItem("user") ? 
                    <Redirect to="/logs"/> : 
                    <Categories channel={match.params.channel}/>}/>
                <Route exact path="/home/:channel/:class" render={({match}: any) => 
                    !localStorage.getItem("user") ? 
                    <Redirect to="/logs"/> : 
                    <Class class={match.params.class}/>}/>
                <Route exact path="/testing" component={LoginAccountType}/>
                {/* ...... Ruta Create Video ..... */}
                <Route exact path="/createVids" component={VideoForm}/>
                {/* ...... Ruta Video Detail ..... */}
                <Route path="/videodetail/:id" component={VideoDetail} />

            </Switch>   

        </HashRouter>
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
