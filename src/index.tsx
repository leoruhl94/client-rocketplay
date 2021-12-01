import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'
import { Provider } from "react-redux"
import store from './redux/store'
import { FirebaseAppProvider } from 'reactfire'
import { firebaseConfig } from './firebaseConfig.js'
import  axios  from 'axios'
//import { LoadingComponent } from './components/LoadingComponent/LoadingComponent'

setInterval(() => {
    axios.get("https://api-rocketplay.herokuapp.com/active")
      .then(data => console.log(data.data))
},1700000)


ReactDOM.render(
<FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <React.Suspense fallback={'cargando...'}>
        <Provider store={store}>
            <App />
        </Provider>
    </React.Suspense>
</FirebaseAppProvider>
, document.getElementById("root"))