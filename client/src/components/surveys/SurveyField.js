//surveyField contains logic to render a single label and text input
import React from 'react'

export default ({input,label,meta:{error, touched}})=>{ //props.input es6{input}
    return (
        <div className="survey-div">
            <label className="survey-label">{label}</label>
            <input {...input} style={{marginBottom:"5"}}/>
            <div className="red-text" style={{marginBottom:"20px"}}>
            {touched?error:""}
            </div>
          
        </div>
    )
}

//this component is just a mark up that will be used in the
//surveyFOrm component


//redux-form really helps with handling
//all the event handlers and helps with managing
//the states with the form, although you can still
//use it for html markup, it isnt really thats neccessarry
