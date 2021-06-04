import "materialize-css/dist/css/materialize.min.css"
import React from "react"
import ReactDom from "react-dom"
import {Provider} from "react-redux"
import {createStore, applyMiddleware} from "redux"
import reduxThunk from "redux-thunk"

import App from "./components/App"
import reducers from "./reducers"

//development testing
import axios from "axios"

window.axios = axios



//no need to specify index.js in reducers folder
//by default import will pick the index file

//this is a redux store to help hold all global variables
const store = createStore(reducers, {},applyMiddleware(reduxThunk))

ReactDom.render(
    //the provider is what helps deliver the store to all out components
    <Provider store={store}><App/></Provider>,
    document.querySelector("#root")
)
