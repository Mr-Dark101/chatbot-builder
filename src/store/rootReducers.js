import {combineReducers} from "@reduxjs/toolkit";
import Reducers from "../components/Stores";

const createReducer = asyncReducers => (state, action) => {
    const combineReducer = combineReducers({
        Reducers,
        ...asyncReducers
    })

    if (action.type === "logout") {
        state = undefined
    }

    return combineReducer(state, action);
}

export default createReducer;