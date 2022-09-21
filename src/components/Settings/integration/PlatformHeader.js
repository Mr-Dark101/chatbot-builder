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


const PlatformHeader = ({rs,retrieveList,loadList,industry_name}) => {

 
  const [validationSchema, setValidationSchema] = useState({});

  const [industryList, setIndustryList] = useState([]);


const [successful, setSuccessful] = useState(false);
const [message, setMessage] = useState();
 const fileInputRef = useRef();


 const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
const [isSelected, setIsSelected] = useState(false)


const [headerField, setHeaderField] = useState([]);

useEffect(() => {
   
    
     //retrieveMasterList('industry');
    // retrieveMasterList('insurance_type');
    
      if(rs.header != ""){
        setHeaderField(JSON.parse(rs.header))
      }
   
    
  }, []);



const addField = (param) => {
    
    setHeaderField([...headerField,{}])
  
  
}



const [formData, setFormData] = useState({
    header: rs.header,
   
   
    id: rs.id
   
   
    
    
  });

const FormSchema = Yup.object().shape({
    
   
   
});



  
  

    

    const onSubmit = (values, { setSubmitting, resetForm, setStatus }) => {


       
      values.header = JSON.stringify(headerField);
     
        CrudService.edit(values,'platform',true).then(
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


    const handleInputChange = (e, index,param) => {
  const { name, value } = e.target;
  
      const list = [...headerField];
        list[index][name] = value;
        setHeaderField(list);
 
    
    
    
 };

  return (
    <>
    

    
      <div class="row">       
        <div class="col-12">
          <div class="page_data_clinic">
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


                <div>Industry: {industry_name}</div>
                <div>Platform: {rs.name}</div>
                
                <div className="row">
                    <div className="col-9">

                         

                        <h3>Header</h3>



                         {headerField && headerField.map((x, i) => {
                  return (
                    <div className="row">
                            <div className="col-sm-4">
                                 <TextField 
                                    name="keyOther"
                                    placeholder="Key"
                                    value={x.keyOther}
                                    onChange={e => handleInputChange(e, i,'phone')}
                                  />
                            </div>
                             <div className="col-sm-6">

                                   <TextField 
                                      name="valueOther"
                                      placeholder="Value"
                                      value={x.valueOther}
                                      onChange={e => handleInputChange(e, i,'phone')}
                                      
                                    />
                             </div>
                        
                      
                    </div>
                  );
                })}

                        
                        <Link onClick={() => addField('email')}>Add</Link>
    
                        
                   
                </div>

                <div className="col-3"></div>    
                    
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

export default PlatformHeader;
