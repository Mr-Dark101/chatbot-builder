import React,{useState,useEffect} from "react";


import * as Yup from 'yup';
import { Form, TextField, SelectField, SubmitButton,CheckBoxField } from '../../components/crud/FormElements';
import CrudService from "../../services/crud.service";
import {toast } from 'react-toastify';



const AddForm = ({title,formSchema,serviceUrl,master,retrieveList,closeModal,rs,appointment_id,provider_id,row }) => {

  const [formData, setFormData] = useState({});
  const [validationSchema, setValidationSchema] = useState({});
 
  const [successful, setSuccessful] = useState(false);






useEffect(() => {
    initForm(formSchema);
    
  }, [serviceUrl]);



 
    
    

const initForm = async (formSchema) => {
        
       
        let _formData = {};
        let _validationSchema = {};

        for(var key of Object.keys(formSchema)){
          
            _formData[key] = "";

            if(formSchema[key].type === "text"){
                _validationSchema[key] = Yup.string();
            }else if(formSchema[key].type === "time"){
                _validationSchema[key] = Yup.string()()
            }else if(formSchema[key].type === "email"){
                _validationSchema[key] = Yup.string().email()
           
            
            }else if(formSchema[key].type === "select"){

                _validationSchema[key] = Yup.number();
            }

            if(formSchema[key].required){
                _validationSchema[key] = _validationSchema[key].required('Required');
            }

            _formData[key] = formSchema[key].value;
        }

        setFormData(_formData);
        setValidationSchema(Yup.object().shape({ ..._validationSchema }));
    }

    const getFormElement = (elementName, elementSchema) => {
        const props = {
            name: elementName,
            label: elementSchema.label,
            options: elementSchema.options,
            id: elementName,
            fType: elementName.fType,

        };

        if (elementSchema.type === "text" || elementSchema.type === "email" ) {
            if(elementSchema.secret){
              return <TextField type="password" {...props} />

            }else if(elementSchema.fType === 'time'){
              return <TextField type="time" {...props} />

            }else if(elementSchema.fType === 'date'){
              return <TextField type="date" {...props} />
            
            }else{
              return <TextField {...props} />
            }
            
        }

       

        if (elementSchema.type === "select") {
            return <SelectField  {...props} />
        }

        if (elementSchema.type === "checkbox") {
            return <CheckBoxField  {...props}    />
        }

    }

    const onSubmit = (values, { setSubmitting, resetForm, setStatus }) => {
       
       

        if(rs){
             CrudService.edit(values,serviceUrl,master).then(
                (response) => {
                  toast(response.data.message,{type: toast.TYPE.SUCCESS})
                 
                  setSuccessful(false);
                  retrieveList();
                  closeModal()
                },
                (error) => {
                  const resMessage =
                    (error.response &&
                      error.response.data &&
                      error.response.data.message) ||
                    error.message ||
                    error.toString();

                  
                  setSuccessful(false);
                }
              );

        }else{

            if(serviceUrl == 'plan_pre_template' || serviceUrl == 'hpi_pre_template' || serviceUrl == 'physical_exam_pre_template' || serviceUrl == 'review_system_pre_template'  || serviceUrl == 'cheif_complain_pre_template'){
                values.spec_cat_id = row.id;
            }
            CrudService.register(values,serviceUrl,master).then(
                (response) => {
                  toast(response.data.message,{type: toast.TYPE.SUCCESS})
                 
                  setSuccessful(false);
                  if(appointment_id){
                        retrieveList(provider_id);
                  }else{
                      retrieveList();
                  }  
                  
                  closeModal()
                },
                (error) => {
                  const resMessage =
                    (error.response &&
                      error.response.data &&
                      error.response.data.message) ||
                    error.message ||
                    error.toString();

                  
                  setSuccessful(false);
                }
              );
        }
       
        setSubmitting(false);
    }

  return (
    <>
        <Form
                enableReinitialize
                initialValues={(rs) ? rs : formData}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                <div className="field_section">
                {Object.keys(formSchema).map( (key, ind) => (
                    <div key={key}>
                        {getFormElement(key, formSchema[key])}
                    </div>
                ))}
                </div>
                <br />
                <SubmitButton
                 title="Submit"
                 className="primary"
                  
              />

            </Form>
    </>
  );
};

export default AddForm;