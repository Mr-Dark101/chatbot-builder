import {createSlice} from "@reduxjs/toolkit";
import {API,APIORDER} from "../../../utils/services";
import {STRINGS} from "../../../utils/base";
import {userBotsError} from "../../../components/Dashboard/slices/dashboard.slice";

export const ApiOrder = (obj,apiId) => async dispatch => {
    // dispatch(updateTriggersSuccess(obj))
    // dispatch(openTriggerCard(false))
   
    return API.get(`/bot-api?id=${apiId}&param=${obj}`).then((res) => {
        // console.log("updateTrigger", res);

        return {message:'Found',data:res}
    }).catch((ex) => {
        return {message:'Not Found',data:false};
    })
}



