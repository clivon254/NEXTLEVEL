
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    currentUser:null,
    loading:false,
    error:null
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{

        signInStart:(state) => {

            state.loading = true ,

            state.error = null
        },

        signInSuccessa:(state,action) => {

            state.loading = false
            
            state.currentUser = action.payload

            state.error = null
        },

        signInFailure:(state,action) => {


            state.loading = false

            state.error= action.payload

            state.currentUser = null
        },

        updateStart:(state) => {

            state.loading = true

            state.error = null

        },

        updateFailure:(state,action) => {

            state.loading = false

            state.error = action.payload
        },

        updateSuccess:(state,action) => {

            state.loading = false

            state.currentUser = action.payload

            state.error = null
        },

        deleteUserSuccess:(state) => {

            state.error = null 

            state.currentUser = null

            state.loading = false
        },

        deleteUserFailure:(state,action) => {

            state.error = action.payload

            state.loading = false
        },

        signOutSuccess:(state) => {

            state.loading = false

            state.currentUser = null

            state.error = null
        },

    }
})

export const {
    signInStart,
    signInSuccess,
    signInFailure,
    updateStart,
    updateFailure,
    updateSuccess,
    deleteUserFailure,
    deleteUserSuccess,
    signOutSuccess
} 
 = userSlice.actions



export default userSlice.reducer 