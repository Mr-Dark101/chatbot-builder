import React, { useState, useEffect } from "react";

import {  TextField, SelectField, SubmitButton,CheckBoxField,TextGroupField,TextAreaField,SwtichField } from '../../crud/FormElements';
import * as Yup from 'yup';
import CrudService from "../../../services/crud.service";
import { Link } from "react-router-dom";
import AddTriggerComposer from "./AddTriggerComposer";
import {
    Formik,
    Form,
    Field,
    ErrorMessage,
    useFormikContext,
    useField,
    useFormik,
} from 'formik';


const Edit = ({rs,retrieveList,loadList}) => {

 
  const [validationSchema, setValidationSchema] = useState({});

  const [apiList, setApiList] = useState([]);
  const [platformList, setPlatformList] = useState([]);;

const [successful, setSuccessful] = useState(false);
const [message, setMessage] = useState();

const [apiDataMaster, setApiDataMaster] = useState([]);

useEffect(() => {
   
    
    retrieveMasterList('api_bot');
    retrieveMasterList('platform');
    
    
   
    
  }, []);


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
    name: rs.name,
    api_type: rs.api_type,
    description:rs.description,
    url:rs.url,
    header:rs.header,
    payload:rs.payload,
    build_type:'T',
    platform_id:rs.platform_id,
    id: rs.id
   
   
    
    
  });

const FormSchema = Yup.object().shape({
    name: Yup.string()
          .required('Required'),
    api_type: Yup.string()
          .required('Required')
   
   
});


const apiHandleConditionMaster = (conditionType,triggerType,data) => {


        
        let newData = [];
        if(conditionType == 'S'){
          newData = {conditionType:conditionType,triggerType:triggerType,simpleData:data}
        }else{
          newData = {conditionType:conditionType,triggerType:triggerType,simpleData:data}
        }
        
        
        console.log(newData)
        console.log(conditionType)
        setApiDataMaster(newData)
   }



   const props = {trigger:{
      urls:[],
      triggersList:[],
      apiList:apiList,
      currentTriggerData:{
        toTrigger:JSON.parse(rs.template_data).simpleData

      },
      currentBotData:{

        id:"",
        userId:"",
        published:"",
      },

}}



//const props  = {urls:[],triggersList:[],apiList:apiList,trigger:{currentTriggerData:rs.template_data.simpleData}};

    

    const onSubmit = (values, { setSubmitting, resetForm, setStatus }) => {
       values.template_data = JSON.stringify(apiDataMaster);
     
        CrudService.edit(values,'api_template',true).then(
        (response) => {
          //setModalValue('')
          
          setMessage(response.data.message);
          setSuccessful(true);
          
          loadList();
          
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


 

  return (
    <>
    

    
      <div class="row">       
        <div class="col-12">
          <div className="page_data_clinic api_form_section" style={{overflow:'scroll',height:800}}>
          <div>
            
             {!successful && (
<>
<Formik
            enableReinitialize
            validationSchema={FormSchema}
            initialValues={formData}
            onSubmit={onSubmit}
          >
          {({
            setFieldValue,
            setFieldTouched,
            values,
            errors,
            touched,
          }) => (

            

          <Form className="av-tooltip tooltip-label-right">  
                
                <div className="row">
                    <div className="col-9">

                          <div className="field_section mb-20">
                          <TextField 
                            name="name"
                            label="Name"
                          />
                        </div>


                         <div className="field_section mb-20">
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

                        <div className="field_section">
                          <SelectField 
                            name="platform_id"
                            label="Platform"
                            options={platformList}
                          />
                        </div>

                        


                      {values.api_type == "post" ? (


                         <div className="field_section mb-20">
                          <TextAreaField 
                            name="payload"
                            label="Payload"
                            placeholder="Payload"
                            rows="3"
                          />
                        </div>

                      ) : null}
                       
    
                        
                   
                </div>

                <div className="col-3"></div>    
                    
                </div>
                    

                    
                <h2>Message</h2>
            <div className="row">
                <div className="col-sm-10">
                    <AddTriggerComposer apiHandleConditionMaster={apiHandleConditionMaster} props={props}  />

                </div>
            </div>

                    
                

          <div className="mt-20">
                <SubmitButton
                 title="Update"
                 className="btn primary"
                  
              />
            <button onClick={ () => loadList()} className="btn secondary ms-20">Cancel</button>
          </div>
            

            
          </Form>
)}
    </Formik>  
    </>

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

export default Edit;
