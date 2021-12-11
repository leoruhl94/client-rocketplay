import React, { useEffect, useState } from "react";
import "./styles/normalize.css";
import "./styles/app.scss";

// Componentes
import { Landing } from "./routes/Landing/Landing";
import AboutComponent from "./routes/About/AboutComponent";
import AboutDetailComponent from "./routes/About/AboutDetailComponent";
import { Logins } from "./routes/Logins/Logins";
import PricingComponent from "./routes/Pricing/PricingComponent";
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
import axios from "axios";
import { useAuth } from "./auth/useAuth";
import { PrivateRoute } from "./auth/PrivateRoute";
import { PaymentsPlans } from "./routes/Logins/Login-Register/PaymentsPlans";
import { PaidRejection } from "./routes/PaidRejection/PaidRejection";
import { NavigationMobileMagic } from "./components/Navs/NavigationMobileMagic/NavigationMobileMagic";
import { Workspaces } from "./routes/Workspaces/Workspaces";
import { MenuToggleContainer } from "./components/MenuToggleContainer/MenuToggleContainer";


const App: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  let location = useLocation();
  const auth = useAuth();

  useEffect(() => {
    //cargar los planes de pago en redux
    // const json = localStorage.getItem("lastRoute")
    // const lastRoute = json ? json : '/'
    // history.push(lastRoute)
    dispatch(getPlans());
  }, []);

  useEffect(() => {
    // console.log(location)
    if (!location.pathname.startsWith("/login")) {
      localStorage.setItem("lastRoute", `${location.pathname}`);
    }
  }, [location]);

  return (
    <>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/about" component={AboutComponent} />
        <Route exact path="/about/:id" component={AboutDetailComponent} />
        <Route exact path="/pricing" component={PricingComponent} />
        <PrivateRoute exact path="/payment" component={PaymentsPlans} />
        <Route exact path="/preapproval" component={PreApproval} />
        <Route exact path="/paidrejection" component={PaidRejection} />
        <Route exact path="/login" component={Logins} />
        <PrivateRoute exact path="/uploadvideo" component={VideoForm} />
        <PrivateRoute path="/videodetail/:id" component={VideoDetail} />

        {/* __________________LOS DE ABAJO HAY QUE DEFINIR BIEN LOS NOMBRES DE LAS RUTAS_____________________________ */}
        
        <Route exact path="/h" component={MenuToggleContainer} />
        <PrivateRoute exact path="/home" component={Workspaces} />
        {/* ...... Ruta Categories ..... */}
        <PrivateRoute exact path="/home/:channel" component={Categories} />
        {/* ...... Ruta Class ..... */}
        <PrivateRoute exact path="/home/:channel/:class" component={Class} />

        {/* ...... Ruta Testing ..... */}
        {/* <PrivateRoute exact path="/testing" component={LoginAccountType}/> */}
      </Switch>
      <NavigationMobileMagic />
    </>
  );
};

export default App;
