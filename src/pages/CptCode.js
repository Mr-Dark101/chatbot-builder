import React, { useState, useEffect } from "react";
import List from './cptcode/List'

import { Link } from "react-router-dom";
const CptCode = () => {

 
    const [page, setPage] = useState('parent');


  useEffect(() => {
    loadPage('parent')
    
  }, []);

  
  const loadPage = (param,data,preData) => {

      if(param == 'parent'){
          setPage(<List loadPage={loadPage} />)
      }

      
  }

  
 

  return (
    <>
      {page}

   
    </>
  );
};

export default CptCode;
