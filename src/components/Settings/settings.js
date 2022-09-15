import React, {useEffect, useState} from 'react';
import back_icon from "../../assets/back-icon.svg";
import {STRINGS} from "../../utils/base";
import {useDispatch, useSelector} from "react-redux";
import {CloseBotComposer, removingBreadcrumb, resetState} from "../Dashboard/slices/dashboard.slice";
import {useHistory} from "react-router-dom";
import Api from "./Api";
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
   
    
    changeContent('Api');
    

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
                <div className="dashboard-hld">
                    <div className="row">
                         <div className="col-sm-3">

                            <ul>
                                <li>My Profile</li>
                                <li>Channels</li>
                                <li>Integration</li>
                                <li><a href="#" onClick={() => changeContent('Api')}><i className="fa fa-cog"></i> Apis</a></li>
                                <li>Api Template</li>
                                <li>Users</li>
                            </ul>   
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