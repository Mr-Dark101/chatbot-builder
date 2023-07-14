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

   useEffect(() => {
      changeContent('FormBuilder');
      //changeContent('TrainBot');
   }, []);
   const handleBack = () => {
      history.push(`${STRINGS.ROUTES.ROOT}?org=${localStorage.getItem('userId')}`);
      dispatch(resetState());
      dispatch(removingBreadcrumb());
   };

   const changeContent = (param, pageName, dataName) => {
      setActiveClass(param);
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
   };

   let Menu = [
      /*{name:'Integration',controller:'Integration',icon:integration},*/
      { name: 'API', controller: 'Api', icon: api },
      { name: 'Form Builder', controller: 'FormBuilder', icon: form },
      { name: 'OpenAI GPT', controller: 'ChatGpt', icon: integration },
      { name: 'Training Data', controller: 'TrainBot', icon: form },
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
                  <div className="col-xxl-2 col-xl-2 col-lg-2 col-sm-2 col-xs-3 p-0">
                     <div className="setting_left_bar_section">
                        <div className="mb-30">
                           <Link to={`${STRINGS.ROUTES.ROOT}?org=${localStorage.getItem('userId')}`} className="btn primary">
                              <img src={left_circle_arrow_icon} style={{ marginRight: '10px' }} />
                              Back to Builder
                           </Link>
                        </div>

                        <ul style={{ width: '175px' }}>
                           {Menu.map((m, i) => (
                              <>
                                 {m.controller == activeClass ? (
                                    <>
                                    {(m.name === "OpenAI GPT" || m.name === "Training Data") && localStorage.getItem('chatbot_plan').includes("BASIC") ? ( <li>
                                       <a href="#" className="active">
                                          <img alt={'#'} src={m.icon} />
                                          {m.name}
                                          <BlueOnGreenTooltip title= {"You don\'t have access to this feature. Please contact sales to upgrade your plan."}><span id ="lockimage" className="lockIcon"><i class="fa fa-lock"></i></span></BlueOnGreenTooltip>
                                       </a>
                                    </li>
                                    ) : ( <li>
                                       <a href="#" className="active" onClick={() => changeContent(m.controller)}>
                                          <img alt={'#'} src={m.icon} />
                                          {m.name}    
                                          <>
                                          {(m.name === "OpenAI GPT" || m.name === "Training Data") ? 
                                          ( <span class="currentPlan" style={{backgroundColor: "#00baa3", marginLeft: "20px", fontFamily: 'Lexend Deca Light !important', fontSize: '9px'}} >New</span>   
                                          ) : 
                                          ( <span></span>   
                                          )}
                                          </>                     
                                       </a>
                                    </li>)
                                    }
                                   </>
                                 ) : (
                                    <>
                                    {(m.name === "OpenAI GPT" || m.name === "Training Data") && localStorage.getItem('chatbot_plan').includes("BASIC") ? ( <li>
                                       <a href="#" >
                                          <img alt={'#'} src={m.icon} />
                                          {m.name}
                                          <BlueOnGreenTooltip title= {"You don\'t have access to this feature. Please contact sales to upgrade your plan."}><span id ="lockimage" className="lockIcon"><i class="fa fa-lock"></i></span></BlueOnGreenTooltip>
                                       </a>
                                    </li>
                                    ) : (  <li>
                                       <a href="#" onClick={() => changeContent(m.controller)}>
                                          <img alt={'#'} src={m.icon} />
                                          {m.name}
                                          <>
                                          {(m.name === "OpenAI GPT" || m.name === "Training Data") ? 
                                          ( <span class="currentPlan" style={{backgroundColor: "#00baa3", marginLeft: "20px", fontFamily: 'Lexend Deca Light !important', fontSize: '9px'}} >New</span>   
                                          ) : 
                                          ( <span></span>   
                                          )}
                                          </>
                                       </a>
                                    </li>)
                                    }
                                   </>
                                   
                                 )}
                              </>
                           ))}
                        </ul>
                     </div>
                  </div>
                  <div className="col-xxl-10 col-xl-10 col-lg-10 col-sm-10 col-xs-9 p-0">{contentPage}</div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Settings;
