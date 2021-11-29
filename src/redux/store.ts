import thunk from "redux-thunk"
import { createStore, applyMiddleware, Store } from "redux"
import reducer from "./reducer"
import { composeWithDevTools } from 'redux-devtools-extension';

const store: Store<storeState, storeAction> & {
  dispatch: DispatchType
} = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store;