import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null
}

// Here we are making authentication state which records that user is loggined or not. 
const authSlice = createSlice({
    name: "auth",
    initialState,
    // We made two actions in reducers, 1st is login and 2nd is logout.
    // actions are the function that we made in reducers.
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
        },

        logout: (state) => {
            state.status = false;
            state.userData = null;
        }
    }
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
