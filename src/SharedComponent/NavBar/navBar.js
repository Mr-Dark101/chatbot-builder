import React from 'react';
import DrawerComponent from '../Drawer';
import { useDispatch, useSelector } from 'react-redux';
import { toggleNavbar } from './slices/navbar.slice';
import home_icon from '../../assets/Image 1/DCLogoVector2.svg';
import analysis_icon from '../../assets/Image 1/analytics.svg';
import chat_icon from '../../assets/Image 1/chat-manager.svg';
import chatBotFace_icon from '../../assets/Image 1/chatbot.svg';
import template_icon from '../../assets/Image 1/template.svg';
import share_icon from '../../assets/Image 1/share.svg';
import chatbot_builder from '../../assets/Image 1/chatbot-builder.svg';
import teams_icon from '../../assets/Image 1/campign-manager.svg';
import user_icon from '../../assets/Image 1/user.svg';
import team_icon from '../../assets/Image 1/team.svg';
import users_icon from '../../assets/Image 1/whatsapp.svg';
import channel_icon from '../../assets/Image 1/channel.svg';
import tags_icon from '../../assets/Image 1/contacts.svg';
import star_icon from '../../assets/Image 1/star.png';
import billing_icon from '../../assets/Image 1/billing.svg';
import setting_icon from '../../assets/Image 1/settings.svg';
import { STRINGS } from '../../utils/base';

import { Link } from 'react-router-dom';

const navbarData = [
   {
      icon: home_icon,
      value: 'Home',
      isBlank: false,
      route: `${STRINGS.ROUTES.ROOT}?org=${localStorage.getItem('userId')}`,
   },
   {
      icon: analysis_icon,
      value: 'Insights',
      isBlank: true,
      route: `http://localhost:8090/eoceanwab/customerstatistics/index`,
   },
   {
      icon: chat_icon,
      value: 'Chat Manager',
      isBlank: true,
      route: `http://localhost:8090/eoceanwab/chatmanager/index`,
   },
   {
      icon: chatbot_builder,
      value: 'Chatbot builder',
      isBlank: true,
      route: `http://localhost:8090/eoceanwab/chatbotbuilder/index`,
   },
   {
      icon: channel_icon,
      value: 'Channels',
      isBlank: true,
      route: `https://eoceanwabaqa.com/eoceanwab/channels/index`,
   },
   {
      icon: teams_icon,
      value: 'Profile Settings',
      isBlank: true,
      route: ` http://localhost:8090/eoceanwab/Settings/profilesettings`,
   },
   {
      icon: users_icon,
      value: 'Settings',
      isBlank: false,
      route: `${STRINGS.ROUTES.SETTINGS}?org=${localStorage.getItem('userId')}`,
   },

   {
      icon: tags_icon,
      value: "What's New",
      isBlank: true,
      route: `http://localhost:8090/eoceanwab/whatsnew/index`,
   },
];

const NavBar = () => {
   const navbar = useSelector(({ Reducers }) => Reducers.navbar);
   let { open } = navbar;

   const dispatch = useDispatch();

   const toggleDrawer = () => {
      dispatch(toggleNavbar(false));
   };

   // return (

   //     <>

   //     <DrawerComponent open={open} data={navbarData} direction={"left"} toggleDrawer={toggleDrawer}/>
   //     </>

   // )
   return (
      <div className="nav-bar-cont left_navbar">
         <div className="left_bar_top_section">
            <div className="nLink-group">
               <Link to={`${STRINGS.ROUTES.ROOT}?org=${localStorage.getItem('userId')}`} className="nLink">
                  <div className="icon">
                     <img alt={'#'} src={home_icon} margin-top="20px" height={'42.4285rem'} width={'42.4285rem'} font-size={'1.45rem'} margin-right={'1.1rem'} />
                  </div>
                  <div />
               </Link>
            </div>

            <div className="nLink-group">
               <Link to={'https://eoceanwabaqa.com/eoceanwab/holisticanalysis/index'} target="_blank" rel="noopener noreferrer">
                  <a href="https://eoceanwabaqa.com/eoceanwab/holisticanalysis/index">
                     <div className="icon">
                        <img alt={'#'} src={analysis_icon} height={'23.4285rem'} width={'23.4285rem'} font-size={'1.45rem'} margin-right={'1.1rem'} />
                     </div>
                     <div />
                  </a>
               </Link>
            </div>

            <div className="nLink-group">
               <Link to={'https://eoceanwabaqa.com/eoceanwab/chatmanager/index'} target="_blank" rel="noopener noreferrer" className="nLink">
                  <a href="https://eoceanwabaqa.com/eoceanwab/chatmanager/index">
                     <div className="icon">
                        <img alt={'#'} src={chat_icon} height={'23.4285rem'} width={'23.4285rem'} font-size={'1.45rem'} margin-right={'1.1rem'} />
                     </div>
                     <div />
                  </a>
               </Link>
            </div>

            <div className="nLink-group">
               <Link to={`https://eoceanwabaqa.com/eoceanwab/campaignmessages/index?msgType=`} target="_blank" rel="noopener noreferrer" className="nLink active">
                  <a href="https://eoceanwabaqa.com/eoceanwab/campaignmessages/index?msgType=">
                     <div className="icon">
                        <img alt={'#'} src={template_icon} height={'23.4285rem'} width={'23.4285rem'} font-size={'1.45rem'} margin-right={'1.1rem'} />
                     </div>
                     <div />{' '}
                  </a>
               </Link>
            </div>
            <div className="nLink-group">
               <Link to={`https://eoceanwabaqa.com/eoceanwab/segments/index?segmentName=&segmentType=&createdOn=`} target="_blank" rel="noopener noreferrer" className="nLink">
                  <a href="https://eoceanwabaqa.com/eoceanwab/segments/index?segmentName=&segmentType=&createdOn=">
                     <div className="icon">
                        <img alt={'#'} src={teams_icon} height={'23.4285rem'} width={'23.4285rem'} font-size={'1.45rem'} margin-right={'1.1rem'} />
                     </div>
                     <div />
                  </a>
               </Link>
            </div>
            <div className="nLink-group">
               <Link to={`https://eoceanwabaqa.com/eoceanwab/WhatsappManager/profilesettings`} target="_blank" rel="noopener noreferrer" className="nLink">
                  <a href="https://eoceanwabaqa.com/eoceanwab/WhatsappManager/profilesettings">
                     <div className="icon">
                        <img alt={'#'} src={users_icon} height={'23.4285rem'} width={'23.4285rem'} font-size={'1.45rem'} margin-right={'1.1rem'} />
                     </div>
                     <div />
                  </a>
               </Link>
            </div>

            <div className="nLink-group">
               <Link to={`https://eoceanwabaqa.com/eoceanwab/contacts/index?name=&number=&email=&status=&customAttributes=&pageSize=`} target="_blank" rel="noopener noreferrer" className="nLink">
                  <a href="https://eoceanwabaqa.com/eoceanwab/contacts/index?name=&number=&email=&status=&customAttributes=&pageSize=">
                     <div className="icon">
                        <img alt={'#'} src={tags_icon} height={'36.4285rem'} width={'36.4285rem'} font-size={'1.45rem'} margin-right={'1.1rem'} style={{ 'border-bottom': '1px solid #D0D0D0', 'padding-bottom': '15px' }} />
                     </div>
                     <div />
                  </a>
               </Link>
            </div>

            <div className="nLink-group">
               <Link to={`https://eoceanwab.com/org=1`} target="_blank" rel="noopener noreferrer" className="nLink">
                  <a href="https://eoceanwab.com/org=1">
                     <div className="icon">
                        <img alt={'#'} src={chatbot_builder} height={'23.4285rem'} width={'23.4285rem'} font-size={'1.45rem'} margin-right={'1.1rem'} />
                     </div>
                     <div />
                  </a>
               </Link>
            </div>

            <div className="nLink-group">
               <Link to={`https://eoceanwabaqa.com/eoceanwab/channels/index`} target="_blank" rel="noopener noreferrer" className="nLink">
                  <a href="https://eoceanwabaqa.com/eoceanwab/channels/index">
                     <div className="icon">
                        <img alt={'#'} src={share_icon} height={'23.4285rem'} width={'23.4285rem'} font-size={'1.45rem'} margin-right={'1.1rem'} />
                     </div>
                     <div />
                  </a>
               </Link>
            </div>
            <div className="nLink-group">
               <Link to={`https://eoceanwabaqa.com/eoceanwab/integrations/index`} target="_blank" rel="noopener noreferrer" className="nLink">
                  <a href="https://eoceanwabaqa.com/eoceanwab/integrations/index">
                     <div className="icon">
                        <img alt={'#'} src={tags_icon} height={'23.4285rem'} width={'23.4285rem'} font-size={'1.45rem'} margin-right={'1.1rem'} />
                     </div>
                     <div />
                  </a>
               </Link>
            </div>
            <div className="nLink-group">
               <Link to={`https://eoceanwabaqa.com/eoceanwab/usermanagement/summary`} target="_blank" rel="noopener noreferrer" className="nLink">
                  <a href="https://eoceanwabaqa.com/eoceanwab/usermanagement/summary">
                     <div className="icon">
                        <img alt={'#'} src={user_icon} height={'23.4285rem'} width={'23.4285rem'} font-size={'1.45rem'} margin-right={'1.1rem'} />
                     </div>
                     <div />
                  </a>
               </Link>
            </div>
            <div className="nLink-group">
               <Link to={`https://eoceanwabaqa.com/eoceanwab/teammanagement/summary?teamName=&status=`} target="_blank" rel="noopener noreferrer" className="nLink">
                  <a href="https://eoceanwabaqa.com/eoceanwab/teammanagement/summary?teamName=&status=">
                     <div className="icon">
                        <img alt={'#'} src={team_icon} height={'36.4285rem'} width={'36.4285rem'} font-size={'1.45rem'} margin-right={'1.1rem'} style={{ 'border-bottom': '1px solid #D0D0D0', 'padding-bottom': '15px' }} />
                     </div>
                     <div />
                  </a>
               </Link>
            </div>
         </div>

         <div className="left_bar_end_section">
            <div className="nLink-group">
               <Link to={'https://eoceanwabaqa.com/eoceanwab/whatsnew/index'} target="_blank" rel="noopener noreferrer" className="nLink">
                  <a href="https://eoceanwabaqa.com/eoceanwab/whatsnew/index">
                     <div className="icon">
                        <img alt={'#'} src={star_icon} height={'23.4285rem'} width={'23.4285rem'} font-size={'1.45rem'} margin-right={'1.1rem'} />
                     </div>
                     <div />
                  </a>
               </Link>
            </div>

            <div className="nLink-group">
               <Link to={'https://eoceanwabaqa.com/eoceanwab/billing/index'} target="_blank" rel="noopener noreferrer" className="nLink">
                  <a href="https://eoceanwabaqa.com/eoceanwab/billing/index">
                     <div className="icon">
                        <img alt={'#'} src={billing_icon} height={'23.4285rem'} width={'23.4285rem'} font-size={'1.45rem'} margin-right={'1.1rem'} />
                     </div>
                     <div />
                  </a>
               </Link>
            </div>

            <div className="nLink-group">
               <Link to={'https://eoceanwabaqa.com/eoceanwab/accountsettings/index'} target="_blank" rel="noopener noreferrer" className="nLink">
                  <a href="https://eoceanwabaqa.com/eoceanwab/accountsettings/index">
                     <div className="icon">
                        <img alt={'#'} src={setting_icon} height={'23.4285rem'} width={'23.4285rem'} font-size={'1.45rem'} margin-right={'1.1rem'} />
                     </div>
                     <div />
                  </a>
               </Link>
            </div>
         </div>
      </div>
   );
};

export default NavBar;
