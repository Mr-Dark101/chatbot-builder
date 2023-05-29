import React, { useState, useEffect } from "react";
import { Form, TextField, SelectField, SubmitButton, CheckBoxField, TextGroupField, TextAreaField } from '../../crud/FormElements';
import CrudService from '../../../services/crud.service';
import * as Yup from 'yup';
import { Tooltip } from '@mui/material';
const Create = ({rs}) => {
  const [validationSchema, setValidationSchema] = useState({});
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState();
  const [editData, setEditData] = useState();


  

   const [formData, setFormData] = useState({
                  version_id: '',
                  
                  api_secret:'',
                  model_id:"",
                  default_prompt: '',
                  tokens_number: '',
                  prediction_risk: '',
                  chatgpt_org_id: '',
                  
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
      { value: '1', label: 'Ada' },
      { value: '2', label: 'Babbage' },
      { value: '3', label: 'Curie' },
      { value: '4', label: 'Davinci' },
   ];

   const predictionList = [
      { value: '0.5', label: '0.5' },
      
   ];

   

  return (
    <>
         <div class="row">
            <div class="col-12">
               <div>
                  <div className="page_data_clinic">
                     {!successful && (
                        <Form enableReinitialize validationSchema={FormSchema} initialValues={formData} onSubmit={onSubmit}>
                           <div className="px-30 py-15">
                              <h4 class="box-title m-0" style={{ fontWeight: 800 }}>
                                 OpenAI GPT Integration
                              </h4>
                           </div>

                           <hr />

                           <div className="api_form_section px-30" style={{ overflowY: 'scroll', height: 600,margin: 0 }}>
                              <div className="row d-flex align-end" style={{ marginLeft: '0px', marginRight: '0px' }}>
                                 <div className="col-5" style={{ paddingLeft: '0px'}}>
                                    <div className="row">
                                       <div className="col-6"> 
                                          <div className="field_section">
                                             <SelectField name="version_id" label="GPT Version" options={versionList} />
                                       </div>
                                       </div>
                                    </div>
                                 </div>

                                 <div className="col-5" style={{ paddingLeft: '0px'}}>
                                    <div className="field_section">
                                       <p></p>
                                    </div>
                                 </div>

                                 <div className="col-2" style={{ paddingLeft: '0px'}}>
                                    
                                 </div>
                              </div>

                              <div className="row" style={{ marginLeft: '0px', marginRight: '0px' }}>
                                 <div className="col-5" style={{ paddingLeft: '0px'}}>   

                                    <div className="field_section">
                                     <TextField name="api_secret" label="API Secrets Key" placeholder="Please enter your ChatGPT API Key here" />
                                    
                                       <a href="https://platform.openai.com/account/api-keys"  target="_blank">Signup for ChatGPT API Key <i className="fa fa-external-link"></i></a>
                                    </div>
                                 </div>

                                 <div className="col-5" style={{ paddingLeft: '0px'}}>   

                                    <div className="field_section">
                                     <TextField name="chatgpt_org_id" label="Organization ID" placeholder="Please enter your ChatGPT Organization ID here" />
                                       
                                    </div>
                                 </div>

                                 <div className="col-2" style={{ paddingLeft: '0px'}}>   

                                 </div>
                              </div>

                              <div className="row" style={{ marginLeft: '0px', marginRight: '0px' }}>
                                 <div className="col-5" style={{ paddingLeft: '0px'}}>   

                                    <Tooltip title={"Configure the type of API call you're looking to make - GET, POST,PUT."}>
                                       <div className="field_section">
                                          <SelectField name="model_id" label="Model" options={modelList} />
                                          <span>Ada os the fastest and cheapest text model. Davinci is the most trained but more expensive.</span><br/>
                                          <a href="https://platform.openai.com/docs/models/overview" target="_blank">Learn More <i className="fa fa-external-link"></i></a>
                                       </div>

                                    </Tooltip>

                                    <div className="field_section">
                                        <br />
                                       <a className="float-end" href="https://platform.openai.com/docs/models/gpt-3-5"  target="_blank">Documentation <i className="fa fa-external-link"></i></a>
                       
                                       <TextAreaField name="default_prompt" label="Bot Instructions (Prompt)" value="Answer as truthfully as possible using the provided context and in less than three sentences. If answer is not known or is not contained in the provided context, reply with 'Sorry, I think I am not trained to answer that question'. Dont make up any facts from your own."  placeholder="Marv is a chatbot that reluctantly answers questions with sarcastic responses." rows="3" />
                                    </div>

                                    <div className="row align-end">                 
                                       <div className="col-6">
                                          <div className="field_section">

                                             <TextField name="tokens_number" label="Maximum number of tokens in response" placeholder="" />

                                          </div>
                                       </div>

                                       <div className="col-6">
                                          <div className="field_section">
                                             <p>~ 24 words</p>
                                          </div>
                                       </div>
                                    </div>
                                    <span>The more tokens, the more ‘cost’ of the request</span>
                                    

                                    <div className="row">
                                       <div className="col-6">
                                          <div className="field_section">
                                             <SelectField name="prediction_risk" label="Temperature" options={predictionList} />
                                          </div>
                                       </div>

                                       <span>This feature allows you to control the confidence level at which the model predicts answers.</span>
                                    </div>
                                    
                                 </div>

                                 <div className="col-5">
                                    

                                    
                                 </div>

                                 <div className="col-2" style={{ paddingLeft: '0px', paddingRight: '0px' }}></div>
                              </div>
                           </div>

                           <div className="px-30 py-15">
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

export default Create;
