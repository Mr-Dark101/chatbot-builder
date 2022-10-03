import React, {useEffect, useState} from 'react';
import back_icon from "../../assets/back-icon.svg";
import draft_icon from "../../assets/draft.png";
import {STRINGS} from "../../utils/base";
import AddTriggerComposer from "../../SharedComponent/AddTriggerComposer/addTriggerComposer";
import {useDispatch, useSelector} from "react-redux";
import {PublishedBot, resetPublish} from "./slices/workSpace.slice";
import ChatBotComposer from "../../SharedComponent/ChatBotComposer/chatBotComposer";
import {removingBreadcrumb, resetState, SetCurrentBotUpdateData} from "../Dashboard/slices/dashboard.slice";
import {useHistory} from "react-router-dom";
import D3Tree from "../../SharedComponent/TreeComponent/D3Tree";
import {
    getBotTriggersRecursive,
    openTriggerCard,
    resetTheUrls
} from "../../SharedComponent/AddTriggerComposer/slices/addTrigger.slice";
import {Drawer} from "@mui/material";
import AlertModal from "../../SharedComponent/ConfirmModal/AlertModal";
// import TreeComponent from "../../SharedComponent/TreeComponent/treeComponent";

const defaultState = {
    isAlert: false,
    openComposer: false,
    openChatBot: false,
    data: [],
    getAllTypes: [],
    currentTriggerData: {},
    isUpdatedList: false,
    confirmationTxt: "",
    confirmationInfo: [],
}

const BuildWorkSpace = () => {
    const {dashboard, workSpace, trigger} = useSelector(({Reducers}) => Reducers);
    
    
    const dispatch = useDispatch();
    const history = useHistory();
    const [init, setInit] = useState(defaultState);
    let {currentTriggerData, openChatBot, getAllTypes, isAlert, isUpdatedList, confirmationTxt, confirmationInfo} = init;
    let {currentBotData} = dashboard;
    let {success, isPublishSuccess, message_, dataNotFound} = workSpace;
    let {name, phoneNumber, id, userId, published} = currentBotData !== null && currentBotData;


    useEffect(() => {
        if (dataNotFound) {
            // alert(message)
            setInit({
                ...init,
                isAlert: true,
                isUpdatedList: true,
                confirmationTxt: "Your limit has been reached",
            })
        }

        if (trigger.success) {
            // alert(trigger.message)
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
                getAllTypes: trigger.getAllTypes
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

    }, [dataNotFound, message_, success,
        trigger.success,
        trigger.message,
        trigger.dataNotFound,
        trigger.currentTriggerData,
        trigger.triggersList]);

    useEffect(() => {
        if (isPublishSuccess) {
            // alert(message_)
            setInit({
                ...init,
                isAlert: true,
                isUpdatedList: true,
                confirmationTxt: message_,
            });
            dispatch(SetCurrentBotUpdateData({
                ...currentBotData,
                published: !published
            }))
            dispatch(resetPublish());
        }
    }, [isPublishSuccess,published])

    const handlePublishBot = (obj) => {
        dispatch(PublishedBot(obj))
    }

    const alertClose = () => {
        setInit({
            ...init,
            isAlert: false,
            isUpdatedList: true,
            confirmationTxt: "",
        })
    }
    // const handleOpenAddTrigger = () => {
    //     setInit({
    //         ...init,
    //         openComposer: true
    //     });
    // }
    const handleCloseAddTrigger = () => {
        dispatch(openTriggerCard({open: false, isChild: null, childBotId: null}));
        dispatch(getBotTriggersRecursive(id));
        dispatch(resetTheUrls());
        // setInit({
        //     ...init,
        //     openComposer: false
        // });
    }
    const handleSubmitTrigger = (obj) => {
        // console.log("handleSubmitTrigger", obj)
        setInit({
            ...init,
            data: [...init.data, ...obj.triggersList],
            openComposer: false
        })
    }

    const handleCurrentTriggerData = (data) => {
        setInit({
            ...init,
            openComposer: true,
            currentTriggerData: {
                name: data.text,
                id: data.toTriggerId,
                menuId: data.id,
                startTrigger: false
            }
        })
    }

    const handleBack = () => {
        history.push(`${STRINGS.ROUTES.ROOT}?org=${localStorage.getItem("userId")}`);
        dispatch(resetState());
        dispatch(removingBreadcrumb())
    }

    return (
        <div className="ws-hld">
            <div className="head">
                <AlertModal
                    visible={isAlert}
                    handleOk={alertClose}
                    confirmLoading={!isUpdatedList}
                    modalText={confirmationTxt}
                    modalInfo={confirmationInfo}
                    handleCancel={alertClose}
                />
                <div className="head-rt">
                    <div onClick={handleBack} className="icon">
                        <img alt={"#"} src={back_icon}/>
                    </div>
                    <div className="txt">
                        Builder Workspace
                    </div>
                </div>
                <div className="head-center">
                    <div className="txt">
                        {name} -
                        <span> {phoneNumber} </span>
                    </div>
                    <div className="icon">
                        <img alt={"#"} src={draft_icon} height={24} width={48}/>
                    </div>
                </div>
                <div className="head-lft">
                    <div className="btn-hld">
                        <button className="btn-outlined" onClick={() => setInit({
                            ...init,
                            openChatBot: !openChatBot
                        })}>
                            TEST
                        </button>

                        <button className="btn-filled"
                                onClick={() => {
                                    if (!published) {
                                        handlePublishBot({botId: id, isPublished: !published, userId})
                                    }
                                }}>
                            {!published ? "PUBLISH" : "PUBLISHED"}
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

                <D3Tree getAllTypes={getAllTypes} data={{botId: id, userId: userId}}/>


                {
                    trigger.openAddBot && (
                        <Drawer
                            anchor={"right"}
                            open={trigger.openAddBot}
                            onClose={handleCloseAddTrigger}
                        >
                            <div className="composer-hld">
                                <AddTriggerComposer
                                    trigger={trigger}
                                    getAllTypes={getAllTypes}
                                    currentBotData={currentBotData}
                                    data={currentTriggerData}
                                    handleTriggerClose={handleCloseAddTrigger}
                                    submitTrigger={handleSubmitTrigger}
                                />
                            </div>
                        </Drawer>
                    )
                }

                {
                    openChatBot &&
                    <ChatBotComposer onClose={() => setInit({
                        ...init,
                        openChatBot: false
                    })}/>
                }
            </div>
            {/*    </TransformComponent>*/}
            {/*</TransformWrapper>*/}
        </div>
    );
};

export default BuildWorkSpace;