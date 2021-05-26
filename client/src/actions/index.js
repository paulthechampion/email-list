import axios from "axios"
import {FETCH_USER} from "./types"

//reason why we return a function with the 
//dispatch parameter is so that redux-thunk
//knows that this is the function that we wanna 
//exicute and it can add this function to the
// dispatch function

export const fetchUser = () =>async dispatch=>{
        const res= await axios.get("/auth/api/current_user")
        dispatch({type:FETCH_USER, payload:res.data})
}

export const handleToken = (token) => async dispatch =>{
        const res = await axios.post("/api/stripe",token)
        dispatch({type:FETCH_USER, payload:res.data})
}
    



// export const fetchUser = () =>{
//     return function(dispatch){
//         axios.get("/auth/api/current_user")
//             .then(res => dispatch({type:FETCH_USER, payload:res}))
//     }
    
// }

//when using an arrow function; is the 
//if the statement or arguement inside this
//function is only one, you can remove the
//curly braces from the parent function and the return
//keyword from the child function
//see the hidden code above for more understanding and the
//difference between both codes :)