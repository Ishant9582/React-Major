import { configureStore } from "@reduxjs/toolkit";
import authSlice from './authslice';
 
const store = configureStore({
    reducer : {
        auth : authSlice,
        // yha auth likha hai iska mtlab jb bhi state ko use kroge to state.auth. uske bad jo bhi cheeje initdata k andar likhi vo access krskte
        
    }
}) ;
export default store ;