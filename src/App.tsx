import React, { useEffect, useState } from "react";
import "./styles/normalize.css";
import "./styles/app.scss";
import axios from "axios";

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
import { VideoDetailAWS } from "./routes/Videos/VideoDetail/VideoDetailAWS";
import { VideoFrameAWS } from "./routes/Videos/VideoFrame/VideoFrameAWS";
import { ClassAWS } from "./routes/Clases/ClassAWS";

// Navegación
import { Route, Switch } from "react-router-dom";
import { Redirect, useLocation, useHistory } from "react-router";

// Redux
import { useDispatch } from "react-redux";
import { getPlans, refresh } from "./redux/actions";
import { useAuth } from "./auth/useAuth";
import { PrivateRoute } from "./auth/PrivateRoute";
import { PaymentsPlans } from "./routes/Logins/Login-Register/PaymentsPlans";
import { PaidRejection } from "./routes/PaidRejection/PaidRejection";
import { NavigationMobileMagic } from "./components/Navs/NavigationMobileMagic/NavigationMobileMagic";
import { Workspaces } from "./routes/Workspaces/Workspaces";
import { MenuToggleContainer } from "./components/MenuToggleContainer/MenuToggleContainer";
import { VideoVimeoDetail } from "./routes/Videos/VideoDetail/Vimeo/VideoVimeoDetail";
import { MenuComponent } from "./routes/Menu/MenuComponent";
import { MenuCategories } from "./routes/Menu/Items/Categories/Categories";
import { AddCategory } from "./routes/Menu/Items/Categories/AddCategory";
import { Subscriptions } from "./routes/Menu/Items/Subscriptions/Subscriptions";
import { SearchMenu } from "./routes/SearchMenu/SearchMenu";
import { NotificationsMenu } from "./routes/NotificationsMenu/NotificationsMenu";
import { SettingMenu } from "./routes/SettingMenu/SettingMenu";
import { AnimatePresence, motion } from "framer-motion";
import { NavProfileAndLocation } from "./containers/NavProfileAndLocation/NavProfileAndLocation";
import { CategoriesAWS } from "./routes/Categories/CategoriesAWS";
import { ChannelsAWS } from "./routes/Channels/ChannelsAWS";
import { LoadingComponent } from "./components/LoadingComponent/LoadingComponent";
import { Modal } from "./components/Modal/Modal";
import { AddCategory2 } from "./routes/SettingMenu/SettingComponents/AddCategory2";
import { AddChannel } from "./routes/SettingMenu/SettingComponents/AddChannel";
import { EditChannel } from "./routes/SettingMenu/SettingComponents/EditChannels";
import { EditWorkspace } from "./routes/SettingMenu/SettingComponents/EditWorkspace";
import { SettingsSubscriptions } from "./routes/SettingMenu/SettingComponents/SettingsSubscriptions";
import { InfoAccount } from "./routes/SettingMenu/SettingComponents/InfoAccount";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  let location = useLocation();
  const auth = useAuth();

  const itemLocal = localStorage.getItem("tok");
  const itemSession = sessionStorage.getItem("tok");
  let tokens = itemLocal
    ? JSON.parse(itemLocal)
    : itemSession
    ? JSON.parse(itemSession)
    : null;

  if (!auth?.isLogged()) {
    if (tokens) {
      auth?.login(tokens.data.data);
    }
  }

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

  return !auth?.user && tokens ? (
    <LoadingComponent />
  ) : (
    <>
      <AnimatePresence>
        <PrivateRoute
          path="/:algunaRuta"
          component={NavProfileAndLocation}
          routesToAvoid={["/pricing"]}
        />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/about" component={AboutComponent} />
          <Route exact path="/about/:id" component={AboutDetailComponent} />
          <Route exact path="/pricing" component={PricingComponent} />
          <Route exact path="/testcomp" component={InfoAccount} />
          <PrivateRoute exact path="/payment" component={PaymentsPlans} />
          <PrivateRoute exact path="/preapproval" component={PreApproval} />
          <Route exact path="/paidrejection" component={PaidRejection} />
          <Route exact path="/login" component={Logins} />
          <PrivateRoute exact path="/uploadvideo" component={VideoForm} />
          {/* <PrivateRoute path="/videodetail/:id" component={VideoDetail} /> */}
          {/* <Route path="/vimeoDetail/:id" component={VideoVimeoDetail} /> */}
          {/* <PrivateRoute exact path="/settings" component={SettingMenu} thisPage={5}/> */}
          <PrivateRoute
            exact
            path="/notifications"
            component={NotificationsMenu}
            thisPage={4}
          />
          <PrivateRoute
            exact
            path="/search"
            component={SearchMenu}
            thisPage={2}
          />
          <PrivateRoute
            exact
            path="/settings"
            component={SettingMenu}
            thisPage={5}
          />
          <Route
            path="/videodetail/:schema/:title"
            component={VideoDetailAWS}
          />
          <Route exact path="/home/:schema" component={ChannelsAWS} />
          <Route
            exact
            path="/home/:schema/:channel"
            component={CategoriesAWS}
          />
          <Route
            exact
            path="/home/:schema/:channel/:category"
            component={ClassAWS}
          />

          {/* __________________LOS DE ABAJO HAY QUE DEFINIR BIEN LOS NOMBRES DE LAS RUTAS_____________________________ */}

          <Route exact path="/modal">
            <EditChannel></EditChannel>
            <AddChannel></AddChannel>
            <AddCategory2></AddCategory2>
          </Route>
          <PrivateRoute
            exact
            path="/home"
            component={Workspaces}
            thisPage={3}
          />
          {/* ...... Ruta Categories ..... */}
          <PrivateRoute
            exact
            path="/home/:channel"
            component={Channels}
            thisPage={3}
          />
          <PrivateRoute
            exact
            path="/home/:channel/:category"
            component={Categories}
            thisPage={3}
          />
          {/* ...... Ruta Class ..... */}
          <PrivateRoute
            exact
            path="/home/:channel/:class"
            component={Class}
            thisPage={3}
          />

          {/* ...... Ruta Menu Component ..... */}
          <Route exact path="/menu" component={MenuComponent} />
          <Route exact path="/menu/categories" component={MenuCategories} />
          <Route exact path="/menu/subscriptions" component={Subscriptions} />
          <Route
            exact
            path="/menu/categories/addcategory"
            component={AddCategory}
          />
        </Switch>
      </AnimatePresence>
      <NavigationMobileMagic />
    </>
  );
};

export default App;
