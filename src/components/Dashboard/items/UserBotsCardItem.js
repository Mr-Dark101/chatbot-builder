import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import defaultIcon from '../../../assets/boticon.svg';
import { addingBreadcrumb, GetCurrentBot, SetUpdateBotData } from '../slices/dashboard.slice';
import $ from 'jquery';
import { STRINGS } from '../../../utils/base';
import MenusComponent from '../../../SharedComponent/Menus';
import { getAllTriggersTypes, getBotTriggersRecursive, apiList, formList } from '../../../SharedComponent/AddTriggerComposer/slices/addTrigger.slice';
import { PublishedBot, addTemplateBotSlice } from '../../BuilderWorkSpace/slices/workSpace.slice';
import { Avatar as Av } from '@mui/material';

import whatsAppIcon from '../../../assets/Image 1/logos_whatsapp-icon.svg';
import MessengerIcon from '../../../assets/Image 1/logos_messenger.svg';
import InstagramIcon from '../../../assets/insta.png';
import GoogleIcon from '../../../assets/google.png';
import { Tooltip } from '@mui/material';


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

const menusOptionsTemp = [
   { text: 'Use this Template', value: 7 },
   { text: 'Preview', value: 8 },
];

const UserBotsCardItem = (props) => {
   //console.log('Props: ' + JSON.stringify(props));
   let { data, onDelete, temp, onAddBot,onPublishCustom } = props;
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
         menusOptions[1].text = 'Unpublish';
         menusOptions[1].value = 4;
      } else {
         menusOptions[1].text = 'Publish';
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

    const alertClose = () => {
      setInit({
         ...init,
         isAlert: false,
         isUnpublish: false,
         isPublish: false,
         isConfirm: false,
         isUpdatedList: true,
         confirmationTxt: '',
      });
      //window.location.reload();
   };

   const handleActivateBot = (obj) => {
      
      
      //dispatch(PublishedBot(obj));
      // dispatch(DeleteUserBot(obj));
   };

   const addTemplateBot = (obj) => {
      dispatch(addTemplateBotSlice(obj));
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
            onPublishCustom({
               id: id,
               userId,
            })
           // handleActivateBot({ botId: id, isPublished: true, userId });
            break;
         case 4:
            //in-activate-bot
            onPublishCustom({
               id: id,
               userId,
            })
            //handleActivateBot({ botId: id, isPublished: false, userId });
            break;

         case 7:
            //in-activate-bot
            onAddBot({ id: id, isPublished: false, userId });
            // addTemplateBot({ botId: id, isPublished: false, userId });
            break;
         case 8:
            //in-activate-bot
            handleBotOpen(id);
            // addTemplateBot({ botId: id, isPublished: false, userId });
            break;
         default:
            return;
      }
   };

   const loadIcon = (channels) => {
      const channelsData = JSON.parse(channels);
      return channelsData.map((item, index) => {
         let iconName = whatsAppIcon;
         if (item == 'whatsapp') {
            iconName = whatsAppIcon;
            return <img className="img-responsive" alt={item} src={iconName} />;
         }
         if (item == 'messenger') {
            iconName = MessengerIcon;
            return <img className="img-responsive" alt={item} src={iconName} style={{ maxWidth: '20px', marginLeft: '5px' }} />;
         }
         if (item == 'googlemsg') {
            iconName = GoogleIcon;
            return <img className="img-responsive" alt={item} src={iconName} style={{ marginLeft: '5px' }} />;
         }
         if (item == 'instagram') {
            iconName = InstagramIcon;
            return <img className="img-responsive" alt={item} src={iconName} style={{ marginLeft: '5px' }} />;
         }
      });
   };

   return (
      <>
      
      <Tooltip title={description}>
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
                     {temp != undefined ? <span class="currentPlan" style={{ opacity: '0' }}></span> : data.published == 1 ? <span class="currentPlan currentPlan_bg">Published</span> : <span class="currentPlan">Draft</span>}
                     {data.type_id == 3 ? (<span class="currentPlan currentPlan_blue">GPT</span>) : null}

                     {data.type_id == 4 ? (<span class="currentPlan currentPlan_blue">GPT Hybrid</span>) : null}
                     
                     <div className="icon" onClick={handleMoreOpt}>
                        {temp ? <MenusComponent options={menusOptionsTemp} onSelect={handleMenuSelect} /> : <MenusComponent options={menusOptions} onSelect={handleMenuSelect} />}
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
                  <div className="txt center" style={{ fontWeight: 800 }}>
                     {name}
                  </div>
                  <div
                     className={`sub-txt botDescription`}
                     style={{
                        whiteSpace: 'pre-wrap',
                        fontSize: '11px',
                        margin: '5px 0 20px',
                        color: '#000',
                        textAlign: 'left',
                        padding: '0px 16px 0 0px',
                        display: 'block',
                        width: '100%',
                     }}
                  >
                     {temp == undefined ? description : phoneNumber}
                  </div>
                  <div className="channel_iconBox">{temp == undefined ? loadIcon(data.channels) : ''}</div>
                  <div
                     className={`sub-txt ${temp !== undefined && 'temp'}`}
                     style={{
                        whiteSpace: temp !== undefined && 'pre-wrap',
                        fontSize: '11px',
                        marginTop: '5px',
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
      </Tooltip>
      </>
   );
};

export default UserBotsCardItem;
