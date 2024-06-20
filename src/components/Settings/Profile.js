import React, { useState, useEffect } from "react";
import List from './api/List'
const Profile = ({rs}) => {

const subPage = (pageName) => {
  setViewPage(pageName)
}
const loadList = () => {
  setViewPage(<List rs={rs} subPage={subPage} loadList={loadList} />)
}
const [viewPage, setViewPage] = useState(<List rs={rs} subPage={subPage} loadList={loadList} />);

  return (
    <>
      
        
        <div className="profile_page">
         Profile
        </div>
          
       
   
    </>
  );
};

export default Profile;
