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


const PlatformHeader = ({rs,loadList,industry_name,iRs}) => {

 
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
    
      if(iRs != ""){
        const header = (iRs) ? JSON.parse(iRs.header) : [];
        setHeaderField(header)
      }
   
    
  }, []);



const addField = (param) => {
    
    setHeaderField([...headerField,{}])
  
  
}

const removeField = (i,label) => {




  setHeaderField(headerField.filter((d) => d.keyOther !== label))

}

const [formData, setFormData] = useState({
    header: rs.header,
   
    platform_id: rs.id,
    
   
   
    
    
  });

const FormSchema = Yup.object().shape({
    
   
   
});



  
  

    

    const onSubmit = (values, { setSubmitting, resetForm, setStatus }) => {
       values.header = JSON.stringify(headerField);

      if(iRs){

            values.id = iRs.id
              CrudService.edit(values,'integration',true).then(
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

      }else{

          CrudService.register(values,'integration',true).then(
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
        <div className="integration_platform_page">
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

                         

                        <h3 className="main_heading">Header</h3>



                         {headerField && headerField.map((x, i) => {
                  return (
                    <div className="row align-items-center">
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

                             <div className="col-sm-1">

                                <a href="javascript:void(0)" onClick={() => removeField(i,x.keyOther)} className="link_delete_icon btn btn-icon btn-icon rounded-circle btn-danger"><br /><i className="fa fa-trash"></i></a>
                             </div>
                        
                      
                    </div>
                  );
                })}

                       
                        
    
                        
                   
                  <div className="text-end me-130">
                       <Link className="btn primary" onClick={() => addField('email')} style={{marginTop: '20px'}}>Add</Link>
                  </div>
                    <div className="mt-20 text-end  me-130">

                            <SubmitButton
                             title="Update"
                             className="btn primary"
                              
                          />
                        <button onClick={ () => loadList()} className="btn secondary ms-10">Cancel</button>
                      </div>
                </div>

                <div className="col-3"></div>    
                    
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
      </div>
    

   
    </>
  );
};

export default PlatformHeader;
