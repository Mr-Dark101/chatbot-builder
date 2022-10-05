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
const removeField = (i,label) => {




  setHeaderField(headerField.filter((d) => d.keyOther !== label))

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
    build_type:'C'
   
    
    

    
   
   
    
    
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
          <div className="page_data_clinic api_form_section" style={{overflowY: 'scroll',height:800}}>
            
             {!successful && (
            <Form
            enableReinitialize
            validationSchema={FormSchema}
            initialValues={formData}
            onSubmit={onSubmit}
          >

                <h5 className="main_heading">Add New Custom API</h5>
                
                <div className="row" style={{marginLeft: '0px',marginRight: '0px'}}>
                    <div className="col-9" style={{paddingLeft: '0px',paddingRight: '0px'}}>

                       <div className="field_section">
                          <TextField 
                            name="name"
                            label="Api Name"
                          />
                        </div>


                         <div className="field_section">
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

                        <label style={{marginBottom: '0px'}}>Header</label>
                        

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

                              <div className="col-sm-1">

                                        <a href="javascript:void(0)" className="link_delete_icon" onClick={() => removeField(i,x.keyOther)}><br /><i className="fa fa-trash"></i></a>
                                     </div>
                        
                      
                    </div>
                  );
                })}

                        <div className="my-20">
                         <button className="primary" onClick={() => addField('email')}>Add</button>
                        </div>
                        
                         <div className="field_section mb-20">
                          <TextAreaField 
                            name="payload"
                            label="Payload"
                            placeholder="Payload"
                            rows="3"
                          />
                        </div>


                       
                        
                   
                </div>

                <div className="col-3" style={{paddingLeft: '0px',paddingRight: '0px'}}></div>    
                    
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
