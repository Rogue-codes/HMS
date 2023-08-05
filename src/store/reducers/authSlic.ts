import { createSlice } from "@reduxjs/toolkit"


const initialState ={
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : {},
    isLoggedIn: localStorage.getItem('user') ? true : false
}


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        login : (state,action) =>{
            state.user = action.payload
            localStorage.setItem('user', JSON.stringify(state.user))

        },
        logout:(state)=>{
            state.user = {}
            localStorage.removeItem('user')
        }
    }
}) 

export const {login, logout} = authSlice.actions