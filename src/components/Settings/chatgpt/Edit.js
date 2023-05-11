import React, { useState, useEffect } from "react";
import { Form, TextField, SelectField, SubmitButton, CheckBoxField, TextGroupField, TextAreaField } from '../../crud/FormElements';
import CrudService from '../../../services/crud.service';
import * as Yup from 'yup';
import { Tooltip } from '@mui/material';
const Edit = ({rs}) => {
  const [validationSchema, setValidationSchema] = useState({});
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState();
  const [editData, setEditData] = useState();


  useEffect(() => {
      retrieveForm();
      
   }, []);


  const retrieveForm = () => {
      CrudService.getById('chatgpt', true)
         .then((response) => {
            
            setEditData(response.data);
            
         })
         .catch((e) => {
            console.log(e);
         });
   };

   const [formData, setFormData] = useState({
                  version_id: rs.version_id,
                  
                  api_secret:rs.api_secret,
                  model_id:rs.model_id,
                  model_desc: '',
                  tokens_number: rs.tokens_number,
                  prediction_risk: rs.prediction_risk,
                  chatgpt_org_id: rs.chatgpt_org_id,
                  
               });

   const FormSchema = Yup.object().shape({
      version_id: Yup.string().required('Required'),
      api_secret: Yup.string().required('Required'),
   });

   const onSubmit = (values, { setSubmitting, resetForm, setStatus }) => {
      
      CrudService.register(values, 'chatgpt', true).then(
         (response) => {
            //setModalValue('')
           
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

   

   const versionList = [
      { value: '1', label: 'GPT-3' },
      { value: '2', label: 'GPT-3.5' },
      { value: '3', label: 'GPT-3.5 Turbo' },
   ];

   const modelList = [
      { value: 1, label: 'Ada' },
      { value: 2, label: 'Babbage' },
      { value: 3, label: 'Curie' },
      { value: 4, label: 'Davinci' },
   ];

   const predictionList = [
      { value: 0, label: '0' },
      { value: 0.5, label: '0.5' },
      { value: 0.5, label: '1.0' }
   ];

   

  return (
    <>
         <div class="row">
            <div class="col-12">
               <div>
                  <div className="page_data_clinic api_form_section" style={{ overflowY: 'scroll', height: 800 }}>
                     {!successful && (
                        <Form enableReinitialize validationSchema={FormSchema} initialValues={formData} onSubmit={onSubmit}>
                           <h4 class="box-title m-0" style={{ fontWeight: 800 }}>
                              GPT Integration
                           </h4>

                           <div className="row" style={{ marginLeft: '0px', marginRight: '0px' }}>
                              <div className="col-9" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                                 <div className="field_section">
                                    

                                    <SelectField name="version_id" label="GPT Version" options={versionList} />
                                 </div>

                                 <div className="field_section">
                                  <TextField name="api_secret" label="API Secrets Key" placeholder="Please enter your GPT API Key here" />
                                 
                                    <a href="https://platform.openai.com/account/api-keys"  target="_blank">Signup for GPT API Key</a>
                                 </div>


                                 <div className="field_section">
                                  <TextField name="chatgpt_org_id" label="Organization ID" placeholder="Please enter your GPT Organization ID here" />
                                    
                                 </div>
                                 
                                 <Tooltip title={"Configure the type of API call you're looking to make - GET, POST,PUT."}>
                                    <div className="field_section" style={{ marginTop: '-20px' }}>
                                       <SelectField name="model_id" label="Model" options={modelList} />
                                    </div>
                                 </Tooltip>

                                 <div className="field_section">
                                    <br />
                                    <a href="https://platform.openai.com/docs/models/overview"  target="_blank">Documentation</a>
                                    <br />
                                    <br />
                                    <TextAreaField name="model_desc" label="Bot Instructions (Prompt)" placeholder="Marv is a chatbot that reluctantly answers questions with sarcastic responses." rows="3" />
                                 </div>



                                 <div className="field_section">
                                    
                                    <TextField name="tokens_number" label="Maximum number of tokens in response" placeholder="" />
                                 </div>


                                  <div className="field_section">
                                    <SelectField name="prediction_risk" label="Prediction Risk" options={predictionList} />
                                 </div>

                                 
                                


                                

                                 
                              </div>

                              <div className="col-3" style={{ paddingLeft: '0px', paddingRight: '0px' }}></div>
                           </div>

                           <div>
                              <SubmitButton title="Connect ChatGPT" className="primary" />

                              
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

export default Edit;
