import React, { useEffect, useState } from 'react';

// import TriggerCard from "../TreeComponent/items/TriggerCard";

import ByTypeComposer from './byTypeComposer';
import AlertModal from '../../SharedComponent/ConfirmModal/AlertModal';
import {Tooltip} from '@mui/material';

const AddTriggerComposer = (props) => {
   const [triggerType, setTriggerType] = useState('M');

   const [btnMessageStyle, setBtnMessageStyle] = useState({ width: '100%' });
   const [btnApiStyle, setBtnApiStyle] = useState({ width: '100%' });
   const [btnFormStyle, setBtnFormStyle] = useState({ width: '100%' });
   const defaultState = {
      isAlert: false,
      openComposer: false,
      openChatBot: false,
      data: [],
      getAllTypes: [],
      currentTriggerData: {},
      isUpdatedList: false,
      confirmationTxt: '',
      confirmationInfo: [],
   };
   const [init, setInit] = useState(defaultState);
   let { currentTriggerData, openChatBot, getAllTypes, isAlert, isUpdatedList, confirmationTxt, confirmationInfo } = init;

   useEffect(() => {
      let plan = localStorage.getItem('chatbot_plan');
      if (plan.includes('ADVANCED')) {
         document.getElementById('lockimage').style.display = 'none';
      } else {
         document.getElementById('lockimage').style.display = 'unset';
      }
      let tVal = 'M';
      setBtnMessageStyle({ backgroundColor: '#363a77', width: '100%', color: '#fff', borderRadius: '5px 5px 0px 0px' });
      setBtnApiStyle({ backgroundColor: '#fff', width: '100%', color: '#000', borderRadius: '5px 5px 0px 0px' });
      setBtnFormStyle({ backgroundColor: '#fff', width: '100%', color: '#000', borderRadius: '5px 5px 0px 0px' });
      if (props.trigger.currentTriggerData.toTrigger) {
         tVal = props.trigger.currentTriggerData.toTrigger.triggerType;

         meClick(tVal);
         // setBtnMessageStyle({backgroundColor:'#fff',width:'100%',color:'#000',borderRadius: '5px 5px 0px 0px'})
         // setBtnApiStyle({backgroundColor:'#10163A',width:'100%',color:'#fff',borderRadius: '5px 5px 0px 0px'})
         // setBtnFormStyle({backgroundColor:'#fff',width:'100%',color:'#000',borderRadius: '5px 5px 0px 0px'})
      }
      setTriggerType(tVal);
   }, []);

   const meClick = (param) => {
      if (param == 'M') {
         setBtnMessageStyle({ backgroundColor: '#363a77', width: '100%', color: '#fff', borderRadius: '5px 5px 0px 0px' });
         setBtnApiStyle({ backgroundColor: '#fff', width: '100%', color: '#000', borderRadius: '5px 5px 0px 0px' });
         setBtnFormStyle({ backgroundColor: '#fff', width: '100%', color: '#000', borderRadius: '5px 5px 0px 0px' });
         setTriggerType(param);
      } else if (param == 'A') {
         let plan = localStorage.getItem('chatbot_plan');
       
         if (plan.includes('ADVANCED')) {
            console.log('Advanced Version');
            setBtnMessageStyle({ backgroundColor: '#fff', width: '100%', color: '#000', borderRadius: '5px 5px 0px 0px' });
            setBtnApiStyle({ backgroundColor: '#363a77', width: '100%', color: '#fff', borderRadius: '5px 5px 0px 0px' });
            setBtnFormStyle({ backgroundColor: '#fff', width: '100%', color: '#000', borderRadius: '5px 5px 0px 0px' });
            setTriggerType(param);
         } else {

         }
      } else if (param == 'F') {
         setBtnMessageStyle({ backgroundColor: '#fff', width: '100%', color: '#000', borderRadius: '5px 5px 0px 0px' });
         setBtnApiStyle({ backgroundColor: '#fff', width: '100%', color: '#000', borderRadius: '5px 5px 0px 0px' });
         setBtnFormStyle({ backgroundColor: '#363a77', width: '100%', color: '#fff', borderRadius: '5px 5px 0px 0px' });
         setTriggerType(param);
      }
   };


 

   const alertClose = () => {
      setInit({
         ...init,
         isAlert: false,
         isUpdatedList: true,
         confirmationTxt: '',
      });
   };

   return (
      <>
         <ul className="right_bar_top_section activeUl">
            <AlertModal visible={isAlert} handleOk={alertClose} confirmLoading={!isUpdatedList} modalText={confirmationTxt} modalInfo={confirmationInfo} handleCancel={alertClose} />
            <li>
               <button onClick={() => meClick('M')} className="btn btn-block {btn-primary}" style={btnMessageStyle}>
                  Message
               </button>
            </li>
            <li>
               
               <button  onClick={() => meClick('A')} className="btn btn-block btn-secondry" style={btnApiStyle}>
                  API <Tooltip title= {"You don\'t have access to this feature. Please contact sales to upgrade your plan."}><span id ="lockimage" className="lockIcon"><i class="fa fa-lock"></i></span></Tooltip>
               </button>
            </li>

            <li>
               <button onClick={() => meClick('F')} className="btn btn-block btn-secondry" style={btnFormStyle}>
                  Form
               </button>
            </li>
         </ul>

         <ByTypeComposer props={props} triggerType={triggerType} />
      </>
   );
};

export default AddTriggerComposer;
