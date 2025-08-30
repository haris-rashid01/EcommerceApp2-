import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: '',
    password:'',
};

const formSlice = createSlice({
    name:'form',
    initialState,
    reducers:{
        setEmail(state, action){
            state.email = action.payload;
        },
        setPassword(state, action){
            state.password = action.payload
        },
        resetForm(state){
            state.email = '',
            state.password = ''
        }

    }
    
})

export const {setEmail, setPassword, resetForm} = formSlice.actions;
export default formSlice.reducer
