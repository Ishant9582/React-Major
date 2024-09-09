import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    status : false ,
    userData : null ,
}

const authSlice = createSlice({
    name : "hello" ,
    initialState ,
    reducers : {
        login : (state,action)=>{
            state.status = true ;
            state.userData = action.payload.userData ;
           
        } ,
        logout : (state)=>{
            state.status = false ;
            state.userData = null ;
            console.log("initiating logout")
        }
    }
})


export const {login , logout} = authSlice.actions

// reducer hi likhna bcoz vhi likhna hota
export default authSlice.reducer
