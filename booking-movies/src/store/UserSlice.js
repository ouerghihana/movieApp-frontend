import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
name: 'user',
initialState: {isLoggedIn : false},
reducers: {
    userLogin(state) {
        state.isLoggedIn = true } ,
    userLogout(state) {
        localStorage.removeItem('userId')
        state.isLoggedIn = false;


    },

}})


export const {userLogin, userLogout} = userSlice.actions
export default userSlice.reducer

