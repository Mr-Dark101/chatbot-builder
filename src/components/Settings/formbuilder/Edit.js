import React, { useState, useEffect } from "react";
import {MenuItem, Select} from '@mui/material';
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

  const [insuranceList, setInsuranceList] = useState([]);
  const [insuranceTypeList, setInsuranceTypeList] = useState([]);

const [successful, setSuccessful] = useState(false);
const [message, setMessage] = useState();
const [headerField, setHeaderField] = useState(JSON.parse(rs.form_data));

const [optionField, setOptionField] = useState({"key":"","value":""});
useEffect(() => {
   
    
    // retrieveMasterList('insurance');
    // retrieveMasterList('insurance_type');
    
    
   
    
  }, []);

const addField = (param) => {
    
    setHeaderField([...headerField,{}])
  
  
}
const addFieldOption = (index) => {
    
    const list = [...headerField];
        

        
        list[index]['option'].push(optionField);
        

        setHeaderField(list);
  
  
}


const typeList = [{value:'text',label:"Text"},{value:"option",label:'Option'}]

  const retrieveMasterList = (url) => {
    CrudService.ListValue('master/list-value?type=' + url)
      .then(response => {
            if(url == 'insurance'){
                setInsuranceList(response.data);
            }

            if(url == 'insurance_type'){
                setInsuranceTypeList(response.data);
            }

            
            
             
      })
      .catch(e => {
        console.log(e);
      });
  };





const [formData, setFormData] = useState({
    name: rs.name,
    form_data: rs.form_data,
    description:rs.description,
    
    id: rs.id
   
   
    
    
  });

const FormSchema = Yup.object().shape({
    name: Yup.string()
          .required('Required'),
   
   
   
});




  
  

    

    const onSubmit = (values, { setSubmitting, resetForm, setStatus }) => {

     
       values.form_data = JSON.stringify(headerField);

        CrudService.edit(values,'form_builder',true).then(
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


        if(value == 'option'){
              list[index]['option'] = [{"key":"","value":""}];
        }else{
             list[index]['option'] = [];
        }

        setHeaderField(list);
 
    
    
    
 };
    const handleInputChangeOption = (e, index,param,indexParent) => {
   
  const { name, value } = e.target;



  
      const list = [...headerField];
        list[indexParent]['option'][index][name] = value;


        

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
                
                <div className="row">
                    <div className="col-9">

                          <div className="field_section mb-20">
                          <TextField 
                            name="name"
                            label="Name"
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

                        <h3>Header</h3>



                         <label style={{marginBottom: '0px'}}>Fields</label>
                        

                        {headerField && headerField.map((x, i) => {
                  return (
                    <>
                    <div style={{border:'1px solid #ccc',margin:10,padding:10}}>
                            <div className="row" >
                                    <div className="col-sm-4">
                                         <TextField 
                                            name="label"
                                            placeholder="Key"
                                            value={x.label}
                                            onChange={e => handleInputChange(e, i,'phone')}
                                          />
                                    </div>
                                     <div className="col-sm-6">

                                           
                                      <Select
                                                        labelId="demo-simple-select-standard-label"
                                                        id="demo-simple-select-standard"
                                                        value={x.type}
                                                        name="type"
                                                        onChange={e => handleInputChange(e, i,'phone')}
                                                        
                                                    >

                                                    {
                                                            typeList?.map((tr) => {
                                                                 
                                                                
                                                                   return (<MenuItem value={tr.value}>{tr.label}</MenuItem>)
                                                                  
                                                                    
                                                                
                                                            })
                                                        }

                                        </Select>


                                            
                                     </div>
                                
                              
                            </div>
                                        {(x.type == 'option') ? (
                                          <>

                                                <div>Option Data</div>

                                                {
                                                    headerField[i]['option'].map((o, io) => {

                                                        return (<>


                                                              <div className="row" >
                                                                <div className="col-sm-4">
                                                                     <TextField 
                                                                        name="key"
                                                                        placeholder="Key"
                                                                        value={o.key}
                                                                        onChange={e => handleInputChangeOption(e, io,'phone',i)}
                                                                      />
                                                                </div>
                                                                 <div className="col-sm-6">


                                                                      <TextField 
                                                                        name="value"
                                                                        placeholder="Value"
                                                                        value={o.value}
                                                                        onChange={e => handleInputChangeOption(e, io,'phone',i)}
                                                                      />
                                                                 </div>
                                                              </div>

                                                        </>)


                                                
                                                })}

                                                <button type="button" className="primary btn-danger" onClick={() => addFieldOption(i)}>Add Option</button>
                                          </>
                                          ) : null}

                      </div>

                    </>
                  );
                })}

                        
                        <Link onClick={() => addField('email')}>Add Fields</Link>


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