import React, { useState, useEffect } from 'react';

import { TextFieldModal, SelectField, SubmitButtonModal, CheckBoxField, TextGroupField, TextAreaField, SwtichField } from '../../crud/FormElements';
import * as Yup from 'yup';
import CrudService from '../../../services/crud.service';
import { Link } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import { Formik, Form, Field, ErrorMessage, useFormikContext, useField, useFormik } from 'formik';
import {toast } from 'react-toastify';
const EditCat = ({ rs, retrieveList, loadList,closeModal }) => {
   const [validationSchema, setValidationSchema] = useState({});

   const [gptCatList, setGptCatList] = useState([]);
   const [insuranceTypeList, setInsuranceTypeList] = useState([]);

   const [successful, setSuccessful] = useState(false);
   const [message, setMessage] = useState();

   useEffect(() => {
      
   }, []);

   

   

   const [formData, setFormData] = useState({
      name: rs.name,
     
      id: rs.id,
   });

   const FormSchema = Yup.object().shape({
      name: Yup.string().required('Required'),
     
   });

   const onSubmit = (values, { setSubmitting, resetForm, setStatus }) => {
      
      CrudService.edit(values, 'gptcat', true).then(
         (response) => {
            //setModalValue('')
            toast("Category has been updated",{type: toast.TYPE.SUCCESS})
            setMessage(response.data.message);
            setSuccessful(true);

            loadList();
            closeModal();
         },
         (error) => {
            const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

            setMessage(resMessage);
            setSuccessful(false);
         }
      );
   };

   

   return (
      <>
         <div class="row">
            <div class="col-12">
               <div class="">
                  <div>
                     {!successful && (
                        <>
                           <Formik enableReinitialize validationSchema={FormSchema} initialValues={formData} onSubmit={onSubmit}>
                              {({ setFieldValue, setFieldTouched, values, errors, touched }) => (
                                 <Form className="av-tooltip tooltip-label-right" >
                                    <div className="field_section">
                                          <TextFieldModal name="name" label="Name" icon="check-square" placeholder="Name" />
                                       </div>
                                    <div className="mt-20">
                                       <SubmitButtonModal title="Update" className="btn primary" />
                                       <button onClick={() => closeModal()} className="btn secondary ms-20">
                                          Cancel
                                       </button>
                                    </div>
                                 </Form>
                              )}
                           </Formik>
                        </>
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

export default EditCat;
