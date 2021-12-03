import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'
import { Provider } from "react-redux"
import store from './redux/store'
import { HashRouter } from 'react-router-dom'
//import { LoadingComponent } from './components/LoadingComponent/LoadingComponent'

ReactDOM.render(
<HashRouter> 
    <React.Suspense fallback={'cargando...'}>
        <Provider store={store}>
            <App />
        </Provider>
    </React.Suspense>
</HashRouter>
, document.getElementById("root"))