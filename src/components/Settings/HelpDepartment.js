import React, { useState, useEffect } from "react";
import List from './helpdepartment/List'

const HelpDepartment = ({rs}) => {

const subPage = (pageName) => {
  setViewPage(pageName)
}
const loadList = () => {
  setViewPage(<List rs={rs} subPage={subPage} loadList={loadList} />)
}
const [viewPage, setViewPage] = useState(<List rs={rs} subPage={subPage} loadList={loadList} />);

  return (
    <>
      
      
       
          {viewPage}
      
          
       
   
    </>
  );
};

export default HelpDepartment;
