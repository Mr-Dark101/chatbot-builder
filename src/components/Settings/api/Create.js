import React, { useState, useEffect } from "react";

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
const [headerField, setHeaderField] = useState([{"keyOther":"","valueOther":""}]);
useEffect(() => {
   
    
    //retrieveMasterList('insurance');
    //retrieveMasterList('insurance_type');
    

   
    
  }, []);

const addField = (param) => {
    
    setHeaderField([...headerField,{}])
  
  
}

const typeList = [{value:'get',label:"GET"},{value:"post",label:'POST'}]

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
    name: "",
    api_type: "",
    description:"",
    url:"",
    header:"",
    payload:"",
   
    
    

    
   
   
    
    
  });

const FormSchema = Yup.object().shape({
    name: Yup.string()
          .required('Required'),
    api_type: Yup.string()
          .required('Required')
   
   
});



  
  

    

    const onSubmit = (values, { setSubmitting, resetForm, setStatus }) => {
        
      values.header = JSON.stringify(headerField);
        CrudService.register(values,'api_bot',true).then(
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
 

  return (
    <> 
      <div class="row">       
        <div class="col-12">
          <div>
          <div className="page_data_clinic">
            
             {!successful && (
            <Form
            enableReinitialize
            validationSchema={FormSchema}
            initialValues={formData}
            onSubmit={onSubmit}
          >

            
                
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

                        <h3>Header</h3>
                        

                        {headerField && headerField.map((x, i) => {
                  return (
                    <div className="row">
                            <div className="col-sm-4">
                                 <TextField 
                                    name="keyOther"
                                    placeholder="Key"
                                    value={x.key}
                                    onChange={e => handleInputChange(e, i,'phone')}
                                  />
                            </div>
                             <div className="col-sm-6">

                                   <TextField 
                                      name="valueOther"
                                      placeholder="Value"
                                      onChange={e => handleInputChange(e, i,'phone')}
                                      
                                    />
                             </div>
                        
                      
                    </div>
                  );
                })}

                        
                         <Link onClick={() => addField('email')}>Add</Link>

                        
                         <div className="field_section mb-20">
                          <TextAreaField 
                            name="payload"
                            label="Payload"
                            placeholder="Payload"
                            rows="3"
                          />
                        </div>


                       
                        
                   
                </div>

                <div className="col-3"></div>    
                    
                </div>
                    

                    
                

                    
                

            <div className="mt-20">
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
