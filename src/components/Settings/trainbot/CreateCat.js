import React, { useState, useEffect } from 'react';

import { Form, TextField,TextFieldModal, SelectField, SubmitButtonModal, CheckBoxField, TextGroupField, TextAreaField } from '../../crud/FormElements';
import * as Yup from 'yup';
import CrudService from '../../../services/crud.service';
import { Link } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import {toast } from 'react-toastify';
const CreateCat = ({ rs, retrieveList, loadList,closeModal }) => {
   const [validationSchema, setValidationSchema] = useState({});

   const [insuranceList, setInsuranceList] = useState([]);
   const [insuranceTypeList, setInsuranceTypeList] = useState([]);

   const [successful, setSuccessful] = useState(false);
   const [message, setMessage] = useState();
   const [headerField, setHeaderField] = useState([{ keyOther: '', valueOther: '' }]);
   useEffect(() => {
      //retrieveMasterList('insurance');
      //retrieveMasterList('insurance_type');
   }, []);

  
  

   

   const [formData, setFormData] = useState({
      name: '',
      
   });

   const FormSchema = Yup.object().shape({
      name: Yup.string().required('Required'),
      
   });

   const onSubmit = (values, { setSubmitting, resetForm, setStatus }) => {
      values.header = JSON.stringify(headerField);
      CrudService.register(values, 'gptcat', true).then(
         (response) => {
            //setModalValue('')
            loadList();
            closeModal()
            setMessage(response.data.message);
            toast("Category data been created",{type: toast.TYPE.SUCCESS})
            setSuccessful(true);
            //retrieveList();
         },
         (error) => {
            const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

            setMessage(resMessage);
            setSuccessful(false);
         }
      );
   };

   const handleInputChange = (e, index, param) => {
      const { name, value } = e.target;

      const list = [...headerField];
      list[index][name] = value;
      setHeaderField(list);
   };

   return (
      <>
         <div class="row">
            <div class="col-12">
               <div>
                  <div className="" >
                     {!successful && (
                        <Form enableReinitialize validationSchema={FormSchema} initialValues={formData} onSubmit={onSubmit}>
                           

                            <div className="field_section">
                                 <TextFieldModal name="name" label="Name" icon="check-square" placeholder="Name" />
                            </div>

                           <div>
                              <SubmitButtonModal title="Save" className="ant-btn ant-btn-primary" />

                              <button onClick={() => closeModal()} type="button" className="ant-btn ant-btn-default ms-10">
                                 Cancel
                              </button>
                           </div>
                        </Form>
                     )}
                     {message && (
                        <div className="form-group">
                           <div className={successful ? 'alert alert-success' : 'alert alert-danger'} role="alert">
                              {message}
                           </div>
                        </div>
                     )}
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default CreateCat;
