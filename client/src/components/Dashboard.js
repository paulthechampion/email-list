import React from 'react'
import {Link} from "react-router-dom"
import SurveyList from "./surveys/SurveyList"

export default function Dashboard() {
    return (
        <div>
           <SurveyList/>

            <div className="fixed-action-btn"> 
                <Link to="/surveys/new" class="btn-floating btn-large waves-effect waves-light red">
                    <i class="material-icons">add</i>
                </Link>
            </div>
        </div>
    )
}