
import React,{Component} from "react"
import {BrowserRouter, Route} from "react-router-dom"
import {connect} from "react-redux"
import * as actions from "../actions"

import Landing from "./Landing"
import Header from "./Header"
import Dashboard from "./Dashboard"
import SurveyNew from "./surveys/SurveyNew"



class App extends Component{
  componentDidMount(){
    this.props.fetchUser()
  }

  render(){
    return(
        <div>
          <BrowserRouter>
            <div>
                <Header/>
                <Route exact path="/" component={Landing}/>
                <Route exact path="/surveys" component={Dashboard}/>
                <Route exact path="/surveys/new" component={SurveyNew}/>

            </div>
          </BrowserRouter>
        </div>
    )
  }
}
export default connect(null,actions)(App)
//this connect function is to send the actions to redux-thunk so when
// an action gets called it knows what to do with it
// for example the above this.props.fetchUser()
