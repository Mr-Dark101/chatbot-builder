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

const Index = () => {

  const [page, setPage] = useState('');
  const [leftPage, setLeftPage] = useState(<Variable />);




  const { id } = useParams();
 
useEffect(() => {
    
    loadPage(id);
  
    
  }, [id]);


  const loadPage = (id,pageName='',dataName='') => {
   

    if(id === 'drugs'){
      setPage(<DrugList />)
      setLeftPage(<DrugMenu loadPage={loadPage} />)
    }


    if(id === 'alg'){
      setPage(<DrugList />)
      setLeftPage(<AlgMenu loadPage={loadPage} />)
    }

    if(id === 'Reactant'){
      setPage(<Reactant pageName={pageName} dataName={dataName} />)
      setLeftPage(<AlgMenu loadPage={loadPage} />)
    }

    if(id == 'Master'){
        setPage(<List pageName={pageName} dataName={dataName} />);
    }


    if(id == 'vp'){
        setPage(<List pageName={'Visit Purpose'} dataName={'visit_purpose'} />);
        setLeftPage('')
    }

    if(id == 'mi'){
        setPage(<List pageName={'Medical Issue'} dataName={'medical_issue'} />);
        setLeftPage('')
    }

    if(id == 'st'){
        setPage(<List pageName={'Surgery Type'} dataName={'surgery_type'} />);
        setLeftPage('')
    }


    if(id == 'fp'){
        setPage(<List pageName={'Family Problem'} dataName={'problem_type'} />);
        setLeftPage('')
    }

    if(id == 'nc'){
        setPage(<List pageName={'Nutrition Consuling'} dataName={'nutrition_category'} />);
        setLeftPage('')
    }

    if(id == 'sh'){
      setPage(<SocialType />)
      setLeftPage('')
    }

    if(id == 'pac'){
        setPage(<List pageName={'Physical Activity Consuling'} dataName={'physical_consuling_category'} />);
        setLeftPage('')
    }

    if(id == 'spec'){
       
        setPage(<List pageName={'Speciality'} dataName={'speciality'} />);
        setLeftPage('')
    }

    

  }
 

  return (
    <>
    
    <div className="row">

       
        {(leftPage != '') ? (
            <>
        <div className="col-3">  
            {leftPage} 
        </div>

        <div className="col-9">

            {page}
        </div>
        </>
        ) : (
             <div className="col-12">

                    {page}
            </div>

        )}

      
    </div>
   
    </>
  );
};

export default Index;
