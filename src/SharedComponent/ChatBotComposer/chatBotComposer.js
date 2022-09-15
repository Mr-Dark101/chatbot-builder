import React, {Fragment, useEffect, useRef, useState} from 'react';
import Av from "../Avatar/avatar";
import {IconButton} from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import $ from "jquery";
import {useSelector} from "react-redux";
import {createGuid, currentTime} from "../../utils/base";
import AudioPlayerDefault from "../AudioPlayer/audioPlayer";
import documentIcon from "../../assets/file.png";
import defaultImage from "../../assets/default_image.png";
import {useDispatch} from "react-redux";

import {
    ApiOrder,
    
} from "./slices/chatBot.slice";

let defaultState = {
    messages: [],
    data: [],
    loopBackTrigger: {},
    selected_id: "",
    currentFallbackResponse: "",
}

let trigger = {};
let updatedTriggers = [];

const ChatBotComposer = ({onClose}) => {

    const [init, setInit] = useState(defaultState);
    const {trigger: {triggersList}, dashboard: {currentBotData}} = useSelector(({Reducers}) => Reducers)
    let {messages, data, loopBackTrigger} = init;
    const msgArea = useRef(null);
    const dispatch = useDispatch();
    const [apiId, setApiId] = useState(0);
    const [triggerType, setTriggerType] = useState('M');
    const [apiData, setApiData] = useState([]);
    const setMenus = (item) => {
        if (item.toTrigger !== null) {
            if (item.toTrigger.menus.length > 0) {
                updatedTriggers.push(
                    {
                        ...item.toTrigger,
                        menus: item.toTrigger.menus.length > 0 && item.toTrigger.menus.map((mn) => {
                            return {
                                "id": mn.id,
                                "text": mn.text,
                                "toTrigger": mn.toTrigger,
                                "toTriggerId": mn.toTriggerId
                            }
                        })
                    });
                item.toTrigger.menus.filter((m) => setMenus(m));
            } else {
                updatedTriggers.push(item.toTrigger);
            }
        }
    }

    useEffect(()=>{
        if(triggersList.length > 0){
           

            triggersList.map((tl) => {

                updatedTriggers.push({
                    ...tl,
                    menus: tl.menus.length > 0 && tl.menus.map((mn) => {
                        return {
                            "id": mn.id,
                            "text": mn.text,
                            "toTrigger": mn.toTrigger,
                            "toTriggerId": mn.toTriggerId
                        }
                    })
                });

                tl.menus.map((m) => {
                    setMenus(m)
                })
                return tl;
            });
        }

        return () => {
            updatedTriggers = []
        }
    },[])

    useEffect(() => {
        if (triggersList.length > 0) {
            if (messages.length === 0) {
                setInit({
                    ...init,
                    data: triggersList
                });
            } else {
                setInit({
                    ...init,
                    data: init.data
                })
            }
        }
    }, [triggersList, messages]);


    // const getChildren = (item, text) => {
    //     if (item.toTrigger !== null) {
    //         if (item.toTrigger.menus.length > 0) {
    //             if (item.toTrigger.values.map((a) => a.toLowerCase()).includes(text.toLowerCase())) {
    //                 trigger = item.toTrigger
    //             }
    //             if (item.toTrigger.menus.length > 0) {
    //                 item.toTrigger.menus.map((m) => getChildren(m, text))
    //             }
    //         }
    //     }
    // }
    const handleSubmit = async (e) => {
        e.preventDefault();
        let text = msgArea.current.value;
        
        if (data.length > 0) {
            for (let i = 0; i < data.length; i++) {
                if (data[i].values.map((a) => a.toLowerCase()).includes(text.toLowerCase())) {
                    
                    trigger = data[i];
                    
                    setApiId(data[i].api_id)
                    setTriggerType(data[i].triggerType);
                    setApiData(data[i].apiData);
                    
                    console.log(trigger)

                    if(trigger.xapi > 0){

                        const apiResponse = await ApiData(trigger.xparam,trigger.xapi).then((rData) => {

                                return rData;
                        });
                    }
                    
                  
                    let currentLoopBackPreview = updatedTriggers.filter((fl) => fl.id === trigger.loopBackTriggerId && trigger.loopBackText.length === 1).length > 0 ? updatedTriggers.filter((fl) => fl.id === trigger.loopBackTriggerId)[0] : {}
                    if(!$.isEmptyObject(currentLoopBackPreview)){

                        setApiId(currentLoopBackPreview.api_id)
                        setApiData(currentLoopBackPreview.apiData);
                        setTriggerType(currentLoopBackPreview.triggerType)
                    }
                    // console.log("loopBackTrigger ^^",currentLoopBackPreview)
                    setInit({
                        ...init,
                        messages: !$.isEmptyObject(currentLoopBackPreview) ? [...init.messages, {
                            text: text,
                            id: "me"
                        }, currentLoopBackPreview] : !$.isEmptyObject(trigger) ? [...init.messages, {

                            text: text,
                            id: "me"
                        }, trigger] : [...init.messages, {text: text, id: "me"}],
                        data: !$.isEmptyObject(currentLoopBackPreview) ? currentLoopBackPreview.menus.length > 0 && currentLoopBackPreview.menus.map((d) => {
                            if (d.toTrigger !== null) {
                                return d.toTrigger
                            }
                        }).filter((d) => d !== undefined) : data[i].menus.map((d) => {
                            if (d.toTrigger !== null) {


                                return d.toTrigger
                            }
                        }).filter((d) => d !== undefined),
                        // loopBackTrigger: data[i].menus.length > 0 ? data[i].menus.map((d) => {
                        //     if (d.toTrigger === null) {
                        //         return data[i]
                        //     }
                        // }).filter((d) => d !== undefined)[0] : data[i],
                        loopBackTrigger: !$.isEmptyObject(currentLoopBackPreview) ? currentLoopBackPreview : {},
                        currentFallbackResponse: !$.isEmptyObject(currentLoopBackPreview) ? currentLoopBackPreview.fallBackResponse : data[i].fallBackResponse
                        
                    });
                    trigger = {};
                    // updatedTriggers = [];
                    msgArea.current.value = "";
                    scrollOnMessage();
                    break;
                } else {

                    // console.log("loopBackTrigger", data[i])
                   
                    
                    
                            trigger = {
                                ...data[i],
                                isFallBack: true,
                                fallBackResponse: i === 0 ? data[i].fallBackResponse === "" ? "No fall Back Response Found" : data[i].fallBackResponse :init.currentFallbackResponse === "" ? "No fall Back Response Found" : init.currentFallbackResponse
                            }
                            setInit({
                                ...init,
                                messages: !$.isEmptyObject(trigger) ? [...init.messages, {
                                    text: text,
                                    id: "me"
                                }, trigger] : [...init.messages, {text: text, id: "me"}],
                            });
                            trigger = {};
                            // updatedTriggers = [];
                            msgArea.current.value = "";
                    
                            
                    
                    scrollOnMessage();
                }
                
            }
        } else {
            if(Object.keys(loopBackTrigger).length > 0){



                if(triggerType == 'A'){
                        const apiResponse = await ApiData(text,apiId).then((rData) => {

                                return rData;
                        });



                                 trigger = buildMessage(apiResponse);


                                 if(trigger){


                                     setInit({
                                    ...init,
                                        messages: !$.isEmptyObject(trigger) ? [...init.messages, {
                                            text: text,
                                            id: "me"
                                        }, trigger] : [...init.messages, {text: text, id: "me"}],
                                        data: !$.isEmptyObject(trigger) ? trigger.menus.length > 0 ? trigger.menus.map((d) => {
                                                if (d.toTrigger !== null) {

                                                    return d.toTrigger
                                                }
                                            }).filter((d) => d !== undefined) : [loopBackTrigger] : []
                                    });
                                    trigger = {};
                                    // updatedTriggers = [];
                                    msgArea.current.value = "";
                                 }

               }else{

                        trigger = {
                    id: createGuid(),
                    response: "End",
                    type:"TEXT"
                }
                trigger = loopBackTrigger
                setInit({
                    ...init,
                    messages: !$.isEmptyObject(trigger) ? [...init.messages, {
                        text: text,
                        id: "me"
                    }, trigger] : [...init.messages, {text: text, id: "me"}],
                    // data: triggersList
                    data: !$.isEmptyObject(loopBackTrigger) ? loopBackTrigger.menus.length > 0 ? loopBackTrigger.menus.map((d) => {
                        if (d.toTrigger !== null) {


                            return d.toTrigger
                        }
                    }).filter((d) => d !== undefined) : [loopBackTrigger] : []
                });
                trigger = {};
                // updatedTriggers = [];
                msgArea.current.value = "";
               }
                 

                 
            }else{
                
                
               if(triggerType == 'A'){
                        const apiResponse = await ApiData(text,apiId).then((rData) => {

                                return rData;
                        });



                                 trigger = buildMessage(apiResponse,text);


                                 if(trigger){


                                     setInit({
                                    ...init,
                                        messages: !$.isEmptyObject(trigger) ? [...init.messages, {
                                            text: text,
                                            id: "me"
                                        }, trigger] : [...init.messages, {text: text, id: "me"}],
                                        data: !$.isEmptyObject(trigger) ? trigger.menus.length > 0 ? trigger.menus.map((d) => {
                                                if (d.toTrigger !== null) {
                                                    return d.toTrigger
                                                }
                                            }).filter((d) => d !== undefined) : [loopBackTrigger] : []
                                    });
                                    trigger = {};
                                    // updatedTriggers = [];
                                    msgArea.current.value = "";
                                 }

               }
                
                
                
                           
                    

                
                
            }
            
            
            scrollOnMessage();
        }

    }

    const buildMessage = (apiResponse,xparam) => {

        let buildData = [];

         apiData.map((rsData,index) =>{
                const rs = rsData.dataValue;
               
                const cField = apiResponse.data.data.data[rs.conditionLabel];
                if(cField == rs.conditionValue){


                    


                    buildData.push({description:rs.description,conditionLabel:rs.conditionLabel,conditionValue:rs.conditionValue,triggerMenus:rs.triggerMenus})
                }

                
        })

        if(buildData.length == 0){
            trigger = {
                                    id: createGuid(),
                                    response: "No Response",

                                    type:"TEXT",
                                    menus: [],
                                 }
                                return trigger;
        }
        trigger = {
                                    id: createGuid(),
                                    response: buildData[0].description,

                                    type:"TEXT",
                                    menus: ApiMenu(buildData[0].triggerMenus,xparam),
                                 }
                    return trigger;

       
       
        
    }

    const ApiMenu = (apiResponse,xparam) => {
            let menu = [];

            const backMenu = {
                                                "id": createGuid(),
                                                "text": '99 - Back',
                                                "toTriggerId": createGuid(),
                                                "toTrigger": {
                                                    "id": createGuid(),
                                                    "name": 'Back',
                                                    "values": [
                                                        '99'
                                                    ],
                                                    "fallBackResponse": "",
                                                    "loopBackText": [
                                                        ""
                                                    ],
                                                    "loopBackTriggerId": 'optLoopBack',
                                                    "menus": [],
                                                    "startTrigger": false,
                                                    
                                                    "type": "TEXT",
                                                    "routeToAgent": false,
                                                    "response": "",
                                                    "urls": [],
                                                    "caption": ""
                                                }
                                            }
            apiResponse.map(async (mm,index) => {
                    let optLoopBack = ""
                    if(mm.api == 0){
                        optLoopBack = mm.loopback;

                    }
                    // if(mm.api > 0){

                    //     const apiReturn =  await dispatch(ApiOrder(xparam,mm.api))
                    //     return  apiReturn;
                    // }
                    menu.push({
                                                "id": createGuid(),
                                                "text": mm.name + " - " + mm.label,
                                                "toTriggerId": createGuid(),
                                                "toTrigger": {
                                                    "id": createGuid(),
                                                    "name": mm.name,
                                                    "values": [
                                                        mm.name
                                                    ],
                                                    "fallBackResponse": "",
                                                    "loopBackText": [
                                                        ""
                                                    ],
                                                    "loopBackTriggerId": optLoopBack,
                                                    "menus": [],
                                                    "startTrigger": false,
                                                    'xparam':xparam,
                                                    'xapi': mm.api,
                                                    "type": "TEXT",
                                                    "routeToAgent": false,
                                                    "response": mm.response,
                                                    "urls": [],
                                                    "caption": ""
                                                }
                                            })
            })
            //console.log(apiData)
            
            menu.push(backMenu)

            return menu
    }

    const ApiData =  async (text,apiId) => {

        const apiReturn =  await dispatch(ApiOrder(text,apiId))
        return  apiReturn;

                
    }
    const scrollOnMessage = () => {
        let container = $(".chat-body")
        container.animate({
            scrollTop: container.offset().top + (container.scrollTop() + 300)
        }, 300)
    }

    const getContentByType = (data, index) => {
        if (data.isFallBack !== undefined) {
            let str = $.parseHTML(data.fallBackResponse)
            $(`#${data.id}--${index}`).html(str);
            return (
                <div className="sub-txt" id={`${data.id}--${index}`}/>
            );
        } else {
            switch (data.type) {
                case "TEXT":
                    let str = $.parseHTML(data.response)
                    $(`#${data.id}--${index}`).html(str);

                    return (
                        <div className="sub-txt" id={`${data.id}--${index}`}/>
                    );
                case "TEMPLATE":
                    let temp = $.parseHTML(data.templatename)
                    $(`#${data.id}---temp-${index}`).html(temp);
                    return (
                        <div className="sub-txt" id={`${data.id}---temp-${index}`}/>
                    );
                case "AUDIO":
                    let audCaption = $.parseHTML(data.caption)
                    $(`#${data.id}---audCaption-${index}`).html(audCaption);
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
                            <div className="caption-text" id={`${data.id}---audCaption-${index}`}/>
                        </div>
                    );
                case "VIDEO":
                    let vidCaption = $.parseHTML(data.caption)
                    $(`#${data.id}---vidCaption-${index}`).html(vidCaption);
                    return (
                        <div className="sub-img-tag">
                            {
                                data.urls.length > 0 && (
                                    data.urls.map((url) => {
                                        return (

                                            <section>
                                                <video src={url} controls/>
                                            </section>
                                        )
                                    })
                                )
                            }

                            <div className="caption-text" id={`${data.id}---vidCaption-${index}`}/>
                        </div>
                    );
                case "DOCUMENT":
                    let docCaption = $.parseHTML(data.caption)
                    $(`#${data.id}---docCaption-${index}`).html(docCaption);
                    return (
                        <div className="sub-img-tag">
                            {/*data.url !== "" ? data.url : */}
                            <div className="icon">
                                {
                                    data.urls.length > 0 && (
                                        data.urls.map((url) => {
                                            return (
                                                <a download href={url}>
                                                    <img alt={"#"} src={documentIcon}/>
                                                </a>
                                            )
                                        })
                                    )
                                }

                            </div>
                            <div className="caption-text" id={`${data.id}---docCaption-${index}`}/>
                        </div>
                    );
                case "IMAGE":
                    let cap = $.parseHTML(data.caption)
                    $(`#${data.id}--In${index}`).html(cap);
                    return (
                        <div className="sub-img-tag">
                            {/*data.url !== "" ? data.url : */}
                            {
                                data.urls.length > 0 && (
                                    data.urls.map((url) => {
                                        return (
                                            <img alt={"#"} src={url !== "" ? url : defaultImage}/>
                                        )
                                    })
                                )
                            }
                            <div className="caption-text" id={`${data.id}--In${index}`}/>
                        </div>
                    );
                default:
            }
        }
    }

    return (
        <div className="chat-bot-container">
            <div className="content-hld">
                <div className="head">
                    <div className="lft">
                        <div className="a-hld">
                            <div className="av">
                                <Av size={34}/>
                            </div>
                            <div className="a-sec">
                                <div className="txt">
                                    {currentBotData !== null && currentBotData.name}
                                </div>
                                <div className="sub-txt">
                                    online
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="rt">
                        <div className="cl">
                            <IconButton onClick={() => onClose()}>
                                <CancelIcon style={{color: "white"}}/>
                            </IconButton>
                        </div>
                    </div>
                </div>
                <div className="section">
                    <div className="chat-body hide-scroll">
                        {
                            messages.length > 0 ? (
                                messages.map((m, index) => {
                                    return (
                                        m.id === "me" ?
                                            <div className="msg-row me">
                                                <div className="msg-box me">
                                                    <div className="msg">{m.text}</div>
                                                    <div className="sub-text">
                                                        {currentTime(new Date())}
                                                    </div>
                                                </div>
                                            </div> :
                                            (
                                                <div className="msg-row">
                                                    <div className="msg-box frm">
                                                        <div className="msg">
                                                            {m.isFallBack === undefined && m.name}
                                                            {getContentByType(m, index)}
                                                        </div>
                                                        <div className="opt-hld">
                                                            {m.isFallBack === undefined &&
                                                            m.menus?.map((menu) => {
                                                                return (
                                                                    <Fragment>
                                                                        <button
                                                                            key={menu.toTriggerId}
                                                                            className="btn light-filled">{menu.text}
                                                                        </button>
                                                                    </Fragment>
                                                                )
                                                            })
                                                            }
                                                        </div>
                                                        <div className="sub-text">
                                                            {currentTime(new Date())}
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                    )
                                })
                            ) : <div className="no-data-found">No Data Found</div>
                        }
                    </div>
                </div>
                <div className="foot">
                    <div className="msg-send-composer">
                        {/*<div className="emo-hld">*/}
                        {/*    <img alt={"#"} src={emoji_icon}/>*/}
                        {/*</div>*/}
                        <div className="txt-area">
                            <form className="" onSubmit={handleSubmit}>
                                <input className="inp" ref={msgArea} type="text" placeholder={"Type a message"}/>
                            </form>
                        </div>
                        {/*<div className="attachments">*/}
                        {/*    <div className="icon">*/}
                        {/*        <img alt={"#"} src={attach_icon}/>*/}
                        {/*    </div>*/}
                        {/*    <div className="icon">*/}
                        {/*        <img alt={"#"} src={cam_icon}/>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatBotComposer;