import React, { useEffect, useState, useContext } from 'react';
import back_icon from '../../assets/back-icon.svg';
import myprofile from '../../assets/setting/myprofile.svg';
import channel from '../../assets/setting/channel.svg';
import integration from '../../assets/setting/integration.svg';
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
const defaultState = {
   isAlert: false,
   isUpdatedList: false,
   confirmationTxt: '',
};

const Settings = () => {
   const { user, setUser } = useContext(UserContext);
   const [contentPage, setContentPage] = useState('');
   const { dashboard } = useSelector(({ Reducers }) => Reducers);
   const dispatch = useDispatch();
   const history = useHistory();
   const [activeClass, setActiveClass] = useState('');

   useEffect(() => {
      //changeContent('FormBuilder');
      changeContent('TrainBot');
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

      { name: 'GPT', controller: 'ChatGpt', icon: form },
      { name: 'TrainBot', controller: 'TrainBot', icon: form },

      
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
                  <img alt={'#'} src={back_icon} />
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
                  <div className="col-sm-2 p-0">
                     <div className="setting_left_bar_section">
                        <div className="mb-30">
                           <Link to={`${STRINGS.ROUTES.ROOT}?org=${localStorage.getItem('userId')}`} className="btn primary">
                              <img src={left_circle_arrow_icon} style={{ marginRight: '20px' }} />
                              Back to Builder
                           </Link>
                        </div>

                        <ul style={{ width: '175px' }}>
                           {Menu.map((m, i) => (
                              <>
                                 {m.controller == activeClass ? (
                                    <li>
                                       <a href="#" className="active" onClick={() => changeContent(m.controller)}>
                                          <img alt={'#'} src={m.icon} />
                                          {m.name}
                                       </a>
                                    </li>
                                 ) : (
                                    <li>
                                       <a href="#" onClick={() => changeContent(m.controller)}>
                                          <img alt={'#'} src={m.icon} />
                                          {m.name}
                                       </a>
                                    </li>
                                 )}
                              </>
                           ))}
                        </ul>
                     </div>
                  </div>
                  <div className="col-sm-10 p-0">{contentPage}</div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Settings;
