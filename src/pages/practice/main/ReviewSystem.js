import React, { useState, useEffect } from "react";
import CrudPrac from "../../../components/crud/CrudPrac";
import CrudService from "../../../services/crud.service";

const ReviewSystem = ({loadPage,masterValue}) => {

const [specialityList, setSpecialityList] = useState([]);

  
useEffect(() => {
    
    retrieveMasterList('speciality');
   
  }, []);
 
 
const retrieveMasterList = (url) => {
    CrudService.ListValue('master/list-value?type=' + url)
      .then(response => {
            if(url == 'speciality'){
                setSpecialityList(response.data);
                
            }
            
        })
      .catch(e => {
        console.log(e);
      });
  };


const formSchema = {
    name: {
        type: "text",
        label: "Name",
        required: true,
    },
   

    speciality_id: {
        type: "select",
        label: "form",
        required: true,
        options:specialityList,
    },

    
   
}

  return (
    <>

    <CrudPrac serviceUrl={'review_system_speciality'} masterValue={masterValue} loadPage={loadPage} master={true} title={'Review Of System'} deleteAction={"false"} formSchema={formSchema} dataAttr={{'Name':'name','Speciality':'speciality_id'}} />


    </>
  );
};

export default ReviewSystem;
