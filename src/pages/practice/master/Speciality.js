import React, { useState, useRef,useEffect } from "react";



import CrudMaster from "../../../components/crud/CrudMaster";
import CrudService from "../../../services/crud.service";


const Speciality = ({pageName,dataName}) => {
 const [allergyList, setAllergyList] = useState([]);
const [customForm, setCustomForm] = useState({});

 setCustomForm({
                    name: {
        type: "text",
        label: false,
        required: true
    },

     code: {
        type: "text",
        label: false,
        required: true
    },
                })
            
 

  



  return (
    <>
   
<CrudMaster title={pageName} master={true} serviceUrl={dataName} dataAttr={{'Name':'name','Code':'code'}} formSchema={customForm} />
    


    </>
  );
};

export default Speciality;
