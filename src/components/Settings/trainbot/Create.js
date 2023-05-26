import React, { useState, useEffect } from 'react';

import { Form, TextField, SelectField, SubmitButton, CheckBoxField, TextGroupField, TextAreaField } from '../../crud/FormElements';
import * as Yup from 'yup';
import CrudService from '../../../services/crud.service';
import { Link } from 'react-router-dom';
import { Tooltip } from '@mui/material';

const Create = ({ rs, retrieveList, loadList }) => {
   const [validationSchema, setValidationSchema] = useState({});

   const [gptCatList, setGptCatList] = useState([]);
   const [insuranceTypeList, setInsuranceTypeList] = useState([]);

   const [successful, setSuccessful] = useState(false);
   const [message, setMessage] = useState();
   const [headerField, setHeaderField] = useState([{ keyOther: '', valueOther: '' }]);
   useEffect(() => {
      //retrieveMasterList('insurance');
      retrieveMasterList('gptcat');
   }, []);

   const addField = (param) => {
      setHeaderField([...headerField, {}]);
   };
   const removeField = (i, label) => {
      setHeaderField(headerField.filter((d) => d.keyOther !== label));
   };
   const typeList = [
      { value: 'get', label: 'GET' },
      { value: 'post', label: 'POST' },
      { value: 'put', label: 'PUT' },
   ];

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
      question: '',
      answer: '',
      category_id:'',
      
      file_type: 'C',
   });

   const FormSchema = Yup.object().shape({
      question: Yup.string().required('Required'),
      answer: Yup.string().required('Required'),
   });

   const onSubmit = (values, { setSubmitting, resetForm, setStatus }) => {
      values.header = JSON.stringify(headerField);
      CrudService.register(values, 'trainbot', true).then(
         (response) => {
            //setModalValue('')
            loadList();
            setMessage(response.data.message);
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
                  <div className="page_data_clinic api_form_section" style={{ overflowY: 'scroll', height: 800 }}>
                     {!successful && (
                        <Form enableReinitialize validationSchema={FormSchema} initialValues={formData} onSubmit={onSubmit}>
                           <h4 class="box-title m-0" style={{ fontWeight: 800}}>
                              Add Training Data
                           </h4>

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

                           <div>
                              <SubmitButton title="Create" className="primary" />

                              <button onClick={() => loadList()} type="button" className="secondary ms-10">
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

export default Create;
