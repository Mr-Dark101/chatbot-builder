import React, { useEffect, useState } from 'react';
import trash_icon from '../../../assets/Custom Size - 4/Icon metro-cancel.svg';
import edit_icon from '../../../assets/Custom Size - 4/edit.svg';
import delete_icon from '../../../assets/Group 4968.svg';
import upload_icon from '../../../assets/Icon metro-cloud-upload.svg';

import $ from 'jquery';
import { useDispatch } from 'react-redux';
import { createGuid, getGeneratedId, STRINGS } from '../../../utils/base';
import { onSuccessUpdateMenuText, resetTheUrls, UpdateTrigger, UpdateTriggerMenusText, uploadFile } from '../../../SharedComponent/AddTriggerComposer/slices/addTrigger.slice';
import { Checkbox, FormControl, FormControlLabel, FormLabel, MenuItem, Radio, RadioGroup, Select } from '@mui/material';
import TextEditor from '../../../SharedComponent/Items/ReactTextEditor/TextEditor';
import { EditOutlined, SyncOutlined } from '@ant-design/icons';
import AudioPlayerDefault from '../../../SharedComponent/AudioPlayer/audioPlayer';
import documentIcon from '../../../assets/file.png';
import defaultImage from '../../../assets/default_image.png';
import ConfirmModal from '../../../SharedComponent/ConfirmModal/ConfirmModal';
import AlertModal from '../../../SharedComponent/ConfirmModal/AlertModal';
import deleteIcon from '../../../assets/deleteicon.svg';
// import TriggerCard from "../TreeComponent/items/TriggerCard";
import ConditionList from './ConditionList';

const defaultState = {
   isConfirm: false,
   isAlert: false,
   confirmationTxt: '',
   isText: false,

   isMedia: false,
   isLoopBack: false,
   updatePending: false,
   uploadFileResponse: true,
   template: false,
   openFallBackComposer: false,
   triggerOpt: '',
   triggerValueName: '',
   simpleLabel: '',
   simpleValue: '',
   uploadedFile: {},
   updateMenus: {
      selectedMenuId: null,
      text: '',
   },
   currentData: {
      id: '',
      name: '',
      template: '',
      loopBackId: '',
      loopBackText: [''],
      apiId: '',
      apiText: [''],
      values: [],
      description: '',
      fallBackResponse: '',
      caption: '',
      urls: [],
      startTrigger: true,
      routToAgent: false,
      type: 'TEXT',
      triggerMenus: [],
   },
   updateTriggerObject: {
      botId: 0,
      triggersList: [],
      userId: 0,
   },
   values: [],
   simpleValues: [],
   descriptionType: 'response',
};

const menusIds = [];
const triggersIds = [];
let updatedTriggers = [];
let currentTriggerPreview = {};
let counter = 0;

let apiMenu = [];

const ByTypeComposer = ({ props, triggerType, apiHandleConditionMaster }) => {
   let { handleTriggerClose, currentBotData, trigger, getAllTypes } = props;

   const dispatch = useDispatch();
   const [init, setInit] = useState(defaultState);
   const [isData] = useState(!$.isEmptyObject(trigger.currentTriggerData));
   let { isText, isMedia, isLoopBack, template, currentData, openFallBackComposer, triggerOpt, triggerValueName, values, descriptionType, isConfirm, confirmationTxt, isAlert, simpleLabel, simpleValue, simpleValues } = init;
   let { name, triggerMenus, description, fallBackResponse, caption, loopBackId, loopBackText, routToAgent, type, apiId, apiText } = currentData;

   let { triggersList, currentTriggerData, isChild, childBotId, urls, isUpdatedList, menuTextUpdateSuccess, apiList, formList } = trigger;
   // console.log("setBotData",currentBotData)

   const [condition, setCondition] = useState([]);
   const [simpleCondition, setSimpleCondition] = useState([]);
   const [formData, setFormData] = useState([]);
   let conditionArray = [];
   const [apiData, setApiData] = useState([]);
   const setMenus = (item) => {
      if (item.toTrigger !== null) {
         if (item.toTrigger.menus.length > 0) {
            updatedTriggers.push({
               ...item.toTrigger,
               menus:
                  item.toTrigger.menus.length > 0 &&
                  item.toTrigger.menus.map((mn) => {
                     return {
                        id: mn.id,
                        text: mn.text,
                        toTrigger: mn.toTrigger,
                        toTriggerId: mn.toTriggerId,
                     };
                  }),
            });
            item.toTrigger.menus.filter((m) => setMenus(m));
         } else {
            updatedTriggers.push(item.toTrigger);
         }
      }
   };

   const [conditionType, setConditionType] = useState('C');

   const [btnConditionStyle, setBtnConditionStyle] = useState({ width: '100%' });
   const [btnSimpleStyle, setBtnSimpleStyle] = useState({ width: '100%' });

   const meClickCondition = (param) => {
      if (param == 'C') {
         setBtnConditionStyle({ backgroundColor: '#10163A', width: '100%', color: '#fff', borderRadius: '5px 5px 0px 0px' });
         setBtnSimpleStyle({ backgroundColor: '#fff', width: '100%', color: '#000', borderRadius: '5px 5px 0px 0px' });
      } else {
         setBtnConditionStyle({ backgroundColor: '#fff', width: '100%', color: '#000', borderRadius: '5px 5px 0px 0px' });
         setBtnSimpleStyle({ backgroundColor: '#10163A', width: '100%', color: '#fff', borderRadius: '5px 5px 0px 0px' });
      }
      setConditionType(param);
   };

   const apiHandle = (dataValue, dataIndex) => {
      setCondition((old) => {
         let _test = [...old];
         //const index = _test.findIndex((val) => val._id === dataIndex);
         //@ts-ignore
         _test[dataIndex].dataValue = dataValue;
         return _test;
      });

      setApiData(condition);

      const saveData = handleSubmitTrigger();

      apiHandleConditionMaster(conditionType, triggerType, saveData);
   };

   const saveSimpleResponse = () => {
      const saveData = handleSubmitTrigger();
      apiHandleConditionMaster(conditionType, triggerType, saveData);
   };

   const addCondition = () => {
      const newData = {
         api_id: 'not use',
         dataValue: {
            id: '',
            name: '',
            template: '',
            loopBackId: '',
            loopBackText: [''],
            apiId: '',
            apiText: [''],
            values: [],
            description: '',
            fallBackResponse: '',
            caption: '',
            urls: [],
            startTrigger: true,
            routToAgent: false,
            type: 'TEXT',
            triggerMenus: [],

            conditionLabel: '',
            conditionValue: '',
         },
      };
      //conditionArray.push(newData)
      setCondition([...condition, newData]);
   };

   const setApiMenu = () => {
      apiMenu = apiList;
      // console.log(apiList)

      // console.log(apiList)

      // ApiListData.map((rs,index) => {

      //     apiMenu.push({id:rs.id,name:rs.name});
      // })
   };

   useEffect(() => {
      let tVal = 'C';
      setBtnConditionStyle({ backgroundColor: '#10163A', width: '100%', color: '#fff', borderRadius: '5px 5px 0px 0px' });
      setBtnSimpleStyle({ backgroundColor: '#fff', width: '100%', color: '#000', borderRadius: '5px 5px 0px 0px' });
      if (props.trigger.currentTriggerData.toTrigger && props.trigger.currentTriggerData.toTrigger.conditionType == 'S') {
         tVal = props.trigger.currentTriggerData.toTrigger.conditionType;

         setBtnConditionStyle({ backgroundColor: '#fff', width: '100%', color: '#000', borderRadius: '5px 5px 0px 0px' });
         setBtnSimpleStyle({ backgroundColor: '#10163A', width: '100%', color: '#fff', borderRadius: '5px 5px 0px 0px' });
      }
      setConditionType(tVal);

      if (triggersList.length > 0) {
         Object.values(triggersList).forEach((d) => {
            triggersIds.push(d.id);
            d.menus.forEach((i) => {
               menusIds.push(i.toTriggerId);
            });
         });

         triggersList.map((tl) => {
            updatedTriggers.push({
               ...tl,
               menus:
                  tl.menus.length > 0 &&
                  tl.menus.map((mn) => {
                     return {
                        id: mn.id,
                        text: mn.text,
                        toTrigger: mn.toTrigger,
                        toTriggerId: mn.toTriggerId,
                     };
                  }),
            });

            tl.menus.map((m) => {
               setMenus(m);
            });
            return tl;
         });
      }

      setApiMenu();

      console.log(currentTriggerData.toTrigger);
      if (currentTriggerData.toTrigger) {
         conditionArray = currentTriggerData.toTrigger.apiData;
         setCondition(JSON.parse(JSON.stringify(currentTriggerData.toTrigger.apiData)));
         setApiData(currentTriggerData.toTrigger.apiData);
      }

      return () => {
         updatedTriggers = [];
      };
   }, [triggerType]);

   // useEffect(() => {
   //     if (currentTriggerData.toTrigger !== undefined) {
   //         if (updatedTriggers.length > 0) {
   //             // updatedTriggers.forEach((upd)=>{
   //             //     // console.log("currentTriggerData >>>",upd.id)
   //             //     // console.log("currentTriggerData >>>",currentTriggerData.toTrigger.loopBackTriggerId)
   //             //     if(upd.id === currentTriggerData.toTrigger.loopBackTriggerId){
   //             //         console.log("currentTriggerData >>>",upd)
   //             //         currentTriggerPreview = upd
   //             //     }
   //             //
   //             // })
   //         }
   //     }
   //     return () => {
   //         currentTriggerPreview = {};
   //     }
   // }, [])
   const id = 'nasir';
   const userId = 'nasir';
   useEffect(() => {
      if (isData) {
         setInit({
            ...init,
            isText:
               currentTriggerData.toTrigger !== undefined ? currentTriggerData.toTrigger.loopBackTriggerId === '' && currentTriggerData.toTrigger.type === 'TEXT' : currentTriggerData.loopBackTriggerId === '' && currentTriggerData.type === 'TEXT',
            isMedia: currentTriggerData.toTrigger !== undefined ? ['VIDEO', 'AUDIO', 'IMAGE', 'DOCUMENT'].includes(currentTriggerData.toTrigger.type) : ['VIDEO', 'AUDIO', 'IMAGE', 'DOCUMENT'].includes(currentTriggerData.type),
            template: currentTriggerData.toTrigger !== undefined ? currentTriggerData.toTrigger.type === 'TEMPLATE' : currentTriggerData.type === 'TEMPLATE',
            isLoopBack: currentTriggerData.toTrigger !== undefined ? currentTriggerData.toTrigger.loopBackTriggerId !== '' : currentTriggerData.loopBackTriggerId !== '',

            openFallBackComposer: currentTriggerData.toTrigger !== undefined ? currentTriggerData.toTrigger.fallBackResponse !== '' : currentTriggerData.fallBackResponse !== '',
            currentData: {
               ...init.currentData,
               name: currentTriggerData.toTrigger !== undefined ? currentTriggerData.toTrigger.name : currentTriggerData.name,
               id: currentTriggerData.toTrigger !== undefined ? currentTriggerData.toTrigger.id : currentTriggerData.id,
               loopBackId: currentTriggerData.toTrigger !== undefined ? currentTriggerData.toTrigger.loopBackTriggerId : currentTriggerData.loopBackTriggerId,
               loopBackText: currentTriggerData.toTrigger !== undefined ? currentTriggerData.toTrigger.loopBackText : currentTriggerData.loopBackText,
               apiId: currentTriggerData.toTrigger !== undefined ? currentTriggerData.toTrigger.api_id : currentTriggerData.api_id,
               apiText: currentTriggerData.toTrigger !== undefined ? currentTriggerData.toTrigger.loopBackText : currentTriggerData.loopBackText,
               startTrigger: currentTriggerData.toTrigger !== undefined ? currentTriggerData.toTrigger.startTrigger : currentTriggerData.startTrigger,
               urls:
                  currentTriggerData.toTrigger !== undefined
                     ? currentTriggerData.toTrigger.urls !== undefined && currentTriggerData.toTrigger.urls.length > 0 && currentTriggerData.toTrigger.urls
                     : currentTriggerData.urls !== undefined && currentTriggerData.urls.length > 0 && currentTriggerData.urls,
               type: currentTriggerData.toTrigger !== undefined ? currentTriggerData.toTrigger.type : currentTriggerData.type,
               routToAgent: currentTriggerData.toTrigger !== undefined ? currentTriggerData.toTrigger.routeToAgent : currentTriggerData.routeToAgent,
               values: currentTriggerData.toTrigger !== undefined ? currentTriggerData.toTrigger.values : currentTriggerData.values,

               description: currentTriggerData.toTrigger !== undefined ? currentTriggerData.toTrigger.response : currentTriggerData.response,
               fallBackResponse: currentTriggerData.toTrigger !== undefined ? currentTriggerData.toTrigger.fallBackResponse : currentTriggerData.fallBackResponse,
               caption: currentTriggerData.toTrigger !== undefined ? currentTriggerData.toTrigger.caption : currentTriggerData.caption,
               template: currentTriggerData.toTrigger !== undefined ? currentTriggerData.toTrigger.templatename : currentTriggerData.templatename,

               triggerMenus:
                  currentTriggerData.toTrigger !== undefined
                     ? currentTriggerData.toTrigger?.menus.map((m) => {
                          return { name: m.text, id: m.toTriggerId, main_id: m.id };
                       })
                     : currentTriggerData?.menus.map((m) => {
                          return { name: m.text, id: m.toTriggerId, main_id: m.id };
                       }),
            },
            values: currentTriggerData.toTrigger !== undefined ? currentTriggerData.toTrigger.values : currentTriggerData.values,
            simpleValues: currentTriggerData.toTrigger !== undefined ? currentTriggerData.toTrigger.simpleValues : currentTriggerData.simpleValues,
         });
      } else {
         setInit({
            ...init,
            isText: true,

            currentData: {
               ...init.currentData,
               id: getGeneratedId(id, triggersIds, 'T'),
            },
         });
      }

      let dropArea = document.getElementById('drop-area');
      $(document).ready(() => {
         if (dropArea !== null) {
            const preventsDefaults = (e) => {
               e.preventDefault();
               e.stopPropagation();
            };
            const highlighted = (e) => {
               dropArea.classList.add('highlight');
            };
            const unHighlighted = (e) => {
               dropArea.classList.remove('highlight');
            };
            const handleDrop = (e) => {
               let dt = e.dataTransfer;
               let files = dt.files;
               handleFileUpload(files, 1);
            };
            ['dragenter', 'dragover', 'dragleave', 'drop'].forEach((eventName) => {
               dropArea.addEventListener(eventName, preventsDefaults, false);
            });
            ['dragover', 'dragenter'].forEach((eventName) => {
               dropArea.addEventListener(eventName, highlighted, false);
            });
            ['dragleave', 'drop'].forEach((eventName) => {
               dropArea.addEventListener(eventName, unHighlighted, false);
            });
            dropArea.addEventListener('drop', handleDrop, false);
         }
      });

      return () => {
         setInit({
            ...init,
            isConfirm: false,
            isAlert: false,
            confirmationTxt: '',
            isText: false,

            isMedia: false,
            isLoopBack: false,
            template: false,
            openFallBackComposer: false,
            triggerOpt: '',
            triggerValueName: '',
            simpleLabel: '',
            simpleValue: '',
            uploadedFile: {},
            currentData: {
               id: '',
               name: '',
               template: '',
               loopBackId: '',
               loopBackText: [''],
               apiId: '',
               apiText: [''],
               values: [],
               description: '',
               fallBackResponse: '',
               urls: [],
               startTrigger: true,
               routToAgent: false,
               type: '',
               triggerMenus: [],
            },
            updateTriggerObject: {
               botId: 0,
               triggersList: [],
               userId: 0,
            },
            uploadFileResponse: true,
            values: [],
         });
      };
   }, [isData]);

   useEffect(() => {
      if (!init.uploadFileResponse && urls.length > 0) {
         setInit({
            ...init,
            uploadFileResponse: true,
            uploadedFile: {
               loopBackTriggerId: '',
               type: init.currentData.type,
               urls: init.currentData.urls.length > 0 ? [...new Set([...init.currentData.urls, ...urls])] : urls,
            },
            currentData: {
               ...init.currentData,
               urls: init.currentData.urls.length > 0 ? [...new Set([...init.currentData.urls, ...urls])] : urls,
            },
         });
      }
      // console.log("uploadFileSuccess",init)

      return () => {
         setInit({
            ...init,
            uploadedFile: {},
         });
      };
   }, [urls.length]);

   useEffect(() => {
      if (menuTextUpdateSuccess) {
         setInit({
            ...init,
            isAlert: true,
            okText: 'Ok',
            confirmationTxt: 'Trigger updated successfully',
            updatePending: false,
            updateMenus: {
               selectedMenuId: null,
               text: '',
            },
         });
         // alert("Updated Successfully");
         dispatch(onSuccessUpdateMenuText());
      }
   }, [menuTextUpdateSuccess]);

   const handleFileUpload = (files, type) => {
      // console.log("dropArea", files)
      if (type === 1) {
         let all = [...files];
         all.forEach((file) => {
            let reader = new FileReader();
            reader.onloadend = () => {
               $('.preview_img').remove();
               let img = document.createElement('img');
               img.src = reader.result;
               img.className = 'preview_img';
               document.getElementById('drop-area').appendChild(img);
               // console.log("uploadFile", all);
               dispatch(uploadFile(file));
            };
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
            };
            reader.readAsDataURL(file);
         }
      }
   };

   const confirmClose = () => {
      setInit({
         ...init,
         isConfirm: false,
         isUpdatedList: true,
         confirmationTxt: '',
      });
   };
   const alertClose = () => {
      setInit({
         ...init,
         isAlert: false,
         isUpdatedList: true,
         confirmationTxt: '',
      });
   };

   const handleSubmitTrigger = () => {
      let obj = {
         title: currentData.name,
         type: currentData.type,
         description: currentData.description,
         fallBackResponse: currentData.fallBackResponse,
         options: currentData.triggerMenus,
         urls: currentData.urls,
         values: init.values,
         loopBackText: currentData.loopBackText,
         loopBackId: currentData.loopBackId,

         apiId: currentData.apiId,
         apiText: currentData.apiText,
         template: currentData.template,
         routToAgent: currentData.routToAgent,
         caption: currentData.caption,
         simpleValues: init.simpleValues,
      };
      let triggersListObj = {
         // "fallBackResponse": obj.fallBackResponse,
         fallBackResponse: fallBackResponse,
         id: childBotId !== null ? childBotId : currentData.id,
         loopBackText: [loopBackText[0]],
         loopBackTriggerId: obj.loopBackId,
         menus: obj.options.map((v) => {
            return {
               text: v.name,
               toTriggerId: v.id,
            };
         }),
         name: obj.title,
         response: description,
         templatename: obj.template,
         api_id: currentData.apiId,
         apiData: apiData,
         triggerType: triggerType,
         conditionType: conditionType,
         simpleValues: obj.simpleValues,
         routeToAgent: obj.routToAgent,
         // "caption": obj.caption,
         caption: caption !== undefined ? caption : '',
         startTrigger: isChild !== null ? false : init.currentData.startTrigger,
         values: obj.values,
         type: obj.type === '' ? 'TEXT' : obj.type,
         urls: obj.urls === undefined ? [] : !obj.urls ? [] : obj.urls,
      };

      return triggersListObj;

      if ($.isEmptyObject(currentTriggerData)) {
         updatedTriggers.push(triggersListObj);
         let updateObj = {
            botId: id,
            triggersList: updatedTriggers,
            userId: userId,
         };
         updatedTriggers = [];
         return updateObj;
      } else {
         let updatedBots = updatedTriggers.filter((fl) => fl.id !== triggersListObj.id);
         let updateObj = {
            botId: id,
            triggersList: [...updatedBots, triggersListObj],
            userId: userId,
         };
         updatedTriggers = [];
         return updateObj;
         //dispatch(UpdateTrigger(updateObj));
      }

      setInit({
         ...init,
         isConfirm: false,
         isUpdatedList: true,
         confirmationTxt: '',
      });
      dispatch(resetTheUrls());
   };

   const handleResponseSelect = (name) => {
      switch (name) {
         case 'isText':
            setInit({
               ...init,
               isText: true,
               isMedia: false,

               isLoopBack: false,
               template: false,
               currentData: {
                  ...init.currentData,
                  type: 'TEXT',
               },
            });
            // updatedTriggers = [];
            break;
         case 'isMedia':
            setInit({
               ...init,
               isText: false,

               isMedia: true,
               isLoopBack: false,
               template: false,
               currentData: {
                  ...init.currentData,
                  type: '',
               },
            });
            // updatedTriggers = [];
            break;

         case 'isLoopBack':
            setInit({
               ...init,
               isText: false,

               isMedia: false,
               isLoopBack: true,
               template: false,
               // currentData: {
               //     ...init.currentData,
               //     type: "",
               // }
            });
            break;
         case 'template':
            setInit({
               ...init,
               isText: false,

               isMedia: false,
               isLoopBack: false,
               template: true,
               currentData: {
                  ...init.currentData,
                  type: 'TEMPLATE',
               },
            });
            // updatedTriggers = [];
            break;
         default:
            setInit({
               ...init,
               isText: true,

               isMedia: false,
               isLoopBack: false,
               template: false,
            });
      }
   };

   const handleValueRemove = (v) => {
      // console.log("values", v)
      setInit({
         ...init,
         values: init.values.filter((d) => d !== v),
      });
   };

   const handleAddOptions = () => {
      if (triggerOpt !== '') {
         counter++;
         setInit({
            ...init,
            triggerOpt: '',
            currentData: {
               ...init.currentData,
               triggerMenus: [
                  ...init.currentData.triggerMenus,
                  {
                     name: triggerOpt,
                     id: `b${id}_t${counter}${createGuid()}`,
                  },
               ],
            },
         });
      } else {
         setInit({
            ...init,
            isAlert: true,
            confirmationTxt: 'Please fill up the field',
         });
         // alert("Please fill up the field");
      }
   };

   const handleTextAreaChange = (text, type) => {
      if (text !== '') {
         if (type === 'fallBackResponse') {
            setInit({
               ...init,
               currentData: {
                  ...init.currentData,
                  fallBackResponse: text,
               },
               descriptionType: type,
            });
         }
         if (type === 'caption') {
            setInit({
               ...init,
               currentData: {
                  ...init.currentData,
                  caption: text,
               },
               descriptionType: type,
            });
         }
         if (type === 'response') {
            setInit({
               ...init,
               currentData: {
                  ...init.currentData,
                  description: text,
               },
               descriptionType: type,
            });
         }
         if (type === 'loopBackText') {
            setInit({
               ...init,
               currentData: {
                  ...init.currentData,
                  loopBackText: [text],
               },
               descriptionType: type,
            });
         }
      }
   };

   const addSimpleCondition = () => {
      if (simpleLabel !== '' && simpleValue !== '') {
         setInit({
            ...init,
            simpleLabel: '',

            simpleValues: [
               ...init.simpleValues,
               {
                  label: simpleLabel,
                  value: simpleValue,
               },
            ],
         });
      } else {
         setInit({
            ...init,
            isAlert: true,
            isUpdatedList: true,
            confirmationTxt: 'Please add label first.',
         });
         // alert("Please add value first.")
      }
   };

   const getContentByType = (data) => {
      if (data.loopBackTriggerId !== '') {
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
            case 'AUDIO':
               return (
                  <div className="sub-img-tag">
                     {data.urls.length > 0 &&
                        data.urls.map((url) => {
                           return <AudioPlayerDefault src={url} />;
                        })}
                  </div>
               );
            case 'VIDEO':
               return (
                  <div className="sub-img-tag">
                     {data.urls.length > 0 &&
                        data.urls.map((url) => {
                           return (
                              <section>
                                 <video src={url} autoPlay controls />
                              </section>
                           );
                        })}
                  </div>
               );
            case 'DOCUMENT':
               return (
                  <div className="sub-img-tag">
                     {/*data.url !== "" ? data.url : */}
                     {data.urls.length > 0 &&
                        data.urls.map((url) => {
                           return (
                              <div className="icon">
                                 <a download href={url}>
                                    <img alt={'#'} src={documentIcon} />
                                 </a>
                              </div>
                           );
                        })}
                  </div>
               );
            case 'IMAGE':
               return (
                  <div className="sub-img-tag">
                     {/*data.url !== "" ? data.url : */}
                     {data.urls.length > 0 &&
                        data.urls.map((url) => {
                           return <img alt={'#'} src={url !== '' ? url : defaultImage} />;
                        })}
                  </div>
               );
            default:
         }
      }
   };
   const formChange = (form_id) => {
      console.log('Form ID: ' + form_id);
      let fApi = formList.filter((d) => d.id === form_id);
      fApi = fApi[0];

      setFormData(JSON.parse(fApi.form_data));

      setInit({
         ...init,
         currentData: {
            ...init.currentData,
            form_id: form_id,
         },
      });
   };

   return (
      <div className="composer-container api_composer_container" style={{ border: '1px solid #CCCCCC', borderRadius: '5px' }}>
         <ConfirmModal visible={isConfirm} handleOk={handleSubmitTrigger} confirmLoading={!isUpdatedList} modalText={confirmationTxt} handleCancel={confirmClose} />
         <AlertModal visible={isAlert} handleOk={alertClose} confirmLoading={!isUpdatedList} modalText={confirmationTxt} handleCancel={alertClose} />
         <div className="composer-content">
            <div className="trigger-card">
               <div className="card-content">
                  <div className="row__" style={{ marginBottom: '0px' }}>
                     <div className="txt" style={{ marginBottom: '20px' }}>
                        Response
                     </div>
                     {triggerType == 'A' ? (
                        <>
                           <ul className="right_bar_top_section" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                              <li>
                                 <button type="button" onClick={() => meClickCondition('C')} className="btn btn-block {btn-primary}" style={btnConditionStyle}>
                                    Condition Response
                                 </button>
                              </li>
                              <li>
                                 <button type="button" onClick={() => meClickCondition('S')} className="btn btn-block {btn-primary}" style={btnSimpleStyle}>
                                    {' '}
                                    Simple Response
                                 </button>
                              </li>
                           </ul>
                           <br />
                        </>
                     ) : null}

                     <div className="tcb">
                        <button
                           className={`btn-tcb ${isText && 'on'}`}
                           onClick={(e) => {
                              handleResponseSelect('isText', isText);
                              e.preventDefault();
                              e.stopPropagation();
                           }}
                        >
                           Text
                        </button>

                        <button
                           className={`btn-tcb ${isMedia && 'on'}`}
                           onClick={(e) => {
                              handleResponseSelect('isMedia', isMedia);
                              e.preventDefault();
                              e.stopPropagation();
                           }}
                        >
                           Media
                        </button>
                        <button
                           className={`btn-tcb ${isLoopBack && 'on'}`}
                           onClick={(e) => {
                              handleResponseSelect('isLoopBack', isLoopBack);
                              e.preventDefault();
                              e.stopPropagation();
                           }}
                        >
                           Loopback
                        </button>
                        <button
                           className={`btn-tcb ${template && 'on'}`}
                           onClick={(e) => {
                              handleResponseSelect('template', template);
                              e.preventDefault();
                              e.stopPropagation();
                           }}
                        >
                           Template
                        </button>
                     </div>
                  </div>
                  <div className="row__" style={{ marginTop: '0px' }}>
                     {isText && (
                        <>
                           <TextEditor type={'response'} defaultText={description} onSuccess={handleTextAreaChange} />

                           {triggerType == 'A' && conditionType == 'C' ? (
                              <div>
                                 {condition?.map((tr, i) => {
                                    return <ConditionList dataIndex={i} apiData={tr.dataValue} props={props} updatedTriggersVal={updatedTriggers} apiHandle={apiHandle} />;
                                 })}
                                 <br />
                                 <div className="actions-btn" style={{ textAlign: 'end' }}>
                                    <button
                                       type="button"
                                       className="apiBtn"
                                       style={{
                                          whiteSpace: 'nowrap',
                                          textAlign: 'center',
                                          overflowX: 'auto',
                                       }}
                                       onClick={() => addCondition()}
                                    >
                                       Add API Condition
                                    </button>
                                 </div>
                              </div>
                           ) : null}

                           {triggerType == 'A' && conditionType == 'S' ? (
                              <>
                                 <div className="simple_response_section">
                                    <div className="row">
                                       <div className="col-sm-6">
                                          <span className="field_label">Label</span>

                                          <input
                                             className="inp"
                                             value={simpleLabel}
                                             onChange={(e) => {
                                                setInit({
                                                   ...init,
                                                   simpleLabel: e.target.value,
                                                });
                                             }}
                                             placeholder="Please Enter Label"
                                          />
                                       </div>
                                       <div className="col-sm-6">
                                          <span className="field_label">Value</span>

                                          <input
                                             className="inp"
                                             value={simpleValue}
                                             onChange={(e) => {
                                                setInit({
                                                   ...init,
                                                   simpleValue: e.target.value,
                                                });
                                             }}
                                             placeholder="Please Enter Value"
                                          />
                                       </div>
                                    </div>

                                    <br />
                                    <div className="actions-btn">
                                       <button type="button" className="btn primary" onClick={() => addSimpleCondition()}>
                                          Add Label
                                       </button>
                                    </div>

                                    {simpleValues.map((s, i) => {
                                       return (
                                          <div className="row add_label_section">
                                             <div className="col-sm-6">
                                                <span>{s.label}</span>
                                             </div>
                                             <div className="col-sm-6">
                                                <span>{s.value}</span>
                                             </div>
                                          </div>
                                       );
                                    })}
                                 </div>

                                 <button type="button" className="btn primary" onClick={saveSimpleResponse}>
                                    Save Simple Response
                                 </button>
                              </>
                           ) : null}
                        </>
                     )}
                     {isMedia && (
                        <div id="drop-area" className="upload-media">
                           <div className="upload-prv" id="upload-prv">
                              {init.uploadFileResponse ? (
                                 !$.isEmptyObject(init.uploadedFile) ? (
                                    getContentByType(init.uploadedFile)
                                 ) : (
                                    getContentByType(currentTriggerData.toTrigger !== undefined ? currentTriggerData.toTrigger : currentTriggerData)
                                 )
                              ) : (
                                 <SyncOutlined
                                    spin
                                    style={{
                                       color: `${STRINGS.COLOR.SEC}`,
                                    }}
                                 />
                              )}
                              <div className="txt-field">
                                 <div className="label">
                                    <div className="sub-text">Caption</div>
                                 </div>
                                 <div className="input">
                                    <TextEditor type={'caption'} defaultText={caption} onSuccess={handleTextAreaChange} />
                                 </div>
                              </div>
                              <FormControl
                                 component="fieldset"
                                 style={{
                                    marginTop: '1rem 0',
                                 }}
                              >
                                 <RadioGroup
                                    aria-label="gender"
                                    className="media_radio_section"
                                    style={{
                                       flexDirection: 'row',
                                    }}
                                    name="controlled-radio-buttons-group"
                                    value={type}
                                    onChange={(e) => {
                                       setInit({
                                          ...init,
                                          currentData: {
                                             ...init.currentData,
                                             type: e.target.value,
                                          },
                                       });
                                    }}
                                 >
                                    <FormLabel component="legend">Media Type</FormLabel>
                                    {getAllTypes?.map((t) => {
                                       if (t !== 'TEXT' && t !== 'TEMPLATE')
                                          return (
                                             <FormControlLabel
                                                value={t}
                                                control={
                                                   <Radio
                                                      size="small"
                                                      sx={{
                                                         color: '#363a77',
                                                         '&.Mui-checked': {
                                                            color: '#363a77',
                                                         },
                                                      }}
                                                   />
                                                }
                                                label={t}
                                             />
                                          );
                                    })}
                                 </RadioGroup>
                              </FormControl>
                              <React.Fragment>
                                 <div className="up-txt">
                                    <div className="txt">Drop File Here for Upload</div>
                                 </div>
                                 <div className="actions">
                                    <label htmlFor="upload-input">
                                       <div className="btn-upload">
                                          <span>
                                             <img alt={'#'} src={upload_icon} />
                                          </span>
                                          Upload File
                                       </div>
                                    </label>
                                    <input id="upload-input" className="upload-input" type="file" accept="/*" onChange={(e) => handleFileUpload(e, 2)} />
                                 </div>

                                 <div className="up-txt">
                                    <div className="txt">Png,Jpeg (upto 5 MB),mp3,mp4 (16 MB),pdf (upto 25 MB) are allowed</div>
                                 </div>
                              </React.Fragment>
                           </div>
                        </div>
                     )}

                     {isLoopBack && (
                        <div className="loop-back">
                           <div className="txt-field">
                              <Select
                                 labelId="demo-simple-select-standard-label"
                                 id="demo-simple-select-standard"
                                 value={loopBackId}
                                 onChange={(e) => {
                                    setInit({
                                       ...init,
                                       currentData: {
                                          ...init.currentData,
                                          loopBackId: e.target.value,
                                       },
                                    });
                                    e.preventDefault();
                                 }}
                                 label="Age"
                              >
                                 {updatedTriggers?.map((tr) => {
                                    return <MenuItem value={tr.id}>{tr.name}</MenuItem>;
                                 })}
                              </Select>
                           </div>
                           <TextEditor type={'loopBackText'} defaultText={loopBackText[0]} onSuccess={handleTextAreaChange} />
                           {/*<TextAreaEditor type={"loopBackText"} defaultVal={""}/>*/}
                        </div>
                     )}
                     {template && (
                        <div className="loop-back">
                           <div className="txt-field">
                              <div className="label">
                                 <div className="sub-txt" style={{ fontFamily: 'Lexend Deca !important', fontWeight: 800, fontSize: '12px' }}>
                                    Template Name
                                 </div>
                              </div>
                              <div className="input">
                                 <input
                                    className="inp"
                                    defaultValue={currentData.template}
                                    onChange={(e) => {
                                       setInit({
                                          ...init,
                                          currentData: {
                                             ...init.currentData,
                                             template: e.target.value,
                                          },
                                       });
                                       e.preventDefault();
                                    }}
                                    placeholder="Welcome Template"
                                 />
                              </div>
                           </div>
                        </div>
                     )}

                     <div className="acts">
                        {triggerType == 'M' ? (
                           <>
                              <div
                                 className="ab-txt"
                                 style={{
                                    justifyContent: 'flex-start',
                                 }}
                              >
                                 <div className="check-box">
                                    <Checkbox
                                       checked={routToAgent}
                                       onChange={(e) => {
                                          setInit({
                                             ...init,
                                             currentData: {
                                                ...init.currentData,
                                                routToAgent: e.target.checked,
                                             },
                                          });
                                       }}
                                       size="small"
                                       sx={{
                                          color: '#363a77',
                                          '&.Mui-checked': {
                                             color: '#363a77',
                                          },
                                       }}
                                    />
                                 </div>
                                 Bot to Human Handover
                              </div>

                              <div
                                 className="ab-txt fallback_button"
                                 onClick={() => {
                                    setInit({
                                       ...init,
                                       openFallBackComposer: !openFallBackComposer,
                                    });
                                 }}
                              >
                                 <i className="fa fa-plus-circle"></i> Add Fallback Response
                              </div>
                           </>
                        ) : null}
                     </div>
                  </div>

                  {openFallBackComposer && (
                     <div className="row__ mb-4">
                        <div className="txt-field">
                           <div className="label">
                              <div className="sub-txt">Fall-Back Message</div>
                           </div>
                           <div className="input">
                              {/*<input className="inp" value={fallBackResponse} onChange={(e) => {*/}
                              {/*    setInit({*/}
                              {/*        ...init,*/}
                              {/*        currentData: {*/}
                              {/*            ...init.currentData,*/}
                              {/*            fallBackResponse: e.target.value*/}
                              {/*        }*/}
                              {/*    })*/}
                              {/*}} placeholder="Please Enter Correct Option"/>*/}
                              <TextEditor type={'fallBackResponse'} defaultText={fallBackResponse} onSuccess={handleTextAreaChange} />
                           </div>
                        </div>
                     </div>
                  )}
                  {triggerType == 'M' ? (
                     <>
                        <div className="row__">
                           <div>
                              <button className="btn_response" type="button">
                                 <i className="fa fa-plus-circle"></i>Add Response
                              </button>
                           </div>

                           <div className="txt-field">
                              <div className="label">
                                 <div className="sub-txt">Menu Options</div>
                              </div>
                              <div className="input">
                                 <input
                                    className="inp"
                                    value={triggerOpt}
                                    placeholder="Write Trigger Option (if any)"
                                    onChange={(e) => {
                                       setInit({
                                          ...init,
                                          triggerOpt: e.target.value,
                                       });
                                    }}
                                 />

                                 <div className="add-btn">
                                    <button type="button" className="btn-outlined" onClick={handleAddOptions}>
                                       Add Menu Option
                                    </button>
                                 </div>
                              </div>
                           </div>

                           <div className="selected-menus">
                              {triggerMenus.length > 0 &&
                                 triggerMenus.map((m, index) => {
                                    return (
                                       <div key={index} className="sm-box boxPadding">
                                          <React.Fragment>
                                             <button
                                                className="btn-outline"
                                                style={{
                                                   width: '220px',
                                                   whiteSpace: 'nowrap',
                                                   textAlign: 'center',
                                                }}
                                             >
                                                {init.updateMenus.selectedMenuId === m.main_id ? (
                                                   <input
                                                      type="text"
                                                      defaultValue={m.name}
                                                      onChange={(e) => {
                                                         setInit({
                                                            ...init,
                                                            updateMenus: {
                                                               ...init.updateMenus,
                                                               text: e.target.value,
                                                            },
                                                         });
                                                      }}
                                                   />
                                                ) : (
                                                   m.name
                                                )}
                                             </button>
                                          </React.Fragment>
                                          <div className="">
                                             {init.updateMenus.selectedMenuId === m.main_id ? (
                                                <React.Fragment>
                                                   {init.updatePending ? (
                                                      <SyncOutlined
                                                         spin
                                                         style={{
                                                            color: `${STRINGS.COLOR.SEC}`,
                                                         }}
                                                      />
                                                   ) : (
                                                      <button
                                                         className="btn-primary btn"
                                                         style={{ marginRight: '10px', fontFamily: 'Lexend Deca !important' }}
                                                         onClick={() => {
                                                            setInit({
                                                               ...init,
                                                               updatePending: true,
                                                               currentData: {
                                                                  ...init.currentData,
                                                                  triggerMenus: init.currentData.triggerMenus.map((t) => {
                                                                     if (t.id === m.id) {
                                                                        t.name = init.updateMenus.text;
                                                                     }
                                                                     return t;
                                                                  }),
                                                               },
                                                            });
                                                            dispatch(
                                                               UpdateTriggerMenusText({
                                                                  id: init.updateMenus.selectedMenuId,
                                                                  text: init.updateMenus.text,
                                                               })
                                                            );
                                                         }}
                                                      >
                                                         Update
                                                      </button>
                                                   )}
                                                   {init.updateMenus.selectedMenuId === m.main_id && (
                                                      <a style={{ marginLeft: 5 }} 
                                                      onClick={() => {
                                                         setInit({
                                                            ...init,
                                                            currentData: {
                                                               ...init.currentData,
                                                               triggerMenus: init.currentData.triggerMenus.filter((d) => d.id !== m.id),
                                                            },
                                                         });
                                                      }}>
                                                      <img alt={'#'} src={deleteIcon} width="20" />
                                                      </a>
                                                   )}
                                                </React.Fragment>
                                             ) : (
                                                isData && (
                                                   <button
                                                      className="btn btn-icon"
                                                      style={{ marginRight: '10px', color: '#000000' }}
                                                      onClick={() => {
                                                         setInit({
                                                            ...init,
                                                            updateMenus: {
                                                               selectedMenuId: m.main_id,
                                                               text: '',
                                                            },
                                                         });
                                                      }}
                                                   >
                                                      <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                                                   </button>
                                                )
                                             )}

                                             <img
                                                alt={'#'}
                                                src={edit_icon}
                                                onClick={() => {
                                                   setInit({
                                                      ...init,
                                                      currentData: {
                                                         ...init.currentData,
                                                         triggerMenus: init.currentData.triggerMenus.filter((d) => d.id !== m.id),
                                                      },
                                                   });
                                                }}
                                             />
                                    
                                             <a style={{ marginLeft: 5 }} 
                                                      onClick={() => {
                                                         setInit({
                                                            ...init,
                                                            currentData: {
                                                               ...init.currentData,
                                                               triggerMenus: init.currentData.triggerMenus.filter((d) => d.id !== m.id),
                                                            },
                                                         });
                                                      }}>
                                                      <img alt={'#'} src={deleteIcon} width="20" />
                                                      </a>
                                          </div>
                                       </div>
                                    );
                                 })}
                           </div>
                        </div>
                     </>
                  ) : null}
               </div>
            </div>
         </div>
      </div>
   );
};

export default ByTypeComposer;
