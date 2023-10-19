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
import logo from '../../assets/dc-new-logo.png';
import { STRINGS } from '../../utils/base';
import '../../App.css';

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

      <div className="vertical-layout vertical-menu-modern content-left-sidebar navbar-floating footer-static menu-collapsed" data-open="click" data-menu="vertical-menu-modern" data-col="content-left-sidebar">
      <div className="pace  pace-inactive"><div className="pace-progress" data-progress-text="100%" data-progress="99">
  <div className="pace-progress-inner"></div>
</div>
<div className="pace-activity"></div></div>
      <div className="main-menu menu-fixed menu-light menu-accordion menu-shadow menu-dark"
         data-scroll-to-active="true">
      <div className="navbar-header expanded">
        <ul className="nav navbar-nav flex-row">
          <li className="nav-item mr-auto">
            <a className="navbar-brand m-0" href="../../../html/ltr/vertical-menu-template/index.html">
              <span className="brand-logo" style={{ width: '190px' }}>
                <img src={logo} alt="Chatbot" style={{ marginTop: '15px', maxWidth: '100%', width: '50%' }} className="half-logo d-none" />
                <img src={logo} alt="Chatbot" style={{ maxWidth: '40px' }} className="full-logo" />
              </span>
            </a>
          </li>
          <li className="nav-item nav-toggle">
            <a className="nav-link modern-nav-toggle pr-0" data-toggle="collapse">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x d-block d-xl-none text-white toggle-icon font-medium-4">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-disc d-none d-xl-block collapse-toggle-icon primary text-white font-medium-4">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </a>
          </li>
        </ul>
      </div>
      <div class="shadow-bottom"></div>
       <div class="main-menu-content ps ps--active-y">
          <ul class="navigation navigation-main scroll_navBar" id="main-menu-navigation"
             data-menu="menu-navigation">
                <li id="statsLi" class="nav-item">
                   <a
                   class="d-flex align-items-center"
                   href="https://eoceanwab.com/eoceanwab/holisticanalysis/index"> <i class="far fa-chart-bar"></i> <span
                      class="menu-item text-truncate" data-i18n="Analytics">Insights</span>
                   </a>
                </li>
                <li id="chatmanagerLi" class="nav-item">
                   <a id="chatAnchor"
                   class="d-flex align-items-center"
                   href="https://eoceanwab.com/eoceanwab/chatmanager/index?number=&type=&id=">
                   <i class="fas fa-comments"></i> <span
                      class="menu-title text-truncate" data-i18n="Chat">Chat
                   Manager</span>
                   </a>
                </li>
                <li id="chatbotManagerLi" class="nav-item">
                   <a id="chatAnchor"
                   class="d-flex align-items-center"
                   href="https://eoceanwab.com/eoceanwab/chatbotmanager/index"> <i
                      class="fas fa-robot"></i> <span class="menu-title text-truncate"
                      data-i18n="Chat"> Bot Conversations</span>
                   </a>
                </li>
                <li id="templateManagerLi" class="nav-item">
                   <a id="chatAnchor"
                   class="d-flex align-items-center" href="https://eoceanwab.com/eoceanwab/campaignmessages/index?msgType="> <i
                      class="far fa-file-alt"></i> <span
                      class="menu-title text-truncate" data-i18n="Chat">Template
                   Manager</span>
                   </a>
                </li>
                <li id="campaignLi" class="nav-item">
                   <a id="chatAnchor"
                   class="d-flex align-items-center" href="https://eoceanwab.com/eoceanwab/segments/index?segmentName=&segmentType=&createdOn="> <i
                      class="fas fa-bullhorn"></i> <span
                      class="menu-title text-truncate" data-i18n="Chat">Campaign
                   Manager</span>
                   </a>
                </li>
                <li id="profileSettingsli" class="nav-item">
                   <a
                   href="https://eoceanwab.com/eoceanwab/WhatsappManager/profilesettings"
                   class="d-flex align-items-center chatManagerAnc"> <i
                      class="fab fa-whatsapp ml-25"></i><span class="nav-header-primary">WhatsApp Profile<span class="pull-right"><b class="caret"></b></span>
                   </span>
                   </a>
                </li>
                <li class="contactsLi nav-item">
                   <a
                   class="d-flex align-items-center"
                   href="https://eoceanwab.com/eoceanwab/contacts/index?name=&number=&email=&status=&customAttributes=&pageSize="><i class="fas fa-users"></i><span class="menu-title text-truncate"
                      data-i18n="Contacts">Contacts</span></a>
                </li>
                <li id="chatobotBuilderLi" class="nav-item active">
                   <a id="chatAnchor"
                   class="d-flex align-items-center"
                   href={`${STRINGS.ROUTES.ROOT}?org=${localStorage.getItem('userId')}`}> <i
                      class="fas fa-network-wired"></i> 
                   <span class="menu-title text-truncate" 
                      data-i18n="Chat">Chatbot Builder</span>&nbsp;  
                   </a>
                </li>
                <li id="channelsLi" class=" nav-item">
                   <a class="d-flex align-items-center"
                   href="https://eoceanwab.com/eoceanwab/channels/index"><i data-feather='share-2'></i><span
                      class="menu-title text-truncate" data-i18n="channels">Channels</span></a>
                </li>
            
                <li id="integrationsLi" class="nav-item">
                   <a class="d-flex align-items-center"
                   href="https://eoceanwab.com/eoceanwab/integrations/index">
                    <i class="fas fa-cogs"></i>
                    <span class="menu-title text-truncate" data-i18n="integrations">Integrations</span>
                    </a>
                </li>
             
               
                <li id="usermanagementLi" class="nav-item">
                   <a class="d-flex align-items-center"
                   href="https://eoceanwab.com/eoceanwab/usermanagement/summary">
                   <i data-feather='shield'></i>
                    <span class="menu-title text-truncate" data-i18n="Calendar">Users</span>
                   </a>
                  </li>  
              <li id="teammanagementLi" class=" nav-item"><a class="d-flex align-items-center"
              href="https://eoceanwab.com/eoceanwab/teammanagement/summary?teamName=&status="><i data-feather='users'></i><span
                class="menu-title text-truncate" data-i18n="Todo">Teams</span></a></li>
                <li id="billingLi" class="position_abs position_abs_b1 w-100 nav-item"
                   >
                   <a class="d-flex align-items-center"
                   href="https://eoceanwab.com/eoceanwab/billing/index">
                   <i class="fas fa-hand-holding-usd"></i> <span
                      class="menu-title text-truncate" data-i18n="Kanban">Billing</span>
                   </a>
                </li>
             <li id="accountSetLi" class="position_abs position_abs_b2 w-100 nav-item"
                >
                <a class="d-flex align-items-center"
                href="https://eoceanwab.com/eoceanwab/accountsettings/index">
                <i class="fas fa-cog"></i> <span
                   class="menu-title text-truncate" data-i18n="Kanban">Settings</span> 
                </a>
             </li>
          
              <li id="whatsNewLi" class="position_abs position_abs_b3 w-100 nav-item">
                 <a class="d-flex align-items-center"
                 id="example" data-title="Here's What's New!!"
                 data-toggle="clickover" data-placement="right"
                 href="https://eoceanwab.com/eoceanwab/whatsnew/index">
                 <i class="far fa-star"></i> <span class="menu-title text-truncate"
                    data-i18n="Kanban">What's New</span>  &nbsp;
                 <span>New</span><span
                    class="badge badge-pill badge-primary float-right position-relative"
                    >New</span>
                 </a>
              </li>
          </ul>
       </div>
      </div>
      </div>
   );
};

export default NavBar;
