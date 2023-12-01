import React, { useState, useEffect } from 'react';

import { TextField, SelectField,SelectFieldMulti, SubmitButton, CheckBoxField, TextGroupField, TextAreaField, SwtichField } from '../../crud/FormElements';
import * as Yup from 'yup';
import CrudService from '../../../services/crud.service';
import { Link } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import { Formik, Form, Field, ErrorMessage, useFormikContext, useField, useFormik } from 'formik';
import {toast } from 'react-toastify';
import back_icon from '../../../assets/back-icon.svg';

const Edit = ({ rs, retrieveList, loadList }) => {
   const [validationSchema, setValidationSchema] = useState({});

  const [departmentList, setDepartmentList] = useState([]);

   const [topicList, setTopicList] = useState([]);

   const [customFieldList, setCustomFieldList] = useState([]);

   const [successful, setSuccessful] = useState(false);
   const [message, setMessage] = useState();

    useEffect(() => {
      //retrieveMasterList('insurance');
      retrieveMasterList('helpdepartment');
      retrieveMasterList('helptopicparent');
      retrieveMasterList('helpcustomfield');
     
   }, []);

    const statusList = [
      { value: 1, label: 'Active' },
      { value: 0, label: 'Inactive' },
      
   ];

   const priorityList = [
      { value: 1, label: 'High' },
      { value: 2, label: 'Low' },
      { value: 3, label: 'Medium' },
      
   ];

   

   const retrieveMasterList = (url) => {
      CrudService.ListValue('master/list-value?type=' + url)
         .then((response) => {
            if (url == 'helpdepartment') {
               
               setDepartmentList(response.data);
               
               
               
            }

            if (url == 'helptopicparent') {
               
               setTopicList(response.data);
               
               
               
            }

            if (url == 'helpcustomfield') {
               
               setCustomFieldList(response.data);
               
               
               
            }

           
         })
         .catch((e) => {
            console.log(e);
         });
   };

   const [formData, setFormData] = useState({
      name: rs.name,
      department_id: rs.department_id,
      priority_id: rs.priority_id,
      status_id: rs.status_id,
      parent_id:rs.parent_id,
      custom_field:JSON.parse(rs.custom_field),
      id:rs.id
   });

   const FormSchema = Yup.object().shape({
      name: Yup.string().required('Required'),
      department_id: Yup.string().required('Required'),
      priority_id: Yup.string().required('Required'),
      status_id: Yup.string().required('Required'),
   });

   const onSubmit = (values, { setSubmitting, resetForm, setStatus }) => {
      const saveData = values;
      saveData.custom_field = JSON.stringify(values.custom_field)
      console.log(saveData)
      CrudService.edit(saveData, 'helptopic', true).then(
         (response) => {
            //setModalValue('')
            toast("Training data has been updated",{type: toast.TYPE.SUCCESS,fontWeight:600})
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
                                      Update Help Topic
                                    </h5>
                                    
                                    <div className="row" style={{ marginLeft: '0px', marginRight: '0px' }}>
                              <div className="col-4" style={{ paddingLeft: '0px', paddingRight: '0px' }}>

                                 <div className="field_section">
                                   <TextField name="name" label="Name" icon="check-square" placeholder="Please enter name" />
                                 </div>
                              </div>
                           </div>

                           <div className="row" style={{ marginLeft: '0px', marginRight: '0px' }}>
                              <div className="col-4" style={{ paddingLeft: '0px', paddingRight: '0px' }}>

                                 <div className="field_section">
                                   <SelectField 
                                     name="status_id"
                                     label="Status"
                                     options={statusList}
                                   />
                                 </div>
                              </div>
                           </div>


                           <div className="row" style={{ marginLeft: '0px', marginRight: '0px' }}>
                              <div className="col-4" style={{ paddingLeft: '0px', paddingRight: '0px' }}>

                                 <div className="field_section">
                                   <SelectField 
                                     name="parent_id"
                                     label="Parent Topic"
                                     options={topicList}
                                   />
                                 </div>
                              </div>
                           </div>


                           <div className="row" style={{ marginLeft: '0px', marginRight: '0px' }}>
                              <div className="col-4" style={{ paddingLeft: '0px', paddingRight: '0px' }}>

                                 <div className="field_section">
                                   <SelectField 
                                     name="department_id"
                                     label="Department"
                                     options={departmentList}
                                   />
                                 </div>
                              </div>
                           </div>


                           <div className="row" style={{ marginLeft: '0px', marginRight: '0px' }}>
                              <div className="col-4" style={{ paddingLeft: '0px', paddingRight: '0px' }}>

                                 <div className="field_section">
                                   <SelectField 
                                     name="priority_id"
                                     label="Priority"
                                     options={priorityList}
                                   />
                                 </div>
                              </div>
                           </div>


                           <div className="row" style={{ marginLeft: '0px', marginRight: '0px' }}>
                              <div className="col-4" style={{ paddingLeft: '0px', paddingRight: '0px' }}>

                                 <div className="field_section">
                                   <SelectFieldMulti 
                                     name="custom_field"
                                     label="Custom Field"
                                     options={customFieldList}
                                   />
                                 </div>
                              </div>
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
