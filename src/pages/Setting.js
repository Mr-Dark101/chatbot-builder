import React, { useState } from "react";
import User from "./User";
import Roles from "./Roles";
import Permission from "./Permission";
import List from "./master/List";
import GeneralSetting from "./setting/GeneralSetting";
import Integration from "./setting/Integration";
import MedicalList from "./setting/MedicalList";
import { Link } from "react-router-dom";
const Setting = () => {
 
 const [subMenu, setSubMenu] = useState('US');
 const [contentPage, setContentPage] = useState('');

 const changeMenu = (param) => {
   // alert(param)
    if(param == 'US'){
      changeContent('User')
    }

    if(param == 'PP'){
      changeContent('Master','Gender','gender')
    }

    if(param == 'GS'){
      changeContent('GeneralSetting','Gender','gender')
    }

    if(param == 'IT'){
      changeContent('Integration','Gender','gender')
    }

     if(param == 'LS'){
      changeContent('MedicalList','Gender','gender')
    }

    if(param == 'LO'){
      changeContent('Master','City','city')
    }

    setSubMenu(param);
 };

 const changeContent = (param,pageName,dataName) => {
   // alert(param)
    if(param === 'User'){
      setContentPage(<User />);
    }
    if(param === 'Roles'){
      setContentPage(<Roles serviceUrl="roles" />);
    }
    if(param === 'Permission'){
      setContentPage(<Permission />);
    }
    if(param === 'Master'){
      setContentPage(<List pageName={pageName} dataName={dataName} />);
    }
    if(param === 'GeneralSetting'){
      setContentPage(<GeneralSetting />);
    }
    if(param === 'Integration'){
      setContentPage(<Integration />);
    }

    if(param === 'MedicalList'){
      setContentPage(<MedicalList />);
    }
    
 };

  return (
    <>
    <div className="content-header">
      <div className="d-flex align-items-center">
        <div className="me-auto">
          <h3 className="h1">Settings</h3>
          
        </div>
        
      </div>
    </div>

    <div className="content">
      <div>
        <div className="row mrg_lft_rgt_0">
          <div className="col-sm-2 setting_tabs" style={{borderTopRightRadius: 0,borderBottomRightRadius: 0}}>
            <ul className="left_tabs">

              <li>
                <i className="border_left"></i>
                <Link onClick={() => changeMenu('GS')} ><i className="fa fa-cog"></i> General Setting</Link>
              </li>

              

              <li>
                <i className="border_left"></i>
                <Link onClick={() => changeMenu('US')}><i className="fa fa-cog"></i>Users & Security</Link>
              </li>
            </ul>
          </div>

        
          
             {subMenu == 'US' && (
                <div className="col-sm-2 setting_tabs" style={{borderTopLeftRadius: 0,borderBottomLeftRadius: 0}}>
            <ul className="left_tabs">
           
              <li>
                <i className="border_left"></i>
                <a href="#" onClick={() => changeContent('User')}><i className="fa fa-cog"></i> Users</a>
              </li>

              <li>
                <i className="border_left"></i>
                <a href="#" onClick={() => changeContent('Roles')}><i className="fa fa-cog"></i> Roles</a>
              </li>
               <li>
                <i className="border_left"></i>
                <a href="#" onClick={() => changeContent('Permission')}><i className="fa fa-cog"></i> Permission</a>
              </li>

              
             
            </ul>
            </div>
             )}

             
          
       
          <div className="col-sm-8">
              {contentPage}
              
              
          </div>
        </div>      
      </div>
    </div>
    

   
    </>
  );
};

export default Setting;
