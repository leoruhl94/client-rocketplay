import React from 'react'
// import './styles/global.scss'
import "./styles/normalize.css"
import './styles/app.scss'

// Componentes
import {Home} from "./routes/Home/Home";
import AboutComponent from './routes/About/AboutComponent';
import PricingComponent from './routes/Pricing/PricingComponent';

// Navegación
import { BrowserRouter, Route, Switch } from 'react-router-dom'

const App: React.FC = () => {

    return ( // ----------------------------------------------------
        // ..... Enrutamiento .....
        <BrowserRouter>
            <Switch>
                {/* ..... Ruta principal ..... */}
                <Route exact path="/" component={Home} />
                {/* ..... Ruta about ..... */}
                <Route exact path="/about" component={AboutComponent} />
                {/* ...... Ruta pricing ..... */}
                <Route exact path="/pricing" component={PricingComponent} />
                {/* ...... Ruta pricing ..... */}
                <Route exact path="/login"/>
                {/* ...... Ruta pricing ..... */}
                <Route exact path="/register"/>
                {/* ...... Ruta pricing ..... */}
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