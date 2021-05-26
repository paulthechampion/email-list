import React,{Component} from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import Payment from "./Payment"
//better to use class component when you're
//trying yo have some dynamic styling

class Header extends Component{
    renderContent(){
        switch(this.props.auth){
            case null:
                return
            
            case false:
                return <li><a href="/auth/google">Login With Google</a></li>
            
            default:
                return [
                    <li key="1"><Payment/></li>,
                    <li key="3" style={{margin:"0 10px"}}>
                        Credits: {this.props.auth.credits}
                    </li>,
                    <li key="2"><a href="/auth/api/logout">Logout</a></li>
                ]
        }
    }

    render(){
        console.log(this.props)
        return(
            
    <nav>
        <div className="nav-wrapper">
            <Link 
            to={this.props.auth ?"/surveys" :"/"} 
            className="brand-logo">
            Email List
            </Link>
            <ul id="nav-mobile" className="right">
            {this.renderContent()}
            </ul>
        </div>
    </nav>
      
        )
    }
}

function mapStateToProps({auth}){
    return {auth}
}

export default connect(mapStateToProps)(Header)