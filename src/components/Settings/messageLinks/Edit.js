import React, { useState, useEffect,useRef } from "react";

import {  TextField, SelectField, SubmitButton,CheckBoxField,TextGroupField,TextAreaField,SwtichField } from '../../crud/FormElements';
import * as Yup from 'yup';
import CrudService from "../../../services/crud.service";
import { Link } from "react-router-dom";

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

  const [industryList, setIndustryList] = useState([]);


const [successful, setSuccessful] = useState(false);
const [message, setMessage] = useState();
 const fileInputRef = useRef();


 const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
const [isSelected, setIsSelected] = useState(false)





const typeList = [{value:'get',label:"GET"},{value:"post",label:'POST'}]

  





const [formData, setFormData] = useState({
    name: rs.name,
    
    id: rs.id
   
   
    
    
  });

const FormSchema = Yup.object().shape({
    name: Yup.string()
          .required('Required')
    
   
   
});




  
  

    

    const onSubmit = (values, { setSubmitting, resetForm, setStatus }) => {


     
     
        CrudService.edit(values,'helpcustomfield',true).then(
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
 const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
  };
    
 const fileInputClicked = () => {
        fileInputRef.current.click();
    }

  return (
    <>
    

    
      <div class="row">       
        <div class="col-12">
          <div class="page_data_clinic api_form_section">
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


                        


                        <div>
                
                
               
                
            </div>


                        
    
                        
                   
                </div>

                <div className="col-3"></div>    
                    
                </div>
                    

                    
                

                    
                

          <div className="mt-20">
                <SubmitButton
                 title="Update"
                 className="btn primary"
                  
              />
            <button onClick={ () => loadList()} className="btn secondary ms-10">Cancel</button>
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
