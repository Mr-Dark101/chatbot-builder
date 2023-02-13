import { createSlice } from '@reduxjs/toolkit';
import { API } from '../../../utils/services';
import { STRINGS } from '../../../utils/base';
import { userBotsError } from '../../../components/Dashboard/slices/dashboard.slice';

export const UpdateTrigger = (obj) => async (dispatch) => {
   // dispatch(updateTriggersSuccess(obj))
   // dispatch(openTriggerCard(false))
   dispatch(botRequestPending());
   API.post(`/update-trigger`, obj)
      .then((res) => {      
         if (res.status === STRINGS.API_STATUS.SUCCESS) {
            if (res.data.status === 1) {
               dispatch(updateTriggersSuccess(res.data.data));
               dispatch(getBotTriggersRecursive(obj.botId));
               dispatch(openTriggerCard({ open: false, isChild: null, childBotId: null }));
            } else {
               dispatch(isError(res.data.message));
            }
         }
      })
      .catch((ex) => {
         dispatch(isError(ex));
      });
};

export const getBotTriggers = (id) => async (dispatch) => {
   API.get(`/getBotTriggers/${id}`)
      .then((res) => {
         if (res.status === STRINGS.API_STATUS.SUCCESS) {
            if (res.data.status === 1) {
               dispatch(getTriggersSuccess({ payload: res.data.data, message: res.data.message }));
            } else {
               dispatch(isError(res.data.message));
            }
         }
      })
      .catch((ex) => {
         dispatch(isError(ex));
      });
};

export const getAllTriggersTypes = (id) => async (dispatch) => {
   //console.log('here')
   API.get(`/trigger-types?bot_id=${id}`)
      .then((res) => {
         // console.log("getAllTriggersTypes", res);
         if (res.status === STRINGS.API_STATUS.SUCCESS) {
            if (res.data.status === 1) {
               dispatch(getAllTriggersTypesSuccess(res.data.data));
            } else {
               dispatch(isError(res.data.message));
            }
         }
      })
      .catch((ex) => {
         dispatch(isError(ex));
      });
};

export const DeleteBotTrigger =
   ({ botId, triggerId, userId }) =>
   async (dispatch) => {
      API.delete(
         `/delete-trigger`,
         { data: { botId, triggerId, userId } },
         {
            headers: {
               'Content-Type': 'application/json',
            },
         }
      )
         .then((res) => {
            // console.log("deleteBot", res);
            if (res.status === STRINGS.API_STATUS.SUCCESS) {
               if (res.data.status === 1) {
                  dispatch(getBotTriggersRecursive(botId));
               } else {
                  dispatch(isError(res.data.message));
               }
            }
         })
         .catch((ex) => {
            return dispatch(userBotsError(ex));
         });
   };

export const getBotTriggersRecursive = (id) => async (dispatch) => {
   dispatch(clearTriggerList());
   API.get(`/trigger-recursive?id=${id}`)
      .then((res) => {
         // console.log("updateTrigger", res);
         if (res.status === STRINGS.API_STATUS.SUCCESS) {
            if (res.data.status === 1) {
               dispatch(getTriggersSuccess({ payload: res.data.data, message: res.data.message }));
            } else {
               dispatch(isError(res.data.message));
            }
         }
      })
      .catch((ex) => {
         dispatch(isError(ex));
      });
};


export const getBotTriggersHistoryDown = (id,last_id=0) => async (dispatch) => {
   dispatch(clearTriggerList());
   API.get(`/bot-history-down?id=${id}&last_id=${last_id}`)
      .then((res) => {
         // console.log("updateTrigger", res);
         if (res.status === STRINGS.API_STATUS.SUCCESS) {
            if (res.data.status === 1) {
               dispatch(getTriggersSuccessHistory({ payload: res.data.data, message: res.data.message,last_id:res.data.last_id}));
            } else {
               dispatch(isError(res.data.message));
            }
         }
      })
      .catch((ex) => {
         dispatch(isError(ex));
      });
};



export const getBotTriggersHistoryUp = (id,last_id=0) => async (dispatch) => {
   dispatch(clearTriggerList());
   API.get(`/bot-history-up?id=${id}&last_id=${last_id}`)
      .then((res) => {
         // console.log("updateTrigger", res);
         if (res.status === STRINGS.API_STATUS.SUCCESS) {
            if (res.data.status === 1) {
               dispatch(getTriggersSuccessHistory({ payload: res.data.data, message: res.data.message,last_id:res.data.last_id}));
            } else {
               dispatch(isError(res.data.message));
            }
         }
      })
      .catch((ex) => {
         dispatch(isError(ex));
      });
};



export const apiList = (userId) => async (dispatch) => {
   API.get(`/bot-api-list?org=${userId}`)
      .then((res) => {
         // console.log("updateTrigger", res);

         if (res.status === STRINGS.API_STATUS.SUCCESS) {
            if (res.data.status === 1) {
               dispatch(getApiListSuccess(res.data.data));
            } else {
               dispatch(isError(res.data.message));
            }
         }
      })
      .catch((ex) => {
         dispatch(isError(ex));
      });
};

export const formList = (userId) => async (dispatch) => {
   API.get(`/bot-form-list?org=${userId}`)
      .then((res) => {
         // console.log("updateTrigger", res);

         if (res.status === STRINGS.API_STATUS.SUCCESS) {
            if (res.data.status === 1) {
             
               dispatch(getFormListSuccess(res.data.data));
            } else {
               dispatch(isError(res.data.message));
            }
         }
      })
      .catch((ex) => {
         dispatch(isError(ex));
      });
};

export const uploadFile = (file) => (dispatch) => {
   // console.log("fileName", file)
   const formData = new FormData();
   formData.append('file', file);
   formData.append('type', 1);
   API.post(`/file-uploading`, formData, {
      headers: {
         'Content-Type': 'multipart/form-data',
      },
   })
      .then((res) => {
         // console.log("updateFile", res);
         if (res.status === STRINGS.API_STATUS.SUCCESS) {
            dispatch(uploadFileSuccess(res.data));
            // if (res.data.status === 1) {
            //
            // } else {
            //     dispatch(isError(res.data.message))
            // }
         }
      })
      .catch((ex) => {
         dispatch(isError(ex));
      });
};

export const UpdateTriggerMenusText = ({id, text}) => dispatch => {
    // console.log("updateTriggersMenuTextSuccess", {id, text});
    dispatch(updateTriggersMenuTextSuccess("changed"));
    // API.put(`/updateTriggerMenuText`, {id, text}).then((res) => {
    //     // console.log("updateTriggersMenuTextSuccess", res);
    //     if (res.status === STRINGS.API_STATUS.SUCCESS) {
    //         if (res.data.status === 1) {
    //             dispatch(updateTriggersMenuTextSuccess(res.data.message));
    //         } else {
    //             dispatch(isError(res.data.message))
    //         }
    //     }
    // }).catch((ex) => {
    //     dispatch(isError(ex))
    // })
}

export const openTriggerCard = (obj) => (dispatch) => {
   dispatch(openBotComposer(obj));
};

export const resetTheUrls = () => (dispatch) => {
   dispatch(resetUrls());
};

export const deleteTheUrls = (url) => (dispatch) => {
   dispatch(deleteUrls(url));
   
};

export const deleteTheUrlsDone = (url) => (dispatch) => {
   dispatch(deleteUrlsDone(url));
   
};
export const isZoomD3 = (zoom) => (dispatch) => {
   dispatch(isZoom(zoom));
};

export const openUpdateTriggerCard =
   ({ open, object }) =>
   (dispatch) => {
      dispatch(openUpdateBotComposer({ open, object }));
   };
export const onSuccessUpdateMenuText = () => (dispatch) => {
   dispatch(onMenuTextSuccessMessage());
};

const initialState = {
   success: false,
   successList: false,
   successTypes: false,
   isUpdateData: false,
   menuTextUpdateSuccess: false,
   isUpdatedList: true,
   message: '',
   channels: [],
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
};

const trigger = createSlice({
   name: 'trigger',
   initialState,
   reducers: {
      resetUrls: (state) => {
         state.urls = [];
         
      },
      deleteUrls: (state, { payload }) => {
        
         state.urls = [...state.urls, payload];
         state.urlUpdateSuccess = true;
      },
      deleteUrlsDone: (state) => {
        
         state.urlUpdateSuccess = false;
      },
      clearTriggerList: (state) => {
         state.successList = false;
         state.triggersList = [];
      },
      getTriggersSuccess: (state, { payload }) => {
         state.successList = true;
         state.triggersList = payload.payload;
         state.channels = payload.message.channels;

      },
      getTriggersSuccessHistory: (state, { payload }) => {
         state.successList = true;
         state.triggersList = payload.payload;
         state.channels = payload.message.channels;
         state.last_id = payload.last_id;

      },
      
      getApiListSuccess: (state, { payload }) => {
         state.successList = true;
         state.apiList = payload;
      },
      getFormListSuccess: (state, { payload }) => {
         state.successList = true;
         state.formList = payload;
      },

      updateTriggersSuccess: (state, { payload }) => {
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
      isZoom: (state, { payload }) => {
         state.isZoomAble = payload;
      },
      openUpdateBotComposer: (state, { payload }) => {
         // console.log("triggersList", payload);
         state.openAddBot = payload.open;
         state.currentTriggerData = payload.object;
         state.isChild = null;
         state.url = '';
      },
      openBotComposer: (state, { payload }) => {
         // console.log("childBotId", payload)
        
         state.openAddBot = payload.open;
         state.isChild = payload.isChild;
         state.childBotId = payload.childBotId;
         state.currentTriggerData = {};
         state.url = '';
      },
      uploadFileSuccess: (state, { payload }) => {

         state.urls = [...state.urls, payload.url];
      },
      getAllTriggersTypesSuccess: (state, { payload }) => {
         state.successTypes = true;
         state.getAllTypes = payload;
      },
      isError: (state, { payload }) => {
         state.success = false;
         state.dataNotFound = true;
         state.message = payload;
      },
   },
   extraReducers: {},
});

let {
   isError,
   clearTriggerList,
   getTriggersSuccess,
   getTriggersSuccessHistory,
   isZoom,
   botRequestPending,
   updateTriggersMenuTextSuccess,
   onMenuTextSuccessMessage,
   updateTriggersSuccess,
   getAllTriggersTypesSuccess,
   openBotComposer,
   openUpdateBotComposer,
   uploadFileSuccess,
   resetUrls,
   deleteUrls,
   deleteUrlsDone,
   getApiListSuccess,
   getFormListSuccess,
} = trigger.actions;

export default trigger.reducer;
