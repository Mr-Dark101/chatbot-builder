import {createSlice} from "@reduxjs/toolkit";
import {API} from "../../../utils/services";
import {STRINGS} from "../../../utils/base";
import {userBotsError} from "../../../components/Dashboard/slices/dashboard.slice";

export const UpdateTrigger = (obj) => async dispatch => {
    // dispatch(updateTriggersSuccess(obj))
    // dispatch(openTriggerCard(false))
    dispatch(botRequestPending())
    API.post(`/update-trigger`, obj).then((res) => {
        // console.log("updateTrigger", res);
        if (res.status === STRINGS.API_STATUS.SUCCESS) {
            if (res.data.status === 1) {
                dispatch(updateTriggersSuccess(res.data.data));
                dispatch(getBotTriggersRecursive(obj.botId));
                dispatch(openTriggerCard({open: false, isChild: null, childBotId: null}));
            } else {
                dispatch(isError(res.data.message))
            }
        }
    }).catch((ex) => {
        dispatch(isError(ex))
    })
}

export const getBotTriggers = (id) => async dispatch => {
    API.get(`/getBotTriggers/${id}`).then((res) => {
        // console.log("updateTrigger", res);
        if (res.status === STRINGS.API_STATUS.SUCCESS) {
            if (res.data.status === 1) {
                dispatch(getTriggersSuccess(res.data.data))
            } else {
                dispatch(isError(res.data.message))
            }
        }
    }).catch((ex) => {
        dispatch(isError(ex))
    })
}

export const getAllTriggersTypes = () => async dispatch => {
    API.get(`/trigger-types`).then((res) => {
        // console.log("getAllTriggersTypes", res);
        if (res.status === STRINGS.API_STATUS.SUCCESS) {
            if (res.data.status === 1) {
                dispatch(getAllTriggersTypesSuccess(res.data.data))
            } else {
                dispatch(isError(res.data.message))
            }
        }
    }).catch((ex) => {
        dispatch(isError(ex))
    })
}


export const DeleteBotTrigger = ({botId, triggerId, userId}) => async dispatch => {
    API.delete(`/delete-trigger`, {data: {botId, triggerId, userId}}, {
        headers: {
            "Content-Type": "application/json"
        }
    }).then((res) => {
        // console.log("deleteBot", res);
        if (res.status === STRINGS.API_STATUS.SUCCESS) {
            if (res.data.status === 1) {
                dispatch(getBotTriggersRecursive(botId))
            } else {
                dispatch(isError(res.data.message))
            }
        }
    }).catch(ex => {

        return dispatch(userBotsError(ex))
    });
}

export const getBotTriggersRecursive = (id) => async dispatch => {
    dispatch(clearTriggerList());
    API.get(`/trigger-recursive?id=${id}`).then((res) => {
        // console.log("updateTrigger", res);
        if (res.status === STRINGS.API_STATUS.SUCCESS) {
            if (res.data.status === 1) {
                dispatch(getTriggersSuccess(res.data.data))
            } else {
                dispatch(isError(res.data.message))
            }
        }
    }).catch((ex) => {
        dispatch(isError(ex))
    })
}


export const apiList = () => async dispatch => {
    
    API.get(`/bot-api-list`).then((res) => {
        // console.log("updateTrigger", res);
        
        if (res.status === STRINGS.API_STATUS.SUCCESS) {
            if (res.data.status === 1) {
               
                dispatch(getApiListSuccess(res.data.data))
            } else {
                dispatch(isError(res.data.message))
            }
        }
    }).catch((ex) => {
        dispatch(isError(ex))
    })
}

export const uploadFile = (file) => dispatch => {
    // console.log("fileName", file)
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', 1);
    API.post(`/file-uploading`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    }).then((res) => {
        // console.log("updateFile", res);
        if (res.status === STRINGS.API_STATUS.SUCCESS) {
            dispatch(uploadFileSuccess(res.data))
            // if (res.data.status === 1) {
            //
            // } else {
            //     dispatch(isError(res.data.message))
            // }
        }
    }).catch((ex) => {
        dispatch(isError(ex))
    })
}

export const UpdateTriggerMenusText = ({id, text}) => dispatch => {
    // console.log("updateTriggersMenuTextSuccess", {id, text});
    API.put(`/updateTriggerMenuText`, {id, text}).then((res) => {
        // console.log("updateTriggersMenuTextSuccess", res);
        if (res.status === STRINGS.API_STATUS.SUCCESS) {
            if (res.data.status === 1) {
                dispatch(updateTriggersMenuTextSuccess(res.data.message));
            } else {
                dispatch(isError(res.data.message))
            }
        }
    }).catch((ex) => {
        dispatch(isError(ex))
    })
}

export const openTriggerCard = (obj) => dispatch => {
    dispatch(openBotComposer(obj))
}

export const resetTheUrls = () => dispatch => {
    dispatch(resetUrls())
}
export const isZoomD3 = (zoom) => dispatch => {
    dispatch(isZoom(zoom))
}

export const openUpdateTriggerCard = ({open, object}) => dispatch => {
    dispatch(openUpdateBotComposer({open, object}));
}
export const onSuccessUpdateMenuText = () => dispatch => {
    dispatch(onMenuTextSuccessMessage())
}


const initialState = {
    success: false,
    successList: false,
    successTypes: false,
    isUpdateData: false,
    menuTextUpdateSuccess: false,
    isUpdatedList: true,
    message: "",
    dataNotFound: false,
    openAddBot: false,
    triggersList: [],
    selectedNode: null,
    currentTriggerData: null,
    isChild: null,
    childBotId: null,
    urls: [],
    isZoomAble: true,
    getAllTypes: [],
}

const trigger = createSlice({
    name: "trigger",
    initialState,
    reducers: {
        resetUrls: (state) => {
            state.urls = []
        },
        clearTriggerList: (state) => {
            state.successList = false;
            state.triggersList = []
        },
        getTriggersSuccess: (state, {payload}) => {
            state.successList = true;
            state.triggersList = payload
        },
        getApiListSuccess:(state,{payload}) => {

            state.successList = true;
            state.apiList = payload

        },
        updateTriggersSuccess: (state, {payload}) => {
            state.successList = true;
            state.isUpdatedList = true;
            // state.triggersList = payload.triggersList;
            // state.triggersList = [...state.triggersList, ...payload.triggersList];
        },
        updateTriggersMenuTextSuccess: (state) => {
            state.menuTextUpdateSuccess = true;
        },
        onMenuTextSuccessMessage: (state) => {
            state.menuTextUpdateSuccess = false;
        },
        botRequestPending: (state) => {
            state.successList = false;
            state.isUpdatedList = false;
        },
        isZoom: (state, {payload}) => {
            state.isZoomAble = payload;
        },
        openUpdateBotComposer: (state, {payload}) => {
             console.log("triggersList", payload);
            state.openAddBot = payload.open;
            state.currentTriggerData = payload.object;
            state.isChild = null;
            state.url = "";
        },
        openBotComposer: (state, {payload}) => {
            // console.log("childBotId", payload)
            state.openAddBot = payload.open;
            state.isChild = payload.isChild;
            state.childBotId = payload.childBotId;
            state.currentTriggerData = {};
            state.url = "";
        },
        uploadFileSuccess: (state, {payload}) => {
            state.urls = [...state.urls,payload.url]
        },
        getAllTriggersTypesSuccess: (state, {payload}) => {
            state.successTypes = true;
            state.getAllTypes = payload
        },
        isError: (state, {payload}) => {
            state.success = false;
            state.dataNotFound = true;
            state.message = payload
        },
    },
    extraReducers: {}
});

let {
    isError, clearTriggerList, getTriggersSuccess, isZoom, botRequestPending, updateTriggersMenuTextSuccess, onMenuTextSuccessMessage,
    updateTriggersSuccess, getAllTriggersTypesSuccess, openBotComposer, openUpdateBotComposer, uploadFileSuccess,resetUrls,getApiListSuccess
} = trigger.actions;

export default trigger.reducer