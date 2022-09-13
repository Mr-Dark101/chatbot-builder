import React, { useState, useEffect } from "react";
import { useParams } from 'react-router';
import Hpi from './main/Hpi';
import CheifComplain from './main/CheifComplain';
import ReviewSystem from './main/ReviewSystem';
import Plan from './main/Plan';
import PhysicalExam from './main/PhysicalExam';
import Variable from './master/Variable';
import DrugMenu from './master/DrugMenu';
import AlgMenu from './master/AlgMenu';
import List from "./master/List";
import Reactant from "./master/Reactant";
import SocialType from "./master/SocialType";
import DrugList from "./master/DrugList";
import IndexSub from "./IndexSub";

const Main = () => {

  const [page, setPage] = useState('');
  const [leftPage, setLeftPage] = useState(<Variable />);


const { id } = useParams();

//const id = 'master';  
 
useEffect(() => {
    
    loadPage(id);
  
    
  }, [id]);

  const loadPage = (id,pageName='',row='') => {
    if(id === 'hpi'){
      setPage(<Hpi masterValue={id} loadPage={loadPage} />)
    }


    if(id === 'master'){
      setPage(<IndexSub id={pageName} row={row} />)
    }

     if(id === 'cf'){
      setPage(<CheifComplain masterValue={id} loadPage={loadPage} />)
    }


    if(id === 'rs'){
      setPage(<ReviewSystem masterValue={id} loadPage={loadPage} />)
    }


    if(id === 'plan'){
      setPage(<Plan masterValue={id} loadPage={loadPage} />)
    }

    if(id === 'ph'){
      setPage(<PhysicalExam masterValue={id} loadPage={loadPage} />)
    }

    if(id === 'drugs'){
      setPage(<DrugList />)
      setLeftPage(<DrugMenu loadPage={loadPage} />)
    }


    if(id === 'alg'){
      setPage(<DrugList />)
      setLeftPage(<AlgMenu loadPage={loadPage} />)
    }

   

  }
 

  return (
    <>
    
    <div className="row">

        

        <div className="col-12">

            {page}
        </div>
        

      
    </div>
   
    </>
  );
};

export default Main;
