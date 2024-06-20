import React, { useState, useEffect } from "react";
import List from "./customer/List";
import Create from "./customer/Create";

import Detail from "./customer/Detail";
import { useParams } from 'react-router';
import { useHistory} from 'react-router-dom';

const Customer = () => {


const [viewPage, setViewPage] = useState('detail');

const { id } = useParams();

const history = useHistory();

 useEffect(() => {
    //if (typeof(id) == "undefined"){
      getPage('list');
   // }
    
    
  }, [id]);

  const getPage = (pageName,param=0) => {
    //history.push('/app/customer/1')
     loadPage(pageName,param)
  }

  const loadPage = (pageName,paramValue) => {
     // console.log(pageName)
      if(pageName === 'list'){
         setViewPage(<List getPage={getPage} />)
      }
      if(pageName === 'create'){
         setViewPage(<Create getPage={getPage} />)
      }


      if(pageName === 'detail'){
         setViewPage(<Detail getPage={getPage} clinicRs={paramValue} />)
      }

      
  }

  return (
    <>
      
      {viewPage}
      
   
    </>
  );
};

export default Customer;
