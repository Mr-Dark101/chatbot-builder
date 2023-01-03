import React, { useEffect, useState } from 'react';
import back_icon from '../../assets/back-icon.svg';
import draft_icon from '../../assets/draft.png';
import { STRINGS } from '../../utils/base';
import AddTriggerComposer from '../../SharedComponent/AddTriggerComposer/addTriggerComposer';
import { useDispatch, useSelector } from 'react-redux';
import { PublishedBot, resetPublish } from './slices/workSpace.slice';
import ChatBotComposer from '../../SharedComponent/ChatBotComposer/chatBotComposer';
import { removingBreadcrumb, resetState, SetCurrentBotUpdateData } from '../Dashboard/slices/dashboard.slice';
import { useHistory } from 'react-router-dom';
import D3Tree from '../../SharedComponent/TreeComponent/D3Tree';
import { getBotTriggersRecursive, openTriggerCard, resetTheUrls } from '../../SharedComponent/AddTriggerComposer/slices/addTrigger.slice';
import { Drawer } from '@mui/material';
import AlertModal from '../../SharedComponent/ConfirmModal/AlertModal';
import ConfirmModal from '../../SharedComponent/ConfirmModal/ConfirmModal';
import {TextField} from '../crud/FormElements';
import moment from 'moment';
// import TreeComponent from "../../SharedComponent/TreeComponent/treeComponent";
import axios from 'axios';
import { API } from '../../utils/services';

const defaultState = {
   isAlert: false,
   isConfirm: false,
   openComposer: false,
   openChatBot: false,
   data: [],
   getAllTypes: [],
   currentTriggerData: {},
   isUpdatedList: false,
   confirmationTxt: '',
   confirmationInfo: [],
   updated_time: '',
};

const BuildWorkSpace = () => {
   const { dashboard, workSpace, trigger } = useSelector(({ Reducers }) => Reducers);

   const dispatch = useDispatch();
   const history = useHistory();
   const [init, setInit] = useState(defaultState);
   let { currentTriggerData, openChatBot, getAllTypes, isAlert, isConfirm, isUpdatedList, confirmationTxt, confirmationInfo } = init;
   let { currentBotData } = dashboard;
   let { success, isPublishSuccess, message_, dataNotFound } = workSpace;
   let { name, phoneNumber, id, userId, published, updated_at } = currentBotData !== null && currentBotData;

   useEffect(() => {
      if (dataNotFound) {
         // alert(message)
         setInit({
            ...init,
            isAlert: true,
            isUpdatedList: true,
            isConfirm: false,
            confirmationTxt: 'Your bot limit has been reached. Please delete one of your existing bots.',
         });
      }

      if (trigger.success) {
         setInit({
            ...init,
            isAlert: true,
            isUpdatedList: true,

            confirmationTxt: trigger.message,
         });
      }
      if (trigger.successTypes) {
         setInit({
            ...init,

            getAllTypes: trigger.getAllTypes,
         });
      }
      if (trigger.dataNotFound) {
         // alert(trigger.message)
         setInit({
            ...init,
            isAlert: true,
            isUpdatedList: true,
            confirmationTxt: trigger.message,
         });
      }
   }, [dataNotFound, message_, success, trigger.success, trigger.message, trigger.dataNotFound, trigger.currentTriggerData, trigger.triggersList]);

   useEffect(() => {
      if (isPublishSuccess) {
         // alert(message_)
         setInit({
            ...init,
            isAlert: true,
            isUpdatedList: true,
            confirmationTxt: message_,
         });
         dispatch(
            SetCurrentBotUpdateData({
               ...currentBotData,
               published: !published,
            })
         );
         dispatch(resetPublish());
      }
   }, [isPublishSuccess, published]);

   useEffect(() => {
      setInit({
         ...init,
         updated_time: updated_at,
      });
   }, []);

   const handlePublishBot = (obj) => {
      setInit({
         ...init,
         isAlert: false,
         isConfirm: true,
         isUpdatedList: true,
         confirmationTxt: 'Are you sure you want to publish this bot?',
      });

      //dispatch(PublishedBot(obj));
   };

   const publishBot = (obj) => {
      confirmClose();
      //Publish Bot in server
      const body = {
         userId: localStorage.getItem('userId'),
         botId: id,
      };
      console.log('publish Bot: ' + JSON.stringify(body));
      API.post(`/publish-bot`, body)
         .then((res) => {
            // console.log("updateTrigger", res);
            setInit({
               ...init,
               isAlert: true,
               isConfirm: false,
               isUpdatedList: true,
               confirmationTxt: 'Your bot has been published successfully',
            });
         })
         .catch((ex) => {
            console.error(ex.message);
         });
   };

   const alertClose = () => {
      setInit({
         ...init,
         isAlert: false,
         isUpdatedList: true,
         confirmationTxt: '',
      });
   };
   // const handleOpenAddTrigger = () => {
   //     setInit({
   //         ...init,
   //         openComposer: true
   //     });
   // }
   const handleCloseAddTrigger = () => {
      dispatch(openTriggerCard({ open: false, isChild: null, childBotId: null }));
      dispatch(getBotTriggersRecursive(id));
      dispatch(resetTheUrls());
      // setInit({
      //     ...init,
      //     openComposer: false
      // });
   };
   const handleSubmitTrigger = (obj) => {
      setInit({
         ...init,
         data: [...init.data, ...obj.triggersList],
         openComposer: false,
      });
   };

   const handleCurrentTriggerData = (data) => {
      setInit({
         ...init,
         openComposer: true,
         currentTriggerData: {
            name: data.text,
            id: data.toTriggerId,
            menuId: data.id,
            startTrigger: false,
         },
      });
   };

   const updateFun = () => {
      let lastSeen = document.getElementById('lastSeen');
      lastSeen.classList.add('d-none');
      let saved = document.getElementById('saved');
      let checkMark = document.getElementById('checkMark');

      saved.classList.remove('d-none');
      saved.innerHTML = 'Saving...';

      setTimeout(() => {
         saved.innerHTML = 'Saved';
         checkMark.classList.remove('d-none');
         setTimeout(() => {
            lastSeen.classList.remove('d-none');
            saved.classList.add('d-none');
            checkMark.classList.add('d-none');
         }, 1500);
      }, 1500);

      setInit({
         ...init,
         updated_time: new Date(),
      });
   };
   const handleBack = () => {
      console.log('UserId: ' + localStorage.getItem('userId'));
      history.push(`${STRINGS.ROUTES.ROOT}?org=${localStorage.getItem('userId')}`);
      dispatch(resetState());
      dispatch(removingBreadcrumb());
   };

   const confirmClose = () => {
      setInit({
         ...init,
         isConfirm: false,
         isUpdatedList: true,
         confirmationTxt: '',
      });
   };

   const calculateLastDate = () => {
      let timeStamp = '';
      try {
         const currentDate = moment(Date.now()).format('MMM DD, YYYY hh:mm a');
         const updateTime = moment(init.updated_time).format('MMM DD, YYYY hh:mm a');
         const date1 = new Date(currentDate);
         const date2 = new Date(updateTime);
         const differenceInMilli = Math.abs(date1 - date2);
         let differenceInMins = Math.floor(differenceInMilli / 60000);
         let differenceInDays = differenceInMins / (60 * 24);
         const currentDay = date1.getDay();
         const updateDay = date2.getDay();
         if (parseInt(differenceInDays) < 1 && currentDay === updateDay) {
            timeStamp = moment(init.updated_time).format('hh:mm a');
         } else if (parseInt(differenceInDays) >= 1 && parseInt(differenceInDays) < 2 && currentDay === updateDay + 1) {
            timeStamp = 'Yesterday' + moment(init.updated_time).format('hh:mm a');
         } else {
            timeStamp = updateTime;
         }
         document.getElementById('lastupdate').innerHTML = timeStamp;
      } catch (ex) {
         console.error(ex.message);
      }
      console.log('Timestamp: ' + timeStamp);

      return timeStamp;
   };
   let { lastsaved } = calculateLastDate();

   return (
      <div className="ws-hld">
         <div className="head first_divNone">
            <AlertModal visible={isAlert} handleOk={alertClose} confirmLoading={!isUpdatedList} modalText={confirmationTxt} modalInfo={confirmationInfo} handleCancel={alertClose} />
            <ConfirmModal visible={isConfirm} handleOk={publishBot} confirmLoading={!isUpdatedList} modalText={confirmationTxt} modalInfo={confirmationInfo} handleCancel={confirmClose} />
            <div className="head-rt">
               <div onClick={handleBack} className="icon" style={{ width: '24px' }}>
                  <img alt={'#'} src={back_icon} />
               </div>
               <h5 class="box-title m-0" style={{ fontWeight: 800 }}>
                  Builder Workspace
               </h5>
               <div id="saveDiv">
                  <p id="saved" className="lastSeen d-none" style={{ merginRight: '30px', merginLeft: '30px' }}>
                     {' '}
                     Saving...
                  </p>{' '}
                  <i id="checkMark" className="fa fa-check d-none" style={{ color: '#07bc0c', merginLeft: '15px' }}></i>
               </div>
               <p id="lastSeen" className="lastSeen" style = {{fontWeight: 800}}>
                  {' '}
                  Last saved <span id="lastupdate">{lastsaved}</span>
               </p>
            </div>
            <div className="head-center">
               <h5 class="box-title m-0" style={{ fontWeight: '800', display: 'flex', alignItems: 'end'  }}>
                  {' '}
                  <input type="text" name="name" className='botName' style={{ border: 'none', borderRadius: '0px'  }}/> <span> {<span class="currentPlan">Draft</span>} </span>
               </h5>
            </div>
            <div className="head-lft">
               <div className="btn-hld">
                  <button
                     className="btn-outlined"
                     onClick={() =>
                        setInit({
                           ...init,
                           openChatBot: !openChatBot,
                        })
                     }
                  >
                     {/* <h6 class="box-title m-0" style={{ fontWeight: 800 }}>
                        
                     </h6> */}
                     Test your bot
                  </button>

                  <button
                     className="btn-filled btn btn-primary"
                     onClick={() => {
                        if (!published) {
                           handlePublishBot({ botId: id, isPublished: !published, userId: localStorage.getItem('userId') });
                        }
                     }}
                  >
                     {!published ? 'Publish' : 'Published'}
                  </button>
               </div>
            </div>
         </div>
         {/*<TransformWrapper wheel={{disabled: false, step: 0.1}}>*/}
         {/*    <TransformComponent wrapperClass={"ws-section"}>*/}
         <div className="ws-section">
            {/*<TreeComponent*/}
            {/*    data={data}*/}
            {/*    trigger={trigger}*/}
            {/*    currentTriggerData={handleCurrentTriggerData}*/}
            {/*    isOpenComposer={openComposer}*/}
            {/*    addTrigger={handleOpenAddTrigger}*/}
            {/*    handleCloseAddTrigger={handleCloseAddTrigger}*/}
            {/*/>*/}

            <D3Tree getAllTypes={getAllTypes} data={{ botId: id, userId: userId }} />

            {trigger.openAddBot && (
               <Drawer anchor={'right'} open={trigger.openAddBot} onClose={handleCloseAddTrigger}>
                  <div className="composer-hld">
                     <AddTriggerComposer trigger={trigger} updateFun={updateFun} getAllTypes={getAllTypes} currentBotData={currentBotData} data={currentTriggerData} handleTriggerClose={handleCloseAddTrigger} submitTrigger={handleSubmitTrigger} />
                  </div>
               </Drawer>
            )}

            {openChatBot && (
               <ChatBotComposer
                  onClose={() =>
                     setInit({
                        ...init,
                        openChatBot: false,
                     })
                  }
               />
            )}
         </div>
         {/*    </TransformComponent>*/}
         {/*</TransformWrapper>*/}
      </div>
   );
};

export default BuildWorkSpace;
