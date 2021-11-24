import React from 'react'
// import './styles/global.scss'
import "./styles/normalize.css"
import './styles/app.css'

// Componentes
import Home from "./routes/Home/Home";
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
                <Route path="/" component={Home} />
                {/* ..... Ruta about ..... */}
                <Route path="/about" component={AboutComponent} />
                {/* ...... Ruta pricing ..... */}
                <Route path="/pricing" component={PricingComponent} />

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