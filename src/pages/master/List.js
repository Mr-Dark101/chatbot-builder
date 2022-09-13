import React, { useState, useRef,useEffect } from "react";



import CrudMaster from "../../components/crud/CrudMaster";


const formSchema = {
    name: {
        type: "text",
        label: "",
        required: true
    },
    
   
}
const List = ({pageName,dataName}) => {
 


 
 


  



  return (
    <>
   
<CrudMaster title={pageName} master={true} serviceUrl={dataName} dataAttr={{'Name':'name'}} formSchema={formSchema} />
    


    </>
  );
};

export default List;
