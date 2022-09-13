import React, { useState, useRef,useEffect } from "react";



import CrudMaster from "../../../components/crud/CrudMaster";
import CrudService from "../../../services/crud.service";


const Reactant = ({pageName,dataName}) => {
 const [allergyList, setAllergyList] = useState([]);
const [customForm, setCustomForm] = useState({});
useEffect(() => {
    
    retrieveMasterList('allergy_type');
  }, [pageName]);
 
 
const retrieveMasterList = (url) => {
    CrudService.ListValue('master/list-value?type=' + url)
      .then(response => {
            if(url == 'allergy_type'){
                setAllergyList(response.data);
                
                setCustomForm({
                    name: {
        type: "text",
        label: false,
        required: true
    },

    allerygy_type_id: {
        type: "select",
        label: "",
        required: true,
        options: response.data
    },
                })
            }

            

            
            
             
      })
      .catch(e => {
        console.log(e);
      });
  };

  



  return (
    <>
   
<CrudMaster title={pageName} master={true} serviceUrl={dataName} dataAttr={{'Name':'name','Allergy Type':'AllergyType.name'}} formSchema={customForm} />
    


    </>
  );
};

export default Reactant;
