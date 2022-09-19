import React, { useState, useEffect } from "react";
import CrudMaster from "../crud/CrudMaster";
const Platform = ({pageName,dataName}) => {


const formSchema = {
    name: {
        type: "text",
        label: "",
        required: true
    },
    
   
}

  return (
    <>
      
      
       
         <CrudMaster title={pageName} master={true} serviceUrl={dataName} dataAttr={{'Name':'name'}} formSchema={formSchema} />
      
          
       
   
    </>
  );
};

export default Platform;
