import React, { useEffect, useState, useContext } from 'react';
import back_icon from '../../assets/back-icon.svg';
import myprofile from '../../assets/setting/myprofile.svg';
import channel from '../../assets/setting/channel.svg';
import integration from '../../assets/setting/openai.svg';
import api from '../../assets/setting/api.svg';
import form from '../../assets/setting/writing.svg';
import api_white from '../../assets/setting/api_white.svg';
import left_circle_arrow_icon from '../../assets/setting/bi_arrow-down-circle-fill.png';
import users from '../../assets/setting/user.svg';
import { STRINGS } from '../../utils/base';
import { useDispatch, useSelector } from 'react-redux';
import { CloseBotComposer, removingBreadcrumb, resetState } from '../Dashboard/slices/dashboard.slice';
import { useHistory } from 'react-router-dom';
import Api from './Api';
import Profile from './Profile';
import Industry from './Industry';
import Platform from './Platform';
import Integration from './Integration';
import ApiTemplate from './ApiTemplate';
import FormBuilder from './FormBuilder';
import ChatGpt from './ChatGpt';
import TrainBot from './TrainBot';
import HelpTopic from './HelpTopic';
import HelpCustomField from './HelpCustomField';
import HelpDepartment from './HelpDepartment';
import MessageLinks from './MessageLinks';
import Customer from './Customer';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import {Tooltip} from '@mui/material';
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

const defaultState = {
   isAlert: false,
   isUpdatedList: false,
   confirmationTxt: '',
};


const BlueOnGreenTooltip = styled(({ className, ...props }) => (
   <Tooltip {...props} componentsProps={{ tooltip: { className: className } }} />
 ))(`
     color: white;
     background-color: black;
 `);

const Settings = () => {
   const { user, setUser } = useContext(UserContext);
   const [contentPage, setContentPage] = useState('');
   const { dashboard } = useSelector(({ Reducers }) => Reducers);
   const dispatch = useDispatch();
   const history = useHistory();
   const [activeClass, setActiveClass] = useState('');

   const [helpMenuStyle, setHelpMenuStyle] = useState('none');

   

   useEffect(() => {
      //changeContent('FormBuilder');
      changeContent('HelpTopic');
   }, []);
   const handleBack = () => {
      history.push(`${STRINGS.ROUTES.ROOT}?org=${localStorage.getItem('userId')}`);
      dispatch(resetState());
      dispatch(removingBreadcrumb());
   };

   const changeContent = (param, pageName, dataName) => {
      setActiveClass(param);
      if(param == '#helpmenu'){
            if(helpMenuStyle == 'none'){
               setHelpMenuStyle('block')
            }else{
               setHelpMenuStyle('none')
            }
            
      }
      if (param === 'Api') {
         setContentPage(<Api />);
      }

      if (param === 'ChatGpt') {
         setContentPage(<ChatGpt />);
      }

      if (param === 'ApiTemplate') {
         setContentPage(<ApiTemplate />);
      }

      if (param === 'Profile') {
         setContentPage(<Profile />);
      }

      if (param === 'Industry') {
         setContentPage(<Industry dataName="industry" pageName="Industry" />);
      }

      if (param === 'Platform') {
         setContentPage(<Platform dataName="platform" pageName="Platform" />);
      }

      if (param === 'Integration') {
         setContentPage(<Integration />);
      }

      if (param === 'FormBuilder') {
         setContentPage(<FormBuilder />);
      }

      if (param === 'Customer') {
         setContentPage(<Customer />);
      }
      if (param === 'TrainBot') {
         setContentPage(<TrainBot />);
      }

      if (param === 'HelpTopic') {
         setContentPage(<HelpTopic />);
      }

      if (param === 'HelpCustomField') {
         setContentPage(<HelpCustomField />);
      }

      if (param === 'HelpDepartment') {
         setContentPage(<HelpDepartment />);
      }

      if (param === 'MessageLinks') {
         setContentPage(<MessageLinks />);
      }
   };

   let Menu = [
      /*{name:'Integration',controller:'Integration',icon:integration},*/
      { name: 'API', controller: 'Api', icon: api, submenu:false,new:false },
      { name: 'Form Builder', controller: 'FormBuilder', icon: form,submenu:false,new:false },
      { name: 'OpenAI GPT', controller: 'ChatGpt', icon: integration,submenu:false,new:true },
      { name: 'Training Data', controller: 'TrainBot', icon: form,submenu:false,new:true },
      { name: 'Help Desk', controller: '#helpmenu', icon: form 
         ,submenu:
         [
            { name: 'Help Topic', controller: 'HelpTopic', icon: form},
            { name: 'Custom Fields', controller: 'HelpCustomField', icon: form },
            { name: 'Department', controller: 'HelpDepartment', icon: form },
            // Message link module added
            { name: 'Message Links', controller: 'MessageLinks', icon: form },
         ]
      },
   ];

   

   if (localStorage.getItem('org_unit_id') == '') {
      Menu = [
         { name: 'Channels', controller: 'Channels', icon: myprofile },
         { name: 'Industry', controller: 'Industry', icon: myprofile },
         { name: 'Platform', controller: 'Platform', icon: myprofile },
         { name: 'API Template', controller: 'ApiTemplate', icon: api },
         { name: 'Customer', controller: 'Customer', icon: api },
      ];
   }

   return (
      <div className="ws-hld">
         <div className="head">
            <div className="head-rt">
               <div onClick={handleBack} className="icon">
                  <img style ={{ padding: "5px"}}alt={'#'} src={back_icon} />
               </div>
               <div className="txt">Settings</div>
            </div>

            <div className="head-lft">
               <div className="btn-hld"></div>
            </div>
         </div>
         <div className="ws-section">
            <div className="dashboard-hld setting_page_section">
               <div className="row me-0">
                  <div className="col-xxl-3 col-xl-3 col-lg-3 col-sm-3 col-xs-3 p-0">
                     <div className="setting_left_bar_section">
                        <div className="mb-30">
                           <Link to={`${STRINGS.ROUTES.ROOT}?org=${localStorage.getItem('userId')}`} className="btn primary">
                              <img src={left_circle_arrow_icon} style={{ marginRight: '10px' }} />
                              Back to Builder
                           </Link>
                        </div>


                        



                        <ul style={{ width: '208px' }}>
                           {Menu.map((m, i) => (
                              <>
                                 
                                    <li key={i}>
                                       <a href="#" onClick={() => changeContent(m.controller)}

                                          className={(m.controller == activeClass) ? 'active' : ''}
                                       >
                                          <img alt={'#'} src={m.icon} />
                                          {m.name}
                                          {m.new ?

                                          (<span class="currentPlan" style={{backgroundColor: "#00baa3", marginLeft: "10px", fontFamily: 'Lexend Deca Light !important', fontSize: '9px'}} >New</span>)
                                          :
                                           (<span></span>)
                                          }
                                       </a>

                                          {m.submenu &&


                                                (


                                                       <ul className="submenu"

                                                       style={{display:helpMenuStyle}}
                                                       >
                                                       {m.submenu.map((s, i) => (

                                                         <li  key={i}>
                                                            <a href="#" onClick={() => changeContent(s.controller)}

                                                               className={(s.controller == activeClass) ? 'active' : ''}
                                                            >
                                                               <img alt={'#'} src={form} />
                                                               
                                                               {s.name}
                                                            </a>
                                                         </li>
                                                        ))} 
                                                      </ul>

                                                )
 



                                          }
                                    </li>
                                  
                              </>
                           ))}

                          
                        </ul>
                     </div>
                  </div>
                  <div className="col-xxl-9 col-xl-9 col-lg-9 col-sm-9 col-xs-9 p-0">{contentPage}</div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Settings;
