import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import defaultIcon from '../../../assets/boticon.svg';
import { addingBreadcrumb, GetCurrentBot, SetUpdateBotData } from '../slices/dashboard.slice';
import $ from 'jquery';
import { STRINGS } from '../../../utils/base';
import MenusComponent from '../../../SharedComponent/Menus';
import { getAllTriggersTypes, getBotTriggersRecursive, apiList, formList } from '../../../SharedComponent/AddTriggerComposer/slices/addTrigger.slice';
import { PublishedBot } from '../../BuilderWorkSpace/slices/workSpace.slice';
import { Avatar as Av } from '@mui/material';

const defaultState = {
   openOpt: false,
   openComposer: false,
   currentUser: 0,
   selected: false,
};

const menusOptions = [
   { text: 'Edit', value: 1 },
   { text: 'Deploy', value: 3 },
   { text: 'Delete', value: 2 },
];

const UserBotsCardItem = (props) => {
   //console.log('Props: ' + JSON.stringify(props));
   let { data, onDelete, temp } = props;
   let { id, name, userId, description, phoneNumber, published } = data;
   const [init, setInit] = useState(defaultState);
   let { selected } = init;
   const dispatch = useDispatch();
   const history = useHistory();

   useEffect(() => {
      $(document).ready(() => {
         $('body').on('click', (e) => {
            setInit({
               ...init,
               openOpt: false,
            });
         });
      });
      if (published) {
         menusOptions[1].text = 'Deployed';
         menusOptions[1].value = 4;
      } else {
         menusOptions[1].text = 'Deploy';
         menusOptions[1].value = 3;
      }
   }, [init, published]);

   const handleMoreOpt = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setInit({
         ...init,
         openOpt: true,
      });
   };

   const handleActivateBot = (obj) => {
      dispatch(PublishedBot(obj));
      // dispatch(DeleteUserBot(obj));
   };
   const handleUpdate = (obj) => {
      dispatch(SetUpdateBotData(obj));
   };

   const handleBotOpen = (id) => {
      history.push(`${STRINGS.ROUTES.BWS}/${id}`);
      dispatch(GetCurrentBot(data));
      // dispatch(getBotTriggers(id))
      dispatch(getBotTriggersRecursive(id));
      dispatch(getAllTriggersTypes(id));
      dispatch(apiList(data.ORG_UNIT_ID));
      dispatch(formList(data.ORG_UNIT_ID));
      dispatch(addingBreadcrumb({ label: data.name, path: `${STRINGS.ROUTES.BWS}/${id}` }));
      // dispatch(getBotTriggersRecursive(18))
   };

   const handleMenuSelect = (value) => {
      switch (value) {
         case 1:
            handleUpdate(data);
            break;
         case 2:
            onDelete({
               id: id,
               userId,
            });
            break;
         case 3:
            handleActivateBot({ botId: id, isPublished: true, userId });
            break;
         case 4:
            //in-activate-bot
            handleActivateBot({ botId: id, isPublished: false, userId });
            break;
         default:
            return;
      }
   };

   return (
      <div
         className={`card_box ${selected && 'on'}`}
         onMouseOver={() => {
            setInit({
               ...init,
               selected: true,
            });
         }}
         onMouseOut={() => {
            setInit({
               ...init,
               selected: false,
            });
         }}
         onClick={() => handleBotOpen(id)}
      >
         <div className="card-content bots-box flex-column">
            {/*<div className="card-start">*/}
            {/*    <div className="card-circle on">*/}
            {/*        <Av*/}
            {/*            size={34}*/}
            {/*            src={robotic_icon}*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*</div>*/}
            {
               <div className="card-ends">
                  <div className="icon" onClick={handleMoreOpt}>
                     <MenusComponent options={menusOptions} onSelect={handleMenuSelect} />
                  </div>
               </div>
            }

            <div className="card-start justify-content-center">
               <div
                  className="card-circle on"
                  style={{
                     backgroundColor: 'initial',
                     border: 'none',
                     width: '60px',
                     height: '60px',
                  }}
               >
                  <Av sx={{ width: 50, height: 50 }} src={defaultIcon} />
               </div>
            </div>
            <div
               className="card-center align-items-center"
               style={{
                  maxWidth: temp !== undefined && '230px',
               }}
            >
               <div className="txt center" style = {{fontWeight: 800}}>{name}</div>
               <div
                  className={`sub-txt ${selected && 'on'} ${temp !== undefined && 'temp'}`}
                  style={{
                     whiteSpace: temp !== undefined && 'pre-wrap',
                  }}
               >
                  {temp !== undefined ? description : phoneNumber}
               </div>
               {/*<div className={`sub-txt ${selected && "on"} ${temp !== undefined && "temp"}`}*/}
               {/*     style={{*/}
               {/*         whiteSpace: temp !== undefined && "pre-wrap",*/}
               {/*     }}*/}
               {/*>{temp !== undefined ?*/}
               {/*    data.id === 1465 ?*/}
               {/*        "Welcome visitors and send them directly to your live stream."*/}
               {/*        : data.id === 1467 ? "Send promotion and your company profile details or chat with your live agent." :*/}
               {/*        data.id === 1472 && "Give visitors the choice to search your knowledge base or chat with your live agent."*/}
               {/*    : phoneNumber}</div>*/}
            </div>
         </div>
      </div>
   );
};

export default UserBotsCardItem;
