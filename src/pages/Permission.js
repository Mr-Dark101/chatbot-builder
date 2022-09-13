import React, { useState, useRef,useEffect } from "react";

import RolesDataService from "../services/permission.service";

import Crud from "../components/crud/Crud";


const formSchema = {
    name: {
        type: "text",
        label: "Name",
        required: true
    },
     title: {
        type: "text",
        label: "Title",
        required: true
    },
    url: {
        type: "text",
        label: "Url",
        required: true
    },

    permission_key: {
        type: "text",
        label: "Permission Key",
        required: true
    },
    group_id: {
        type: "select",
        label: "Group",
        required: true,
        options: [
            {
                label: "Admin",
                value: "3"
            },
            {
                label: "User",
                value: "2"
            }
        ]
    },

    permission_type: {
        type: "select",
        label: "Feature Type",
        //required: true,
        options: [
            {
                label: "Route",
                value: "r"
            },
            {
                label: "Function",
                value: "f"
            }
        ]
    },

    
   
}
const Permission = () => {
 




 


  



  return (
    <>
   
<Crud title={'Permission'} serviceUrl={'permission'} dataAttr={{'Name':'name','Title':'title','Url':'url'}} formSchema={formSchema} />
    


    </>
  );
};

export default Permission;
