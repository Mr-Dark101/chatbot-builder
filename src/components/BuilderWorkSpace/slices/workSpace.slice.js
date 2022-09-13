import {createSlice} from "@reduxjs/toolkit";
import {API} from "../../../utils/services";
import {STRINGS} from "../../../utils/base";

export const PublishedBot = (publishObj) => async dispatch => {
    API.put(`/publishBot`, publishObj).then((res) => {
        // console.log("PublishedBot", res)
        if (res.status === STRINGS.API_STATUS.SUCCESS) {
            if (res.data.status === 1) {
                dispatch(isPublishedSuccess(res.data.message));
            } else {
                dispatch(isError(res.data.message))
            }
        }
    }).catch((ex) => {
        dispatch(isError(ex))
    })
};

export const resetPublish = () => async (dispatch) => {
    dispatch(resetPublishStatus())
}

const initialState = {
    success: false,
    isPublishSuccess: false,
    dataNotFound: false,
    message_: ""
}

const workSpace = createSlice({
    name: "workSpace",
    initialState,
    reducers: {
        isPublishedSuccess: (state, {payload}) => {
            state.isPublishSuccess = true;
            state.message_ = payload
        },
        resetPublishStatus: (state) => {
            state.isPublishSuccess = false;
        },
        isError: (state, {payload}) => {
            state.success = false;
            state.dataNotFound = true;
            state.message_ = payload
        },
    },
    extraReducers: {}
});

const {isError, isPublishedSuccess,resetPublishStatus} = workSpace.actions;


export default workSpace.reducer;

