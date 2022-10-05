import React, { useState, useEffect } from "react";
import {MenuItem, Select} from '@mui/material';
import { Form, TextField, SelectField, SubmitButton,CheckBoxField,TextGroupField,TextAreaField } from '../../crud/FormElements';
import * as Yup from 'yup';
import CrudService from "../../../services/crud.service";
import { Link } from "react-router-dom";
const Create = ({rs,retrieveList,loadList}) => {

 
  const [validationSchema, setValidationSchema] = useState({});

  const [insuranceList, setInsuranceList] = useState([]);
  const [insuranceTypeList, setInsuranceTypeList] = useState([]);

const [successful, setSuccessful] = useState(false);
const [message, setMessage] = useState();
const [headerField, setHeaderField] = useState([{"label":"","type":"",'option':[]}]);

const [optionField, setOptionField] = useState({"key":"","value":""});
useEffect(() => {
   
    
    //retrieveMasterList('insurance');
    //retrieveMasterList('insurance_type');
    

   
    
  }, []);

const addField = (param) => {
    
    setHeaderField([...headerField,{}])
  
  
}

const removeField = (i,label) => {




  setHeaderField(headerField.filter((d) => d.label !== label))

}
const removeFieldOption = (i,label,parentIndex) => {
  
  const list = [...headerField];
  const newArray = headerField[parentIndex]['option'].filter((d) => d.key !== label);
 
  list[parentIndex]['option'] = newArray;
  setHeaderField(list);
  //setHeaderField(headerField[parentIndex]['option'].filter((d) => d.key !== label))
  //console.log(headerField)
}


const addFieldOption = (index) => {
    
    const list = [...headerField];
        

        
              list[index]['option'].push({"key":"","value":""});
        

        setHeaderField(list);
  
  
}



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


const typeList = [{value:'text',label:"Text"},{value:"option",label:'Option'}]


const [formData, setFormData] = useState({
    name: "",
   
    description:"",
    form_data:"",
   
    
    

    
   
   
    
    
  });

const FormSchema = Yup.object().shape({
    name: Yup.string()
          .required('Required'),
    description: Yup.string()
          .required('Required')
   
   
});



  
  

    

    const onSubmit = (values, { setSubmitting, resetForm, setStatus }) => {
        
      values.form_data = JSON.stringify(headerField);
        CrudService.register(values,'form_builder',true).then(
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


        if(value == 'option'){
               list[index]['option'] = [{"key":"","value":""}];
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
          <div>
          <div className="page_data_clinic api_form_section">
            
             {!successful && (
            <Form
            enableReinitialize
            validationSchema={FormSchema}
            initialValues={formData}
            onSubmit={onSubmit}
          >

                <h5 className="main_heading">Add New Form</h5>
                
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

                        <label style={{marginBottom: '0px'}}>Fields</label>
                        

                        {headerField && headerField.map((x, i) => {
                  return (
                    <>
                    <div style={{border:'1px solid #ccc',margin:'10px 0px',padding:10}}>
                            <div className="row align-items-center" >
                                    <div className="col-sm-4">
                                         <TextField 
                                            name="label"
                                            placeholder="Key"
                                            value={x.label}
                                            onChange={e => handleInputChange(e, i,'phone')}
                                          />
                                    </div>
                                     <div className="col-sm-6">

                                       <br />    
                                      <Select
                                                        labelId="demo-simple-select-standard-label"
                                                        id="demo-simple-select-standard"
                                                        className="platform_select_field"
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

                                     <div className="col-sm-1">
                                        <br />
                                        <a href="javascript:void(0)" className="link_delete_icon" onClick={() => removeField(i,x.label)}><i className="fa fa-trash"></i></a>
                                     </div>
                                
                              
                            </div>
                                        {(x.type == 'option') ? (
                                          <>

                                                <div>Option Data</div>

                                                {
                                                    headerField[i]['option'].map((o, io) => {

                                                        return (<>


                                                              <div className="row align-items-center" >
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
                                                                 <div className="col-sm-1">
                                                                    <br />
                                                                    <a className="link_delete_icon" href="javascript:void(0)" onClick={() => removeFieldOption(io,o.key,i)}><i className="fa fa-trash"></i></a>
                                                                 </div>
                                                              </div>

                                                        </>)


                                                
                                                })}

                                                <button type="button" className="primary btn-danger mt-20" onClick={() => addFieldOption(i)}>Add Option</button>
                                          </>
                                          ) : null}

                      </div>

                    </>
                  );
                })}

                        <div className="my-20">
                         <button type="button" className="primary" onClick={() => addField('email')}>Add Field</button>
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
