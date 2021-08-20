import React, {Component} from "react"
import {connect} from "react-redux"
import {fetchSurveys} from "../../actions"
class SurveyList extends Component {
    componentDidMount(){
        this.props.fetchSurveys()
    }
    
    renderSurveys(){
        console.log(this.props.surveys)
        if(this.props.surveys.length >0){
        return this.props.surveys.reverse().map(survey=>{
            return(
                <div className="container" key={survey._id}>
                    <div className="card blue-grey darken-1 card-mine" >
                        <div className="card-content white-text">
                            <span className="card-title">{survey.title}</span>
                            <p>{survey.body}</p>
                          
                            <p className="right">Sent on: {new Date(survey.dateSent).toLocaleDateString()} </p>
                        </div>
                        
                        <div className="card-action">
                            <a href="#">Yes: {survey.yes}</a>
                            <a href="#">No: {survey.no}</a>
                        </div>
                    </div>
                </div>
            )
        })
    }else{
        return(
            <div className="empty-survey">You are yet to create a survey, Click the button below to begin
            <i class="fas fa-hand-point-down"></i>
            </div>
        )
    }
    }

    render(){
        return(
            <div>
                {this.renderSurveys()}
            </div>
        )
    }
}

function mapStateToProps({surveys}){
    return {surveys}
}

export default connect(mapStateToProps,{fetchSurveys})(SurveyList)