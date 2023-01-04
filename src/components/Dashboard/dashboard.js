import React, { useEffect, useState, useContext } from 'react';
// import add_btn from "../../assets/add-icon.svg";
import built_add_icon from '../../assets/built_add_icon.svg';
import built_add_icon_white from '../../assets/built_add_icon.svg';
import dashboard_customize from '../../assets/dashboard_customize.svg';
import dashboard_customize_white from '../../assets/dashboard_customize.svg';
import switch_icon from '../../assets/switch_icon.png';
import notification_icon from '../../assets/notification.svg';
import user_img from '../../assets/user_img.svg';
import { useDispatch, useSelector } from 'react-redux';
import { UserContext } from '../../context/UserContext';
import { addingBreadcrumb, CloseBotComposer, DeleteUserBot, GetUserBots, OpenBotComposer, resetState } from './slices/dashboard.slice';

import AuthService from '../../services/auth.service';
import EventBus from '../../common/EventBus';

import UserBotsCardItem from './items/UserBotsCardItem';
import CreateBotComposer from './items/CreateBotComposer';
import ConfirmModal from '../../SharedComponent/ConfirmModal/ConfirmModal';
import AlertModal from '../../SharedComponent/ConfirmModal/AlertModal';
import CreateBotsCardItem from './items/CreateBotsItems';
import { STRINGS } from '../../utils/base';
import { useHistory } from 'react-router-dom';
import { resetPublish } from '../BuilderWorkSpace/slices/workSpace.slice';
import { Link } from 'react-router-dom';

const defaultState = {
   isConfirm: false,
   isAlert: false,
   isUpdatedList: false,
   confirmationTxt: '',
   confirmationInfo: [],
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
   },
   {
      id: 2,
      name: 'Build from template',
      icon_1: built_add_icon,
      icon_2: built_add_icon_white,
   },
];

const Dashboard = () => {
   const [init, setInit] = useState(defaultState);
   let { isAlert, isConfirm, isUpdatedList, confirmationTxt, confirmationInfo, currentObject } = init;
   const dispatch = useDispatch();
   // const location1 = useLocation()

   const {
      dashboard,
      workSpace: { isPublishSuccess, message_ },
   } = useSelector(({ Reducers }) => Reducers);
   const history = useHistory();
   let { success, dataNotFound, isError, data, currentUser, deleteSuccess, message, updateBotData, openBotComposer } = dashboard;

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
            isUpdatedList: true,
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
         confirmationTxt: `Are You Sure? You want to Delete this Bot`,
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
   };

   const handleCreateChatBot = (type) => {
      let currentData = data.filter((fl) => !fl.isSampleBot && fl);
      switch (type) {
         case 1:
            if (currentData?.length <= STRINGS.DEFAULTS.BOT_LIMIT) {
               dispatch(OpenBotComposer());
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
         default:
            return '';
      }
   };

   const logOut = () => {
      AuthService.logout();
      // document.location.href ='/login'
      document.location.href = 'https://eoceanwabaqa.com/eoceanwab';
   };

   return (
      <div className="dashboard-hld ov-des overflow-auto">
         <div className="home_top_section text-end d-none" style={{ paddingRight: 10 }}>
            <div>
               <ul>
                  <li>
                     <a href="#">
                        <img src={notification_icon} />
                     </a>
                  </li>

                  <li>
                     <a href="#">Eocean</a>
                  </li>

                  <li className="dropdown login_dropdown_menu">
                     <a className="dropdown dropdown-toggle" href="#" data-bs-toggle="dropdown">
                        <img src={user_img} />
                     </a>
                     <ul className="dropdown-menu">
                        <li>
                           <div className="user_detail_section">
                              <h3>Hassan Nasir</h3>
                              <p>hassan.nasir@eocean.com.pk</p>
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
               <CreateBotComposer currentUser={currentUser} data={updateBotData} openModal={openBotComposer} onClose={closeModal} />
               <ConfirmModal visible={isConfirm} handleOk={handleSubmitTrigger} confirmLoading={!isUpdatedList} modalText={confirmationTxt} modalInfo={confirmationInfo} handleCancel={confirmClose} />
               <AlertModal visible={isAlert} handleOk={alertClose} confirmLoading={!isUpdatedList} modalText={confirmationTxt} modalInfo={confirmationInfo} handleCancel={alertClose} />
               <div className="head" style={{ display: 'none' }}>
                  <div className="head-rt">
                     <h4 class="box-title m-0">Create a bot</h4>
                  </div>
               </div>

               <div className="row">
                  <div className="col-sm-10">
                     <div className="dashboard-section">
                        <div className="cards-hld">
                           {createArray.map((d, index) => {
                              return <CreateBotsCardItem onClick={handleCreateChatBot} dashboard={dashboard} key={index} data={d} />;
                           })}
                        </div>
                     </div>
                  </div>

                  <div className="col-sm-2">
                     <Link to="/settings" className="dashboard_setting float-end">
                        Settings
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
                                          confirmationTxt: `You're about to delete ${d.name} bot.`,
                                          confirmationInfo: ['The bot can not be retrieved once deleted.', 'However, you can still access your chat history with the bot.'],
                                          currentObject: obj,
                                       });
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
