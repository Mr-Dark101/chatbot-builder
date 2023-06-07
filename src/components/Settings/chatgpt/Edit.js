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
                  default_prompt: rs.default_prompt,
                  tokens_number: rs.tokens_number,
                  prediction_risk: rs.prediction_risk,
                  chatgpt_org_id: rs.chatgpt_org_id,
                  id: rs.id
               });

   const FormSchema = Yup.object().shape({
      version_id: Yup.string().required('Required'),
      api_secret: Yup.string().required('Required'),
   });

   const onSubmit = (values, { setSubmitting, resetForm, setStatus }) => {
      
      CrudService.edit(values, 'chatgpt', true).then(
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

   const countWord = (e) => {
      try {
         let tokenValue =e.target.value;
         let wordsValue = parseInt(tokenValue) * 0.75;
         let wordsObject = document.getElementById("wordscount");
         wordsObject.innerText = `~ Approximately ${wordsValue} words`;
      } catch(exc) {
         console.log(exc.message);
      }
   }

  return (
    <>
         <div class="row">
            <div class="col-12">
               <div>
                  <div className="page_data_clinic api_form_section" style={{ height: 1100 }}>
                     {!successful && (
                        <Form enableReinitialize validationSchema={FormSchema} initialValues={formData} onSubmit={onSubmit}>
                            <div className="px-30 py-15">
                              <h4 class="box-title m-0" style={{ fontWeight: 600 }}>
                                 OpenAI GPT Integration
                              </h4>
                              <h6 style={{marginTop: '20px'}}>An artificial intelligence system that allows you to build conversational chatbots to respond to user queries in natural language. After enabling the integration, AI bot from OpenAI will respond to user input instead of the standard reply flow. Please check your open AI account for your monthly API usage and billing.</h6>
                           </div>

                           <hr />

                           <div className="api_form_section px-30" style={{ height: 1100,margin: 0 }}>
                              <div className="row d-flex align-end" style={{ marginLeft: '0px', marginRight: '0px' }}>
                                 <div className="col-10" style={{ paddingLeft: '0px'}}>
                                    <div className="row">
                                       <div className="col-6"> 
                                          <div className="field_section">
                                             <SelectField name="version_id" label="GPT Mode" options={versionList} />
                                          </div>
                                       </div>
                                    </div>
                                 </div>

                                 <div className="col-2" style={{ paddingLeft: '0px'}}>
                                    <div className="field_section">
                                       <p></p>
                                    </div>
                                 </div>

                                 
                              </div>

                              <div className="row" style={{ marginLeft: '0px', marginRight: '0px' }}>
                                 <div className="col-5" style={{ paddingLeft: '0px'}}>   

                                    <div className="field_section">
                                     <TextField name="api_secret" label="API Secret Key" placeholder="Please enter your ChatGPT API Key here" />
                                    
                                     <h6 style={{marginTop:'15px'}}>Login to <a href="https://platform.openai.com/account/api-keys"  target="_blank">OpenAI Account</a> and get the API key and Organization ID</h6>
                                     </div>
                                 </div>

                                

                                 <div className="col-7" style={{ paddingLeft: '0px'}}>   

                                 </div>
                              </div>


                              <div className="row" style={{ marginLeft: '0px', marginRight: '0px' }}>
                              

                                 <div className="col-5" style={{ paddingLeft: '0px'}}>   

                                    <div className="field_section">
                                     <TextField name="chatgpt_org_id" label="Organization ID" placeholder="Please enter your ChatGPT Organization ID here" />
                                       
                                    </div>
                                 </div>

                                 <div className="col-7" style={{ paddingLeft: '0px'}}>   

                                 </div>
                              </div>
                              <div className="row" style={{ marginLeft: '0px', marginRight: '0px' }}>
                                 <div className="col-5" style={{ paddingLeft: '0px'}}>   

                                   
                                       <div className="field_section">
                                          <SelectField name="model_id" label="Model" options={modelList} />
                                          <h6 style={{marginTop: '10px'}}>The model based on which responses will be generated. Ada is the fastest and cheapest text model. Davinci is the most trained but more expensive.  <a href="https://platform.openai.com/docs/models/overview" target="_blank">Learn More <i className="fa fa-external-link"></i></a></h6>
                                         
                                       </div>

                                    

                                    <div className="field_section">
                                        <br />
                                       <TextAreaField name="default_prompt" label="Bot Instructions (Prompt)" value="Answer as truthfully as possible using the provided context and in less than three sentences. If answer is not known or is not contained in the provided context, reply with 'Sorry, I think I am not trained to answer that question'. Dont make up any facts from your own."  placeholder="Marv is a chatbot that reluctantly answers questions with sarcastic responses." rows="6" />
                                       <h6 style={{marginTop: '10px'}}>A bot prompt refers to the starting query or input given to a language-generation AI model.  <a href="https://platform.openai.com/docs/models/overview" target="_blank">Learn More <i className="fa fa-external-link"></i></a></h6>
                                         
                                    </div>

                                    <div className="row align-end">  
                                       <h6 style={{fontFamily: 'Lexend Deca',fontWeight: 700,fontSize: '16px',lineHeight: '18px',marginTop:'20px',marginBottom:'-12px'}}>Maximum number of tokens in response</h6>               
                                       <div className="col-6" style={{marginBottom:'0px'}}>
                                          <div className="field_section">
                                         
                                             <TextField name="tokens_number" onBlur={(e) => {
                                               
                                                countWord(e)

                                             }} placeholder="" />

                                          </div>
                                       </div>

                                       <div className="col-6" style={{marginBottom:'0px'}}>
                                          <div className="field_section">
                                          <p name="wordscount" id="wordscount">~ Approximately 500 words</p>
                                          </div>
                                       </div>
                                    </div>
                                    
                                    <div className="field_section"><h6 style={{marginTop: '10px'}}>Token is a part of a word used for natural language processing. For English text, 1 token equals approcimately 4 characters or .75 words. The more tokens, the more cost of the request.  <a href="https://platform.openai.com/docs/models/overview" target="_blank">Learn More <i className="fa fa-external-link"></i></a></h6></div>
                                    

                                    <div className="row">
                                       <div className="col-6">
                                          <div className="field_section">
                                             <SelectField name="prediction_risk" label="Temperature" options={predictionList} />
                                          </div>
                                       </div>

                                       <div className="field_section"><h6 style={{marginTop: '10px'}}>The parameter allows you to control the randomness of the responses. A temperature of 0 means responses will be very straightforward, almost dtereministic. Choose a value between 0 and 2.  <a href="https://platform.openai.com/docs/models/overview" target="_blank">Learn More <i className="fa fa-external-link"></i></a></h6></div>
                                  </div>
                                    
                                 </div>

                                 <div className="col-5">
                                    

                                    
                                 </div>

                                 <div className="col-2" style={{ paddingLeft: '0px', paddingRight: '0px' }}></div>
                              </div>
                           </div>

                           <div className="px-30 py-15 float-end">
                              <SubmitButton title="Save" className="primary" style={{width:'100px'}} />

                              
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
