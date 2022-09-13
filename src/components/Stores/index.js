import {combineReducers} from "@reduxjs/toolkit";
import dashboard from "../Dashboard/slices/dashboard.slice";
import workSpace from "../BuilderWorkSpace/slices/workSpace.slice";
import trigger from "../../SharedComponent/AddTriggerComposer/slices/addTrigger.slice";
import navbar from "../../SharedComponent/NavBar/slices/navbar.slice";

const Reducers = combineReducers({
    dashboard: dashboard,
    workSpace: workSpace,
    trigger: trigger,
    navbar: navbar,
});

export default Reducers