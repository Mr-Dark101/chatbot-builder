import React, { useState, useEffect } from 'react';

import { Form, TextField, SelectField, SubmitButton, CheckBoxField, TextGroupField, TextAreaField } from '../../crud/FormElements';
import * as Yup from 'yup';
import CrudService from '../../../services/crud.service';
import { Link } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import {toast } from 'react-toastify';
import back_icon from '../../../assets/back-icon.svg';

const Create = ({ rs, retrieveList, loadList }) => {
   const [validationSchema, setValidationSchema] = useState({});

   const [gptCatList, setGptCatList] = useState([]);
   const [defaultCat, setDefaultCat] = useState('');
   const [insuranceTypeList, setInsuranceTypeList] = useState([]);

   const [successful, setSuccessful] = useState(false);
   const [message, setMessage] = useState();
   const [headerField, setHeaderField] = useState([{ keyOther: '', valueOther: '' }]);
   useEffect(() => {
      //retrieveMasterList('insurance');
      retrieveMasterList('gptcat');
      formData.category_id = defaultCat;
   }, [defaultCat]);

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

    const [formData, setFormData] = useState({
      question: '',
      answer: '',
      category_id:'',
      
      file_type: 'C',
   });


   const retrieveMasterList = (url) => {
      CrudService.ListValue('master/list-value?type=' + url)
         .then((response) => {
            if (url == 'gptcat') {
               if(response.data.length == 0){
                  response.data = [{value:0,label:"Default"}]
               }
               setGptCatList(response.data);
               
               const catData = response.data
               const xcat = catData.filter(x => x.label == 'Default');
               
               setDefaultCat(xcat[0].value)
               
            }

           
         })
         .catch((e) => {
            console.log(e);
         });
   };

  
   const FormSchema = Yup.object().shape({
      question: Yup.string().required('Required'),
      answer: Yup.string().required('Required'),
   });

   const onSubmit = (values, { setSubmitting, resetForm, setStatus }) => {
      values.header = JSON.stringify(headerField);
      CrudService.register(values, 'trainbot', true).then(
         (response) => {
            //setModalValue('')
             toast("Training data has been successfully added",{type: toast.TYPE.SUCCESS})
            loadList();
            //setMessage(response.data.message);
            //setSuccessful(true);
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
                           <h5 class="box-title m-0" style={{ fontWeight: 800}}>
                           <span onClick={() => loadList() } style={{marginRight:'5px'}} className="icon">
                                    <img style ={{ width: "12px", marginRight: "6px",marginTop:'-5px'}} alt={'#'} src={back_icon} /> 
                                  </span>
                              Add Training Data
                           </h5>

                           <div className="row" style={{ marginLeft: '0px', marginRight: '0px' }}>
                              <div className="col-4" style={{ paddingLeft: '0px', paddingRight: '0px' }}>

                                 <div className="field_section">
                                   <SelectField 
                                     name="category_id"
                                     label="Category"
                                     options={gptCatList}
                                   />
                                 </div>
                              </div>
                           </div>

                           <div className="row" style={{ marginLeft: '0px', marginRight: '0px' }}>
                              <div className="col-9" style={{ paddingLeft: '0px', paddingRight: '0px' }}>

                                
                                 
                                 <div className="field_section">
                                    <TextField name="question" label="User Question" icon="check-square" placeholder="Please enter user question" />
                                 </div>

                                 <div className="field_section" style={{ marginTop: '10px'}}>
                                    <TextAreaField name="answer" label="Bot Response" placeholder="Please enter bot response" rows="3" />
                                 </div>

                                 

                                

                                
                                

                                

                                
                              </div>

                              <div className="col-3" style={{ paddingLeft: '0px', paddingRight: '0px' }}></div>
                           </div>

                           <div>
                              <SubmitButton title="Add" className="btn btn-primary" />

                              <button onClick={() => loadList()} type="button" className="btn btn-outline-danger ms-10">
                                 Back
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
