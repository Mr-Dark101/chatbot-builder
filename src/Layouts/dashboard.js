import React, {useEffect, useState} from 'react';
// import add_btn from "../../assets/add-icon.svg";
import built_add_icon from "../../assets/built_add_icon.svg";
import built_add_icon_white from "../../assets/built_add_icon_white.svg";
import dashboard_customize from "../../assets/dashboard_customize.svg";
import dashboard_customize_white from "../../assets/dashboard_customize_white.svg";
import {useDispatch, useSelector} from "react-redux";
import {
    addingBreadcrumb,
    CloseBotComposer,
    DeleteUserBot,
    GetUserBots,
    OpenBotComposer,
    resetState
} from "./slices/dashboard.slice";
import UserBotsCardItem from "./items/UserBotsCardItem";
import CreateBotComposer from "./items/CreateBotComposer";
import ConfirmModal from "../../SharedComponent/ConfirmModal/ConfirmModal";
import AlertModal from "../../SharedComponent/ConfirmModal/AlertModal";
import CreateBotsCardItem from "./items/CreateBotsItems";
import {STRINGS} from "../../utils/base";
import {useHistory} from "react-router-dom";
import {resetPublish} from "../BuilderWorkSpace/slices/workSpace.slice";

const defaultState = {
    isConfirm: false,
    isAlert: false,
    isUpdatedList: false,
    confirmationTxt: "",
    confirmationInfo: [],
    currentObject: {
        userId: 0,
        id: 0
    }
}

const createArray = [{
    id: 1, name: "Build a New Bot from Scratch", icon_1: built_add_icon, icon_2: built_add_icon_white,
},
    {
        id: 2,
        name: "Build a New Bot from Template",
        icon_1: dashboard_customize,
        icon_2: dashboard_customize_white,
    }
]

const Dashboard = () => {
    const [init, setInit] = useState(defaultState);
    let {isAlert, isConfirm, isUpdatedList, confirmationTxt, confirmationInfo, currentObject} = init;
    const dispatch = useDispatch();
    // const location1 = useLocation()
    const {dashboard,workSpace: {isPublishSuccess,message_}} = useSelector(({Reducers}) => Reducers);
    const history = useHistory();
    let {success, dataNotFound, isError, data, currentUser, deleteSuccess, message, updateBotData, openBotComposer} = dashboard;
    const location = new URL(window.location.href).searchParams.get("org");


    useEffect(() => {
        if (!success) {
            dispatch(GetUserBots({userId: location}));
        }
        if(isPublishSuccess){
            setInit({
                ...init,
                isAlert: true,
                isConfirm: false,
                isUpdatedList: true,
                confirmationTxt: message_,
                confirmationInfo: [],
                currentObject: {
                    userId: 0,
                    id: 0
                }
            })
            dispatch(resetPublish());
            dispatch(GetUserBots({userId: location}));
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
                    id: 0
                }
            })
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
                    id: 0
                }
            })
            dispatch(resetState())
        }
        if (deleteSuccess !== null && deleteSuccess) {
            dispatch(GetUserBots({userId: location}));
            setInit({
                ...init,
                isAlert: true,
                isConfirm: false,
                isUpdatedList: true,
                confirmationTxt: message,
                confirmationInfo: [],
                currentObject: {
                    userId: 0,
                    id: 0
                }
            })
            dispatch(resetState())
        }
    }, [dispatch, isError, message, deleteSuccess,success,isPublishSuccess]);
    // console.log("dashboard",dashboard)

    const closeModal = () => {
        dispatch(CloseBotComposer())
    }

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
                id: 0
            }
        })
    }

    const handleSubmitTrigger = () => {
        if (currentObject.userId !== 0 && currentObject.id !== 0) {
            setInit({
                ...init,
                isUpdatedList: true,
            })
            // console.log('coming handle');
            handleDelete({botId: currentObject.id, userId: currentObject.userId})
        }
    }

    const confirmClose = () => {
        setInit({
            ...init,
            isConfirm: false,
            isUpdatedList: true,
            confirmationTxt: "",
            currentObject: {
                userId: 0,
                id: 0
            }
        })
    }

    const alertClose = () => {
        setInit({
            ...init,
            isAlert: false,
            isUpdatedList: true,
            confirmationTxt: "",
            currentObject: {
                userId: 0,
                id: 0
            }
        })
    }

    const handleCreateChatBot = (type) => {
        let currentData = data.filter((fl)=> !fl.isSampleBot && fl )
        switch (type) {
            case 1:
                if(currentData?.length <= STRINGS.DEFAULTS.BOT_LIMIT) {
                    dispatch(OpenBotComposer())
                }else{
                    setInit({
                        ...init,
                        isAlert: true,
                        confirmationTxt: "Your limit has been reached",
                    })
                    // alert("Your limit has been reached")
                }
                break;
            case 2:
                history.push(`${STRINGS.ROUTES.TEMPLATES}`);
                dispatch(addingBreadcrumb({label: "Template", path: `${STRINGS.ROUTES.TEMPLATES}`}));
                break;
            default:
                return ""
        }
    }


    return (
        <div className="dashboard-hld ov-des overflow-auto">
            <CreateBotComposer
                currentUser={currentUser}
                data={updateBotData}
                openModal={openBotComposer}
                onClose={closeModal}
            />
            <ConfirmModal
                visible={isConfirm}
                handleOk={handleSubmitTrigger}
                confirmLoading={!isUpdatedList}
                modalText={confirmationTxt}
                modalInfo={confirmationInfo}
                handleCancel={confirmClose}
            />
            <AlertModal
                visible={isAlert}
                handleOk={alertClose}
                confirmLoading={!isUpdatedList}
                modalText={confirmationTxt}
                modalInfo={confirmationInfo}
                handleCancel={alertClose}
            />
            <div className="head">
                <div className="head-rt">
                    <div className="txt">
                        Create a Bot
                    </div>
                </div>
                {/*<div className="head-lft">*/}
                {/*    <div className="btn-hld">*/}
                {/*        <button className="btn-outlined" onClick={() => {*/}
                {/*            dispatch(OpenBotComposer())*/}
                {/*        }}>*/}
                {/*            Create New Bot*/}
                {/*            <span>*/}
                {/*                <img alt={"#"} src={add_btn}/>*/}
                {/*            </span>*/}
                {/*        </button>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
            <div className="dashboard-section">
                <div className="cards-hld">
                    {
                        createArray.map((d, index) => {
                            return (
                                <CreateBotsCardItem
                                    onClick={handleCreateChatBot}
                                    dashboard={dashboard}
                                    key={index}
                                    data={d}
                                />
                            )
                        })
                    }

                    {/*<NavLink to={STRINGS.ROUTES.BWS} className="card">*/}
                    {/*    <div className="card-content">*/}
                    {/*        <div className="card-start">*/}
                    {/*            <div className="card-circle">*/}
                    {/*                <img*/}
                    {/*                    alt={"#"}*/}
                    {/*                    src={robotic_icon}*/}
                    {/*                />*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*        <div className="card-center">*/}
                    {/*            <div className="txt">Domino's Pizza</div>*/}
                    {/*            <div className="sub-txt">+92 300 1234567</div>*/}
                    {/*        </div>*/}
                    {/*        <div className="card-ends">*/}
                    {/*            <div className="icon">*/}
                    {/*                <img alt={"#"} src={more_opt}/>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</NavLink>*/}
                    {/*<NavLink to={STRINGS.ROUTES.BWS} className="card">*/}
                    {/*    <div className="card-content">*/}
                    {/*        <div className="card-start">*/}
                    {/*            <div className="card-circle">*/}
                    {/*                <img*/}
                    {/*                    alt={"#"}*/}
                    {/*                    src={robotic_icon}*/}
                    {/*                />*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*        <div className="card-center">*/}
                    {/*            <div className="txt">Domino's Pizza</div>*/}
                    {/*            <div className="sub-txt">+92 300 1234567</div>*/}
                    {/*        </div>*/}
                    {/*        <div className="card-ends">*/}
                    {/*            <div className="icon">*/}
                    {/*                <img alt={"#"} src={more_opt}/>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</NavLink>*/}
                </div>
            </div>
            <div className="head">
                <div className="head-rt">
                    <div className="txt">
                        My Bots
                    </div>
                </div>
                {/*<div className="head-lft">*/}
                {/*    <div className="btn-hld">*/}
                {/*        <button className="btn-outlined" onClick={() => {*/}
                {/*            dispatch(OpenBotComposer())*/}
                {/*        }}>*/}
                {/*            Create New Bot*/}
                {/*            <span>*/}
                {/*                <img alt={"#"} src={add_btn}/>*/}
                {/*            </span>*/}
                {/*        </button>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
            <div className="dashboard-section">
                <div className="cards-hld">
                    {
                        !success ? "loading..." : !dataNotFound ?
                            data.map((d, index) => {
                                return (
                                    <UserBotsCardItem
                                        onDelete={(obj) => {
                                            setInit({
                                                ...init,
                                                isConfirm: true,
                                                isUpdatedList: true,
                                                confirmationTxt: `You're about to delete booking bot.`,
                                                confirmationInfo: ["The bot can not be retrieved once deleted.", "However, you can still access your chat history with the bot."],
                                                currentObject: obj
                                            })
                                        }}
                                        dashboard={dashboard}
                                        key={index}
                                        data={d}
                                    />
                                )
                            })
                            :
                            <div className="data-not-found">No Data Found</div>
                    }

                    {/*<NavLink to={STRINGS.ROUTES.BWS} className="card">*/}
                    {/*    <div className="card-content">*/}
                    {/*        <div className="card-start">*/}
                    {/*            <div className="card-circle">*/}
                    {/*                <img*/}
                    {/*                    alt={"#"}*/}
                    {/*                    src={robotic_icon}*/}
                    {/*                />*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*        <div className="card-center">*/}
                    {/*            <div className="txt">Domino's Pizza</div>*/}
                    {/*            <div className="sub-txt">+92 300 1234567</div>*/}
                    {/*        </div>*/}
                    {/*        <div className="card-ends">*/}
                    {/*            <div className="icon">*/}
                    {/*                <img alt={"#"} src={more_opt}/>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</NavLink>*/}
                    {/*<NavLink to={STRINGS.ROUTES.BWS} className="card">*/}
                    {/*    <div className="card-content">*/}
                    {/*        <div className="card-start">*/}
                    {/*            <div className="card-circle">*/}
                    {/*                <img*/}
                    {/*                    alt={"#"}*/}
                    {/*                    src={robotic_icon}*/}
                    {/*                />*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*        <div className="card-center">*/}
                    {/*            <div className="txt">Domino's Pizza</div>*/}
                    {/*            <div className="sub-txt">+92 300 1234567</div>*/}
                    {/*        </div>*/}
                    {/*        <div className="card-ends">*/}
                    {/*            <div className="icon">*/}
                    {/*                <img alt={"#"} src={more_opt}/>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</NavLink>*/}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;