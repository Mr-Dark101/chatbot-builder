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


useEffect(() => {
   
    
    changeContent('ApiTemplate');
    

  }, []);
    const handleBack = () => {
        history.push(`${STRINGS.ROUTES.ROOT}?org=${localStorage.getItem("userId")}`);
        dispatch(resetState());
        dispatch(removingBreadcrumb())
    }

     const changeContent = (param,pageName,dataName) => {
   
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
   
    
    };

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
                    <div className="row">
                         <div className="col-sm-3">
                            <div className="setting_left_bar_section">
                                <ul>
                                    <li><a href="#" onClick={() => changeContent('Profile')}><img alt={"#"} src={myprofile}/>My Profile</a></li>
                                    <li><a href="#"><img alt={"#"} src={channel}/>Channels</a></li>
                                    <li><a href="#" onClick={() => changeContent('Industry')}><img alt={"#"} src={myprofile}/>Industry</a></li>
                                    <li><a href="#" onClick={() => changeContent('Platform')}><img alt={"#"} src={myprofile}/>Platform</a></li>
                                    <li><a href="#" onClick={() => changeContent('Integration')}><img alt={"#"} src={integration}/>Integration</a></li>
                                    <li><a href="#" onClick={() => changeContent('Api')} className="active"><img alt={"#"} src={api}/>API's</a></li>
                                    <li><a href="#" onClick={() => changeContent('ApiTemplate')}><img alt={"#"} src={api}/>Api Template</a></li>
                                    <li><a href="#"><img alt={"#"} src={users}/>Users</a></li>

                                </ul>
                            </div>   
                         </div>
                         <div className="col-sm-9">

                            {contentPage}

                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;