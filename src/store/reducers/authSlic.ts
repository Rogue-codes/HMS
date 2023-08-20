/* eslint-disable @typescript-eslint/ban-types */
import { createSlice } from "@reduxjs/toolkit"

export interface User{
    username: string;
    email:string;
    isVerified:boolean;
    id:string;
}
export interface InitialStateInterface{
    user: User | null
    isLoggedIn:boolean;
}
const initialState: InitialStateInterface ={
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : {},
    isLoggedIn: localStorage.getItem('isLoggedIn') ? JSON.parse(localStorage.getItem("isLoggedIn")!) : false
}


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        login : (state,action) =>{
            state.user = action.payload
            localStorage.setItem('user', JSON.stringify(state.user))
            state.isLoggedIn = true
            localStorage.setItem('isLoggedIn', JSON.stringify(state.isLoggedIn))

        },
        logout:(state)=>{
            state.user = null
            localStorage.removeItem('user')
        },
        verify:(state,action)=>{
            if (state.user) {
                state.user.isVerified = action.payload;
                localStorage.setItem("user", JSON.stringify(state.user));
              }
        }
    }
}) 

export const {login, logout, verify} = authSlice.actions