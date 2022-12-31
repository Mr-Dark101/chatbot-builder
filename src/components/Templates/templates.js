import React, {useEffect, useState} from 'react';
import back_icon from "../../assets/back-icon.svg";
import {STRINGS} from "../../utils/base";
import {useDispatch, useSelector} from "react-redux";
import {CloseBotComposer, removingBreadcrumb, resetState,GetUserBots} from "../Dashboard/slices/dashboard.slice";
import { PublishedBot,addTemplateBotSlice } from '../BuilderWorkSpace/slices/workSpace.slice';
import {useHistory} from "react-router-dom";
import CreateBotsCardItem from "../Dashboard/items/CreateBotsItems";
import bank_template from "../../assets/bank_template.svg";
import bank_template_white from "../../assets/bank_template_white.svg";
import customer_care from "../../assets/customer_care.svg";
import customer_care_white from "../../assets/customer_care_white.svg";
import lead_generation from "../../assets/lead_generation.svg";
import lead_generation_white from "../../assets/lead_generation_white.svg";
import filter_icon from "../../assets/filter_alt_black_24dp.svg";
import filter_icon_white from "../../assets/filter_alt_black_24dp_white.svg";
import UserBotsCardItem from "../Dashboard/items/UserBotsCardItem";
import CreateBotComposer from "../Dashboard/items/CreateBotComposer";
import AlertModal from "../../SharedComponent/ConfirmModal/AlertModal";
import ConfirmModal from '../../SharedComponent/ConfirmModal/ConfirmModal';
const defaultState = {
    isAlert: false,
    isConfirm:false,
    isUpdatedList: false,
    confirmationTxt: "",
    confirmationInfo:'',
    currentObject: {
      userId: 0,
      id: 0,
   },
}

const createArray = [
    {
        id: 1,
        name: "Live Chat",
        icon_1: customer_care,
        icon_2: customer_care_white,
    },
    {
        id: 2,
        name: "Support Chatbot",
        icon_1: lead_generation,
        icon_2: lead_generation_white,
    },
    {
        id: 3,
        name: "Quality Lead Bot",
        icon_1: filter_icon,
        icon_2: filter_icon_white,
    }
]

const handleCreateChatBot = (type) => {

 };


const Templates = () => {
    const {dashboard,
    workSpace: { isAddSuccess, message_ },
    } = useSelector(({Reducers}) => Reducers);
    const dispatch = useDispatch();
    const history = useHistory();
    const [init, setInit] = useState(defaultState);
    let {isUpdatedList,isAlert,confirmationTxt,confirmationInfo,currentObject,isConfirm} = init;
    let {currentBotData,data,success,dataNotFound,currentUser,updateBotData,openBotComposer,isError,message} = dashboard;
    let {name, phoneNumber, id, userId, published} = currentBotData !== null && currentBotData;
    const location = localStorage.getItem('org_unit_id');
    useEffect(()=>{
        if (isError) {
            setInit({
                ...init,
                isAlert: true,
                isUpdatedList: true,
                confirmationTxt: message_,
            });
            dispatch(resetState())
        }
        
        if (isAddSuccess !== null && isAddSuccess) {

         dispatch(GetUserBots({ userId: location }));
         setInit({
            ...init,
            isAlert: false,
            isConfirm: false,
            isUpdatedList: true,
            confirmationTxt: "Bot has been added successfully",
            confirmationInfo: [],
            currentObject: {
               userId: 0,
               id: 0,
            },
         });
         dispatch(resetState())
         
      }

    },[isError,isAddSuccess])

    const handleBack = () => {
        history.push(`${STRINGS.ROUTES.ROOT}?org=${localStorage.getItem("userId")}`);
        dispatch(resetState());
        dispatch(removingBreadcrumb())
    }

    const closeModal = () => {
        dispatch(CloseBotComposer())
    }

     const confirmClose = () => {
      setInit({
         ...init,
          isAlert: false,
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
            isConfirm:false,
            isUpdatedList: true,
            confirmationTxt: "",
        })
        dispatch(resetState());
    }
    const addbotSave = () => {

        
         // console.log('coming handle');
         //alert(currentObject.id)

         dispatch(addTemplateBotSlice({ botId: currentObject.id, isPublished: false }));

         
     

    }

    return (
        <div className="ws-hld dashboard-hld ov-des overflow-auto">
           
            <CreateBotComposer
                currentUser={currentUser}
                data={updateBotData}
                openModal={openBotComposer}
                onClose={closeModal}
            />
            <ConfirmModal visible={isConfirm} handleOk={addbotSave} confirmLoading={!isUpdatedList} modalText={confirmationTxt} modalInfo={confirmationInfo} handleCancel={confirmClose} />
            <AlertModal
                visible={isAlert}
                handleOk={alertClose}
                confirmLoading={!isUpdatedList}
                modalText={confirmationTxt}
                modalInfo={[]}
                handleCancel={alertClose}
            />
            <div className="head">
                <div className="head-rt">
                    <div onClick={handleBack} className="icon">
                        <img alt={"#"} src={back_icon}/>
                    </div>
                    <div className="txt">
                        Bot Template
                    </div>
                </div>
               
                <div className="head-lft">
                    <div className="btn-hld">

                    </div>
                </div>
            </div>

            <div className="dashboard-section">
            
                <div className="cards-hld">

                                    
                    {
                        !success ? "loading..." : !dataNotFound ?
                            data.map((d, index) => {
                                if(d.sampleBot){
                                    return (
                                        <UserBotsCardItem
                                            temp
                                            /*onDelete={(obj) => {
                                                setInit({
                                                    ...init,
                                                    isConfirm: true,
                                                    isUpdatedList: true,
                                                    confirmationTxt: `You're about to delete booking bot.`,
                                                    confirmationInfo: ["The bot can not be retrieved once deleted.", "However, you can still access your chat history with the bot."],
                                                    currentObject: obj
                                                })
                                            }}*/


                                             onAddBot={(obj) => {
                                                setInit({
                                                   ...init,
                                                   isConfirm:true,
                                                   isAlert: false,
                                                   isUpdatedList: true,
                                                   confirmationTxt: `You're about to add ${d.name} bot.`,
                                                  
                                                   currentObject: obj,
                                                });
                                             }}
                                          
                                            dashboard={dashboard}
                                            key={index}
                                            data={d}
                                        />
                                    )
                                }
                            })
                            :
                            <div className="data-not-found">No Data Found</div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Templates;