import React from 'react'
// import './styles/global.scss'
import "./styles/normalize.css"
import './styles/app.scss'

// Componentes
import {Home} from "./routes/Home/Home";
import AboutComponent from './routes/About/AboutComponent';
import AboutDetailComponent from './routes/About/AboutDetailComponent';
import {Logins} from "./routes/Logins/Logs"
import PricingComponent from './routes/Pricing/PricingComponent';

// Navegación
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { LoginSwitch } from './components/Login-Register/LoginSwitch';

const App: React.FC = () => {

    return ( // ----------------------------------------------------
        // ..... Enrutamiento .....
        <BrowserRouter>
            <Switch>
                {/* ..... Ruta principal ..... */}
                <Route exact path="/" component={Home} />
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
                {/* ...... Ruta Register ..... */}
                <Route exact path="/register"/>
                {/* ...... Ruta Business register ..... */}
                <Route exact path="/business-register"/>

            </Switch>   

        </BrowserRouter>
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

export default App