import { createSlice } from '@reduxjs/toolkit';
import { API } from '../../../utils/services';
import { STRINGS } from '../../../utils/base';
export const GetUserBots =
   ({ userId }) =>
   async (dispatch) => {
      /*API.get(`/user-bot?tenent_id=${userId}`).then((res) => {
        // console.log("usersBot", res);
        if (res.status === STRINGS.API_STATUS.SUCCESS) {
            if (res.data.status === 1) {
                dispatch(userBotsSuccess({data: res.data.data, userId: userId}))
            } else {
                dispatch(userBotsSuccessDataNotFound(true))
            }
        }
    }).catch(ex => {
        return dispatch(userBotsError(false, "error"))
    });*/
      //userId = JSON.parse(userId);
      API.get(`/user-bot?org=${userId}`)
         .then((res) => {
            //console.log('User ID: ' + userId);
            // console.log("usersBot", res);
            if (res.status === STRINGS.API_STATUS.SUCCESS) {
               if (res.data.status === 1) {
                  //console.log('Res Status 1: ');
                  dispatch(userBotsSuccess({ data: res.data.data, userId: userId }));
               } else {
                 // console.log('Res Status 0:');
                  dispatch(userBotsSuccessDataNotFound(true));
               }
            }
         })
         .catch((ex) => {
            return dispatch(userBotsError(false, 'error'));
         });
   };

export const GetCurrentBot = (data) => async (dispatch) => {
   dispatch(setBotData(data));
};

export const SetCurrentBotUpdateData = (data) => async (dispatch) => {
   dispatch(setUpdateBotData(data));
};


export const getChannelVerify = (id) => async (dispatch) => {
   let orgId = localStorage.getItem("org_unit_id");
    orgId = orgId.replace('\"','');
    orgId = orgId.replace('%22','');
   return API.get(`/user-channel?org=${orgId}&channel=${id}`)
      .then((res) => {
         
         if (res.status === STRINGS.API_STATUS.SUCCESS) {
            
                return {message:'Found',error:false}
               //dispatch(getChannelVerifySuccess({ payload: res.data.data, message: res.data.message }));
            
         }
      })
      .catch((ex) => {
          return {message:'not Found',error:true}
         
      });
};

export const createUserBot = (createObj) => async (dispatch) => {
   API.post(`/create`, createObj)
      .then((res) => {
         // console.log("usersBot", res);
         if (res.status === STRINGS.API_STATUS.SUCCESS) {
            if (res.data.status === 1) {
               //dispatch(GetUserBots({userId: localStorage.getItem('tenent_id')}))
               dispatch(GetUserBots({ userId: localStorage.getItem('org_unit_id') }));
            } else {
               dispatch(deleteBotResponseError(res.data.message));
            }
         }
      })
      .catch((ex) => {
         return dispatch(userBotsError(ex));
      });
};

export const DeleteUserBot =
   ({ botId, userId }) =>
   async (dispatch) => {
      API.delete(
         `/delete-bot`,
         { data: { botId, userId } },
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
                  dispatch(deleteBotResponseSuccess(res.data));
               } else {
                  dispatch(deleteBotResponseError(res.data.message));
               }
            }
         })
         .catch((ex) => {
            return dispatch(userBotsError(ex));
         });
   };

export const updateUserBot = (obj) => async (dispatch) => {
   API.put(`/update-bot`, { data: obj })
      .then((res) => {
         // console.log("updateBot", res);
         if (res.status === STRINGS.API_STATUS.SUCCESS) {
            if (res.data.status === 1) {
               // dispatch(updatedBotResponse(res.data))
               dispatch(GetUserBots({ userId: obj.userId }));
            } else {
               dispatch(updatedBotError(res.data.message));
            }
         }
      })
      .catch((ex) => {
         return dispatch(userBotsError(ex));
      });
};

export const OpenBotComposer = () => async (dispatch) => {
   dispatch(openBot());
};

export const SetUpdateBotData = (data) => async (dispatch) => {
   dispatch(updateBotData(data));
};

export const CloseBotComposer = () => async (dispatch) => {
   dispatch(closeBot());
};

export const resetState = () => async (dispatch) => {
   dispatch(resetErrorMessage());
};
export const addingBreadcrumb = (pl) => async (dispatch) => {
   dispatch(addBreadcrumb(pl));
};
export const removingBreadcrumb = () => async (dispatch) => {
   dispatch(removeBreadcrumb());
};

const initialState = {
   success: false,
   deleteSuccess: null,
   data: [],
   Breadcrumbs: [{ label: 'Dashboard', path: STRINGS.ROUTES.ROOT }],
   isError: false,
   currentUser: 0,
   dataNotFound: false,
   openBotComposer: false,
   message: '',
   currentBotData: null,
   updateBotData: null,
};

const dashboardSlice = createSlice({
   name: 'dashboard',
   initialState,
   reducers: {
      getChannelVerifySuccess: (state, { payload }) => {
         state.successList = true;
         state.triggersList = payload.payload;
         state.channels = payload.message.channels;
      },
      userBotsSuccess: (state, action) => {
        // console.log("userBotSuccess UserID: " + action.payload.userId);
         state.success = true;
         state.data = action.payload.data;
         state.currentUser = action.payload.userId;
        // localStorage.setItem('org_unit_id', action.payload.userId);
         if(action.payload.userId){
            localStorage.setItem('userId', action.payload.userId);
         }
      },
      userBotsError: (state, action) => {
         state.success = false;
         state.isError = true;
         state.message = action.payload;
      },
      // updatedBotResponse:(state,)=>{
      //
      // },
      updatedBotError: (state, action) => {
         state.isError = true;
         state.message = action.payload;
      },
      userBotsSuccessDataNotFound: (state, action) => {
         state.success = true;
         state.dataNotFound = true;
      },
      deleteBotResponseSuccess: (state, { payload }) => {
         // console.log("deleteBotResponseSuccess", payload)
         state.deleteSuccess = true;
         state.message = payload.message;
      },
      deleteBotResponseError: (state, action) => {
         // console.log("deleteBotResponseSuccess", action)
         state.deleteSuccess = false;
         state.message = action.payload;
      },
      resetErrorMessage: (state) => {
         state.isError = false;
         state.deleteSuccess = null;
         state.message = '';
         state.currentBotData = null;
      },
      updateBotData: (state, { payload }) => {
         state.openBotComposer = true;
         state.updateBotData = payload;
         if(payload.channels.toString().includes('whatsapp')) {
            console.log("WhatsApp Added");                 
         }
         if(payload.channels.toString().includes('messenger')) {
            console.log("Messenger Added");                 
         } if(payload.channels.toString().includes('instagram')) {
            console.log("Instagram Added");
         } if(payload.channels.toString().includes('google')) {
            console.log("Google Business Message Added");
         }
        
      },
      openBot: (state) => {
         state.openBotComposer = true;
      },
      closeBot: (state) => {
         state.openBotComposer = false;
         state.updateBotData = null;
      },
      setBotData: (state, { payload }) => {
         state.currentBotData = payload;
      },
      setUpdateBotData: (state, { payload }) => {
         state.currentBotData = payload;
      },
      addBreadcrumb: (state, { payload }) => {
         state.Breadcrumbs = [...state.Breadcrumbs, payload];
      },
      removeBreadcrumb: (state) => {
         state.Breadcrumbs = [{ label: 'Dashboard', path: STRINGS.ROUTES.ROOT }];
      },
      isError: (state, { payload }) => {
         state.success = false;
         state.dataNotFound = true;
         state.message = payload;
      },
   },
   extraReducers: {},
});

export const {
   isError,
   userBotsSuccess,
   userBotsError,
   userBotsSuccessDataNotFound,
   deleteBotResponseSuccess,
   deleteBotResponseError,
   resetErrorMessage,
   updateBotData,
   updatedBotError,
   openBot,
   closeBot,
   setBotData,
   setUpdateBotData,
   addBreadcrumb,
   removeBreadcrumb,
   getChannelVerifySuccess,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
