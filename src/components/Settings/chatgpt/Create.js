import React, { useState, useEffect } from "react";
import { Form, TextField, SelectField,SelectFieldVersion, SubmitButton, CheckBoxField, TextGroupField, TextAreaField } from '../../crud/FormElements';
import CrudService from '../../../services/crud.service';
import * as Yup from 'yup';
import { Tooltip } from '@mui/material';
import {toast } from 'react-toastify';
const Create = ({rs,retrieveForm}) => {
  const [validationSchema, setValidationSchema] = useState({});
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState();
  const [editData, setEditData] = useState();
  const [modelListDynamic, setModelListDynamic] = useState([]);

   useEffect(() => {
      const modelList = [
                  { value: 1, label: 'text-ada-001 (2,049 tokens)' },
                  { value: 2, label: 'text-babbage-001 (2,049 tokens)' },
                  { value: 3, label: 'text-curie-001 (2,049 tokens)' },
                  { value: 4, label: 'davinci (2,049 tokens)' },
                  { value: 5, label: 'curie (2,049 tokens)' },
                  { value: 6, label: 'babbage (2,049 tokens)' },
                  { value: 7, label: 'ada (2,049 tokens)' },
                 
               ];
               setModelListDynamic(modelList)
      
   }, []);
         

   const [formData, setFormData] = useState({
                  version_id: '1',
                  api_secret:'',
                  model_id:"12",
                  default_prompt: "Answer as truthfully as possible using the provided context and in less than three sentences. If answer is not known or is not contained in the provided context, reply with 'Sorry, I think I am not trained to answer that question'. Dont make up any facts from your own.",
                  tokens_number: '100',
                  prediction_risk: 0,
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
           
             toast("Data has been saved successfully",{type: toast.TYPE.SUCCESS})
           // loadList();
            //setMessage(response.data.message);
            setSuccessful(true);
            setSubmitting(false)
            retrieveForm()
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
      { value: '2', label: 'GPT-3.5' }
   ];

   
   const predictionList = [
      { value: 0, label: '0' },
      { value: 0.5, label: '0.5' },
      { value: 1.0, label: '1.0' },
      { value: 1.0, label: '1.5' },
      { value: 1.0, label: '2.0' }
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

   const changeVersion = (e) => {
      try {
         console.log("Change Version");
      } catch(exc) {
         console.log(exc.message);
      }
   }


   const customChange = (value) => {
         if(value == 1){


               const modelList = [
                  { value: 1, label: 'text-ada-001 (2,049 tokens)' },
                  { value: 2, label: 'text-babbage-001 (2,049 tokens)' },
                  { value: 3, label: 'text-curie-001 (2,049 tokens)' },
                  { value: 4, label: 'davinci (2,049 tokens)' },
                  { value: 5, label: 'curie (2,049 tokens)' },
                  { value: 6, label: 'babbage (2,049 tokens)' },
                  { value: 7, label: 'ada (2,049 tokens)' },
                 
               ];
               setModelListDynamic(modelList)
         }else{
            const modelList = [
              
               /*{ value: 8, label: 'gpt-3.5-turbo (4,096 tokens)' },
               { value: 9, label: 'gpt-3.5-turbo-16k (16,384 tokens)' },
               { value: 10, label: 'gpt-3.5-turbo-0613 (4,096 tokens)' },
               { value: 11, label: 'gpt-3.5-turbo-16k-0613 (16,384 tokens)' },*/
               { value: 12, label: 'text-davinci-003 (4,097 tokens)' },
               { value: 13, label: 'text-davinci-002 (4,097 tokens)' },
               { value: 14, label: 'code-davinci-002 (8,001 tokens)' }
            ];
            setModelListDynamic(modelList)
         }
   }

  return (
    <>
         <div class="row">
            <div class="col-12">
               <div>
                  <div className="page_data_clinic">
                     
                        <Form enableReinitialize validationSchema={FormSchema} initialValues={formData} onSubmit={onSubmit}>
                           <div className="px-30 py-15">
                              <h5 class="box-title m-0" style={{ fontWeight: 600 }}>
                                 OpenAI GPT Integration                               
                              </h5>      
                              <h6 style={{marginTop: '20px'}}>An artificial intelligence system that allows you to build conversational chatbots to respond to user queries in natural language. After enabling the integration, AI bot from OpenAI will respond to user input instead of the standard reply flow.</h6>
                              <h6 style={{marginTop: '10px'}}>Your credit card will be charged whatever usage amounts you incur by Open AI to access the GPT API. Please check your OpenAI account for your monthly API usage and billing.</h6>
                           </div>

                           <hr />

                           <div className="api_form_section px-30" style={{ height: 1100,margin: 0 }}>
                              <div className="row d-flex align-end" style={{ marginLeft: '0px', marginRight: '0px' }}>
                                 <div className="col-10" style={{ paddingLeft: '0px'}}>
                                    <div className="row">
                                       <div className="col-6"> 
                                          <div className="field_section">
                                             <SelectFieldVersion name="version_id" label="GPT Mode" options={versionList} customChange={customChange} />
                                       </div>
                                       </div>
                                    </div>
                                 </div>

                                 

                                 <div className="col-2" style={{ paddingLeft: '0px'}}>
                                    
                                 </div>
                              </div>

                              <div className="row" style={{ marginLeft: '0px', marginRight: '0px' }}>
                                 <div className="col-5" style={{ paddingLeft: '0px'}}>   

                                    <div className="field_section">
                                     <TextField name="api_secret" label="API Secret Key" placeholder="Please enter your GPT API Key here" />
                                    
                                     <h6 style={{marginTop:'15px'}}>Login to <a href="https://platform.openai.com/account/api-keys"  target="_blank">OpenAI Account</a> and get the API key and Organization ID</h6>
                                    </div>
                                 </div>

                                

                                 <div className="col-7" style={{ paddingLeft: '0px'}}>   

                                 </div>
                              </div>

                              <div className="row" style={{ marginLeft: '0px', marginRight: '0px' }}>
                              <div className="col-5" style={{ paddingLeft: '0px'}}>   

                              <div className="field_section">
                              <TextField name="chatgpt_org_id" label="Organization ID" placeholder="Please enter your GPT Organization ID here" />
                                 
                              </div>
                              </div>
                                 <div className="col-7" style={{ paddingLeft: '0px'}}>   

                                 </div>
                              </div>
                              

                              <div className="row" style={{ marginLeft: '0px', marginRight: '0px' }}>
                                 <div className="col-5" style={{ paddingLeft: '0px'}}>   

                                   
                                       <div className="field_section">
                                          <SelectField name="model_id" label="Model" options={modelListDynamic} />
                                          <h6>The model based on which responses will be generated. Ada is the fastest and cheapest text model. Davinci is the most trained but more expensive.</h6>
                                          <a href="https://platform.openai.com/docs/models/overview" target="_blank">Learn More <i className="fa fa-external-link"></i></a>
                                       </div>

                                   

                                   
                                    <div className="field_section">
                                        <br />
                                       <TextAreaField name="default_prompt" id="default_prompt" label="Bot Instructions (Prompt)" rows="6" />
                                       <h6 style={{marginTop: '10px'}}>A bot prompt refers to the starting query or input given to a language-generation AI model. <a href="https://platform.openai.com/docs/models/overview" target="_blank">Learn More <i className="fa fa-external-link"></i></a></h6>
                                       
                                    </div>
                                   

                                    <div className="row align-end">  
                                       <h6 style={{fontFamily: 'Lexend Deca',fontWeight: 700,fontSize: '16px',lineHeight: '18px',marginTop:'20px',marginBottom:'-12px'}}>Maximum number of tokens in response</h6>                                                                    
                                       <div className="col-6">
                                          <div className="field_section">
                                             <TextField name="tokens_number"                                     
                                             onBlur={(e) => {                                       
                                                countWord(e)
                                             }}
                                              placeholder="" />

                                          </div>
                                       </div>

                                       <div className="col-6" style={{marginBottom:'0px'}}>
                                          <div className="field_section">
                                             <p name="wordscount" id="wordscount">~ Approximately 0 words</p>
                                          </div>
                                       </div>
                                    </div>
                                    <div className="field_section"><h6 style={{marginTop: '10px'}}>Token is a part of a word used for natural language processing. For English text, 1 token equals approximately 4 characters or .75 words. The more tokens, the more cost of the request.  <a href="https://platform.openai.com/docs/models/overview" target="_blank">Learn More <i className="fa fa-external-link"></i></a></h6></div>
                                    
                                    

                                    <div className="row">
                                       <div className="col-6">
                                          <div className="field_section">
                                             <SelectField name="prediction_risk" label="Temperature" options={predictionList} />
                                          </div>
                                       </div>

                                       <div className="field_section"><h6 style={{marginTop: '10px'}}>The parameter allows you to control the randomness of the responses. A temperature of 0 means responses will be very straightforward, almost deterministic. Choose a value between 0 and 2.  <a href="https://platform.openai.com/docs/models/overview" target="_blank">Learn More <i className="fa fa-external-link"></i></a></h6></div>
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
                     
                     
                  </div>
               </div>
            </div>
         </div>
      </>
  );
};

export default Create;
