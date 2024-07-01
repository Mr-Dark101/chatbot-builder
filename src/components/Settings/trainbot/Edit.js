import React, { useState, useEffect } from 'react';

import { TextField, SelectField, SubmitButton, CheckBoxField, TextGroupField, TextAreaField, SwtichField } from '../../crud/FormElements';
import * as Yup from 'yup';
import CrudService from '../../../services/crud.service';
import { Link } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import { Formik, Form, Field, ErrorMessage, useFormikContext, useField, useFormik } from 'formik';
import {toast } from 'react-toastify';
import back_icon from '../../../assets/back-icon.svg';
import { generateToast } from '../../../utils';

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
            console.log(JSON.stringify(response));
            let parsedData = response.data;
            parsedData.push({"label":"Default","value":0});
            if (url == 'gptcat') {
              
               setGptCatList(parsedData);
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
            generateToast('Training data has been updated', 'Success!');

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
                                    <h5 class="box-title m-0" style={{ fontWeight: 800}}>
                                    <span onClick={() => loadList() } style={{marginRight:'5px'}} className="icon">
                                      <img style ={{ width: "12px", marginRight: "6px",marginTop:'-5px'}} alt={'#'} src={back_icon} /> 
                                    </span>
                                      Update Training Data
                                    </h5>
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
                                             <TextField name="question" label="Question" icon="check-square" placeholder="Please enter user question" />
                                          </div>

                                         <div className="field_section" style={{marginTop:'15px'}}>
                                             <TextAreaField name="answer" label="Answer" placeholder="Please enter bot response" rows="3" />
                                          </div>

                                       </div>

                                       <div className="col-3" style={{ paddingLeft: '0px', paddingRight: '0px' }}></div>
                                    </div>

                                    <div className="mt-20">
                                       <SubmitButton title="Update" className="btn btn-primary" />
                                       <button onClick={() => loadList()} className="btn btn-outline-danger ms-20">
                                          Back
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
