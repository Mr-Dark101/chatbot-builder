import React, { useEffect, useState } from 'react';
import Tree from 'react-d3-tree';
import AddTriggerButton from '../Items/AddTriggerButton/addTriggerButton';
import { useDispatch, useSelector } from 'react-redux';
import chat_icon from '../../assets/whatsapp-starter.svg';
import end_icon from '../../assets/flow-end.svg';
import { DeleteBotTrigger, openTriggerCard } from '../AddTriggerComposer/slices/addTrigger.slice';
import TriggerCard from './items/TriggerCard';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import { Tooltip } from '@mui/material';
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

import { getAllTriggersTypes, getBotTriggersHistoryDown,getBotTriggersHistoryUp, apiList, formList } from '../../SharedComponent/AddTriggerComposer/slices/addTrigger.slice';
import $ from 'jquery';

const BlueOnGreenTooltip = styled(({ className, ...props }) => (
   <Tooltip {...props} componentsProps={{ tooltip: { className: className } }} />
 ))(`
     color: white;
     background-color: black;
 `);
let orgChart2 = {};

const defaultState = {
   isConfirm: false,
   confirmationTxt: '',
   currentObject: {
      botId: 0,
      trigger: {},
      userId: 0,
   },
};
let updatedTriggers = [];
const D3Tree = (props) => {
   let {
      data: { botId, userId,type_id }, saveHistory,
   } = props;
   let { trigger } = useSelector(({ Reducers }) => Reducers);
   const [init, setInit] = useState(defaultState);
   let { isConfirm, confirmationTxt, currentObject } = init;
   let dispatch = useDispatch();
   let { successList, triggersList, isUpdatedList, isZoomAble,last_id,historyUpdate } = trigger;
   let [orgChart, setChart] = useState(orgChart2);
   const [zoomValue, setZoomValue] = useState(0.8);
   const getMenus = (item) => {
      if (item.toTrigger !== null && item.toTrigger.menus.length > 0) {
         return {
            ...item,
            children: [...item.toTrigger.menus].map((i) => getMenus(i)),
         };
      } else {
         return item;
      }
   };

   useEffect(() => {
      if (successList) {

        
         // console.log("triggersListObj___", triggersList)
         // console.log(triggersList)
         //console.log('dd')
         if(historyUpdate){


            
            if (triggersList.length > 0) {
                  
                  updatedTriggers = []
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
                                 sort_order:mn.sort_order
                              };
                           }),
                     });

                     tl.menus.map((m) => {
                        setMenus(m);
                     });
                     return tl;
                  });

                  

                  
            }
            console.log(updatedTriggers)
            saveHistory(updatedTriggers);
         }
         
         let normal = triggersList?.map((d) => {
            if (d.startTrigger) {
               return {
                  ...d,
                  children: d?.menus.map((m) => getMenus(m)),
               };
            }
         });
           //console.log(normal)
         // console.log("triggersListObj>>___", normal[0])
         // console.log("triggersListObj>>___", {
         //     name: "Welcome",
         //     children: [...normal]
         // })
         setChart(
            normal.length > 0
               ? {
                    name: 'Welcome',
                    isGrandParent: true,
                    children: [...normal],
                 }
               : {
                    name: 'Welcome',
                    isGrandParent: true,
                    children: [],
                 }
         );
      }
   }, [successList, triggersList,historyUpdate]);


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

   const renderForeignObjectNode = (props) => {
      let { nodeDatum, toggleNode, foreignObjectProps } = props;

      if (nodeDatum.isGrandParent) {
         foreignObjectProps.x = -368;
         foreignObjectProps.y = -95;
      } else {
         foreignObjectProps.x = -250;
         foreignObjectProps.y = -105;
      }
      //console.log(foreignObjectProps)
      return (
         <g>
            {/* `foreignObject` requires width & height to be explicitly set. */}
            <foreignObject height="100%" {...foreignObjectProps}>
               
               {nodeDatum.isGrandParent !== undefined && (
                  <div className="tree-head">
                     <React.Fragment>
                        <div className="start-icon d-none">
                           {/* <img alt={"#"} src={chat_icon}/> */}
                           <i class="fa fa-whatsapp" style={{ fontSize: '32px' }} aria-hidden="true"></i>
                        </div>
                        <AddTriggerButton
                           addTrigger={() => {
                              dispatch(openTriggerCard({ open: true, isChild: null, childBotId: null }));
                           }}
                        />
                     </React.Fragment>
                     {triggersList.length === 0 && (
                        <div className="end-icon">
                           <img alt={'#'} src={end_icon} />
                        </div>
                     )}
                    
                  </div>
               )}
               {nodeDatum.startTrigger !== undefined && nodeDatum.startTrigger ? (
                  <TriggerCard
                     onDelete={(obj) => {
                        setInit({
                           ...init,
                           isConfirm: true,
                           confirmationTxt: 'Are you sure you want to delete this trigger?',
                           currentObject: {
                              botId: obj.botId,
                              trigger: obj.currentObject,
                              userId: obj.userId,
                           },
                        });
                     }}
                     botId={botId}
                     userId={userId}
                     data={nodeDatum}
                     type_id={type_id}
                  />
               ) : (
                  nodeDatum.toTrigger !== null &&
                  nodeDatum.isGrandParent === undefined && (
                     <TriggerCard
                        onDelete={(obj) => {
                           setInit({
                              ...init,
                              isConfirm: true,
                              confirmationTxt: 'Are you sure you want to delete this trigger?',
                              currentObject: {
                                 botId: obj.botId,
                                 trigger: obj.currentObject,
                                 userId: obj.userId,
                              },
                           });
                        }}
                        botId={botId}
                        type_id={type_id}
                        userId={userId}
                        data={nodeDatum}
                     />
                  )
               )}
               {nodeDatum.toTrigger === undefined ||
                  (nodeDatum.toTrigger === null && (
                     <div className="tree-footer">
                        <React.Fragment>
                           <div className="start-icon d-none">
                              {/* <img alt={"#"} src={chat_icon}/> */}
                              <i class="fa fa-whatsapp" style={{ fontSize: '32px', marginBottom: '45px' }} aria-hidden="true"></i>
                           </div>
                           <AddTriggerButton
                              addTrigger={() => {
                                 // dispatch(openUpdateTriggerCard({
                                 //     open: true,
                                 //     object: nodeDatum
                                 // }))
                                 console.log('adding__', {
                                    open: true,
                                    isChild: true,
                                    childBotId: nodeDatum.toTriggerId,
                                 });
                                 dispatch(
                                    openTriggerCard({
                                       open: true,
                                       isChild: true,
                                       childBotId: nodeDatum.toTriggerId,
                                    })
                                 );
                              }}
                           />
                           <div className="end-icon">
                              <img alt={'#'} src={end_icon} />
                           </div>
                        </React.Fragment>
                     </div>
                  ))}
            </foreignObject>
         </g>
      );
   };

   const handleSubmitTrigger = () => {
      if (currentObject.botId !== 0 && !$.isEmptyObject(currentObject.trigger) && currentObject.userId !== 0) {
         dispatch(
            DeleteBotTrigger({
               botId: currentObject.botId,
               triggerId: currentObject.trigger.toTrigger !== undefined ? currentObject.trigger.toTriggerId : currentObject.trigger.id,
               userId: currentObject.userId,
            })
         );
         setInit({
            ...init,
            isConfirm: false,
            confirmationTxt: '',
            currentObject: {
               botId: 0,
               trigger: {},
               userId: 0,
            },
         });
      }
   };
   const confirmClose = () => {
      setInit({
         ...init,
         isConfirm: false,
         confirmationTxt: '',
         currentObject: {
            botId: 0,
            trigger: {},
            userId: 0,
         },
      });
   };

   const zoomIn = () => {
      setZoomValue(zoomValue + 0.1);
   };

   const zoomOut = () => {
      setZoomValue(zoomValue - 0.1);
   };


   const redo = (bot_id) => {
      dispatch(getBotTriggersHistoryUp(bot_id,last_id));
   };


   const undo = (bot_id) => {
      
      dispatch(getBotTriggersHistoryDown(bot_id,last_id));
   };

   const nodeSize = { x: 620, y: 350 };
   const foreignObjectProps = { width: nodeSize.x, height: 700, x: -250, y: -105 };

   return (
      <div className="d3tree-container grey-wrapper">
         <ConfirmModal visible={isConfirm} handleOk={handleSubmitTrigger} modalTitle="Delete trigger" okText={'Delete'} confirmLoading={false} modalText={confirmationTxt} handleCancel={confirmClose} />
         {isUpdatedList && (
            <Tree
               data={orgChart}
               nodeSize={nodeSize}
               depthFactor={0}
               zoom={zoomValue}
               scaleExtent={{ max: 1, min: 0 }}
               translate={{ x: 700, y: 100 }}
               zoomable={isZoomAble}
               separation={{ nonSiblings: 1, siblings: 2 }}
               renderCustomNodeElement={(rd3tProps) => renderForeignObjectNode({ ...rd3tProps, foreignObjectProps })}
               branchNodeClassName={'node-root'}
            />
         )}
         <a
            href="javascript:void(0)"
            class="btn position-absolute bottom-0 start-0"
            style={{ height: '30px', marginBottom: '60px', marginLeft: '20px', backgroundColor: '#ffffff', border: '1px solid #ffffff' }}
            onClick={() => {
               zoomIn();
            }}
         >
            <i class="fa fa-plus" aria-hidden="true"></i>
         </a>
         <div class="s-tags">

            
            {(last_id > 0) ? (


                <div class="tag-box" >
               <a
                  href="javascript:void(0)"
                  class="btn position-absolute bottom-0 start-0"
                  style={{ height: '30px', marginBottom: '140px', marginLeft: '20px', backgroundColor: '#ffffff', border: '1px solid #ffffff' }}
                  onClick={() => {
                     redo(botId);
                  }}
               >
                  <i class="fa fa-repeat" aria-hidden="true"></i>
               </a>
            </div>

            ) : null}
          
           
           <BlueOnGreenTooltip title="Undo">
               <div class="tag-box">
                  <a
                     href="javascript:void(0)"
                     class="btn position-absolute bottom-0 start-0"
                     style={{ height: '30px', marginBottom: '100px', marginLeft: '20px', backgroundColor: '#ffffff', border: '1px solid #ffffff' }}
                     onClick={() => {
                        undo(botId);
                     }}
                  >
                     <i class="fa fa-undo" aria-hidden="true"></i>
                  </a>
               </div>
            </BlueOnGreenTooltip>
             
            <div class="tag-box">
               <a
                  href="javascript:void(0)"
                  class="btn position-absolute bottom-0 start-0"
                  style={{ height: '30px', marginBottom: '20px', marginLeft: '20px', backgroundColor: '#ffffff', border: '1px solid #ffffff' }}
                  onClick={() => {
                     zoomOut();
                  }}
               >
                  <i class="fa fa-minus" aria-hidden="true"></i>
               </a>
            </div>

            <div class="tag-box">
               <a
                  href="https://help.eocean.net/knowledge/how-to-build-a-lead-generation-chatbot-for-video-tutorial"
                  target="_blank"
                  class="btn position-absolute bottom-0 start-0"
                  style={{ height: '30px', marginBottom: '20px', marginLeft: '70px', backgroundColor: '#ffffff', fontWeight: 800, border: '1px solid #ffffff' }}
               >
                  Watch tutorial
               </a>
            </div>
         </div>
      </div>
   );
};

export default D3Tree;
