import React, { useEffect, useState, useContext } from 'react';
// import add_btn from "../../assets/add-icon.svg";
import built_add_icon from '../../assets/built_add_icon.svg';
import built_add_icon_white from '../../assets/built_add_icon.svg';
import dashboard_customize from '../../assets/dashboard_customize.svg';
import dashboard_customize_white from '../../assets/dashboard_customize.svg';
import switch_icon from '../../assets/switch_icon.png';
import notification_icon from '../../assets/notification.svg';
import setting_icon from '../../assets/Image 1/settings.svg';
import user_img from '../../assets/user_img.svg';
import { useDispatch, useSelector } from 'react-redux';
import { UserContext } from '../../context/UserContext';
import { addingBreadcrumb, CloseBotComposer, DeleteUserBot, GetUserBots, OpenBotComposer, resetState } from './slices/dashboard.slice';

import AuthService from '../../services/auth.service';
import EventBus from '../../common/EventBus';

import UserBotsCardItem from './items/UserBotsCardItem';
import CreateBotComposer from './items/CreateBotComposer';
import ConfirmModal from '../../SharedComponent/ConfirmModal/ConfirmModal';
import ConfirmModalPublish from '../../SharedComponent/ConfirmModal/ConfirmModalPublish';
import AlertModal from '../../SharedComponent/ConfirmModal/AlertModal';
import CreateBotsCardItem from './items/CreateBotsItems';
import { STRINGS } from '../../utils/base';
import { useHistory } from 'react-router-dom';
import { resetPublish,PublishedBot } from '../BuilderWorkSpace/slices/workSpace.slice';
import { Link } from 'react-router-dom';
import {Tooltip} from '@mui/material';

const defaultState = {
   isConfirm: false,
   isConfirmPublish: false,
   isAlert: false,
   isUpdatedList: false,
   confirmationTxt: '',
   confirmationInfo: [],
   okText:'',
   publishStatus:'',
   modalTitle:'',
   currentObject: {
      userId: 0,
      id: 0,
   },
};

const createArray = [
   {
      id: 1,
      name: 'Build from scratch',
      icon_1: built_add_icon,
      icon_2: built_add_icon_white,
      title: ''
   },
   {
      id: 2,
      name: 'Build from template',
      icon_1: built_add_icon,
      icon_2: built_add_icon_white,
      title: ''
   },
   {
      id: 3,
      name: 'Build GPT Bot',
      icon_1: built_add_icon,
      icon_2: built_add_icon_white,
      title: ""
   },

   {
      id: 4,
      name: 'Build Hybrid Bot',
      icon_1: built_add_icon,
      icon_2: built_add_icon_white,
      title: ""
   },
];

const Dashboard = () => {
   const [init, setInit] = useState(defaultState);
   let { isAlert, isConfirm, isUpdatedList, confirmationTxt, confirmationInfo, currentObject,isConfirmPublish,okText,modalTitle,publishStatus } = init;
   const dispatch = useDispatch();
   // const location1 = useLocation()

   const {
      dashboard,
      workSpace: { isPublishSuccess, message_ },
   } = useSelector(({ Reducers }) => Reducers);
   const history = useHistory();
   let { success, dataNotFound, isError, data, currentUser, deleteSuccess, message, updateBotData, openBotComposer,botType } = dashboard;

   const { user, setUser } = useContext(UserContext);

   //const location = localStorage.getItem('tenent_id');
   const location = localStorage.getItem('org_unit_id');
   useEffect(() => {
      if (!success) {
         dispatch(GetUserBots({ userId: location }));
      }
      if (isPublishSuccess) {

         setInit({
            ...init,
            isAlert: true,
            isConfirm: false,
            isConfirmPublish:false,
            isUpdatedList: true,
            okText: 'OK',

            confirmationTxt: message_,
            confirmationInfo: [],
            currentObject: {
               userId: 0,
               id: 0,
            },
         });
         dispatch(resetPublish());
         dispatch(GetUserBots({ userId: location }));
      }
      if (isError) {
         setInit({
            ...init,
            isAlert: true,
            isConfirm: false,
            isUpdatedList: true,
            confirmationTxt: message,
            confirmationInfo: [],
            currentObject: {
               userId: 0,
               id: 0,
            },
         });
      }
      if (deleteSuccess !== null && !deleteSuccess) {
         // alert('coming 2',message);
         setInit({
            ...init,
            isAlert: true,
            isConfirm: false,
            isUpdatedList: true,
            confirmationTxt: message,
            confirmationInfo: [],
             okText: 'OK',
            currentObject: {
               userId: 0,
               id: 0,
            },
         });
         dispatch(resetState());
      }
      if (deleteSuccess !== null && deleteSuccess) {
         dispatch(GetUserBots({ userId: location }));
         setInit({
            ...init,
            isAlert: true,
            isConfirm: false,
            isUpdatedList: true,
            confirmationTxt: message,
             okText: 'OK',
            confirmationInfo: [],
            currentObject: {
               userId: 0,
               id: 0,
            },
         });
         dispatch(resetState());
      }
   }, [dispatch, isError, message, deleteSuccess, success, isPublishSuccess]);
   // console.log("dashboard",dashboard)

   const closeModal = () => {
      dispatch(CloseBotComposer());
   };

   const handleDelete = (obj) => {
      // console.log(obj);
      dispatch(DeleteUserBot(obj));
      setInit({
         ...init,
         isConfirm: false,
         isUpdatedList: false,
         modalTitle: 'Delete Bot',
         okText: 'Delete',
         confirmationTxt: `Are you sure want to delete this bot?`,
         currentObject: {
            userId: 0,
            id: 0,
         },
      });
   };

   const handleSubmitTrigger = () => {
      if (currentObject.userId !== 0 && currentObject.id !== 0) {
         setInit({
            ...init,
            isUpdatedList: true,
         });
         // console.log('coming handle');
         handleDelete({ botId: currentObject.id, userId: currentObject.userId });
      }
   };


   const handleSubmitTriggerPublish = () => {
         //console.log(currentObject)
         const obj = { botId: currentObject.id, isPublished: publishStatus }
         dispatch(PublishedBot(obj));

      //    setInit({
      //    ...init,
      //    isConfirmPublish: false,
      //    isAlert:true,
      //    isUpdatedList: true,
      //    modalTitle: 'Publish bot',
      //    okText: 'Publish',
      //    confirmationTxt: `Are you sure want to delete this bot?`,
      //    currentObject: {
      //       userId: 0,
      //       id: 0,
      //    },
      // });



         // console.log('coming handle');
         //handleDelete({ botId: currentObject.id, userId: currentObject.userId });
      //}
   };


   

   const confirmClose = () => {
      setInit({
         ...init,
         isConfirm: false,
         isUpdatedList: true,
         confirmationTxt: '',
         currentObject: {
            userId: 0,
            id: 0,
         },
      });
   };

   const confirmClosePublish = () => {
      setInit({
         ...init,
         isConfirmPublish: false,
         isUpdatedList: true,
         confirmationTxt: '',
         
      });
   };

   const alertClose = () => {
      setInit({
         ...init,
         isAlert: false,
         isUpdatedList: true,
         confirmationTxt: '',
         currentObject: {
            userId: 0,
            id: 0,
         },
      });
      window.location.reload();
   };

   const handleCreateChatBot = (type) => {
      let currentData = data.filter((fl) => !fl.isSampleBot && fl);
      switch (type) {
         case 1:
            if (currentData?.length <= STRINGS.DEFAULTS.BOT_LIMIT) {
               dispatch(OpenBotComposer(1));
            } else {
               setInit({
                  ...init,
                  isAlert: true,
                  isConfirm: false,
                  confirmationTxt: 'Your bot limit has been reached. Please delete one of your existing bots.',
               });
               // alert("Your limit has been reached")
            }
            break;
         case 2:
            history.push(`${STRINGS.ROUTES.TEMPLATES}`);
            dispatch(addingBreadcrumb({ label: 'Template', path: `${STRINGS.ROUTES.TEMPLATES}` }));
            break;

         case 3:
            if (currentData?.length <= STRINGS.DEFAULTS.BOT_LIMIT) {
               dispatch(OpenBotComposer(3));
            } else {
               setInit({
                  ...init,
                  isAlert: true,
                  isConfirm: false,
                  confirmationTxt: 'Your bot limit has been reached. Please delete one of your existing bots.',
               });
               // alert("Your limit has been reached")
            }
            break;

         case 4:
            if (currentData?.length <= STRINGS.DEFAULTS.BOT_LIMIT) {
               dispatch(OpenBotComposer(4));
            } else {
               setInit({
                  ...init,
                  isAlert: true,
                  isConfirm: false,
                  confirmationTxt: 'Your bot limit has been reached. Please delete one of your existing bots.',
               });
               // alert("Your limit has been reached")
            }
            break;
         default:
            return '';
      }
   };

   const doNone = () => {

   };
   const inital = (name) => {
         return name.substr(0,1);
   }

   const logOut = () => {
      AuthService.logout();
      // document.location.href ='/login'
      document.location.href = 'https://eoceanwabaqa.com/eoceanwab';
   };

   const userData = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {};
   return (
      <div className="dashboard-hld ov-des overflow-auto" style={{marginTop:"-50px"}}>
         
         <div className="home_top_section text-end d-dnone" style={{ paddingRight: 10 }}>
            <div>
               <ul>
                  <li>
                      
                     <img src={notification_icon} />
                  </li>

                  <li>
                     <a href="#">{userData?.org_name}</a>
                  </li>

                  <li className="dropdown login_dropdown_menu">
                     <a className="dropdown dropdown-toggle" href="#" data-bs-toggle="dropdown">
                        

                        <div className="dash-avt">
                            {inital(userData?.org_name)}
                        </div>
                     </a>
                     <ul className="dropdown-menu">
                        <li>
                           <div className="user_detail_section">
                              <h3>{userData?.name}</h3>
                              <p>{userData?.email}</p>
                           </div>
                        </li>
                        <li className="dropdown-item">
                           <a href="#" onClick={logOut}>
                              {' '}
                              <img src={switch_icon} /> Logout
                           </a>
                        </li>
                     </ul>
                  </li>
               </ul>
            </div>
            <button className="login_dropdown_btn btn btn-danger" style={{ display: 'none' }} href="#" onClick={logOut}>
               {' '}
               Sign Out
            </button>
         </div>

         {localStorage.getItem('org_unit_id') != '' ? (
            <>
               <CreateBotComposer botType={botType} currentUser={currentUser} data={updateBotData} openModal={openBotComposer} onClose={closeModal} />
               <ConfirmModal visible={isConfirm} handleOk={handleSubmitTrigger} okText="Delete" modalTitle="Delete Bot" confirmLoading={!isUpdatedList} modalText={confirmationTxt} modalInfo={confirmationInfo} handleCancel={confirmClose} />
              <ConfirmModalPublish visible={isConfirmPublish} publishStatus={publishStatus} handleOk={handleSubmitTriggerPublish} okText={okText} modalTitle={modalTitle} confirmLoading={!isUpdatedList} modalText={confirmationTxt} modalInfo={confirmationInfo} handleCancel={confirmClosePublish} />
              <AlertModal visible={isAlert} handleOk={alertClose} confirmLoading={!isUpdatedList} modalText={confirmationTxt} okText={okText} modalTitle={modalTitle} modalInfo={confirmationInfo} handleCancel={alertClose} />
               <div className="head" style={{ display: 'none' }}>
                  <div className="head-rt">
                     <h4 class="box-title m-0">Create a bot</h4>
                  </div>
               </div>

               <div className="row">
                  <div className="col-sm-11">
                     <div className="dashboard-section">
                        <div className="cards-hld">
                           {createArray.map((d, index) => {
                              if((index == 2 || index == 3) && localStorage.getItem('chatbot_plan').includes("BASIC")) {
                                 d.title = "You don\'t have access to this feature. Please contact sales to upgrade your plan.";
                                 return <CreateBotsCardItem bgColor="#686868" onClick={doNone} key={index} data={d}/>;
                              } else {
                                 return <CreateBotsCardItem bgColor="#363a77" onClick={handleCreateChatBot} dashboard={dashboard} key={index} data={d}/>;
                              } 
                           })}
                        </div>
                     </div>
                  </div>

                  <div className="col-sm-1">
                    
                    <Link to="/settings" className="float-end">
                        <img src={setting_icon}  style={{ maxWidth: '37px', marginTop:'20px', marginRight:'30px'}} />
                     </Link>

                     
                  </div>
               </div>

               <div className="head" style={{ display: 'none' }}>
                  <div className="head-rt">
                     <div className="txt">My Bots</div>
                  </div>
               </div>
               <div className="dashboard-section">
                  <div className="cards-hld">
                     {!success ? (
                        'loading...'
                     ) : !dataNotFound ? (
                        data.map((d, index) => {
                           if (!d.sampleBot) {
                              return (
                                 <UserBotsCardItem
                                    onDelete={(obj) => {
                                       setInit({
                                          ...init,
                                          isConfirm: true,
                                          isUpdatedList: true,
                                          confirmationTxt: `You're about to delete this bot.`,
                                          confirmationInfo: ['The bot can not be retrieved once deleted.', 'However, you can still access your chat history with the bot.'],
                                          currentObject: obj,
                                       });
                                    }}

                                    onPublishCustom={(obj) => {
                                       let confirm = (!d.published) ? `publish` : `unpublish`;
                                       if(confirm === 'publish') {
                                          setInit({
                                             ...init,
                                             isConfirmPublish: true,
                                             isUpdatedList: true,
                                             confirmationTxt: `Are you sure you want to ` + confirm +` this bot?`,
                                             confirmationInfo: [],
                                             currentObject: obj,
                                             okText: (!d.published) ? 'Publish' : 'Unpublish',
                                             modalTitle: (!d.published) ? 'Publish Bot' : 'Unpublish Bot',
                                             publishStatus: (!d.published) ? true : false,
                                             currentObject: obj,
                                          });
                                       } else {
                                          setInit({
                                             ...init,
                                             isConfirmPublish: true,
                                             isUpdatedList: true,
                                             confirmationTxt: `Are you sure you want to ` + confirm +` this bot?`,
                                             confirmationInfo: ['Unpublishing your chatbot will remove it from user view and chatbot will not respond to user requests. However, your chatbot will not be deleted.'],
                                             currentObject: obj,
                                             okText: (!d.published) ? 'Publish' : 'Unpublish',
                                             modalTitle: (!d.published) ? 'Publish Bot' : 'Unpublish Bot',
                                             publishStatus: (!d.published) ? true : false,
                                             currentObject: obj,
                                          });
                                       }
                                       
                                    }}

                                    dashboard={dashboard}
                                    key={index}
                                    data={d}
                                 />
                              );
                           }
                        })
                     ) : (
                        <div className="data-not-found">No Data Found</div>
                     )}
                  </div>
               </div>
            </>
         ) : null}
      </div>
   );
};

export default Dashboard;
