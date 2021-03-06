import React from 'react'
import {connect} from "react-redux"
import formFields from "./formFields"
import _ from "lodash"
import * as actions from "../../actions"
import {withRouter} from "react-router-dom"


 function SurveyFormReview({onCancel,formValues,submitSurvey,history}) {
    const reviewFields =_.map(formFields,({name,label})=>{
        return(
            <div key={name} className="review-div">
                
                <label className="review-label">{label}</label>
                <div className="review-ans">
                    {formValues[name]}
                </div>
            </div>
        )
    })
    
    return (
        <div>
            <h5 className="h555">Please Confirm Your Entries</h5>
            {reviewFields}

            <button className="yellow darken-3 btn-flat white-text"
            onClick={onCancel}
            >
            Back
            </button>

            <button
            onClick={()=>submitSurvey(formValues,history)}
             className="green btn-flat right white-text"
            >
                Send Survey
                <i className="material-icons right ">email</i>
            </button>
        </div>
    )
}

function mapStateToProps(state){
    return{formValues : state.form.surveyForm.values}
}

export default connect(mapStateToProps,actions)(withRouter(SurveyFormReview))
                                        //withRouter is used in this case to get the history object
                                        //