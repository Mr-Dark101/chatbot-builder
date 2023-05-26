import React, { useEffect, useState } from 'react';
import trash_icon from '../../../assets/Custom Size - 4/Icon metro-cancel.svg';
import delete_icon from '../../../assets/Group 4968.svg';
import TextEditor from '../../../SharedComponent/Items/ReactTextEditor/TextEditor';
import $ from 'jquery';
import AudioPlayerDefault from '../../../SharedComponent/AudioPlayer/audioPlayer';
import documentIcon from '../../../assets/file.png';
import defaultImage from '../../../assets/default_image.png';
import { EditOutlined, SyncOutlined } from '@ant-design/icons';
import { createGuid, getGeneratedId, STRINGS } from '../../../utils/base';
import { useDispatch } from 'react-redux';
import { Checkbox, FormControl, FormControlLabel, FormLabel, MenuItem, Radio, RadioGroup, Select } from '@mui/material';
import upload_icon from '../../../assets/Icon metro-cloud-upload.svg';

import { onSuccessUpdateMenuText, resetTheUrls, UpdateTrigger, UpdateTriggerMenusText, uploadFile } from '../../../SharedComponent/AddTriggerComposer/slices/addTrigger.slice';
let updatedTriggers = [];
let counter = 0;
const ConditionList = ({ props, apiHandle, dataIndex, apiData, updatedTriggersVal }) => {
   const id = 'nasir';
   const userId = 'nasir';
   const defaultState = {
      isConfirm: false,
      isAlert: false,
      confirmationTxt: '',
      isText: true,
      isApi: false,
      isMedia: false,
      isLoopBack: false,
      updatePending: false,
      uploadFileResponse: true,
      template: false,
      openFallBackComposer: false,
      triggerOpt: '',
      triggerOptLabel: '',
      triggerOptApi: '',
      triggerOptResponse: '',
      optLoopBack: '',

      triggerValueName: '',
      uploadedFile: {},
      updateMenus: {
         selectedMenuId: null,
         text: '',
         name: '',
         label: '',
         api: '',
         responsee: '',
         loopback: '',
      },
      currentData: apiData,
      updateTriggerObject: {
         botId: 0,
         triggersList: [],
         userId: 0,
      },
      values: [],
      descriptionType: 'response',
   };
   const dispatch = useDispatch();
   let { handleTriggerClose, currentBotData, trigger, getAllTypes } = props;
   const [init, setInit] = useState(defaultState);
   let { isText, isApi, isMedia, isLoopBack, template, currentData, openFallBackComposer, triggerOpt, triggerValueName, values, descriptionType, isConfirm, confirmationTxt, isAlert, triggerOptApi, triggerOptResponse, optLoopBack, triggerOptLabel } =
      init;

   let { triggerMenus, description, fallBackResponse, caption, loopBackId, loopBackText, routToAgent, type, apiId, apiText, conditionLabel, conditionValue } = currentData;
   const [isData] = useState(!$.isEmptyObject(trigger.currentTriggerData));
   let { triggersList, currentTriggerData, isChild, childBotId, urls, isUpdatedList, menuTextUpdateSuccess, apiList } = trigger;

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
                     label: triggerOptLabel,
                     id: `b${id}_t${counter}${createGuid()}`,
                     api: triggerOptApi,
                     response: triggerOptResponse,
                     loopback: optLoopBack,
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

   const handleResponseSelect = (name) => {
      switch (name) {
         case 'isText':
            setInit({
               ...init,
               isText: true,
               isMedia: false,
               isApi: false,
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
               isApi: false,
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
         case 'isApi':
            setInit({
               ...init,
               isText: false,
               isMedia: false,
               isApi: true,
               isLoopBack: false,
               template: false,
               // currentData: {
               //     ...init.currentData,
               //     type: "",
               // }
            });
            // updatedTriggers = [];
            break;
         case 'isLoopBack':
            setInit({
               ...init,
               isText: false,
               isApi: false,
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
               isApi: false,
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
               isApi: false,
               isMedia: false,
               isLoopBack: false,
               template: false,
            });
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

   const saveCondition = () => {
      apiHandle(init.currentData, dataIndex);
   };

   return (
      <>
         <div className="add_api_section" style={{ border: '1px solid #ccc', borderColor: '#fff', width: '100%', borderWidth: 1, padding: 10, marginTop: 10 }}>
            <div className="row">
               <div className="col-sm-6">
                  <span className="field_label">Label</span>

                  <input
                     className="inp"
                     value={conditionLabel}
                     placeholder="Label"
                     onChange={(e) => {
                        setInit({
                           ...init,
                           currentData: {
                              ...init.currentData,
                              conditionLabel: e.target.value,
                           },
                        });
                        e.preventDefault();
                     }}
                  />
               </div>
               <div className="col-sm-6">
                  <span className="field_label">Value</span>

                  <input
                     className="inp"
                     value={conditionValue}
                     placeholder="Label"
                     onChange={(e) => {
                        setInit({
                           ...init,
                           currentData: {
                              ...init.currentData,
                              conditionValue: e.target.value,
                           },
                        });
                        e.preventDefault();
                     }}
                  />
               </div>
            </div>

            <div className="row__" style={{ marginTop: '15px', marginBottom: '0px' }}>
               <div className="txt" style={{ marginBottom: '15px' }}>
                  Trigger Response
               </div>
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
                     type="button"
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
                     type="button"
                     className={`btn-tcb ${isLoopBack && 'on'}`}
                     onClick={(e) => {
                        handleResponseSelect('isLoopBack', isLoopBack);
                        e.preventDefault();
                        e.stopPropagation();
                     }}
                  >
                     Loopback
                  </button>
               </div>
            </div>

            <div className="row__" style={{ marginTop: '0px' }}>
               {isText && <TextEditor type={'response'} defaultText={description} onSuccess={handleTextAreaChange} />}
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
                              {/*<input className="inp" onChange={(e) => {*/}
                              {/*    setInit({*/}
                              {/*        ...init,*/}
                              {/*        currentData: {*/}
                              {/*            ...init.currentData,*/}
                              {/*            caption: e.target.value*/}
                              {/*        }*/}
                              {/*    })*/}
                              {/*    e.preventDefault();*/}
                              {/*}} placeholder="Caption here"/>*/}
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

                     {/*    {*/}
                     {/*        type !== "" ? (*/}
                     {/*                    <React.Fragment>*/}
                     {/*                        <div className="up-txt">*/}
                     {/*<span>*/}
                     {/*    <img alt={"#"} src={upload_icon}/>*/}
                     {/*</span>*/}
                     {/*                            <div className="txt">*/}
                     {/*                                Drag here OR*/}
                     {/*                            </div>*/}
                     {/*                        </div>*/}
                     {/*                        <div className="actions">*/}
                     {/*                            <label htmlFor="upload-input">*/}
                     {/*                                <div className="btn-upload">Upload File</div>*/}
                     {/*                            </label>*/}
                     {/*                            <input id="upload-input" className="upload-input" type="file"*/}
                     {/*                                   accept="/*"*/}
                     {/*                                   onChange={e => handleFileUpload(e, 2)}/>*/}

                     {/*                        </div>*/}
                     {/*                    </React.Fragment>*/}
                     {/*            ) :*/}
                     {/*            <FormControl component="fieldset">*/}
                     {/*                <FormLabel component="legend">Media Type</FormLabel>*/}
                     {/*                <RadioGroup*/}
                     {/*                    aria-label="gender"*/}
                     {/*                    name="controlled-radio-buttons-group"*/}
                     {/*                    value={type}*/}
                     {/*                    onChange={(e) => {*/}
                     {/*                        setInit({*/}
                     {/*                            ...init,*/}
                     {/*                            currentData: {*/}
                     {/*                                ...init.currentData,*/}
                     {/*                                type: e.target.value*/}
                     {/*                            }*/}
                     {/*                        })*/}
                     {/*                    }}*/}
                     {/*                >*/}
                     {/*                    {*/}
                     {/*                        getAllTypes?.map((t) => {*/}
                     {/*                            if (t !== "TEXT" && t !== "TEMPLATE")*/}
                     {/*                                return (*/}
                     {/*                                    <FormControlLabel value={t}*/}
                     {/*                                                      control={<Radio size="small"*/}
                     {/*                                                                      sx={{*/}
                     {/*                                                                          color: "#5841ce",*/}
                     {/*                                                                          '&.Mui-checked': {*/}
                     {/*                                                                              color: "#5841ce",*/}
                     {/*                                                                          },*/}
                     {/*                                                                      }}/>}*/}
                     {/*                                                      label={t}/>*/}
                     {/*                                )*/}
                     {/*                        })*/}
                     {/*                    }*/}
                     {/*                </RadioGroup>*/}
                     {/*            </FormControl>*/}
                     {/*    }*/}
                  </div>
               )}

               {isLoopBack && (
                  <div className="loop-back">
                     {/*<div className="txt-field">*/}
                     {/*    <div className="label">*/}
                     {/*        <div className="sub-txt">*/}
                     {/*            Select Trigger to Loop back*/}
                     {/*        </div>*/}
                     {/*    </div>*/}
                     {/*    <div className="input">*/}
                     {/*        <input className="inp" placeholder="Welcome Trigger"/>*/}
                     {/*    </div>*/}
                     {/*</div>*/}
                     {/*<TriggerCard*/}
                     {/*    onDelete={(obj) => {*/}
                     {/*        setInit({*/}
                     {/*            ...init,*/}
                     {/*            isConfirm: true,*/}
                     {/*            confirmationTxt: "Are You Sure? You want to delete this card",*/}
                     {/*            currentObject: {*/}
                     {/*                botId: obj.botId,*/}
                     {/*                trigger: obj.currentObject,*/}
                     {/*                userId: obj.userId*/}
                     {/*            }*/}
                     {/*        })*/}
                     {/*    }}*/}
                     {/*    botId={currentTriggerPreview.id}*/}
                     {/*    userId={userId}*/}
                     {/*    data={currentTriggerPreview}*/}
                     {/*/>*/}
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
                           <div className="sub-txt" style={{ fontFamily: 'Segoe UI Regular !important', fontWeight: 800, fontSize: '12px' }}>
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
            </div>
            <div className="row__" style={{ marginTop: '20px' }}>
               <div className="txt">Menu Option</div>
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
                                       overflowX: 'auto',
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
                                                   name: e.target.value,
                                                },
                                             });
                                          }}
                                       />
                                    ) : (
                                       m.name
                                    )}
                                 </button>

                                 <button
                                    className="btn-outline"
                                    style={{
                                       width: '220px',
                                       whiteSpace: 'nowrap',
                                       textAlign: 'center',
                                       overflowX: 'auto',
                                    }}
                                 >
                                    {init.updateMenus.selectedMenuId === m.main_id ? (
                                       <input
                                          type="text"
                                          defaultValue={m.label}
                                          onChange={(e) => {
                                             setInit({
                                                ...init,
                                                updateMenus: {
                                                   ...init.updateMenus,
                                                   label: e.target.value,
                                                },
                                             });
                                          }}
                                       />
                                    ) : (
                                       m.label
                                    )}
                                 </button>

                                 <button
                                    className="btn-outline"
                                    style={{
                                       width: '220px',
                                       whiteSpace: 'nowrap',
                                       textAlign: 'center',
                                       overflowX: 'auto',
                                    }}
                                 >
                                    {init.updateMenus.selectedMenuId === m.main_id ? (
                                       <Select
                                          labelId="demo-simple-select-standard-label"
                                          id="demo-simple-select-standard"
                                          value={m.api}
                                          onChange={(e) => {
                                             setInit({
                                                ...init,
                                                updateMenus: {
                                                   ...init.updateMenus,
                                                   api: e.target.value,
                                                },
                                             });
                                          }}
                                          label="Age"
                                       >
                                          {apiList?.map((tr) => {
                                             return <MenuItem value={tr.id}>{tr.name}</MenuItem>;
                                          })}
                                          <MenuItem value="0">Loop Back</MenuItem>
                                       </Select>
                                    ) : (
                                       m.api
                                    )}
                                 </button>

                                 {m.api == 0 ? (
                                    <button
                                       className="btn-outline"
                                       style={{
                                          width: '220px',
                                          whiteSpace: 'nowrap',
                                          textAlign: 'center',
                                          overflowX: 'auto',
                                       }}
                                    >
                                       {init.updateMenus.selectedMenuId === m.main_id ? (
                                          <Select
                                             labelId="demo-simple-select-standard-label"
                                             id="demo-simple-select-standard"
                                             value={m.loopback}
                                             onChange={(e) => {
                                                setInit({
                                                   ...init,
                                                   updateMenus: {
                                                      ...init.updateMenus,
                                                      loopback: e.target.value,
                                                   },
                                                });
                                             }}
                                             label="Age"
                                          >
                                             {updatedTriggersVal?.map((tr) => {
                                                return <MenuItem value={tr.id}>{tr.name}</MenuItem>;
                                             })}
                                          </Select>
                                       ) : (
                                          m.loopback
                                       )}
                                    </button>
                                 ) : (
                                    <button
                                       className="btn-outline"
                                       style={{
                                          width: '220px',
                                          whiteSpace: 'nowrap',
                                          textAlign: 'center',
                                          overflowX: 'auto',
                                       }}
                                    >
                                       {init.updateMenus.selectedMenuId === m.main_id ? (
                                          <input
                                             type="text"
                                             defaultValue={m.response}
                                             onChange={(e) => {
                                                setInit({
                                                   ...init,
                                                   updateMenus: {
                                                      ...init.updateMenus,
                                                      response: e.target.value,
                                                   },
                                                });
                                             }}
                                          />
                                       ) : (
                                          m.response
                                       )}
                                    </button>
                                 )}
                              </React.Fragment>
                              <div className="icon">
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
                                             className="btn-outlined"
                                             type="button"
                                             onClick={() => {
                                                setInit({
                                                   ...init,
                                                   updatePending: false,
                                                   currentData: {
                                                      ...init.currentData,
                                                      triggerMenus: init.currentData.triggerMenus.map((t) => {
                                                         if (t.id === m.id) {
                                                            t.name = init.updateMenus.name;
                                                            t.label = init.updateMenus.label;
                                                            t.response = init.updateMenus.response;
                                                            t.api = init.updateMenus.api;
                                                            t.loopback = init.updateMenus.loopback;
                                                         }

                                                         console.log(t);
                                                         return t;
                                                      }),
                                                   },
                                                });
                                                // dispatch(UpdateTriggerMenusText({
                                                //     id: init.updateMenus.selectedMenuId,
                                                //     text: init.updateMenus.text,
                                                // }));
                                             }}
                                          >
                                             Update
                                          </button>
                                       )}
                                       {init.updateMenus.selectedMenuId === m.main_id && (
                                          <img
                                             alt={'#'}
                                             src={trash_icon}
                                             onClick={() => {
                                                setInit({
                                                   ...init,
                                                   updateMenus: {
                                                      selectedMenuId: null,
                                                      text: '',
                                                   },
                                                });
                                             }}
                                          />
                                       )}
                                    </React.Fragment>
                                 ) : (
                                    isData && (
                                       <EditOutlined
                                          style={{
                                             color: '#363a77',
                                             margin: '0 0.5rem',
                                          }}
                                          onClick={() => {
                                             setInit({
                                                ...init,
                                                updateMenus: {
                                                   selectedMenuId: m.main_id,
                                                   name: m.name,
                                                   api: m.api,
                                                   response: m.response,
                                                   loopback: m.loopback,
                                                   label: m.label,
                                                   text: '',
                                                },
                                             });
                                          }}
                                       />
                                    )
                                 )}

                                 <img
                                    alt={'#'}
                                    src={delete_icon}
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
                              </div>
                           </div>
                        );
                     })}
               </div>

               <div className="row">
                  <div className="col-sm-6 mb-3">
                     <div className="txt-field">
                        <div className="label">
                           <div className="sub-txt">Option Key</div>
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
                        </div>
                     </div>
                  </div>
                  <div className="col-sm-6 mb-3">
                     <div className="txt-field">
                        <div className="label">
                           <div className="sub-txt">Option Label</div>
                        </div>
                        <div className="input">
                           <input
                              className="inp"
                              value={triggerOptLabel}
                              placeholder="Write Trigger Option (if any)"
                              onChange={(e) => {
                                 setInit({
                                    ...init,
                                    triggerOptLabel: e.target.value,
                                 });
                              }}
                           />
                        </div>
                     </div>
                  </div>
                  <div className="col-sm-6">
                     <div className="txt-field">
                        <div className="label">
                           <div className="sub-txt">API</div>
                        </div>
                        <div className="input custom_borderTop" style={{ display: 'block' }}>
                           <Select
                              labelId="demo-simple-select-standard-label"
                              id="demo-simple-select-standard"
                              className="borderField"
                              value={triggerOptApi}
                              onChange={(e) => {
                                 setInit({
                                    ...init,
                                    triggerOptApi: e.target.value,
                                 });
                              }}
                              label="API"
                           >
                              {apiList?.map((tr) => {
                                 return <MenuItem value={tr.value}>{tr.label}</MenuItem>;
                              })}
                           </Select>
                        </div>
                     </div>
                  </div>
                  <div className="col-sm-6">
                     <div className="txt-field">
                        <div className="label">
                           <div className="sub-txt">Response</div>
                        </div>
                        <div className="input custom_borderTop" style={{ display: 'block' }}>
                           {triggerOptApi == 0 ? (
                              <Select
                                 labelId="demo-simple-select-standard-label"
                                 id="demo-simple-select-standard"
                                 className="borderField"
                                 value={optLoopBack}
                                 onChange={(e) => {
                                    setInit({
                                       ...init,
                                       optLoopBack: e.target.value,
                                    });
                                 }}
                                 label="Age"
                              >
                                 {updatedTriggersVal?.map((tr) => {
                                    return <MenuItem value={tr.id}>{tr.name}</MenuItem>;
                                 })}
                              </Select>
                           ) : (
                              <input
                                 className="inp"
                                 value={triggerOptResponse}
                                 placeholder="Response"
                                 onChange={(e) => {
                                    setInit({
                                       ...init,
                                       triggerOptResponse: e.target.value,
                                    });
                                 }}
                              />
                           )}
                        </div>
                     </div>
                  </div>
               </div>

               <div className="add-btn api_button_section d-flex align-items-end justify-content-end">
                  <button className="btn-outlined btnPadding" type="button" onClick={handleAddOptions}>
                     Add Option
                  </button>

                  <button type="button btnPadding" className="btn btn-danger" onClick={saveCondition}>
                     Save Condition
                  </button>
               </div>

               <div className="add-btn"></div>
            </div>
         </div>
      </>
   );
};

export default ConditionList;
