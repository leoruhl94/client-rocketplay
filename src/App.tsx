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
import { VideoDetailAWS } from "./routes/Videos/VideoDetail/VideoDetailAWS";
import { VideoFrameAWS } from "./routes/Videos/VideoFrame/VideoFrameAWS";
import { ClassAWS } from "./routes/Clases/ClassAWS";

// Navegación
import { Route, Switch } from "react-router-dom";
import { Redirect, useLocation, useHistory } from "react-router";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getPlans, refresh } from "./redux/actions";
import { useAuth } from "./auth/useAuth";
import { PrivateRoute } from "./auth/PrivateRoute";
import { PaymentsPlans } from "./routes/Logins/Login-Register/PaymentsPlans";
import { PaidRejection } from "./routes/PaidRejection/PaidRejection";
import { NavigationMobileMagic } from "./components/Navs/NavigationMobileMagic/NavigationMobileMagic";
import { Workspaces } from "./routes/Workspaces/Workspaces";
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
import { InfoAccount } from "./routes/SettingMenu/SettingComponents/InfoAccount";
import { SuperToast } from "./components/Toast/SuperToast";
import { storeState } from "./redux/type";
import { NavigationTop } from "./containers/NavigationTop/NavigationTop";

const App: React.FC = () => {
  const dispatch = useDispatch();
  let location = useLocation();
  const auth = useAuth();

  const toast: string = useSelector((state: storeState) => {
    return state.toast;
  });
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
      <SuperToast value={toast}></SuperToast>
      <AnimatePresence>
        <Route
          path="/:algunaRuta"
          component={NavigationTop}
        />
        <PrivateRoute
          path="/:algunaRuta"
          component={NavProfileAndLocation}
          routesToAvoid={["/pricing", "/about","/preapproval"]}
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
          {/* <PrivateRoute exact path="/uploadvideo" component={VideoForm} /> */}
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
