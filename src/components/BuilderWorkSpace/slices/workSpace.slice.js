import { createSlice } from '@reduxjs/toolkit';
import { API } from '../../../utils/services';
import { STRINGS } from '../../../utils/base';

export const PublishedBot = (publishObj) => async (dispatch) => {
   console.log('Published Bot' + JSON.stringify(publishObj));
   let body = {
      userId: localStorage.getItem('userId'),
      botId: publishObj.botId,
      publish: true,
   };
   API.post(`/publish-bot`, body)
      .then((res) => {
         if (res.data.status === 1) {
            dispatch(isPublishedSuccess(res.data.message));
            window.location.reload();
         } else {
            dispatch(isError(res.data.message));
            window.location.reload();
         }
      })
      .catch((ex) => {
         console.error(ex.message);
      });
};

export const addTemplateBotSlice = (publishObj) => async (dispatch) => {
   publishObj.org_unit_id = localStorage.getItem('org_unit_id');
   API.post(`/add-bot-template`, publishObj)
      .then((res) => {
         // console.log("PublishedBot", res)
         if (res.status === STRINGS.API_STATUS.SUCCESS) {
            if (res.data.status === 1) {
               dispatch(isAddSuccess(res.data.message));
            } else {
               dispatch(isError(res.data.message));
            }
         }
      })
      .catch((ex) => {
         dispatch(isError(ex));
      });
};

export const resetPublish = () => async (dispatch) => {
   dispatch(resetPublishStatus());
};

const initialState = {
   success: false,
   isPublishSuccess: false,
   isAddSuccess: false,
   dataNotFound: false,
   message_: '',
   message: '',
};

const workSpace = createSlice({
   name: 'workSpace',
   initialState,
   reducers: {
      isPublishedSuccess: (state, { payload }) => {
         state.isPublishSuccess = true;
         state.message_ = payload;
      },
      isAddSuccess: (state, { payload }) => {
         state.isAddSuccess = true;

         state.message_ = 'added';
      },
      resetPublishStatus: (state) => {
         state.isPublishSuccess = false;
      },
      isError: (state, { payload }) => {
         state.success = false;
         state.dataNotFound = true;
         state.message_ = payload;
      },
   },
   extraReducers: {},
});

const { isError, isPublishedSuccess, resetPublishStatus, isAddSuccess } = workSpace.actions;

export default workSpace.reducer;
