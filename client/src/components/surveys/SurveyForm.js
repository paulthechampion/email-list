import _ from "lodash" // convention to import lodash
import React,{Component} from "react"
import {reduxForm, Field} from "redux-form"
import SurveyField from "./SurveyField"
import {Link} from "react-router-dom"
import {connect} from "react-redux"
import validateEmails from "../../utils/validateEmails"
import formFields from "./formFields"

//above array is to Help reduced the amount of
//manual field created since they're almost similar


class SurveyForm extends Component{
   
    renderFields(){
        
            return _.map(formFields, ({label,name})=>{
                return <Field key={name} component={SurveyField} type="text" label={label} name={name} />
            })

        
    }

    render(){
        return(
            <div>
                <form //props.handleSubmit is provided to us authomatically by the redux-forms below in the export default
                    onSubmit={this.props.auth?this.props.auth.credits>=1?this.props.handleSubmit(this.props.onSurveySubmit):()=>{alert("You must add credits, the app is in test mode so credit card number is 42424242....... , expiring date is any future date and cvc is any random number, enjoy")}:null}>
                    {this.renderFields()}

                    <Link to="/surveys" className="red btn-flat white-text">
                        Cancel
                    </Link>

                    <button type="submit" className="teal btn-flat right white-text">Next
                    <i className="material-icons right">done</i>
                    </button>
               </form>
            </div>
        )
    }
}

function validate(values){
    //values parameter above is given to us by
    //redux-form it's basically all the collective values of our
    // form

    const errors ={}
    
    errors.recipients = validateEmails(values.recipients || "")


    _.each(formFields,({name,noValueError})=>{
        if(!values[name]){
            errors[name]= noValueError
        }
    })

    // if(!values.title){
    //     errors.title ="You must provide a Title"
    // }
    // if(!values.subject){
    //     errors.subject ="You must provide a Subject"
    // }
    // if(!values.body){
    //     errors.body ="You must provide an Email body"
    // }

    return errors;
}


function mapStateToProps({auth}){
    return {auth}
}

export default reduxForm({
    validate, //created by redux-forms
    form:"surveyForm",
    destroyOnUnmount:false
})(connect(mapStateToProps)(SurveyForm))