import {createSlice} from "@reduxjs/toolkit";


export const toggleNavbar = (open) => async dispatch => {
    dispatch(toggleDrawer(open))
}

const initialState = {
    open: true
}

const navbar = createSlice({
    name: "navbar",
    initialState,
    reducers: {
        toggleDrawer: (state, {payload}) => {
            state.open = payload
        }
    },
    extraReducers: {}
});

const {toggleDrawer} = navbar.actions

export default navbar.reducer