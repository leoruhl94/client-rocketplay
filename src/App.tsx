import React from "react";
import "./styles/normalize.css";
import "./styles/app.scss";

// Componentes
import { Home } from "./routes/Home/Home";
import AboutComponent from "./routes/About/AboutComponent";
import AboutDetailComponent from "./routes/About/AboutDetailComponent";
import { Logins } from "./routes/Logins/Logins";
import PricingComponent from "./routes/Pricing/PricingComponent";
import { RegisterSwitch } from "./components/Login-Register/RegisterSwitch";
import { LoginSwitch } from "./components/Login-Register/LoginSwitch";
import { LoginEmail } from "./components/Login-Register/LoginEmail";

// Navegación
import { HashRouter, Route, Switch } from "react-router-dom";

const App: React.FC = () => {
  return (
    // ----------------------------------------------------
    // ..... Enrutamiento .....
    <HashRouter>
      <Switch>
        {/* ..... Ruta principal ..... */}
        <Route exact path="/" component={Home} />
        {/* ..... Ruta about ..... */}
        <Route exact path="/about">
          <AboutComponent/>
        </Route>
        <Route exact path="/about/:id">
          <AboutDetailComponent/>
        </Route>
        {/* ...... Ruta pricing ..... */}
        <Route exact path="/pricing" component={PricingComponent} />

        <Route exact path="/logs" component={Logins} />
        {/* ...... Ruta Log In ..... */}
        <Route exact path="/login" component={LoginSwitch} />
        {/* ...... Ruta Log In Email..... */}
        <Route exact path="/loginEmail" component={LoginEmail} />
        {/* ...... Ruta Register ..... */}
        <Route exact path="/register" component={RegisterSwitch} />
        {/* ...... Ruta Business register ..... */}
        <Route exact path="/business-register" />
      </Switch>
    </HashRouter>
  );
};
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
