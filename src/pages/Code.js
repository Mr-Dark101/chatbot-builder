import React, { useState, useEffect } from "react";
import ParentCode from './code/ParentCode'
import SubCode from './code/SubCode'
import SubSubCode from './code/SubSubCode'
import { Link } from "react-router-dom";
const Code = () => {

 
    const [page, setPage] = useState('parent');


  useEffect(() => {
    loadPage('parent')
    
  }, []);

  
  const loadPage = (param,data,preData) => {

      if(param == 'parent'){
          setPage(<ParentCode loadPage={loadPage} />)
      }

      if(param == 'SubCode'){
          setPage(<SubCode loadPage={loadPage} pdata={data} />)
      }
      if(param == 'SubSubCode'){
          setPage(<SubSubCode loadPage={loadPage} pdata={data} preData={preData} />)
      }
  }

  
 

  return (
    <>
      {page}

   
    </>
  );
};

export default Code;
