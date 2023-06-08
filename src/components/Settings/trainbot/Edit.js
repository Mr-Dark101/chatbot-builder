import React, { useState, useEffect } from 'react';

import { TextField, SelectField, SubmitButton, CheckBoxField, TextGroupField, TextAreaField, SwtichField } from '../../crud/FormElements';
import * as Yup from 'yup';
import CrudService from '../../../services/crud.service';
import { Link } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import { Formik, Form, Field, ErrorMessage, useFormikContext, useField, useFormik } from 'formik';
import {toast } from 'react-toastify';
const Edit = ({ rs, retrieveList, loadList }) => {
   const [validationSchema, setValidationSchema] = useState({});

   const [gptCatList, setGptCatList] = useState([]);
   const [insuranceTypeList, setInsuranceTypeList] = useState([]);

   const [successful, setSuccessful] = useState(false);
   const [message, setMessage] = useState();

   useEffect(() => {
      // retrieveMasterList('insurance');
       retrieveMasterList('gptcat');
   }, []);

   

   const retrieveMasterList = (url) => {
      CrudService.ListValue('master/list-value?type=' + url)
         .then((response) => {
            if (url == 'gptcat') {
               setGptCatList(response.data);
            }

           
         })
         .catch((e) => {
            console.log(e);
         });
   };

   const [formData, setFormData] = useState({
      question: rs.question,
      answer: rs.answer,
      category_id:rs.category_id,
      id: rs.id,
   });

   const FormSchema = Yup.object().shape({
      question: Yup.string().required('Required'),
      answer: Yup.string().required('Required'),
   });

   const onSubmit = (values, { setSubmitting, resetForm, setStatus }) => {
      
      CrudService.edit(values, 'trainbot', true).then(
         (response) => {
            //setModalValue('')
            toast("Training data has been updated",{type: toast.TYPE.SUCCESS})
            loadList();
            //setMessage(response.data.message);
            //setSuccessful(true);

            
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
               <div class="page_data_clinic api_form_section">
                  <div>
                     {!successful && (
                        <>
                           <Formik enableReinitialize validationSchema={FormSchema} initialValues={formData} onSubmit={onSubmit}>
                              {({ setFieldValue, setFieldTouched, values, errors, touched }) => (
                                 <Form className="av-tooltip tooltip-label-right" style={{ overflowY: 'scroll', height: '800px' }}>
                                    <div className="row" style={{ marginLeft: '0px', marginRight: '0px' }}>
                                       <div className="col-9" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                                          


                                          <div className="field_section">
                                            <SelectField 
                                              name="category_id"
                                              label="Category"
                                              options={gptCatList}
                                            />
                                          </div>
                                          
                                          <div className="field_section">
                                             <TextField name="question" label="Question" icon="check-square" placeholder="Please enter your question" />
                                          </div>

                                         

                                         <div className="field_section">
                                             <TextAreaField name="answer" label="Answer" placeholder="Please enter the response" rows="3" />
                                          </div>

                                          
                                           

                                        
                                       </div>

                                       <div className="col-3" style={{ paddingLeft: '0px', paddingRight: '0px' }}></div>
                                    </div>

                                    <div className="mt-20">
                                       <SubmitButton title="Update" className="btn primary" />
                                       <button onClick={() => loadList()} className="btn secondary ms-20">
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

export default Edit;
