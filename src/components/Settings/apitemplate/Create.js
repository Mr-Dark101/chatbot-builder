import React, { useState, useEffect } from "react";

import { Form, TextField, SelectField, SubmitButton,CheckBoxField,TextGroupField,TextAreaField } from '../../crud/FormElements';
import * as Yup from 'yup';
import CrudService from "../../../services/crud.service";
import AddTriggerComposer from "./AddTriggerComposer";
import { Link } from "react-router-dom";
const Create = ({rs,retrieveList,loadList}) => {

 
  const [validationSchema, setValidationSchema] = useState({});

  const [insuranceList, setInsuranceList] = useState([]);
  const [apiList, setApiList] = useState([]);
  const [platformList, setPlatformList] = useState([]);

const [successful, setSuccessful] = useState(false);
const [message, setMessage] = useState();
const [apiDataMaster, setApiDataMaster] = useState([]);
const [headerField, setHeaderField] = useState([{"keyOther":"","valueOther":""}]);
useEffect(() => {
   
    
    //retrieveMasterList('insurance');
    retrieveMasterList('api_bot');
    retrieveMasterList('platform');
    

   
    
  }, []);

const addField = (param) => {
    
    setHeaderField([...headerField,{}])
    
  
}

const typeList = [{value:'get',label:"GET"},{value:"post",label:'POST'}]

  const retrieveMasterList = (url) => {
    CrudService.ListValue('master/list-value?type=' + url)
      .then(response => {
            if(url == 'api_bot'){
                setApiList(response.data);
            }

            if(url == 'platform'){
                setPlatformList(response.data);
            }

            

            
            
             
      })
      .catch(e => {
        console.log(e);
      });
  };





const [formData, setFormData] = useState({
    name: "",
    api_type: "",
    description:"",
    url:"",
    header:"",
    payload:"",
    build_type:'T',
    platform_id:'',
    template_data:'',
   
    
    

    
   
   
    
    
  });

const FormSchema = Yup.object().shape({
    name: Yup.string()
          .required('Required'),
    api_type: Yup.string()
          .required('Required'),

   platform_id: Yup.string()
          .required('Required')
   
   
});

const apiHandleConditionMaster = (conditionType,triggerType,data) => {


        
        let newData = [];
        if(conditionType == 'S'){
          newData = {conditionType:conditionType,triggerType:triggerType,simpleData:data}
        }else{
          newData = {conditionType:conditionType,triggerType:triggerType,simpleData:data}
        }
        
        

        setApiDataMaster(newData)
   }

  
  

    

    const onSubmit = (values, { setSubmitting, resetForm, setStatus }) => {
        
      
      values.template_data = JSON.stringify(apiDataMaster);
        CrudService.register(values,'api_template',true).then(
        (response) => {
          //setModalValue('')
          loadList();
          setMessage(response.data.message);
          setSuccessful(true);
          //retrieveList();          
          
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }

  const handleInputChange = (e, index,param) => {
  const { name, value } = e.target;
  
      const list = [...headerField];
        list[index][name] = value;
        setHeaderField(list);
 
    
    
    
 };
 const props = {trigger:{
      urls:[],
      triggersList:[],
      apiList:apiList,
      currentTriggerData:{},
      currentBotData:{

        id:"",
        userId:"",
        published:"",
      },


}}

  return (
    <> 
      <div class="row">       
        <div class="col-12">
          <div>
          <div className="page_data_clinic api_form_section" style={{overflowY:'scroll',height:800}}>
            
             {!successful && (
            <Form
            enableReinitialize
            validationSchema={FormSchema}
            initialValues={formData}
            onSubmit={onSubmit}
          >

                <h5 className="main_heading">Add New API Template</h5>
                
                <div className="row" style={{marginLeft: '0px',marginRight: '0px'}}>
                    <div className="col-9" style={{paddingLeft: '0px',paddingRight: '0px'}}>

                       <div className="field_section">
                          <TextField 
                            name="name"
                            label="Api Name"
                          />
                        </div>


                         <div className="field_section">
                          <SelectField 
                            name="api_type"
                            label="Type"
                            options={typeList}
                          />
                        </div>


                        <div className="field_section mb-20">
                          <TextField 
                            name="url"
                            label="Url"
                          />
                        </div>


                        <div className="field_section mb-20">
                          <TextAreaField 
                            name="description"
                            label="Description"
                            placeholder="Description"
                            rows="3"
                          />
                        </div>

                        <div className="field_section mb-20">
                          <SelectField 
                            name="platform_id"
                            label="Platform"
                            options={platformList}
                          />
                        </div>

                        
                        
                         <div className="field_section mb-20">
                          <TextAreaField 
                            name="payload"
                            label="Payload"
                            placeholder="Payload"
                            rows="3"
                          />
                        </div>


                       
                        
                   
                </div>

                <div className="col-3" style={{paddingLeft: '0px',paddingRight: '0px'}}></div>    
                    
                </div>
                    
            <div className="field_section">    
            <label>Message</label>
            <div className="row" style={{marginLeft: '0px',marginRight: '0px'}}>
                <div className="col-sm-10" style={{paddingLeft: '0px',paddingRight: '0px'}}>
                    <AddTriggerComposer apiHandleConditionMaster={apiHandleConditionMaster} props={props}  />

                </div>
            </div>
            </div>
                    
                

            <div>
                <SubmitButton
                 title="Update"
                 className="primary"
                  
              />

              <button onClick={ () => loadList()} type="button" className="secondary ms-20">Cancel</button>
            </div>

            

            
          </Form>
          )}
            {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
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
