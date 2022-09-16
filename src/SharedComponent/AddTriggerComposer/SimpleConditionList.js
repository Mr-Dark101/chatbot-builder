import React, {useEffect, useState} from 'react';
import trash_icon from "../../assets/Custom Size - 4/Icon metro-cancel.svg";
import delete_icon from "../../assets/Group 4968.svg";
import TextEditor from "../Items/ReactTextEditor/TextEditor";
import $ from "jquery";
import AudioPlayerDefault from "../AudioPlayer/audioPlayer";
import documentIcon from "../../assets/file.png";
import defaultImage from "../../assets/default_image.png";
import {EditOutlined, SyncOutlined} from "@ant-design/icons";
import {createGuid, getGeneratedId, STRINGS} from "../../utils/base";
import {useDispatch} from "react-redux";
import {Checkbox, FormControl, FormControlLabel, FormLabel, MenuItem, Radio, RadioGroup, Select} from '@mui/material';
import upload_icon from "../../assets/Icon metro-cloud-upload.svg";

import {
    onSuccessUpdateMenuText,
    resetTheUrls,
    UpdateTrigger,
    UpdateTriggerMenusText,
    uploadFile
} from "./slices/addTrigger.slice";
let updatedTriggers = [];
let counter = 0;
const SimpleConditionList = ({props,apiHandleCondition,dataIndex,apiData,updatedTriggersVal}) => {

    

    const defaultState = {
    isConfirm: false,
    isAlert: false,
    confirmationTxt: "",
    isText: true,
    isApi:false,
    isMedia: false,
    isLoopBack: false,
    updatePending: false,
    uploadFileResponse: true,
    template: false,
    openFallBackComposer: false,
    triggerOpt: "",
    triggerOptLabel:"",
    triggerOptApi: "",
    triggerOptResponse: "",
    optLoopBack:"",
    
    triggerValueName: "",
    uploadedFile: {},
    updateMenus: {
        selectedMenuId: null,
        text: "",
        name: "",
        label: "",
        api: "",
        responsee: "",
        loopback:"",
    },
    currentData: apiData,
    updateTriggerObject: {
        botId: 0,
        triggersList: [],
        userId: 0
    },
    values: [],
    descriptionType: "response"

}
const dispatch = useDispatch();
let {handleTriggerClose, currentBotData, trigger, getAllTypes} = props;
const [init, setInit] = useState(defaultState);
  let {isText,isApi, isMedia, isLoopBack, template, currentData, openFallBackComposer, triggerOpt, triggerValueName, values, descriptionType,
        isConfirm, confirmationTxt,isAlert,triggerOptApi,triggerOptResponse,optLoopBack,triggerOptLabel} = init;

 let {name, triggerMenus, description, fallBackResponse, caption, loopBackId, loopBackText, routToAgent, type,apiId,apiText,conditionLabel,conditionValue} = currentData;
const [isData] = useState(!$.isEmptyObject(trigger.currentTriggerData));
let {triggersList, currentTriggerData, isChild, childBotId, urls, isUpdatedList, menuTextUpdateSuccess,apiList} = trigger;
let {id, userId,published} = currentBotData;



const getContentByType = (data) => {
        if (data.loopBackTriggerId !== "") {
            // console.log("getContentByType", data?.loopBackText)
            // let str = $.parseHTML(data.loopBackText !== undefined && data.loopBackText.length > 0 ? data.loopBackText[0]: "");
            // $(`#${data.id}`).html(str);
            //
            // return (
            //     <div className="sub-txt" id={`${data.id}`}>
            //         {/*<iframe title='myFrame' className="iframeBody hide-scroll"*/}
            //         {/*        src={"data:text/html," + encodeURIComponent(data.response)}*/}
            //         {/*        style={{border: "none", outline: "none", width: "100", height: "100px"}}/>*/}
            //     </div>)

        } else {
            switch (data.type) {
                case "AUDIO":
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
                        </div>
                    );
                case "VIDEO":
                    return (
                        <div className="sub-img-tag">
                            {
                                data.urls.length > 0 && (
                                    data.urls.map((url) => {
                                        return (
                                            <section>
                                                <video src={url} autoPlay controls/>
                                            </section>
                                        )
                                    })
                                )
                            }
                        </div>
                    );
                case "DOCUMENT":
                    return (
                        <div className="sub-img-tag">
                            {/*data.url !== "" ? data.url : */}
                            {
                                data.urls.length > 0 && (
                                    data.urls.map((url) => {
                                        return (
                                            <div className="icon">
                                                <a download href={url}>
                                                    <img alt={"#"} src={documentIcon}/>
                                                </a>
                                            </div>
                                        )
                                    })
                                )
                            }

                        </div>
                    );
                case "IMAGE":
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
                        </div>
                    );
                default:
            }
        }

    }


const handleAddOptions = () => {
        if (triggerOpt !== "") {
            counter++;
            setInit({
                ...init,
                triggerOpt: "",
                currentData: {
                    ...init.currentData,
                    triggerMenus: [...init.currentData.triggerMenus, {
                        name: triggerOpt,
                        label:triggerOptLabel,
                        id: `b${id}_t${counter}${createGuid()}`,
                        api:triggerOptApi,
                        response:triggerOptResponse,
                        loopback:optLoopBack
                    }]
                }
            })
            
            

        } else {
            setInit({
                ...init,
                isAlert: true,
                confirmationTxt: "Please fill up the field"
            })
            // alert("Please fill up the field");
        }
    }
const handleFileUpload = (files, type) => {
        // console.log("dropArea", files)
        if (type === 1) {
            let all = [...files];
            all.forEach((file) => {
                let reader = new FileReader();
                reader.onloadend = () => {
                    $(".preview_img").remove();
                    let img = document.createElement('img');
                    img.src = reader.result;
                    img.className = "preview_img";
                    document.getElementById('drop-area').appendChild(img);
                    // console.log("uploadFile", all);
                    dispatch(uploadFile(file))
                }
                reader.readAsDataURL(file);
            });
        } else {
            if (files.target.files && files.target.files[0]) {
                // console.log("dropArea", files)
                let file = files.target.files[0];
                let reader = new FileReader();
                reader.onloadend = () => {
                    // $(".preview_img").remove();
                    // let img = document.createElement('img');
                    // img.src = reader.result;
                    // img.className = "preview_img"
                    // document.getElementById('drop-area').appendChild(img);
                    setInit({
                        ...init,
                        uploadFileResponse: false,
                    });
                    dispatch(uploadFile(file));
                }
                reader.readAsDataURL(file);
            }
        }


    }

const handleResponseSelect = (name) => {
        switch (name) {
            case "isText":
                setInit({
                    ...init,
                    isText: true,
                    isMedia: false,
                    isApi:false,
                    isLoopBack: false,
                    template: false,
                    currentData: {
                        ...init.currentData,
                        type: "TEXT",
                    }
                });
                // updatedTriggers = [];
                break;
            case "isMedia":
                setInit({
                    ...init,
                    isText: false,
                    isApi:false,
                    isMedia: true,
                    isLoopBack: false,
                    template: false,
                    currentData: {
                        ...init.currentData,
                        type: "",
                    }
                });
                // updatedTriggers = [];
                break;
            case "isApi":
                setInit({
                    ...init,
                    isText: false,
                    isMedia: false,
                    isApi:true,
                    isLoopBack: false,
                    template: false,
                    // currentData: {
                    //     ...init.currentData,
                    //     type: "",
                    // }
                });
                // updatedTriggers = [];
                break;
            case "isLoopBack":
                setInit({
                    ...init,
                    isText: false,
                    isApi:false,
                    isMedia: false,
                    isLoopBack: true,
                    template: false,
                    // currentData: {
                    //     ...init.currentData,
                    //     type: "",
                    // }
                });
                break;
            case "template":
                setInit({
                    ...init,
                    isText: false,
                    isApi:false,
                    isMedia: false,
                    isLoopBack: false,
                    template: true,
                    currentData: {
                        ...init.currentData,
                        type: "TEMPLATE",
                    }
                });
                // updatedTriggers = [];
                break;
            default :
                setInit({
                    ...init,
                    isText: true,
                    isApi:false,
                    isMedia: false,
                    isLoopBack: false,
                    template: false,
                });
        }
    }

    const handleTextAreaChange = (text, type) => {
        if (text !== "") {
            if (type === "fallBackResponse") {
                setInit({
                    ...init,
                    currentData: {
                        ...init.currentData,
                        fallBackResponse: text,
                    },
                    descriptionType: type
                })
            }
            if (type === "caption") {
                setInit({
                    ...init,
                    currentData: {
                        ...init.currentData,
                        caption: text,
                    },
                    descriptionType: type
                })
            }
            if (type === "response") {
                setInit({
                    ...init,
                    currentData: {
                        ...init.currentData,
                        description: text,
                    },
                    descriptionType: type
                })
            }
            if (type === "loopBackText") {
                setInit({
                    ...init,
                    currentData: {
                        ...init.currentData,
                        loopBackText: [text],
                    },
                    descriptionType: type
                })
            }
        }

       
    }

    const saveCondition = () => {


        apiHandleCondition(init.currentData,dataIndex)
    }

    return (
        <>
        <div style={{border:'1px solid #ccc',borderColor:'#000',width:'100%',borderWidth:1,padding:10,marginTop:10}}>
        <div className="row" >
            <div className="col-sm-6">Label
                

                <input className="inp" value={conditionLabel}
                                           placeholder="Label"
                                           


                                           onChange={(e) => {
                                                           setInit({
                                                               ...init,
                                                               currentData: {
                                                                   ...init.currentData,
                                                                   conditionLabel: e.target.value
                                                               }
                                                           })
                                                           e.preventDefault();
                                                       }}
                                    />
            </div>
            <div className="col-sm-6">Value
            

             <input className="inp" value={conditionValue}
                                           placeholder="Label"
                                            onChange={(e) => {
                                                           setInit({
                                                               ...init,
                                                               currentData: {
                                                                   ...init.currentData,
                                                                   conditionValue: e.target.value
                                                               }
                                                           })
                                                           e.preventDefault();
                                                       }}
                                    />
            </div>
        </div>



        <div className="row__">
                            
                        <div className="row__">
                           
                            

                            

                            <div className="add-btn">
                                 <button className="btn btn-danger" onClick={saveCondition}>
                                     Save Label
                                </button>
                            </div>
                        </div>


                       

        </div>
    </>
    );
};

export default SimpleConditionList;