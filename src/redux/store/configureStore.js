import { createStore } from "redux";
import reducer from "./../reducer/reducer.js";
import { composeWithDevTools } from "redux-devtools-extension";

const initialState={
    menuName:''
}

export default () => createStore(reducer,initialState,composeWithDevTools());
