import React, { useState, useEffect } from "react";

import { Form, TextField, SelectField, SubmitButton,CheckBoxField,TextGroupField,TextAreaField } from '../../crud/FormElements';
import * as Yup from 'yup';
import CrudService from "../../../services/crud.service";
import { Link } from "react-router-dom";
const Create = ({rs,retrieveList,loadList}) => {

 
  const [validationSchema, setValidationSchema] = useState({});

const [industryList, setIndustryList] = useState([]);

const [successful, setSuccessful] = useState(false);
const [message, setMessage] = useState();

useEffect(() => {
   
    
    
    //retrieveMasterList('insurance_type');
    

   
    
  }, []);


const typeList = [{value:'get',label:"GET"},{value:"post",label:'POST'}]

  





const [formData, setFormData] = useState({
    name: "",
   
    
    
    

    
   
   
    
    
  });

const FormSchema = Yup.object().shape({
    name: Yup.string()
          .required('Required')
  
   
   
});



  
  

    

    const onSubmit = (values, { setSubmitting, resetForm, setStatus }) => {
        
    
        CrudService.register(values,'helpdepartment',true).then(
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



  return (
    <> 
      <div class="row">       
        <div class="col-12">
          <div>
          <div className="page_data_clinic api_form_section">
            
             {!successful && (
            <Form
            enableReinitialize
            validationSchema={FormSchema}
            initialValues={formData}
            onSubmit={onSubmit}
          >

                <h5 className="main_heading">Add Custom Field</h5>
                
                <div className="row">
                    <div className="col-9">

                       <div className="field_section">
                          <TextField 
                            name="name"
                            label="Name"
                          />
                        </div>


                        


                       


                       
                        
                   
                </div>

                <div className="col-3"></div>    
                    
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
