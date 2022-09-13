import React, { useState, useEffect } from "react";
import { useParams } from 'react-router';
import Hpi from './master/Hpi';
import CheifComplain from './master/CheifComplain';
import ReviewSystem from './master/ReviewSystem';
import Plan from './master/Plan';
import PhysicalExam from './master/PhysicalExam';
import Variable from './master/Variable';
import DrugMenu from './master/DrugMenu';
import AlgMenu from './master/AlgMenu';
import List from "./master/List";
import Reactant from "./master/Reactant";
import SocialType from "./master/SocialType";
import DrugList from "./master/DrugList";

const IndexSub = ({id,row}) => {

  const [page, setPage] = useState('');
  const [leftPage, setLeftPage] = useState(<Variable />);




  
 
useEffect(() => {
    
    loadPage(id);
  
    
  }, [id]);


  const loadPage = (id,pageName='',dataName='') => {
    if(id === 'hpi'){
      setPage(<Hpi row={row} />)
    }

     if(id === 'cf'){
      setPage(<CheifComplain row={row} />)
    }


    if(id === 'rs'){
      setPage(<ReviewSystem row={row} />)
    }


    if(id === 'plan'){
      setPage(<Plan row={row} />)
    }

    if(id === 'ph'){
      setPage(<PhysicalExam row={row} />)
    }




 

    

  }
 

  return (
    <>
    
    <div className="row">

       

       

        <div className="col-9">

            {page}
        </div>

         <div className="col-3">  
            {leftPage} 
        </div>
        

      
    </div>
   
    </>
  );
};

export default IndexSub;
