import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn :false},
        reducers:{
        adminLogin(state) {
            state.isLoggedIn = true 
        } ,
        adminLogout(state) {
            localStorage.removeItem('adminId')
            localStorage.removeItem('token')

            state.isLoggedIn = false
        },
    }
})
 

export const {adminLogin, adminLogout} = adminSlice.actions
export default adminSlice.reducer