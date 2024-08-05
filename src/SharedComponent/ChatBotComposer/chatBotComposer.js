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
import halfLogo from "../../assets/eocean-logo-half.png";

import {useDispatch} from "react-redux";

import {
    ApiOrder,
    ApiForm,
    ApiComplain,
    ApiComplainStatus,
    saveFormDB,
    saveComplainDB,
    ApiChatGpt,
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
    const [conditionType, setConditionType] = useState('C');
    const [apiData, setApiData] = useState([]);
    const [simpleValues, setSimpleValues] = useState([]);

    const [backMenuId, setBackMenuId] = useState('');
    const [botId, setBotId] = useState([]);
    const [botChildId, setBotChildId] = useState([]);


    const [formKey, setFormKey] = useState(0);
    const [formId, setFormId] = useState(0);
    const [formEndText, setFormEndText] = useState('');
    const [formData, setFormData] = useState([]);
    const [complainData, setComplainData] = useState([]);
    const [formDataSave, setFormDataSave] = useState([]);

    const [saveComplain, setSaveComplain] = useState({});
    const [customFieldKey, setCustomFieldKey] = useState(0);
    
    const [complainMenuId, setComplainMenuId] = useState(''); 
    

    //const formData = [{"label":"Name","type":"text","option":[]},{"label":"Father Name","type":"text","option":[]},{"label":"Gender","option":[{"key":"1","value":"Male"},{"key":"2","value":"Female"}],"type":"option"}];

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
                    setFormEndText(data[i].formEndText)


                    

                    if(data[i].triggerType == 'F'){
                       

                        const apiResponse = await FormApiData(data[i].form_id).then((rData) => {

                                return JSON.parse(rData.data.data.data.form_data);
                        });
                       

                         //trigger.name = data[i].name + '<br>' + data[i].formStartText;
                        setFormId(data[i].form_id)
                        setFormData(apiResponse);


                        trigger = startForm(data[i],apiResponse);
                        

                        
                       
                        
                    }

                    if(data[i].triggerType == 'Complain'){
                       debugger;
                        const complainMenu = [buildComplainMenu('Open Ticket','1','open-tiket'),buildComplainMenu('Ticket Status','2','tiket-status')]

                        trigger = {
                                id: createGuid(),
                                response: "Please type an option number of your desired service.",
                                type:"TEXT",
                                menus: complainMenu,
                             }


                            setComplainMenuId(data[i]);
                        // const apiResponse = await ComplainApiData().then((rData) => {
                        //         //console.log(rData.data.data)
                        //         return rData.data.data;
                        // });
                       

                         
                       
                        // setComplainData(apiResponse);


                        // trigger = startFormComplain(data[i],apiResponse);
                        

                        
                       
                        
                    }

                    


                    if(data[i].triggerType == 'ChatGPT'){
                       

                       
                            trigger = {
                                id: createGuid(),
                                response: data[i].formStartText,

                                type:"TEXT",
                                menus: [],
                             }

                           
                            
                       
                        
                    }


                    
                    

                    if(data[i].startTrigger){
                        setBackMenuId(data[i].id);
                        //setFormEndText(data[i].formEndText)
                    }
                    setConditionType(data[i].conditionType);
                    setSimpleValues(data[i].simpleValues);

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

                    
                   
                    if(triggerType == "ChatGPT"){

                           
                           
                            const backMenu = (currentBotData.type_id == 4) ? [buildCustomMenu('Main Menu','M',backMenuId)] : [];
                           
                            const apiResponse = await ChatGPTApiData(text).then((rData) => {
                                           

                                           if(rData.data){
                                                return rData.data.data.message;
                                            }
                                            return false;
                             });
                        
                                 trigger = {
                                            id: createGuid(),
                                            response: apiResponse,
                                            type:"TEXT",
                                            menus: backMenu,
                                         }

                            var dv = '';
                            if(currentBotData.type_id == 4){
                                 dv = !$.isEmptyObject(trigger) ? trigger.menus.length > 0 ? trigger.menus.map((d) => {
                                                            if (d.toTrigger !== null) {
                                                                return d.toTrigger
                                                            }
                                                        }).filter((d) => d !== undefined) : [loopBackTrigger] : []
                            }else{
                                dv = data[0];
                            }
                                  

                                  //const dv = [];
                                  
                                setInit({
                                            ...init,
                                            messages: !$.isEmptyObject(trigger) ? [...init.messages, {
                                                text: text,
                                                id: "me"
                                            }, trigger] : [...init.messages, {text: text, id: "me"}],
                                            data:dv
                                        });

                              
                                

                                // setInit({
                                //                 ...init,
                                //                     messages: !$.isEmptyObject(trigger) ? [...init.messages, {
                                //                         text: text,
                                //                         id: "me"
                                //                     }, trigger] : [...init.messages, {text: text, id: "me"}],
                                //                     data:  !$.isEmptyObject(trigger) ? trigger.menus.length > 0 ? trigger.menus.map((d) => {
                                //                             if (d.toTrigger !== null) {
                                //                                 return d.toTrigger
                                //                             }
                                //                         }).filter((d) => d !== undefined) : [loopBackTrigger] : []
                                //                 });
                                trigger = {};
                                // updatedTriggers = [];
                                msgArea.current.value = "";

                    }else{
                        
                            
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
                    }
                    
                            
                    
                    scrollOnMessage();
                }
                
            }
        } else {

           


            if(triggerType == 'ChatGPT'){

                
                //const backMenu = [buildCustomMenuBack('Back','99',backMenuId)]
                const backMenu = (currentBotData.type_id == 4) ? [buildCustomMenu('Main Menu','M',backMenuId)] : [];
               
                const apiResponse = await ChatGPTApiData(text).then((rData) => {
                               

                                if(rData.data){
                                    return rData.data.data.message;
                                }
                                return false;
                                
                 });
            
                     trigger = {
                                id: createGuid(),
                                response: apiResponse,
                                type:"TEXT",
                                menus: backMenu,
                             }

                    
                 var dv = ''
                 if(currentBotData.type_id == 4){

                         dv = !$.isEmptyObject(trigger) ? trigger.menus.length > 0 ? trigger.menus.map((d) => {
                           
                        if (d.toTrigger !== null) {
                            return d.toTrigger
                        }
                        }).filter((d) => d !== undefined) : [loopBackTrigger] : []
                 }else{
                         dv = [];
                 }
                       
                
                    

                             
                    setInit({
                                ...init,
                                messages: !$.isEmptyObject(trigger) ? [...init.messages, {
                                    text: text,
                                    id: "me"
                                }, trigger] : [...init.messages, {text: text, id: "me"}],
                                data:dv
                            });

                  
                    

                    // setInit({
                    //                 ...init,
                    //                     messages: !$.isEmptyObject(trigger) ? [...init.messages, {
                    //                         text: text,
                    //                         id: "me"
                    //                     }, trigger] : [...init.messages, {text: text, id: "me"}],
                    //                     data:  !$.isEmptyObject(trigger) ? trigger.menus.length > 0 ? trigger.menus.map((d) => {
                    //                             if (d.toTrigger !== null) {
                    //                                 return d.toTrigger
                    //                             }
                    //                         }).filter((d) => d !== undefined) : [loopBackTrigger] : []
                    //                 });
                    trigger = {};
                    // updatedTriggers = [];
                    msgArea.current.value = "";
                                    

                   
            }

           
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
                
                 if(triggerType == 'Complain'){


                     if(text == 1 && complainMenuId != '' && complainMenuId != 2){


                        const apiResponse = await ComplainApiData().then((rData) => {
                                //console.log(rData.data.data)
                                return rData.data.data;
                        });
                       

                         
                       
                        setComplainData(apiResponse);


                        trigger = startFormComplain(complainMenuId,apiResponse);

                        setInit({
                                    ...init,
                                        messages: !$.isEmptyObject(trigger) ? [...init.messages, {
                                            text: text,
                                            id: "me"
                                        }, trigger] : [...init.messages, {text: text, id: "me"}],
                                        data:  []
                                    });
                                 msgArea.current.value = "";

                                 setComplainMenuId('');
                                 scrollOnMessage();
                                 return false;
                     }

                     if(complainMenuId == 2){
                        const backMenu = [buildCustomMenu('Main Menu','M',backMenuId)]


                        const apiResponse = await ComplainApiStatus(text).then((rData) => {
                                //console.log(rData.data.data)
                                return rData.data.data.data;
                        });

                                trigger = {
                                    id: createGuid(),
                                    response: `${apiResponse}`,
                                    type:"TEXT",
                                    menus: backMenu,
                                 }
                        

                                


                                 setInit({
                                    ...init,
                                        messages: !$.isEmptyObject(trigger) ? [...init.messages, {
                                            text: text,
                                            id: "me"
                                        }, trigger] : [...init.messages, {text: text, id: "me"}],
                                        data:  !$.isEmptyObject(trigger) ? trigger.menus.length > 0 ? trigger.menus.map((d) => {
                                                if (d.toTrigger !== null) {
                                                    return d.toTrigger
                                                }
                                            }).filter((d) => d !== undefined) : [loopBackTrigger] : []
                                    });
                                    trigger = {};
                                    // updatedTriggers = [];
                                    msgArea.current.value = "";


                                 setComplainMenuId('');
                                 scrollOnMessage();
                                 return false;


                     }

                     if(text == 2 && complainMenuId != ''){


                        
                       

                         
                            trigger = {
                                    id: createGuid(),
                                    response: 'Please enter your Ticket #',
                                    type:"TEXT",
                                    menus: [],
                                 }
                        

                                setInit({
                                    ...init,
                                        messages: !$.isEmptyObject(trigger) ? [...init.messages, {
                                            text: text,
                                            id: "me"
                                        }, trigger] : [...init.messages, {text: text, id: "me"}],
                                        data:  []
                                    });
                                 msgArea.current.value = "";

                                 setComplainMenuId('2');
                                 scrollOnMessage();
                                 return false;
                     }

                      let childDataMain = "";
                      let botText = "";
                      if(botId && botId.length){
                        botText = botId.find(res=> res.view_id === Number(text));
                        if(botText) {
                            text = String(botText.id);
                        }
                        childDataMain = complainData.filter(rs => rs.parent_id == text);
                      } else {
                        if(botChildId && botChildId.length){
                            botText = botChildId.find(res=> res.view_id === Number(text));
                            if(botText) {
                                text = String(botText.id);
                            }
                            // childDataMain = complainData.filter(rs => rs.id == text);
                        }
                      }
                      
                      
                      if(childDataMain){
                        console.log(childDataMain)
                      }

                      const parentCustomField = complainData.filter(rs => rs.id == text)[0]?.custom_field;
                      
                      let formMenu = [];

                      if(childDataMain && childDataMain.length > 0){

                            setSaveComplain({

                                  parent_id:text
                              })
                                childDataMain.map((oo,i) => {
                                    setBotChildId((res)=>[...res,{
                                        view_id: oo.view_id,
                                        id: oo.id
                                    }]);

                                    formMenu.push(buildCustomMenu(oo.name,oo.view_id,oo.id))
                                }); 
                                formMenu.sort((a, b)=>{
                                    if(a.view_id < b.view_id){
                                        return -1;
                                    }
                                    if(a.view_id > b.view_id){
                                        return 1;
                                    }
                                    return 0;
                                })

                                trigger = {
                                    id: createGuid(),
                                    response: 'Please type an option number from the list below.',
                                    type:"TEXT",
                                    menus: formMenu,
                                 }


                                 setInit({
                                    ...init,
                                        messages: !$.isEmptyObject(trigger) ? [...init.messages, {
                                            text: botText.view_id,
                                            id: "me"
                                        }, trigger] : [...init.messages, {text: botText.view_id, id: "me"}],
                                        data:  []
                                    });
                                 msgArea.current.value = "";

                      }else{
                            
                            const cRs = complainData.filter(rs => rs.id == saveComplain.parent_id)[0];
                            const childData = complainData.filter(rs => rs.id == saveComplain.parent_id)[0]?.child;
                            
                            let customField = [];
                            if(customFieldKey == 0){
                                
                                 if(!childData){
                                    customField = parentCustomField;

                                    
                                 }else{
                                    customField = childData.filter(rs => rs.id == text)[0]?.custom_field;
                                 }
                                 

                                setSaveComplain(
                                        {
                                            ...saveComplain,
                                            child_id:text,
                                            data:[],

                                        }
                                    )
                            }else{
                                if(!childData){
                                    customField = complainData.filter(rs => rs.id == saveComplain.child_id)[0]?.custom_field;
                                    
                                }else{
                                    customField = childData.filter(rs => rs.id == saveComplain.child_id)[0]?.custom_field;
                                }
                                
                                setSaveComplain(
                                        {
                                            ...saveComplain,
                                            data:[...saveComplain.data,{value:text,name:customField[customFieldKey-1].name}]

                                        }
                                    )


                                 
                            }
                            
                            
                            if(!customField){
                                return false
                            }
                            if(customField.length != customFieldKey){
                            
                                        trigger = {
                                            id: createGuid(),
                                            response: 'Enter ' + customField[customFieldKey].name,

                                            type:"TEXT",
                                            menus: [],
                                         }


                                         setInit({
                                            ...init,
                                                messages: !$.isEmptyObject(trigger) ? [...init.messages, {
                                                    text: text,
                                                    id: "me"
                                                }, trigger] : [...init.messages, {text: text, id: "me"}],
                                                data:  []
                                            });
                                            //trigger = {};
                                            // updatedTriggers = [];
                                            msgArea.current.value = "";

                                   
                                        let newKey = Math.abs(customFieldKey) + 1;
                                        setCustomFieldKey(newKey)
                            }else{


                                    

                                    



                                 const preDataLast = {
                                    
                                    value:text,
                                    name: customField[customFieldKey - 1].name
                                }

                                //setFormDataSave([...formDataSave,preDataLast])

                                let ff = saveComplain.data;
                                ff.push(preDataLast)

                                 let sub_category_id = saveComplain.child_id;
                                 let category_id = saveComplain.child_id;

                                 // if(!saveComplain.parent_id){
                                 //     category_id = saveComplain.child_id
                                 //     sub_category_id = 0;
                                 // }

                                 const saveData = {category_id:category_id,sub_category_id:sub_category_id,data:ff,from:'0321'}
                                

                                 const complainRs = await saveComplainRs(saveData)

                                 

                                 const backMenu = [buildCustomMenu('Main Menu','M',backMenuId)]
                                    trigger = {
                                    id: createGuid(),
                                    response: "Your ticket has been created successfully. <br /><br />Your Ticket # " + complainRs.data.data.data,

                                    type:"TEXT",
                                    menus: backMenu,
                                 }


                                 setInit({
                                    ...init,
                                        messages: !$.isEmptyObject(trigger) ? [...init.messages, {
                                            text: text,
                                            id: "me"
                                        }, trigger] : [...init.messages, {text: text, id: "me"}],
                                        data:  !$.isEmptyObject(trigger) ? trigger.menus.length > 0 ? trigger.menus.map((d) => {
                                                if (d.toTrigger !== null) {
                                                    return d.toTrigger
                                                }
                                            }).filter((d) => d !== undefined) : [loopBackTrigger] : []
                                    });
                                    trigger = {};
                                    // updatedTriggers = [];
                                    msgArea.current.value = "";


                                    setCustomFieldKey(0)
                                    setSaveComplain({});



                            }

                      }
                      
                 }
                 if(triggerType == 'F'){

                        if(formKey > 0){
                             let saveText = text;
                             if(formData[formKey-1].type == 'option'){

                                saveText = formData[formKey-1].option.filter((d) => d.key == text)[0].value;
                             }
                             const preData = {
                                key: formData[formKey-1].label,
                                value:saveText
                            }
                            setFormDataSave([...formDataSave,preData])
                        }
                       
                    
                        if(formData.length != formKey){
                            let formMenu = [];
                            if(formData[formKey].type == 'option'){
                                formData[formKey].option.map((oo,i) => {

                                      formMenu.push(buildCustomMenu(oo.value,oo.key,oo.key))
                                }); 
                            }
                            trigger = {
                                    id: createGuid(),
                                    response: 'Enter ' + formData[formKey].label,

                                    type:"TEXT",
                                    menus: formMenu,
                                 }


                                 setInit({
                                    ...init,
                                        messages: !$.isEmptyObject(trigger) ? [...init.messages, {
                                            text: text,
                                            id: "me"
                                        }, trigger] : [...init.messages, {text: text, id: "me"}],
                                        data:  []
                                    });
                                    //trigger = {};
                                    // updatedTriggers = [];
                                    msgArea.current.value = "";

                           
                                let newKey = Math.abs(formKey) + 1;
                                setFormKey(newKey)
                           }else{



                                 let saveText = text;
                                 if(formData[formKey-1].type == 'option'){
                                    saveText = formData[formKey-1].option.filter((d) => d.key == text)[0].value;
                                 }
                                 const preDataLast = {
                                    key: formData[formKey-1].label,
                                    value:saveText
                                }

                                //setFormDataSave([...formDataSave,preDataLast])

                                let ff = formDataSave;
                                ff.push(preDataLast)


                                await saveForm(ff,'0321',formId)

                                // Form Completed

                               

                                    const backMenu = [buildCustomMenu('Main Menu','M',backMenuId)]
                                    trigger = {
                                    id: createGuid(),
                                    response: formEndText,

                                    type:"TEXT",
                                    menus: backMenu,
                                 }






                                 setInit({
                                    ...init,
                                        messages: !$.isEmptyObject(trigger) ? [...init.messages, {
                                            text: text,
                                            id: "me"
                                        }, trigger] : [...init.messages, {text: text, id: "me"}],
                                        data:  !$.isEmptyObject(trigger) ? trigger.menus.length > 0 ? trigger.menus.map((d) => {
                                                if (d.toTrigger !== null) {
                                                    return d.toTrigger
                                                }
                                            }).filter((d) => d !== undefined) : [loopBackTrigger] : []
                                    });
                                    trigger = {};
                                    // updatedTriggers = [];
                                    msgArea.current.value = "";

                                    setFormKey(0)
                                    setFormDataSave([]);


                           }
                           


                                
                                
                }
                           
                    

                setBotId([]);
                
            }
            
            
            scrollOnMessage();
        }

    }

    

    const startFormComplain = (data,xformdata) => {

        // const backMenu = [buildCustomMenu('Back','99',backMenuId)]
        trigger = {
            id: createGuid(),
            response: data.name + "<br/>What can we help you with<br />",

            type:"TEXT",
            menus: [],
        }

        const preMsg = data.name + "<br/>What can we help you with<br />";      
                       
                    
        setBotId([]);
        let formMenu = [];
            
        xformdata.map((oo,i) => {
            if(oo.parent_id == 0){
                const view_id = (oo.view_id)? oo.view_id : oo.id;
                setBotId((res)=>[...res,{
                    view_id: view_id,
                    id: oo.id
                }]);
                formMenu.push(buildCustomMenu(oo.name, view_id,oo.id))
                formMenu.sort((a, b)=>{
                    if(a.view_id < b.view_id){
                        return -1;
                    }
                    if(a.view_id > b.view_id){
                        return 1;
                    }
                    return 0;
                })
            }
        }); 
    
        trigger = {
            id: createGuid(),
            response: preMsg,
            // response: preMsg + 'Enter ' + xformdata[formKey].label,
            type:"TEXT",
            menus: formMenu,
        }               

        return trigger;

    }

    const startForm = (data,xformdata) => {

        // const backMenu = [buildCustomMenu('Back','99',backMenuId)]
        trigger = {
            id: createGuid(),
            response: data.name + '<br/>' + data.formStartText + "<br />Enter any key",

            type:"TEXT",
            menus: [],
         }

        const preMsg = data.name + '<br/>' + data.formStartText + "<br />";      
                       
        let formMenu = [];
        if(xformdata[formKey].type == 'option'){
            xformdata[formKey].option.map((oo,i) => {
                formMenu.push(buildCustomMenu(oo.value,oo.key,oo.key))
            }); 
        }
        trigger = {
            id: createGuid(),
            response: preMsg + 'Enter ' + xformdata[formKey].label,

            type:"TEXT",
            menus: formMenu,
        }

        let newKey = Math.abs(formKey) + 1;
        setFormKey(newKey)
                           
        return trigger;

    }
    const buildCustomMenu = (label,key,trigger_id) => {


        return {
            view_id: key,
            "id": createGuid(),
            "text": key + ' - ' +  label,
            "toTriggerId": createGuid(),
            "toTrigger": {
                "id": createGuid(),
                "name": 'Back',
                "values": [
                        key
                ],
                "fallBackResponse": "",
                "loopBackText": [
                    ""
                ],
                "loopBackTriggerId": trigger_id,
                "menus": [],
                "startTrigger": false,
                
                "type": "TEXT",
                "routeToAgent": false,
                "response": "",
                "urls": [],
                "caption": ""
            }
        }

    }



    const buildComplainMenu = (label,key,trigger_id) => {


         return {
                                                "id": createGuid(),
                                                "text": key + ' - ' +  label,
                                                "toTriggerId": createGuid(),
                                                "toTrigger": {
                                                    "id": createGuid(),
                                                    "name": 'Back',
                                                    "values": [
                                                         key
                                                    ],
                                                    "fallBackResponse": "",
                                                    "loopBackText": [
                                                        ""
                                                    ],
                                                    "loopBackTriggerId": trigger_id,
                                                    "menus": [],
                                                    "startTrigger": false,
                                                    
                                                    "type": "TEXT",
                                                    "routeToAgent": false,
                                                    "response": "",
                                                    "urls": [],
                                                    "caption": ""
                                                }
                                            }

    }


    const buildCustomMenuBack = (label,key,trigger_id) => {


         return {
                                                "id": createGuid(),
                                                "text": "M" + ' - ' + 'Main Menu',
                                                "toTriggerId": createGuid(),
                                                "toTrigger": {
                                                    "id": createGuid(),
                                                    "name": 'Back',
                                                    "values": [
                                                         'M'
                                                    ],
                                                    "fallBackResponse": "",
                                                    "loopBackText": [
                                                        ""
                                                    ],
                                                    "loopBackTriggerId": trigger_id,
                                                    "menus": [],
                                                    "startTrigger": false,
                                                    
                                                    "type": "TEXT",
                                                    "routeToAgent": false,
                                                    "response": "",
                                                    "urls": [],
                                                    "caption": ""
                                                }
                                            }

    }

    const buildMessage = (apiResponse,xparam) => {
        
        let buildData = [];

        const backMenu = [buildCustomMenuBack('Back','99',backMenuId)]
        
            
        
         apiData.map((rsData,index) =>{
                 
                const rs = rsData.dataValue;
             
               
               let cField = apiResponse.data.data.data[rs.conditionLabel];
               let resonseData = apiResponse.data.data.data
               if(Array.isArray(apiResponse.data.data.data)){
                     resonseData = apiResponse.data.data.data[0]
                     cField = resonseData[rs.conditionLabel];
               }

               let inner = rs.conditionLabel.split(".");
               if(inner.length == 1){
                    cField = resonseData[inner[0]];
                    
               }else{
                    if(resonseData[inner[0]]){
                        cField = resonseData[inner[0]][inner[1]];
                    }
                    
               }

                
                if(cField == rs.conditionValue && conditionType == 'C'){


                    


                    buildData.push({description:rs.description,conditionLabel:rs.conditionLabel,conditionValue:rs.conditionValue,triggerMenus:rs.triggerMenus,data:apiResponse.data.data.data})
                }

                
        })

        if(buildData.length == 0 && conditionType == 'C'){


            
                                trigger = {
                                    id: createGuid(),
                                    response: "No Response",

                                    type:"TEXT",
                                    menus: backMenu,
                                 }
                                return trigger;
        }

        let customDesc = '';

        if(conditionType == 'S' && triggerType == 'A'){
            
             if(Array.isArray(apiResponse.data.data.data)){
                 
                    apiResponse.data.data.data.map((mdata) => {


                            simpleValues.map((s,i) => {
                
              

                                customDesc = customDesc  + s.label + ":" + mdata[s.value] + '<br />';
                            
                            
                            })

                            customDesc = customDesc + '<br/><hr>'
                    })

             }else{


                simpleValues.map((s,i) => {
                
              

                    customDesc = customDesc  + s.label + ":" + apiResponse.data.data.data[s.value] + '<br />';
                
                
                })


             }   
             
             trigger = {
                                    id: createGuid(),
                                    response: customDesc,

                                    type:"TEXT",
                                    menus: backMenu,
                                 }
        }else{
            customDesc = buildData[0].description;

            trigger = {
                                    id: createGuid(),
                                    response: customDesc,

                                    type:"TEXT",
                                    menus: ApiMenu(buildData[0].triggerMenus,xparam),
                                 }
        }
        
        

                    
                    return trigger;

       
       
        
    }

    const ApiMenu = (apiResponse,xparam) => {
            let menu = [buildCustomMenuBack('Back','99',backMenuId)];

            const backMenu = [{
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
                                                    "loopBackTriggerId": backMenuId,
                                                    "menus": [],
                                                    "startTrigger": false,
                                                    
                                                    "type": "TEXT",
                                                    "routeToAgent": false,
                                                    "response": "",
                                                    "urls": [],
                                                    "caption": ""
                                                }
                                            }]
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
                                                    "menus": backMenu,
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
            
            
            

            return menu
    }

    const ApiData =  async (text,apiId) => {

        const apiReturn =  await dispatch(ApiOrder(text,apiId))
        return  apiReturn;

                
    }

    const saveForm =  async (data,mobile,form_id) => {

        const apiReturn =  await dispatch(saveFormDB(data,mobile,form_id))
        return  apiReturn;

                
    }


    const saveComplainRs = async (data) => {
        const apiReturn =  await dispatch(saveComplainDB(data))
        return  apiReturn;
    }
    

    const FormApiData =  async (form_id) => {

        const apiReturn =  await dispatch(ApiForm(form_id))
        return  apiReturn;

                
    }

    const ComplainApiData =  async () => {

        const apiReturn =  await dispatch(ApiComplain())
        return  apiReturn;

                
    }

    const ComplainApiStatus =  async (ticket_id) => {

        const apiReturn =  await dispatch(ApiComplainStatus(ticket_id))
        return  apiReturn;

                
    }

    const ChatGPTApiData =  async (text) => {

        const apiReturn =  await dispatch(ApiChatGpt(text))
        return  apiReturn;

                
    }

    const scrollOnMessage = () => {
        let container = $(".conversation-container")
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
                        <div className="sub-img-tag" style={{marginTop:'10px', padding:'10px'}}>
                            {
                                data.urls.length > 0 && (
                                    data.urls.map((url) => {
                                        return (
                                            <AudioPlayerDefault src={url} style={{marginBottom:'10px'}}/>
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
                        <div className="sub-img-tag" style={{marginTop:'10px', padding:'10px'}}>
                            {
                                data.urls.length > 0 && (
                                    data.urls.map((url) => {
                                        return (

                                            <section>
                                                <video src={url} controls style={{marginBottom:'10px'}}/>
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
                        <div className="sub-img-tag" style={{marginTop:'10px', padding:'10px'}}>
                            {/*data.url !== "" ? data.url : */}
                            <div className="icon">
                                {
                                    data.urls.length > 0 && (
                                        data.urls.map((url) => {
                                            return (
                                                <a download href={url}>
                                                    <img alt={"#"} src={documentIcon} style={{marginBottom:'10px'}}/>
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
                        <div className="sub-img-tag" style={{marginTop:'10px', padding:'10px'}}>
                            {/*data.url !== "" ? data.url : */}
                            {
                                data.urls.length > 0 && (
                                    data.urls.map((url) => {
                                        return (
                                            <img alt={"#"} src={url !== "" ? url : defaultImage} style={{marginBottom:'10px'}}/>
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
    <div class="bg-front">

        <div class="customabs_sec">
                                                                <IconButton onClick={() => onClose()}>
                                                                    <CancelIcon fontSize="large" style={{color: "black"}}/>
                                                                </IconButton>
                                                            </div>

         <div class="mobWraper">
            <div id="mockChat" class="mockchat">
              <div class="device">
                <div class="screen">
                    <div class="whatsapp-preview">
                      <div class="app1" style={{height:'100%'}} >
                        <div class="page">
                          <div class="marvel-device nexus5">
                            <div class="screen" style={{width:'100%',height:'100%'}} >

                            

                              <div class="screen-container">
                                <div class="chat-window" >
                                  <div class="chat-container">
                                    <div class="user-bar">
                                      <div class="user_topTxt">
                                            <div>
                                                <span class="time" >12:00</span>
                                            </div>
                                            <div>
                                            <span style={{fontSize:10,margin:'3px'}} ><i class="fas fa-signal"></i></span>
                                                <span style={{fontSize:10,margin:'3px'}}><i class="fas fa-wifi"></i></span>
                                            <span style={{fontSize:10,margin:'3px'}}><i class="fas fa-battery-full"></i></span>
                                            </div>
                                        </div>
                                      <div class="user_midBar">
                                          <div class="mob_topBar">
                                          <div class="avatar">
                                         
                                            <img src={halfLogo} class="img-fluid" alt="Avatar" />
                                          </div>
                                          <div class="name">
                                            <span>Chatbot</span>
                                            <span class="status">online</span>
                                          </div>
                                          
                                        </div>
                                        <div class="mob_topIcon">
                                            <span style={{margin:'0px 10px 0px 0px'}}><i class="fas fa-video"></i></span>
                                            <span><i class="fas fa-phone" style={{transform:'rotate(104deg)'}} ></i></span>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="conversation">
                                      <div class="conversation-container">
                                        <div class="messages sent" style={{wordBreak:'word-break',flexDirection:'column'}} >
                                          <div >
                                            
                                                <div className="chat-bot-container">
                                                            <div className="content-hld">

                                                            

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
                                                            </div>
                                                        </div>

                                                </div>

                                        </div>
                                      </div>
                                      <div class="mobBottom_sec">
                                        <div class="conversation-compose">
                                          <div class="emoji">
                                            <i class="far fa-smile"></i>
                                          </div>

                                            <div className="msg-send-composer">
                        
                                                <div className="txt-area">
                                                    <form className="" onSubmit={handleSubmit}>
                                                        <input className="input-msg" ref={msgArea} type="text" placeholder={"Type a message"}/>
                                                    </form>
                                                </div>
                        
                                            </div>

                                         
                                          <div class="photo">
                                            <i class="fas fa-camera"></i>
                                          </div>
                                          <button class="send">
                                            <div class="circle">
                                              <i class="fas fa-paper-plane"></i>
                                            </div>
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </div>

       
        </div>
    );
};

export default ChatBotComposer;