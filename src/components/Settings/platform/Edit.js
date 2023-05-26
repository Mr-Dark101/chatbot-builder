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


useEffect(() => {
   
    
     retrieveMasterList('industry');
    // retrieveMasterList('insurance_type');
    
    
   
    
  }, []);


const typeList = [{value:'get',label:"GET"},{value:"post",label:'POST'}]

  const retrieveMasterList = (url) => {
    CrudService.ListValue('master/list-value?type=' + url)
      .then(response => {
            if(url == 'industry'){
                setIndustryList(response.data);
            }

           

            
            
             
      })
      .catch(e => {
        console.log(e);
      });
  };





const [formData, setFormData] = useState({
    name: rs.name,
    industry_id: rs.industry_id,
    logo:rs.logo,
   
    id: rs.id
   
   
    
    
  });

const FormSchema = Yup.object().shape({
    name: Yup.string()
          .required('Required'),
    industry_id: Yup.string()
          .required('Required')
   
   
});




  
  

    

    const onSubmit = (values, { setSubmitting, resetForm, setStatus }) => {


       const formData = new FormData();
       
      formData.append('file', selectedFile);
      formData.append('name', values.name);
      formData.append('industry_id', values.industry_id);
      formData.append('id', values.id);

     
        CrudService.edit(formData,'platform',true).then(
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


                         <div className="field_section mb-20">
                          <SelectField 
                            name="industry_id"
                            label="Industry"
                            options={industryList}
                          />
                        </div>
                        


                        <div>
                
                
                <div className="drop-container"
                   onClick={fileInputClicked}
                   
                >
                    <div className="drop-message">
                        Drop a File here to upload.<br />
                        or<br />
                        <a href="#">Browse File</a>
                    </div>
                    <input type="file" 
                    ref={fileInputRef}
                    className="file-input" name="file" onChange={changeHandler} />
                   
                </div>
                <div className="file-display-container">
                    
                </div>
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
