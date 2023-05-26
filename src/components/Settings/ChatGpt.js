import React, { useState, useEffect } from "react";
import CrudService from '../../services/crud.service';
import * as Yup from 'yup';
import { Tooltip } from '@mui/material';
import Create from "./chatgpt/Create";
import Edit from "./chatgpt/Edit";
const ChatGpt = ({rs}) => {
  const [validationSchema, setValidationSchema] = useState({});
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState();
  const [editData, setEditData] = useState(false);


  useEffect(() => {
      retrieveForm();
      
   }, []);


  const retrieveForm = () => {
      CrudService.getById('chatgpt', true)
         .then((response) => {
            if(response.data){
              setEditData(response.data);
            }

         })
         .catch((e) => {
            console.log(e);
         });
   };

   
   

  return (
    <>
        {editData ? <Edit rs={editData} / > : <Create />}    
    </>
  );
};

export default ChatGpt;
