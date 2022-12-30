import React from 'react';
import MenusComponent from "../../Menus";
import {isZoomD3, openUpdateTriggerCard} from "../../AddTriggerComposer/slices/addTrigger.slice";
import {useDispatch, useSelector} from "react-redux";
import defaultImage from "../../../assets/default_image.png";
import documentIcon from "../../../assets/file.png";
import AudioPlayerDefault from "../../AudioPlayer/audioPlayer";
import $ from "jquery";

const menusOptions = [{text: "Update", value: 1}, {text: "Delete", value: 2}]

const TriggerCard = (props) => {
    let {data, botId, userId, onDelete} = props;
    let {name, response, startTrigger, toTrigger, menus, routeToAgent} = data;

    const {trigger} = useSelector(({Reducers}) => Reducers);
    let {isZoomAble} = trigger;
    let dispatch = useDispatch();

    const handleMenuSelect = (value, obj) => {
       
        switch (value) {
            case 1:
                dispatch(openUpdateTriggerCard({open: true, object: obj}))
                break;
            case 2:
                //handleDelete({botId: id})
                // dispatch(DeleteBotTrigger({
                //     botId: botId,
                //     triggerId: obj.toTrigger !== undefined ? obj.toTriggerId : obj.id,
                //     userId: userId
                // }));
                onDelete({
                    botId: botId,
                    currentObject: obj,
                    userId: userId
                })
                break;
            default :
                return;
        }
    }

    const getContentByType = (data) => {
        // if (data.loopBackTriggerId !== "") {
        //     let str = $.parseHTML(data.loopBackText !== undefined && data.loopBackText.length > 0 ? data.loopBackText[0]: "");
        //     $(`#${data.id}`).html(str);
        //
        //     return (
        //         <div className="sub-txt" id={`${data.id}`}>
        //             {/*<iframe title='myFrame' className="iframeBody hide-scroll"*/}
        //             {/*        src={"data:text/html," + encodeURIComponent(data.response)}*/}
        //             {/*        style={{border: "none", outline: "none", width: "100", height: "100px"}}/>*/}
        //         </div>)
        //
        // } else {
        switch (data.type) {
            case "TEXT":
                let str = $.parseHTML(data.response)
                $(`#${data.id}--Text`).html(str);

                return (
                    <div className="sub-txt" id={`${data.id}--Text`}>
                        {/*<iframe title='myFrame' className="iframeBody hide-scroll"*/}
                        {/*        src={"data:text/html," + encodeURIComponent(data.response)}*/}
                        {/*        style={{border: "none", outline: "none", width: "100", height: "100px"}}/>*/}
                    </div>
                );
            case "TEMPLATE":
                let temp = $.parseHTML(data.templatename)
                $(`#${data.id}--temp`).html(temp);
                return (
                    <div className="sub-txt" id={`${data.id}--temp`}/>
                );
            case "AUDIO":
                let audCaption = $.parseHTML(data.caption)
                $(`#${data.id}--audCaption`).html(audCaption);
                return (
                    <div className="sub-img-tag">
                        {
                            data.urls.length > 0 && (
                                data.urls.map((url) => {
                                    return (
                                        <AudioPlayerDefault src={url}/>
                                    )
                                })
                            )
                        }
                        <div className="caption-text" id={`${data.id}--audCaption`}/>
                    </div>
                );
            case "VIDEO":
                let vidCaption = $.parseHTML(data.caption)
                $(`#${data.id}--vidCaption`).html(vidCaption);
                return (
                    <div className="sub-img-tag">
                        {
                            data.urls.length > 0 && (
                                data.urls.map((url) => {
                                    return (
                                        <section style={{margin:"0.5rem 0"}}>
                                            <video src={url} controls/>
                                        </section>
                                    )
                                })
                            )
                        }
                        <div className="caption-text" id={`${data.id}--vidCaption`}/>
                    </div>
                );
            case "DOCUMENT":
                let docCaption = $.parseHTML(data.caption)
                $(`#${data.id}--docCaption`).html(docCaption);
                return (
                    <div className="sub-img-tag">
                        {/*data.url !== "" ? data.url : */}

                        {
                            data.urls.length > 0 && (
                                data.urls.map((url) => {
                                    return (
                                        <div className="icon" style={{margin:"0.5rem 0"}}>
                                            <a download href={url}>
                                                <img alt={"#"} src={documentIcon}/>
                                            </a>
                                        </div>
                                    )
                                })
                            )
                        }

                        <div className="caption-text" id={`${data.id}--docCaption`}/>
                    </div>
                );
            case "IMAGE":
                let cap = $.parseHTML(data.caption)
                $(`#${data.id}--`).html(cap);
                return (
                    <div className="sub-img-tag">
                        {/*data.url !== "" ? data.url : */}
                        {
                            data.urls.length > 0 && (
                                data.urls.map((url) => {
                                    return (
                                        <img style={{margin:"0.5rem 0"}} alt={"#"} src={url !== "" ? url : defaultImage}/>
                                    )
                                })
                            )
                        }
                        <div className="caption-text" id={`${data.id}--`}/>
                    </div>
                );
            default:
        }
        // }

    }

    return (
        <div className={`card`}>
            <div className="card-start">
                <div className="txt">
                    {data.toTrigger !== undefined ? data.toTrigger.name : name}
                </div>
                <div className="icon">
                    <MenusComponent
                        options={menusOptions}
                        onSelect={(v) => handleMenuSelect(v, data)}
                    />
                </div>
            </div>
            <div className="card-center">
                {
                    getContentByType(data.toTrigger !== undefined ? data.toTrigger : data)
                }
                <div className="scroll-btn"
                     onClick={() => dispatch(isZoomD3(!isZoomAble))}
                >{!isZoomAble ? "De-active" : "Active"} scroll
                </div>
                <div className="card-center-footer">
                    {
                        toTrigger?.menus.length > 0 && (
                            <div className="txt">
                                Menu Option
                            </div>
                        )
                    }
                    <div className="btn-hld">

                        {
                            <React.Fragment>
                                {
                                    startTrigger ?
                                        menus?.map((op, index) => {
                                            return (
                                                <React.Fragment>
                                                    <div className="menus">
                                                        <button key={index}
                                                                className="btn-outline child-node hide-scroll">
                                                            {op.text}
                                                        </button>
                                                    </div>
                                                </React.Fragment>
                                            )
                                        })
                                        :
                                        toTrigger?.menus?.length > 0 && (
                                            toTrigger?.menus?.map((op, index) => {
                                                return (
                                                    <React.Fragment>
                                                        <div className="menus">
                                                            <button key={index}
                                                                    className="btn-outline child-node hide-scroll">
                                                                {op.text}
                                                            </button>
                                                        </div>
                                                    </React.Fragment>
                                                )
                                            })
                                        )
                                }

                            </React.Fragment>
                        }


                    </div>
                </div>

                {
                    routeToAgent &&
                    (<div className="footer-end">

                        <div className="txt">
                            {/*<AltRouteIcon*/}
                            {/*    fontSize={"small"}*/}
                            {/*    sx={{*/}
                            {/*        color: "#5841ce",*/}
                            {/*    }}*/}
                            {/*/>*/}
                            <span>Bot to Human Handover</span>
                        </div>

                    </div>)
                }

            </div>
        </div>
    );
};

export default TriggerCard;