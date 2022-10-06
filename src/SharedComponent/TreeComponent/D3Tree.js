import React, {useEffect, useState} from 'react';
import Tree from 'react-d3-tree';
import AddTriggerButton from "../Items/AddTriggerButton/addTriggerButton";
import {useDispatch, useSelector} from "react-redux";
import chat_icon from "../../assets/whatsapp-starter.svg";
import end_icon from "../../assets/flow-end.svg";
import {DeleteBotTrigger, openTriggerCard,} from "../AddTriggerComposer/slices/addTrigger.slice";
import TriggerCard from "./items/TriggerCard";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import $ from "jquery";

let orgChart2 = {};

const defaultState = {
    isConfirm: false,
    confirmationTxt: "",
    currentObject: {
        botId: 0,
        trigger: {},
        userId: 0
    }
}

const D3Tree = (props) => {
    let {data: {botId, userId}} = props;
    let {trigger} = useSelector(({Reducers}) => Reducers);
    const [init, setInit] = useState(defaultState);
    let {isConfirm, confirmationTxt, currentObject} = init;
    let dispatch = useDispatch();
    let {successList, triggersList, isUpdatedList, isZoomAble} = trigger;
    let [orgChart, setChart] = useState(orgChart2);

    const getMenus = (item) => {
        if (item.toTrigger !== null && item.toTrigger.menus.length > 0) {
            return {
                ...item,
                children: [...item.toTrigger.menus].map((i) => getMenus(i))
            }
        } else {
            return item;
        }

    }

    useEffect(() => {
        if (successList) {
            // console.log("triggersListObj___", triggersList)
           // console.log(triggersList)
            //console.log('dd')
            let normal = triggersList?.map((d) => {
                if (d.startTrigger) {
                    return {
                        ...d,
                        children: d?.menus.map((m) => getMenus(m))
                    }
                }
            })
            // console.log("triggersListObj>>___", normal[0])
            // console.log("triggersListObj>>___", {
            //     name: "Welcome",
            //     children: [...normal]
            // })
            setChart(normal.length > 0 ? {
                name: "Welcome",
                isGrandParent: true,
                children: [...normal]
            } : {
                name: "Welcome",
                isGrandParent: true,
                children: []
            });


        }

    }, [successList, triggersList])


    const renderForeignObjectNode = (props) => {
        let {nodeDatum, toggleNode, foreignObjectProps} = props;
        return (
            <g>

                {/* `foreignObject` requires width & height to be explicitly set. */}
                <foreignObject height="100%" {...foreignObjectProps}>
                    {/*<div className="tree-head">*/}
                    {/*    {nodeDatum.startTrigger && (*/}
                    {/*        <React.Fragment>*/}
                    {/*            <div className="start-icon">*/}
                    {/*                <img alt={"#"} src={chat_icon}/>*/}
                    {/*            </div>*/}
                    {/*            <AddTriggerButton addTrigger={() => {*/}
                    {/*                dispatch(openTriggerCard(true))*/}
                    {/*            }}/>*/}
                    {/*        </React.Fragment>*/}
                    {/*    )*/}
                    {/*    }*/}
                    {/*    {*/}
                    {/*        nodeDatum.startTrigger === undefined && triggersList.length === 0 && (*/}
                    {/*            <React.Fragment>*/}
                    {/*                <div className="start-icon">*/}
                    {/*                    <img alt={"#"} src={chat_icon}/>*/}
                    {/*                </div>*/}
                    {/*                <AddTriggerButton addTrigger={() => {*/}
                    {/*                    dispatch(openTriggerCard(true))*/}
                    {/*                }}/>*/}
                    {/*            </React.Fragment>*/}
                    {/*        )*/}
                    {/*    }*/}
                    {/*    {*/}
                    {/*        triggersList.length === 0 && (*/}
                    {/*            <div className="end-icon">*/}
                    {/*                <img alt={"#"} src={end_icon}/>*/}
                    {/*            </div>*/}
                    {/*        )*/}
                    {/*    }*/}
                    {/*    */}
                    {/*</div>*/}
                    {
                        nodeDatum.isGrandParent !== undefined &&
                        (<div className="tree-head">
                            <React.Fragment>
                                <div className="start-icon">
                                    <img alt={"#"} src={chat_icon}/>
                                </div>
                                <AddTriggerButton addTrigger={() => {
                                    dispatch(openTriggerCard({open: true, isChild: null, childBotId: null}))
                                }}/>
                            </React.Fragment>
                            {
                                triggersList.length === 0 && (
                                    <div className="end-icon">
                                        <img alt={"#"} src={end_icon}/>
                                    </div>
                                )
                            }
                            {/*{*/}
                            {/*    triggersList.length === 0 && (*/}
                            {/*        <div className="end-icon">*/}
                            {/*            <img alt={"#"} src={end_icon}/>*/}
                            {/*        </div>*/}
                            {/*    )*/}
                            {/*}*/}
                        </div>)
                    }
                    {
                        nodeDatum.startTrigger !== undefined && nodeDatum.startTrigger ? (
                            <TriggerCard
                                onDelete={(obj) => {
                                    setInit({
                                        ...init,
                                        isConfirm: true,
                                        confirmationTxt: "Are You Sure? You want to delete this card",
                                        currentObject: {
                                            botId: obj.botId,
                                            trigger: obj.currentObject,
                                            userId: obj.userId
                                        }
                                    })
                                }}
                                botId={botId}
                                userId={userId}
                                data={nodeDatum}
                            />
                        ) : nodeDatum.toTrigger !== null && nodeDatum.isGrandParent === undefined &&
                            (
                                <TriggerCard
                                    onDelete={(obj) => {
                                        setInit({
                                            ...init,
                                            isConfirm: true,
                                            confirmationTxt: "Are You Sure? You want to delete this card",
                                            currentObject: {
                                                botId: obj.botId,
                                                trigger: obj.currentObject,
                                                userId: obj.userId
                                            }
                                        })
                                    }}
                                    botId={botId}
                                    userId={userId}
                                    data={nodeDatum}
                                />
                            )

                    }
                    {
                        nodeDatum.toTrigger === undefined || nodeDatum.toTrigger === null &&
                        (<div className="tree-footer">
                            <React.Fragment>
                                <div className="start-icon">
                                    <img alt={"#"} src={chat_icon}/>
                                </div>
                                <AddTriggerButton addTrigger={() => {
                                    // dispatch(openUpdateTriggerCard({
                                    //     open: true,
                                    //     object: nodeDatum
                                    // }))
                                    console.log("adding__", {
                                        open: true,
                                        isChild: true,
                                        childBotId: nodeDatum.toTriggerId
                                    })
                                    dispatch(openTriggerCard({
                                        open: true,
                                        isChild: true,
                                        childBotId: nodeDatum.toTriggerId
                                    }))
                                }}/>
                                <div className="end-icon">
                                    <img alt={"#"} src={end_icon}/>
                                </div>
                            </React.Fragment>
                        </div>)
                    }
                </foreignObject>
            </g>
        )
    };

    const handleSubmitTrigger = () => {
        if (currentObject.botId !== 0 && !$.isEmptyObject(currentObject.trigger) && currentObject.userId !== 0) {
            dispatch(DeleteBotTrigger({
                botId: currentObject.botId,
                triggerId: currentObject.trigger.toTrigger !== undefined ? currentObject.trigger.toTriggerId : currentObject.trigger.id,
                userId: currentObject.userId
            }));
            setInit({
                ...init,
                isConfirm: false,
                confirmationTxt: "",
                currentObject: {
                    botId: 0,
                    trigger: {},
                    userId: 0
                }
            })
        }
    };
    const confirmClose = () => {
        setInit({
            ...init,
            isConfirm: false,
            confirmationTxt: "",
            currentObject: {
                botId: 0,
                trigger: {},
                userId: 0
            }
        })
    };

    const nodeSize = {x: 620, y: 350};
    const foreignObjectProps = {width: nodeSize.x, height: 700, x: -160, y: -135};

    return (
        <div className="d3tree-container" >
            <ConfirmModal
                visible={isConfirm}
                handleOk={handleSubmitTrigger}
                confirmLoading={false}
                modalText={confirmationTxt}
                handleCancel={confirmClose}
            />
            {isUpdatedList &&
            <Tree
                data={orgChart}
                
                nodeSize={nodeSize}
                depthFactor={0}
                zoom={0.4}
                scaleExtent={{max: 1, min: 0}}
                translate={{x: 700, y: 100}}
                zoomable={isZoomAble}
                separation={{nonSiblings: 1, siblings: 2}}
                renderCustomNodeElement={(rd3tProps) =>
                    renderForeignObjectNode({...rd3tProps, foreignObjectProps})
                }
                branchNodeClassName={"node-root"}
            />
            }
        </div>
    );
};

export default D3Tree;