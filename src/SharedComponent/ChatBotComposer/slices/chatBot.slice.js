import {createSlice} from "@reduxjs/toolkit";
import {API,APIORDER} from "../../../utils/services";
import {STRINGS} from "../../../utils/base";
import {userBotsError} from "../../../components/Dashboard/slices/dashboard.slice";

export const ApiOrder = (obj,apiId) => async dispatch => {
    // dispatch(updateTriggersSuccess(obj))
    // dispatch(openTriggerCard(false))
   
    /*return API.get(`/bot-api?tenent_id=${localStorage.getItem("tenent_id")}&id=${apiId}&param=${obj}`).then((res) => {
        // console.log("updateTrigger", res);

        return {message:'Found',data:res}
    }).catch((ex) => {
        return {message:'Not Found',data:false};
    })*/
    let orgId = localStorage.getItem("org_unit_id");
    orgId = orgId.replace('\"','');
    orgId = orgId.replace('%22','');
    console.log("Org_UNIT_ID" + orgId);
     return API.get(`/bot-api?org=${orgId}&id=${apiId}&param=${obj}`).then((res) => {
        // console.log("updateTrigger", res);

        return {message:'Found',data:res}
    }).catch((ex) => {
        return {message:'Not Found',data:false};
    })
}


export const ApiForm = (form_id) => async dispatch => {
    // dispatch(updateTriggersSuccess(obj))
    // dispatch(openTriggerCard(false))
   
    return API.get(`/form-api?id=${form_id}`).then((res) => {
        // console.log("updateTrigger", res);

        return {message:'Found',data:res}
    }).catch((ex) => {
        return {message:'Not Found',data:false};
    })
}


export const saveFormDB = (data,mobile,form_id) => async dispatch => {
    // dispatch(updateTriggersSuccess(obj))
    // dispatch(openTriggerCard(false))
   
    return API.post(`/form-save`,{form_id,form_id,mobile_no:mobile,form_data:JSON.stringify(data)}).then((res) => {
        // console.log("updateTrigger", res);

        return {message:'Found',data:res}
    }).catch((ex) => {
        return {message:'Not Found',data:false};
    })
}



