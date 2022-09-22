import React, {useEffect, useState} from 'react';
import back_icon from "../../assets/back-icon.svg";
import myprofile from "../../assets/setting/myprofile.svg";
import channel from "../../assets/setting/channel.svg";
import integration from "../../assets/setting/integration.svg";
import api from "../../assets/setting/api.svg";
import api_white from "../../assets/setting/api_white.svg";
import users from "../../assets/setting/user.svg";
import {STRINGS} from "../../utils/base";
import {useDispatch, useSelector} from "react-redux";
import {CloseBotComposer, removingBreadcrumb, resetState} from "../Dashboard/slices/dashboard.slice";
import {useHistory} from "react-router-dom";
import Api from "./Api";
import Profile from "./Profile";
import Industry from "./Industry";
import Platform from "./Platform";
import Integration from "./Integration";
import ApiTemplate from "./ApiTemplate";
import FormBuilder from "./FormBuilder";
const defaultState = {
    isAlert: false,
    isUpdatedList: false,
    confirmationTxt: "",
}




const Settings = () => {
    const [contentPage, setContentPage] = useState('');
    const {dashboard} = useSelector(({Reducers}) => Reducers);
    const dispatch = useDispatch();
    const history = useHistory();
     const [activeClass, setActiveClass] = useState('');

useEffect(() => {
   
    
    changeContent('FormBuilder');
    

  }, []);
    const handleBack = () => {
        history.push(`${STRINGS.ROUTES.ROOT}?org=${localStorage.getItem("userId")}`);
        dispatch(resetState());
        dispatch(removingBreadcrumb())
    }

     const changeContent = (param,pageName,dataName) => {
        setActiveClass(param);
        if(param === 'Api'){
          setContentPage(<Api />);
        }

        if(param === 'ApiTemplate'){
          setContentPage(<ApiTemplate />);
        }

        if(param === 'Profile'){
          setContentPage(<Profile />);
        }

        if(param === 'Industry'){
          setContentPage(<Industry dataName="industry" pageName="Industry"  />);
        }

        if(param === 'Platform'){
          setContentPage(<Platform dataName="platform" pageName="Platform"  />);
        }

        if(param === 'Integration'){
          setContentPage(<Integration  />);
        }

        if(param === 'FormBuilder'){
          setContentPage(<FormBuilder  />);
        }
   
    
    };

    const Menu = [

        {name:'My Profile',controller:'Profile',icon:myprofile},
        {name:'Channels',controller:'Channels',icon:myprofile},
        {name:'Industry',controller:'Industry',icon:myprofile},
        {name:'Platform',controller:'Platform',icon:myprofile},
        {name:'Integration',controller:'Integration',icon:integration},
        {name:'Api',controller:'Api',icon:api},
        {name:'Api Template',controller:'ApiTemplate',icon:api},

        {name:'Form Builder',controller:'FormBuilder',icon:api},
        {name:'Users',controller:'User',icon:api},

    ]

    return (
        <div className="ws-hld">

            <div className="head">
                    <div className="head-rt">
                        <div onClick={handleBack} className="icon">
                            <img alt={"#"} src={back_icon}/>
                        </div>
                        <div className="txt">
                            Settings
                        </div>
                    </div>
                   
                    <div className="head-lft">
                        <div className="btn-hld">

                        </div>
                    </div>
            </div>
            <div className="ws-section">
                <div className="dashboard-hld setting_page_section">
                    <div className="row me-0">
                         <div className="col-sm-3 p-0">
                            <div className="setting_left_bar_section">
                                <ul>
                                {
                                    Menu.map((m,i) => (
                                    <>
                                    {m.controller == activeClass ? 
                                        (<li ><a href="#" className="active"  onClick={() => changeContent(m.controller)}><img alt={"#"} src={m.icon}/>{m.name}</a></li>
                                    ) : 

                                    (<li><a href="#"  onClick={() => changeContent(m.controller)}><img alt={"#"} src={m.icon}/>{m.name}</a></li>
                                    )

                                    }
                                    </>
                               ))}
                                    

                                </ul>
                            </div>   
                         </div>
                         <div className="col-sm-9 p-0">

                            {contentPage}

                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;