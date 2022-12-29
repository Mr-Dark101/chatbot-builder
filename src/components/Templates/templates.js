import React, {useEffect, useState} from 'react';
import back_icon from "../../assets/back-icon.svg";
import {STRINGS} from "../../utils/base";
import {useDispatch, useSelector} from "react-redux";
import {CloseBotComposer, removingBreadcrumb, resetState} from "../Dashboard/slices/dashboard.slice";
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

const defaultState = {
    isAlert: false,
    isUpdatedList: false,
    confirmationTxt: "",
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
    const {dashboard} = useSelector(({Reducers}) => Reducers);
    const dispatch = useDispatch();
    const history = useHistory();
    const [init, setInit] = useState(defaultState);
    let {isUpdatedList,isAlert,confirmationTxt} = init;
    let {currentBotData,data,success,dataNotFound,currentUser,updateBotData,openBotComposer,isError,message} = dashboard;
    let {name, phoneNumber, id, userId, published} = currentBotData !== null && currentBotData;

    useEffect(()=>{
        if (isError) {
            setInit({
                ...init,
                isAlert: true,
                isUpdatedList: true,
                confirmationTxt: message,
            });
            dispatch(resetState())
        }
    },[isError, message])

    const handleBack = () => {
        history.push(`${STRINGS.ROUTES.ROOT}?org=${localStorage.getItem("userId")}`);
        dispatch(resetState());
        dispatch(removingBreadcrumb())
    }

    const closeModal = () => {
        dispatch(CloseBotComposer())
    }

    const alertClose = () => {
        setInit({
            ...init,
            isAlert: false,
            isUpdatedList: true,
            confirmationTxt: "",
        })
    }

    return (
        <div className="ws-hld">
            <CreateBotComposer
                currentUser={currentUser}
                data={updateBotData}
                openModal={openBotComposer}
                onClose={closeModal}
            />
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

            <div className="ws-section">
            
                <div className="cards-hld">
                    {createArray.map((d, index) => {
                            return  <CreateBotsCardItem onClick={handleCreateChatBot}
                                    dashboard={dashboard}
                                    key={index}
                                   data={d}
                               />
                            })}                    
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