import React, { useEffect, useState } from "react";
import "./styles/normalize.css";
import "./styles/app.scss";

// Componentes
import {Home} from "./routes/Home/Home";
import AboutComponent from './routes/About/AboutComponent';
import AboutDetailComponent from './routes/About/AboutDetailComponent';
import {Logins} from "./routes/Logins/Logins"
import PricingComponent from './routes/Pricing/PricingComponent';
import {RegisterSwitch} from "./components/Login-Register/RegisterSwitch"
import { LoginSwitch } from './components/Login-Register/LoginSwitch';
import { LoginEmail } from './components/Login-Register/LoginEmail';
import { RegisterEmail } from './components/Login-Register/RegisterEmail';
import { BusinessSwitch } from './components/Login-Register/BusinessSwitch';
import { Categories } from "./routes/Categories/Categories";

// Navegación
import { HashRouter, Route, Switch } from "react-router-dom";
import { Channels } from "./routes/Channels/Channels";
import { Redirect, useHistory } from "react-router";

// Redux
import { useDispatch } from "react-redux";
import { changeProfile } from "./redux/actions";
import { VideoForm } from "./routes/Videos/VideoForm";

const App: React.FC = () => {
    //const history = useHistory()
    const json = localStorage.getItem("lastRoute")
    const lastRoute = json || '/'
    console.log(lastRoute)
    return ( // ----------------------------------------------------
        // ..... Enrutamiento .....
        <HashRouter>
            <Switch>
                {/* ..... Ruta principal ..... */}
                <Route exact path="/" render={() => 
                    !localStorage.getItem("user") ? 
                    <Home/> :
                    <Redirect to={lastRoute}/>}/>
                {/* ..... Ruta about ..... */}
                <Route exact path="/about">
                    <AboutComponent></AboutComponent>
                </Route>
                <Route exact path="/about/:id">
                    <AboutDetailComponent></AboutDetailComponent>
                </Route>
                {/* ...... Ruta pricing ..... */}
                <Route exact path="/pricing" component={PricingComponent} />
                
                <Route exact path="/logs" component={Logins}/>
                {/* ...... Ruta Log In ..... */}
                <Route exact path="/login" component={LoginSwitch}/>
                {/* ...... Ruta Log In Email..... */}
                <Route exact path="/loginEmail" component={LoginEmail}/>
                {/* ...... Ruta Register ..... */}
                <Route exact path="/register" component={RegisterSwitch}/>
                {/* ...... Ruta Register Email ..... */}
                <Route exact path="/registerEmail" component={RegisterEmail}/>
                {/* ...... Ruta Business Switch ..... */}
                <Route exact path="/business" component={BusinessSwitch}/>
                {/* ...... Ruta Business register ..... */}
                <Route exact path="/business-register"/>
                {/* ...... Ruta Channels ..... */}
                <Route exact path="/home" render={() => 
                    !localStorage.getItem("user") ? 
                    <Redirect to="/logs"/> : 
                    <Channels/>}/>
                {/* ...... Ruta Categories ..... */}
                <Route exact path='/home/:channel' render={({match}: any) => 
                    !localStorage.getItem("user") ? 
                    <Redirect to="/logs"/> : 
                    <Categories channel={match.params.channel}/>}/>
                {/* ..... Ruta Create videogame ..... */}
                <Route exact path="/createVids" component={VideoForm}/>

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
